<template>
  <div id="KumoStore">
    <KumoStoreHeader></KumoStoreHeader>
    <KumoStoreOnline></KumoStoreOnline>
    <KumoStoreOffline></KumoStoreOffline>
    <KumoStoreFooter></KumoStoreFooter>
  </div>
</template>

<script>
  import KumoStoreHeader from './common/KumoStoreHeader.vue'
  import KumoStoreOnline from './common/KumoStoreOnline.vue'
  import KumoStoreOffline from './mobile/KumoStoreOfflineMobile.vue'
  import KumoStoreFooter from './mobile/KumoStoreFooterMobile.vue'

  export default {
    components: {
      'KumoStoreHeader': KumoStoreHeader,
      'KumoStoreOnline': KumoStoreOnline,
      'KumoStoreOffline': KumoStoreOffline,
      'KumoStoreFooter': KumoStoreFooter
    }
  }

</script>

<style>
</style>

