<template>
  <div class="goods">
    <div class="menu-wrapper " ref="leftScroll">
      <ul ref="left_ul">
        <li class="menu-item"  :class="{current:currentIndex==index}" v-for="(good,index) in goods" :key="index" @click="selectItem(index)">
          <span class="text bottom-border-1px"> <img class="icon" :src="good.icon" v-if="good.icon">
          {{good.name}}</span>
        </li>
      </ul>
    </div>



    <div class="foods-wrapper" ref="rightScroll">
      <ul ref="right_ul">
        <li class="food-list-hook food-list" :class="{current:currentIndex==index}" v-for="(good, index) in goods" :key="index">
          <h1 class="title">{{good.name}}</h1>
          <ul>
            <li class="food-item bottom-border-1px" v-for="(food, index) in good.foods" :key="index">
              <div class="icon">
                <img width="57" height="57"
                     :src="food.icon">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}份</span>
                  <span>好评率{{food.rating}}%</span></div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span>
                  <span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <CartControl :food="food"/>
                </div>
              </div>
            </li>
            
          </ul>
        </li>
      </ul>
    </div>
  </div>

</template>

<script>
import {mapState} from 'vuex'
import BScroll from 'better-scroll'
import CartControl from '../../../components/CartControl/CartControl.vue';
export default {
  components: { CartControl },
  data() {
    return {
     scrollY:0, // 右侧的列表的滑动的y轴坐标，初始值为0，在滑动过程中改变
      tops:[],  //  右侧的所有的分类的 li 的高度组成的数组，在列表显示一次统计一次即可
      index:0
    }
  },
  
computed:{
  ...mapState(['goods']),

  // 当前分分类的下标值计算
  currentIndex(){
    const {scrollY,tops} = this
    // 根据当前滑动的scrollY 的值确定左侧的列表哪一个被选择
    const index = tops.findIndex((top,index)=>scrollY>=top && scrollY<tops[index+1])
    if( this.leftScroll ){
      //  this.index = index

      //  //左侧列表滑动到
       this.leftScroll.scrollToElement(this.$refs.left_ul.children[index],500)
    }
    return index
      }

},
methods:{
   _initTops(){
      const tops=[]
      let top = 0
      tops.push(top)
      const lis = this.$refs.right_ul.children;
      console.log(lis.length)
      Array.prototype.forEach.call(lis,(li)=>{
          top+= li.clientHeight
          console.log(top)
          tops.push(top)
      })
      //
      this.tops = tops
      console.log('top',this.tops)
   },
   _initScroll(){
        this.leftScroll= new BScroll(this.$refs.leftScroll,{
          //  probeType:3 //     触摸滑动、惯性滑动。 实时的 
          //  probeType:2     触摸滑动。         实时的
            probeType:1 ,   // 触摸滑动。         非实时的（相当于有个节流的操作）
            click:true
      
        });
          this.rightScroll=  new BScroll(this.$refs.rightScroll,{
          probeType:1,
          click:true
        });
        //给right邦定scrroll 的监听 
          this.leftScroll.on('scroll',()=>{
            // console.log('左边的：'+y)
        });
          this.leftScroll.on('scrollEnd',()=>{
         
            // console.log('左边的end：'+y)
        });
          this.rightScroll.on('scroll',({y})=>{
           this.scrollY=Math.abs(y)
            // console.log('右边的:'+y,this.currentIndex)
            
        });
          this.rightScroll.on('scrollEnd',({y})=>{
           this.scrollY=Math.abs(y)
            // console.log('右边的end:'+y,this.currentIndex)
        })
   },
   selectItem(index){
     this.scrollY=this.tops[index];
     this.rightScroll.scrollTo(0,-this.tops[index],500)
   }
},
mounted(){
  if(this.goods.length>0){
   this._initScroll()
   this._initTops()
  //  console.log('5555555')
  }
  
},
watch:{
  goods(){   //在goods数据先存在了的时候，后创建goods组件，再去
    this.$nextTick(function () {
      this._initScroll()
      this._initTops()
   
    });
  }
}
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/mixins.styl"
  .goods
    display: flex
    position: absolute
    top: 225px
    bottom: 46px
    width: 100%
    background: #fff;
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      .menu-item
        display: table
        height: 54px
        width: 56px
        padding: 0 12px
        line-height: 14px
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          color: $green
          font-weight: 700
          .text
            border-none()
        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          bottom-border-1px(rgba(7, 17, 27, 0.1))
          font-size: 12px
    .foods-wrapper
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            line-height: 12px
            margin-bottom: 8px
          .extra
            .count
              margin-right: 12px
          .price
            font-weight: 700
            line-height: 24px
            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)
            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 12px
</style>
