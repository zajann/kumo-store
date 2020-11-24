<template>

  <div class="online-info">

    <h4 style="font-weight: bold; color:#3d3d3d">온라인 스토어</h4>

    <b-container class="online-store-container">
      <b-row>
        <hr class="hr-short">
      </b-row>
      <b-row class="online-store-row">
        <b-col md="4" class="store">
          <p>쿠모 공식 온라인 몰</p>
          <div class="store-img">
            <a href="https://kumobeauty.com/">
              <b-img src="../../assets/store-kumo-new.png" fluid></b-img>
            </a>
          </div>
        </b-col>
        <b-col md="4" class="store">
          <p>롯데 인터넷 면세점</p>
          <div class="store-img">
            <a href="http://kor.lottedfs.com/kr/display/brand?dispShopNo=10020917">
              <b-img src="../../assets/store-lotte.png" fluid></b-img>
            </a>
          </div>
        </b-col>
        <b-col md="4" class="store">
          <p>롭스 공식 온라인 몰</p>
          <div class="store-img">
            <a href="https://www.lohbs.co.kr/brand/113742/new">
              <b-img src="../../assets/store-lohbs.png" fluid></b-img>
            </a>
          </div>
        </b-col>
      </b-row>
    </b-container>
    <div style="height:50px;"></div>
    <hr class="hr-long">
  </div>

</template>

<script>

</script>

<style scoped>

.hr-long {
  width:90%;
}

p {
  font-size: 20px;
  color: #6a6a6a;
}

.online-store-row {
  margin-top: 20px;
}

.online-info {
  margin-top: 80px;
}

.store {
  margin-top: 30px;
}

.store-img {
  opacity: 1;
  filter: alpha(opacity=100);
  margin-top: -10px;
}

.store-img:hover {
  opacity: 0.5;
  filter: alpha(opacity=50);
}

.hr-short {
  width: 25px;
  border: 2px solid gray;
  margin-bottom: -10px;
  margin-top: 25px;
}

</style>
