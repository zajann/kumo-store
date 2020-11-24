<template>

  <div class="container w-100">

    <h4 style="font-weight: 600; margin-top: 80px; color: #3d3d3d">오프라인 스토어</h4>
    <hr class="hr-short">

    <b-container class="">
      <b-row>
        <div class="w-100" style="text-align: center;">
          <div style="display: inline-block">
            <b-form-checkbox-group 
               class="chkbox text-right"
               size="md"
               align="center"
               v-model="store_selected"
               :options="store_option"
               style=" margin:0px"
               @change="toggleShowInfo"
               plain
               ></b-form-checkbox-group>
          </div>
        </div>
      </b-row>
      <div style="height: 5px;"></div>
      <b-row style="width: 100%;">
        <b-col cols="12" align-self="center" style="margin-left: 10px;">
          <b-tabs active-nav-item-class="bg-secondary" pills fill class="w-100" style="margin-top: 10px; border: 1px solid #ccc; border-bottom: 0px; display: inline-block;">
            <b-tab title="지역별 검색">
              <b-container>
                <b-row style="margin-top: 10px;">
                  <b-col cols=4>
                    <b-form-select 
                       class="frmVal" 
                       style="font-size: 15px; margin-left: -5px; width:100%"
                       v-model="region_selected"
                       :options="region_option">
                    </b-form-select>
                  </b-col>
                  <b-col cols=6>
                    <b-form-input 
                       class="frmVal" 
                       placeholder="직접입력 (예:강남)" 
                       style="font-size: 15px; margin-left: -10px; width:120%"
                       v-model="region_input">
                    </b-form-input>
                  </b-col>
                  <b-col cols=2>
                    <button 
                       class="btn"
                       @click="searchStoreByRegion"
                       ><i class="fa fa-search icon-large" aria-hidden="true"></i></button>
                  </b-col>
                </b-row>
                <b-row>
                  <p style="margin-left: 15px; margin-top:10px; font-size: 12px;">검색 결과: {{ countShowStore }}개</p>
                </b-row>
              </b-container>
            </b-tab>
            <b-tab title="매장명 검색">
              <b-container>
                <b-row style="margin-top:10px;">
                  <b-col cols=10>
                    <b-form-input 
                       class="frmVal"
                       v-model="store_name_input">
                    </b-form-input>
                  </b-col>
                  <b-col cols=2>
                    <button 
                       class="btn" 
                       @click="searchStoreByName">
                      <i class="fa fa-search icon-large" aria-hidden="true"></i></button>
                  </b-col>
                </b-row>
                <b-row>
                  <p style="margin-left: 15px; margin-top:10px; font-size: 12px;">검색 결과: {{ countShowStore }}개</p>
                </b-row>
              </b-container>
            </b-tab>
          </b-tabs>
        </b-col>
      </b-row>

      <b-row style="width: 100%">
        <b-col cols="12" align-self="center" style="margin-left: 10px;">
          <div class="w-100" style="max-height: 445px; overflow: auto; border: 1px solid #ccc">
            <b-table
                             :items="table_items" 
                             :fields="table_fields"
                             thead-class="hidden_header" 
                             selectable
                             select-mode="single"
                             selectedVariant="secondary"
                             @row-selected="moveMapCenter"
                             >
                             <span slot="marker_img" slot-scope="data" v-html="data.value"></span>
                             <span slot="store_info" slot-scope="data" v-html="data.value"></span>
            </b-table>
          </div>
        </b-col>
      </b-row>
      <b-row>
        <div style="height: 10px;"></div>
      </b-row>

      <b-row style="width: 98%;"> 
        <b-col cols="12" align-self="center" style="margin-left: 10px;">
          <div class="w-100" style="margin-top: 1px;">
            <naver-maps
                             :height="400"
                             :mapOptions="mapOptions"
                             @load="onLoad">
              <naver-info-window
                             class="info-window"
                             @load="onWindowLoad"
                             :isOpen="info"
                             :marker="marker">
              </naver-info-window>
              <naver-marker 
                             v-for="(info, index) in show_store_info"
                             :lat="info.lat"
                             :lng="info.lng"
                             :key="index"
                             @click="onMarkerClicked" 
                             @load="onMarkerLoaded"
                             :ref="markerRef(info.id)"
                             />
              </naver-maps>
          </div>
        </b-col>
      </b-row>

    </b-container>

    <div style="display: none;"> {{ drawTable }}</div>
  </div>

</template>

<script>

