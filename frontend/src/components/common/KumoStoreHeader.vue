<template>

  <div>
    <div>
      <!-- <b-navbar toggleable="xl" type="light" variant="light" fixed="top" class="kumo_nav"> -->
      <!--   <b-navbar-toggle target="nav-collapse"></b-navbar-toggle> -->
      <!--   [> <b-collapse id="nav-collapse" is-nav> <] -->
      <!--   [>   <b-navbar-nav class=""> <] -->
      <!--   [>     <b-nav-item href="https://www.kumobeauty.com/home" class="navLink">HOME</b-nav-item> <] -->
      <!--   [>     <b-nav-item href="https://www.kumobeauty.com/theviolet" class="navLink ml-2">KUMO X SSIN</b-nav-item> <] -->
      <!--   [>     <b-nav-item href="https://www.kumobeauty.com/brushset" class="navLink ml-2">BRUSH SET</b-nav-item> <] -->
      <!--   [>     <b-nav-item href="https://www.kumobeauty.com/facebrushes" class="navLink ml-2">FACE</b-nav-item> <] -->
      <!--   [>     <b-nav-item href="https://www.kumobeauty.com/eyebrushes" class="navLink ml-2">EYE</b-nav-item> <] -->
      <!--   [>     <b-nav-item href="https://www.kumobeauty.com/lipbrushes" class="navLink ml-2">LIP</b-nav-item> <] -->
      <!--   [>     <b-nav-item href="https://www.kumobeauty.com/qna1" class="navLink ml-2">Q&A</b-nav-item> <] -->
      <!--   [>   </b-navbar-nav> <] -->
      <!--   [> </b-collapse> <] -->
      <!-- </b-navbar> -->
      <b-navbar type="" variant="light" fixed="top" class="mx-auto" style="width: 100%;">
        <b-navbar-brand href="https://www.kumobeauty.co.kr" class=" mx-auto">
          <a href="https://www.kumobeauty.com">
            <b-img src="../../assets/kumo-brand-logo.png" width="100"></b-img>
          </a>
        </b-navbar-brand>

      </b-navbar>

    </div>

    <div class="" style="background-color: #e5e5e5; margin-top: 55px; height: 336px; padding-top:95px;">
      <div style="">
        <h2 style="font-weight: bold; color: #3c3b3b;">공식 판매처</h2>
        <hr class="hr-short">
        <p class="info d-none d-md-block d-lg-block d-xl-block">쿠모의 비건 브러쉬를 만날 수 있는 특별한 온라인 / 오프라인 매장들을 소개합니다.</p>
        <p class="info d-block d-md-none d-lg-none d-xl-none">쿠모의 비건 브러쉬를 만날 수 있는</p>
        <p class="info d-block d-md-none d-lg-none d-xl-none" style="margin-top: -15px;">특별한 온라인 / 오프라인 매장들을 소개합니다.</p>
      </div>
    </div>
    <!-- <hr class="hr-long"> -->
  </div>

</template>

<script>
</script>

<style scoped>

@font-face {
  font-family: montserrat;
  /*src: url('../../assets/Montserrat-Regular.ttf');*/
  src: url('../../assets/Montserrat-Light.ttf');
}

.navLink {
  font-family: montserrat;
}

#nav-collapse > ul > li > a {
  color: #636363;
}

.hr-short {
  width: 25px;
  border: 2px solid gray;
}

.hr-long {
  width: 90%;
  margin-top: 30px;
}

.info {
  color: #636363;
  margin-top: 20px;
  font-size: 18px;
  font-weight: ligther;
}

.kumo_nav {
  background-color: #fff;
}

.navLink {
}

</style>
