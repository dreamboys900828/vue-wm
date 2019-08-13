<template>
  <!--导航栏-->
  <div>
    <!--<van-nav-bar-->
      <!--title="{{question}}"-->
      <!--left-text=" "-->
      <!--arrow-left-->
      <!--left-arrow-->
      <!--@click-left="onClickLeft"-->
    <!--/>-->
    <div class="header">
      <div @click="clickFH">
        <svg t="1565234426543" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3741" width="16" height="16"><path d="M348.99379407 517.68945384l422.93654668-422.9437849c17.77417782-17.76259666 17.77417782-46.59388232 1e-8-64.35792663-17.76259666-17.77417782-46.59388232-17.77417782-64.35792664 0l-455.12057675 455.12347204c-17.77852076 17.76259666-17.77852076 46.59388232 0 64.35792662l455.1220244 455.12202442c8.88419362 8.88853654 20.53194038 13.33425247 32.17823949 13.33425246s23.29549351-4.44571592 32.17823949-13.33425246c17.77852076-17.76259666 17.77852076-46.59388232 0-64.35792664l-422.93944197-422.94523255z" p-id="3742" fill="#ffffff"></path></svg>
      </div>
      <span class="content">{{question}}</span>
    </div>

    <div class="content">
      <h2>{{answer}}</h2>
    </div>

  </div>
</template>

<script>
  export default {
    name: "questionDetail",
    data(){
      return{
        answer:"",
        question:"",
      }
    },
    methods: {
      onClickLeft() {
        this.$router.go(-1);
      },
      clickFH(){
        this.$router.go(-1)
      }
    },
    created(){
      this.answer = this.$route.query.abc;
      this.question=this.$route.query.q1;
      console.log(this.$route.query.q1);
      console.log(this.answer);
      // console.log(this.question)

      //
      // /* 定义一个正则定律前面(?<=\( )是筛选内部开头为(,后面?=\)  是筛选内部结尾为  ) 的,这个正则的意思就是筛选出来获取的值里面()里面的东西 */
      // var reg=/((?<=\().*?(?=\)))/g;
      // /*获取传来的内容的值用正则处理一下,reg就是正则,把reg里面的东西替换到img的src里面,所以得到的值就会把img和内容分离开*/
      // this.question=this.$route.query.q1.replace(reg,"<img src='$1'>");
      //
      // this.question = this.question.replace(/(\!\[\]\()|(\))/g,"");
      // console.log(this.question)
      //


    },
  }
</script>

<style scoped lang="less">


  .header{
    height: 0.457rem;
    line-height: 0.457rem;
    background: #3190eb;
    text-align: center;
    div{
      display: inline-block;
      width: 0.16rem;
      float: left;
      margin-left: 0.1rem;
      #icom{
        float: left;
      }
    }
    span{
     font-size: 0.1875rem;
      color: white;
      margin-left: -0.1rem;
    }
  }
  .content{
    padding: 0 0.16406rem 0.46875rem ;
    box-sizing: border-box;
    /*width: 100%;*/
    line-height: 0.3rem;
    h2{
      font-size: 0.228156rem;
    }
  }



</style>

