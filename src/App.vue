<template>
  <div id="app">
    <Button value="primary" @click="btnClick"></Button>
    <Button type="default" value="default" icon="pifuzhuti"></Button>
    <Button type="info" value="info"></Button>
    <Button type="warm" value="暖色warm" icon="pifuzhuti"></Button>
    <Button type="danger" value="danger"></Button>
    <Button value="primary" size="lg"></Button>
    <Button value="" size="sm" icon="yonghu"></Button>
    <Button value="primary" size="xs"></Button>    

    <p style="padding-top:20px;">
      <BtnGroup>
        <Button value="primary" @click="btnClick"></Button>
        <Button type="default" value="default" icon="pifuzhuti"></Button>
        <Button type="info" value="info"></Button>
        <Button type="warm" value="暖色warm" icon="pifuzhuti"></Button>
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
      <BtnGroup>
        <Button type="default" size="lg" value="default" @click="btnClick"></Button>
        <Button type="default" size="lg" value="default" icon="pifuzhuti"></Button>
        <Button type="default" size="lg" value="info"></Button>
        <Button type="default" size="lg" value="暖色warm" icon="pifuzhuti"></Button>
        <Button type="default" size="lg" value="danger"></Button>
      </BtnGroup>
    </p>
    <Icon icon="manyi" size="100" color="#f40"/>
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
    <p style="height:30px;"></p>
    <Tag :checked="true">aaa</Tag>
    <Tag type="primary" hoverType="multi">这是标签</Tag>
    <Tag type="warm" hoverType="multi" color="#f00" bgColor="#f00">这是Warm标签</Tag>
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
      btnList:this.btnList
    }
    // this.$msg('这是提示信息1')
    //this.$msgbox(options)
  },
  data(){
    return {
      show:true,
      a:{},
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
