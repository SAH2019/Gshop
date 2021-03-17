<template>
    <div>
     <router-view></router-view>
     <FooterGuide v-show="$route.meta.showFooter"></FooterGuide>
    
    </div>
</template>

<script>
import FooterGuide from './components/FooterGuide/FooterGuide.vue'
export default {
    mounted() {
      
  // 异步获取address
     this.$store.dispatch('getAddress')
},
   components:{
        FooterGuide
   }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>
