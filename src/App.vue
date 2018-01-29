<template>
  <div id="app">
    <Button value="primary" @click="btnClick"></Button>
    <Button type="default" value="default" icon="pifuzhuti"></Button>
    <Button type="info" value="info"></Button>
    <Tooltip value="提示内容sadasds1提示内容sadasds1提示内容sadasds1" :placement="10">
      <Button type="warm" value="暖色warm" icon="pifuzhuti"></Button>
    </Tooltip>
    <Button type="danger" value="danger"></Button>
    <Button value="primary" size="lg"></Button>
    <Button value="" size="sm" icon="yonghu"></Button>
    <Button value="primary" size="xs"></Button>
    <Tooltip>    
      <button>asdasd</button>
    </Tooltip>
    
    <p style="padding-top:20px;">
      <BtnGroup>
        <Button value="primary" @click="btnClick"></Button>
        <Button type="default" value="default" icon="pifuzhuti"></Button>
        <Button type="info" value="info"></Button>
        <transition name="bouncelInLeft">
        <Button type="warm" value="暖色warm" icon="pifuzhuti"></Button>
        </transition>
        <Button type="danger" value="danger"></Button>
      </BtnGroup>
    </p>
    <p style="padding-top:20px;">
      <BtnGroup>
        <Button type="default" size="xs" value="default" @click="btnClick"></Button>
        <Button type="default" size="xs" value="default" icon="pifuzhuti"></Button>
        <Button type="default" size="xs" value="info"></Button>
        <Button type="default" size="xs" value="暖色warm" icon="pifuzhuti"></Button>
        <Button type="default" size="xs" value="danger"></Button>
      </BtnGroup>
    </p>
    
    <p style="padding-top:20px;">
      <BtnGroup >
        <Button type="default" size="lg" value="default" @click="btnClick"></Button>
        <Button type="default" size="lg" value="default" icon="pifuzhuti"></Button>
        <Button type="default" size="lg" value="info"></Button>
        <Button type="default" size="lg" value="暖色warm" icon="pifuzhuti"></Button>
        <Button type="default" size="lg" value="danger"></Button>
      </BtnGroup>
    </p>
    <Icon icon="manyi" size="100" color="#f40" style="background:#eee;border-radius: 50%;"/>
    <Row>
      <Col :span="{lg:23,md:12,sm:6,xs:12}" :offset="['lg1','md2','sm3','xs4']" style="background:#ccc">aaaa</Col>
      <Col>bbbbb</Col>
      <Col>ccccc</Col>
      <Col>ddddd</Col>
      <Col>eeeee</Col>
      <Col>fffff</Col>
    </Row>
    <div class="ws-table">
      <div class="ws-table-tr">
        <div class="ws-table-td">td</div>
        <div class="ws-table-td">td</div>
        <div class="ws-table-td">td</div>
        <div class="ws-table-td">td</div>
      </div>
    </div>
    <p style="padding-top:30px;">val:{{val}}
    <p style="padding-top:30px;">
      <Tag :checkable="true" :editable="true" v-model="val" :closable="true"></Tag>
      <Tag type="primary" hoverType="multi" value="这是标签" :closable="true"></Tag>
      <Tag type="warm" hoverType="multi" color="#f00" bgColor="#f00" value="这是Warm标签" :closable="true"></Tag>
      <Button type="default" size="xs" @click="hover">点击查看动画</Button>
    </p>
    <div id="example-3">
  
  <p style="padding-top:30px;">

    <!-- <Animates
      in="fadeInRightBig"
      out="bounceOutLeft"
      :group="true"
    >
      <Button type="warm" value="暖色warm" icon="pifuzhuti" v-show="show" key="button"></Button>
      <Tag type="warm" hoverType="multi" color="#f00" bgColor="#f00" v-show="!show" value="这是Warm标签" key="tag"></Tag>
    </Animates> -->
    <!-- <h1 v-show="show" :class="classs">123123123123123</h1> -->
  </p>
  <p style="padding-top:30px;margin-left:20%;padding-bottom:30px; width:50%;height:300px;">
    <Carousel>
      <carousel-item v-for="(item,i) of list" :key="i" :bgColor="item.bgColor">
        <div style="height:300px;">
          <img :src="item.img">
        </div>
        <a slot="title" href="" style="color:#fff">{{item.title}}</a>
      </carousel-item>
    </Carousel>
  </p>
</div>
  </div>
</template>

<script>
export default {
  name: 'app',
  created(){
    let options={
      content:'这是提示信息0000',
      title:'标题标题121231',
      show:true,
      modal:true,
      btnList:this.btnList,
      
    }
    // this.$msg('这是提示信息1')
    //this.$msgbox(options)
  },
  computed:{
    classs(){
      return ['animated',this.in];
    }
  },
  watch:{
    show(val){
      if(val){
        this.in='fadeInRightBig';
      }else{
        this.in='bounceOutLeft';
      }
    }
  },
  data(){
    return {
      show:true,
      a:{},
      val:'aaaa',
      in:'fadeInRightBig',
      list:[
        {
          id:1,
          title:'这是第一张文章标题',
          bgColor:'#19be6b',
          img:'/src/assets/1.jpg',
        },
        {
          id:2,
          title:'黄色的色彩',
          bgColor:'#ff9900',
          img:'/src/assets/2.jpg',
        },
      ],
      btnList:[
        {
          item:111111111111,
          value:'取消',
          type:'info',
          callback:this.btnClick
        },
        {
          item:'222222222222222222222222222222222222',
          value:'确定',
          type:'info',
          callback:this.btnClick
        },

      ],
    }
  },
  methods:{
    btnClick(e,item){
      console.log(e,item);
    },
    close(e){
      this.show=false;
    },
    hover(){
      if(this.show){
        this.in='bounceOutLeft';
      }
      //this.show=!this.show;
    }
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

</style>
