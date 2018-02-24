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
      <Animates in="bounceInLeft" out="bounceOutRight" tag="p">
        <p v-show="show">asdasdasdasd</p>
      </Animates>
    </p>

    <p style="padding-top:50px;padding-bottom:30px;">
      <Input v-model="number" placeholder="默认值..." icon="manyi" iconColor="#f00" iconBefore="manyi" minWidth="200px" clearable readonly bgColor="#eee">这是开头：</Input> 
    </p>
    <p style="padding-top:50px;padding-bottom:30px;">
      {{selectVal}}
      <Select placeholder="请选择" v-model="selectVal">
        <Option value="擦艾丹123"></Option>
        <Option value="擦艾丹"></Option>
        <Option value="列表擦艾丹"></Option>
      </Select>
      <Select placeholder="请选择"  v-model="selectVal2" size="xs">
        <Option value="1" label="这是一、二、三"></Option>
        <Option value="2">四、五、六</Option>
        <Option value="3"></Option>
        <Option value="4"></Option>
        <Option value="5"></Option>
      </Select>
      {{selectVal2}}
    </p>
    <p style="padding-top:50px;padding-bottom:30px;">
      <Calendar time="2018-12-02" start="2018-11-02" @click="check"></Calendar>
    </p>
    <p style="padding-top:50px;padding-bottom:30px;">
      <Date placeholder="日期选择" v-model="dateVal"></Date>
    </p>
    <p style="padding-top:30px;">
      <input type="text" v-model="number" style="border:solid 1px #ccc;">{{animatedNumber}}
    </p>
    <p style="padding-top:30px;margin-left:20%;padding-bottom:30px; width:50%;height:300px;">
      <!-- 轮换图 -->
      <Carousel>
        <carousel-item v-for="(item,i) of list" :key="i" :bgColor="item.bgColor">
          <div style="height:300px;">
            <img :src="item.img">
          </div>
          <a slot="title" href="" style="color:#fff">{{item.title}}</a>
        </carousel-item>
      </Carousel>
    </p>

    <p style="width:50%; padding-top:50px;padding-bottom:30px; margin-left:20%;">
      <!-- Tabs 标签页 -->
      <Tabs :data="list" :keys="{item:'id',title:'bgColor',content:'title'}">
        <template slot-scope="props">
          <h1>{{props.val.id}}.{{props.val.bgColor}}</h1>
          <h6>{{props.val.title}}</h6>
          <h1>{{props.val.id}}.{{props.val.bgColor}}</h1>
          <h6>{{props.val.title}}</h6>
          <h1>{{props.val.id}}.{{props.val.bgColor}}</h1>
          <h6>{{props.val.title}}</h6>
          <h1>{{props.val.id}}.{{props.val.bgColor}}</h1>
          <h6>{{props.val.title}}</h6>
          <h1>{{props.val.id}}.{{props.val.bgColor}}</h1>
          <h6>{{props.val.title}}</h6>
          <h1>{{props.val.id}}.{{props.val.bgColor}}</h1>
          <h6>{{props.val.title}}</h6>
          <h1>{{props.val.id}}.{{props.val.bgColor}}</h1>
          <h6>{{props.val.title}}</h6>
        </template>
      </Tabs>
    </p>

    
  </div>
</template>

<script>
import mixins from './mixins'
export default {
  name: 'app',
  created(){
    // this.$msg('这是提示信息1')
    // this.$msgbox('这是提示信息0000','标题标题121231',this.btnList)
    //this.$msgbox('内容区域二22222222222222222222',)
    // let table = document.createElement("H1");
    // table.id = "table";
    // table.innerHTML='这是第一张文章标题';
    // this.$modal.open().then(ele=>{
    //    ele.appendChild(table)
    //    console.log(ele)
    // });
  },
  mixins:[mixins],
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
    },
    number(newValue, oldValue) {
      this.tween({tweeningNumber:oldValue},{tweeningNumber:newValue},rs=>{
        this.animatedNumber = rs.tweeningNumber.toFixed(0)
      });
    }
  },
  data(){
    return {
      show:true,
      a:{},
      selectVal:'擦艾丹123',
      selectVal2:'',
      dateVal:'2018-02-24',
      number:0,
      animatedNumber:0,
      val:'aaaa',
      in:'fadeInRightBig',
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
        {
          id:3,
          title:'黄色的色彩',
          bgColor:'#ff9900',
          img:'/src/assets/3.jpg',
        },
        {
          id:4,
          title:'黄色的色彩',
          bgColor:'#ff9900',
          img:'/src/assets/4.jpg',
        },
        {
          id:5,
          title:'黄色的色彩',
          bgColor:'#ff9900',
          img:'/src/assets/5.jpg',
        },
      ],
      
    }
  },
  methods:{
    check(val,val1){
      console.log(val,val1)
    },
    btnClick(e,item){
      console.log(e,item);
      this.$messagebox.close()
    },
    close(e){
      this.show=false;
    },
    hover(){
      if(this.show){
        this.in='bounceOutLeft';
      }
      this.show=!this.show;
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