export default {
  data () {
    return {
      store_selected: [1,2,3],
      store_option: [
      { text: "라코", value: 1},  
      { text: "시코르", value: 2},  
      { text: "롭스", value: 3}  
      ],
      region_selected: null,
      region_option: [
      { value: null, text:'전체'},
      { value: '서울', text:'서울'},
      { value: '경기', text:'경기'},
      { value: '인천', text:'인천'},
      { value: '부산', text:'부산'},
      { value: '대구', text:'대구'},
      { value: '광주', text:'광주'},
      { value: '대전', text:'대전'},
      { value: '울산', text:'울산'},
      { value: '강원', text:'강원'},
      { value: '충청북도', text:'충청북도'},
      { value: '충청남도', text:'충청남도'},
      { value: '전라북도', text:'전라북도'},
      { value: '전라남도', text:'전라남도'},
      { value: '경상북도', text:'경상북도'},
      { value: '경상남도', text:'경상남도'},
      { value: '제주', text:'제주'}
      ],
      region_input: null,
      store_name_input: null,

      table_fields: [
      { key: 'marker_img', tdClass: 'w-25', thStyle: 'display: none;'},
      { key: 'store_info', tdClass: 'w-75', thStyle: 'display: none;'}
      ],
      table_items: [],

      show_store_info: [],
      laco_info: [],
      chicor_info: [],
      lohbs_info: [],
      // About Naver Map
      info: false,
      infoWindow: null,
      marker: null,
      map: null,
      nMap: null,
      mapOptions: {
        lat: 37,
        lng: 127,
        zoom: 11,
        zoomControl: true,
        zoomControlOptions : {position: 'TOP_RIGHT'},
        mapTypeControl: true
      }

    }
  },

  created () {
    this.$http.get('/api/stores')
      .then((response) => {

        let jsonObj = response.data;

        for (let i = 0; i < jsonObj.length; i++) {
          let obj = jsonObj[i];

          this.show_store_info.push(obj);

          if (obj.type == 1) {
            this.laco_info.push(obj);
          } else if (obj.type == 2) {
            this.chicor_info.push(obj);
          } else if (obj.type == 3) {
            this.lohbs_info.push(obj);
          } else {
            console.log("no type ${obj.type}");
          }
        }
        
        this.map.setCenter(this.show_store_info[0].lat, this.show_store_info[0].lng);
      });
  },

  computed: {
    drawTable () {
      this.table_items = [];
      let stores = this.show_store_info;

      for (let i = 0; i < stores.length; i ++) {
        let store = stores[i];
        let markerStr = `<img style="margin-top: 15px;" src="../../static/img/marker.png"></img>`;
        let infoStr = `<div class="text-left">
          <p class="font-weight-bold" style="font-size: 15px; margin-top:10px">${store.name}</p>
          <p style="font-size: 13px; margin-top: -10px;">${store.address}</p>
          <p style="font-size: 13px; margin-top: -10px; margin-bottom: 0px;">${store.phone}</p>
          </div>`;

        let data = {
          id: store.id,
          marker_img: markerStr,
          store_info: infoStr,
          lat: store.lat,
          lng: store.lng,
          type: store.type
        }

        this.table_items.push(data);
      }

    },

    countShowStore () {
      return this.show_store_info.length;
    }
  },

  methods: {
    searchStoreByRegion () {
      this.store_name_input = null;

      let inputs = [];
      let types = this.store_selected;

      if (this.region_selected != null) {
        inputs.push(this.region_selected);
      }

      if (this.region_input != null) {
        let keywords = this.region_input.split(" ");
        for (let i in keywords) {
          inputs.push(keywords[i]);
        }
      }


      this.$http.get('/api/stores/region', {
        params: {
          inputs: inputs,
          types: types
        }
      }).then(response => {
        this.show_store_info = response.data;

        this.laco_info = [];
        this.chicor_info = [];
        this.lohbs_info = [];

        let jsonObj = response.data;

        for (let i = 0; i < jsonObj.length; i++) {
          let obj = jsonObj[i];

          if (obj.type == 1) {
            this.laco_info.push(obj);
          } else if (obj.type == 2) {
            this.chicor_info.push(obj);
          } else if (obj.type == 3) {
            this.lohbs_info.push(obj);
          } else {
            console.log("no type ${obj.type}");
          }
        }
      });
    },

    searchStoreByName () {
      this.region_selected = null;
      this.region_input = null;

      let inputs = [];
      let types = this.store_selected;

      if (this.store_name_input != null) {
        let keywords = this.store_name_input.split(" ");
        for (let i in keywords) {
          inputs.push(keywords[i]);
        }
      }

      this.$http.get('/api/stores/name', {
        params: {
          inputs: inputs,
          types: types
        }
      }).then(response => {
        this.show_store_info = response.data;

        this.laco_info = [];
        this.chicor_info = [];
        this.lohbs_info = [];

        let jsonObj = response.data;

        for (let i = 0; i < jsonObj.length; i++) {
          let obj = jsonObj[i];

          if (obj.type == 1) {
            this.laco_info.push(obj);
          } else if (obj.type == 2) {
            this.chicor_info.push(obj);
          } else if (obj.type == 3) {
            this.lohbs_info.push(obj);
          } else {
            console.log("no type ${obj.type}");
          }
        }
      });
    },

    moveMapCenter (items) {
      if (items.length != 0) {
        this.map.setCenter(items[0].lat, items[0].lng);
        var selectedMarker = `marker${items[0].id}`;

        for (let marker in this.$refs) {
          if (this.$refs[marker].length == 0) {
            continue;
          }
          let aniFlag = 0;
          if (marker == selectedMarker) {
            aniFlag = 1;
          } 
          this.$refs[marker][0].marker.setAnimation(aniFlag);
        }
      }
    },

    onLoad(vue) {
      this.map = vue;
      this.nMap = vue.map;
    },

    onWindowLoad(that) {
      this.infoWindow = that.infoWindow;
    },

    onMarkerClicked(event) {
      let isSame = false;

      if (this.marker == event.overlay) {
        isSame = true;
      }

      this.marker = event.overlay;

      let marker_store = null;

      for (let i = 0; i < this.show_store_info.length; i ++ ) {

        if (this.marker.position._lat == this.show_store_info[i].lat) {
          marker_store = this.show_store_info[i];
          break;
        }
      }

      let infoWindowHTML = 
        `<div style="text-align: left; margin: 20px;">
          <p style="font-weight: bold;">${marker_store.name}</p>
          <hr style="border: 1px solid #6e6e6e;">
          <span style="font-size: 12px; ">${marker_store.address}</span><br>
          <span style="font-size: 12px;">${marker_store.phone}</span><br>
          <p style="text-align: right;">
          <a href="${marker_store.mobile_link}">
          <img style="width: 30px; height:30px; "src="../../static/img/naver_conn.png"/>
          </a>
          </p>
        </div>`;

      var infoWindow = new naver.maps.InfoWindow({
        content: infoWindowHTML,
        maxWidth: 500,
        borderWidth: 1,
        backgroundColor: "#fff",
        borderColor: "#ccc"

      });

      if (this.infoWindow != null) {

        if (this.infoWindow.getMap()) {
          
          this.infoWindow.close();

          if (!isSame) {
            infoWindow.open(this.nMap, this.marker);
            this.infoWindow = infoWindow;
          }
        } 
        else {
          infoWindow.open(this.nMap, this.marker);
          this.infoWindow = infoWindow;
        }
      }
      else {

        infoWindow.open(this.nMap, this.marker);
        this.infoWindow = infoWindow;
      }
    },

    onMarkerLoaded(vue) {
      vue.marker.setIcon("../../static/img/marker.png");
    },

    toggleShowInfo (checked) {

      this.show_store_info = [];
      let tmp = [];

      let laco = this.laco_info;
      let chicor = this.chicor_info;
      let lohbs = this.lohbs_info;

      checked.forEach(function(e){

        switch (e) {
          case 1:
            laco.forEach(function(info){
              tmp.push(info)
            });
            break;

          case 2:
            chicor.forEach(function(info){
              tmp.push(info)
            });
            break;

          case 3:
            lohbs.forEach(function(info){
              tmp.push(info)
            });
            break;
        }

      });

      this.show_store_info = tmp;

      for (let marker in this.$refs) {
        if (this.$refs[marker].length == 0){
          continue;
        }
        this.$refs[marker][0].marker.setAnimation(0);
      }
    },

    markerRef(id) {
      return `marker${id}`;
    }
  }

}

</script>

<style scoped>

.info-window-container {
  padding: 10px;
  width: 300px;
  height: 100px;
}

.chkbox {
}

.frmVal {
  border-top: 0px;
  border-left: 0px;
  border-right: 0px;
  border-bottom: 1px solid #ccc;
}

.hidden_header {
  display: none !important;
}

#vue-naver-maps {
  margin-top: 0px;
  width: 102%;
  height: 100%;
}

.tab {
  background-color: red;
}

.hr-short {
  width: 25px;
  border: 2px solid gray;
  margin-bottom: 35px;
  margin-top: 35px;
}

</style>
