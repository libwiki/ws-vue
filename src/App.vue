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
    <!-- <msg-box :show="true" :modal="true" @close="close">
      <p>
        <h1>这是内容2</h1>
        <h2>这是内容2</h2>
        <h3>这是内容2</h3>
        <h4>这是内容2</h4>
      </p>
    </msg-box> -->
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
      modal:true
    }
    //this.$msg('这是提示信息1')
    //this.$msgbox.open(options)
    //this.$modal.open()
  },
  data(){
    return {
      show:true,
      a:{},
      btnList:[
        {
          value:'确定',
          type:'info',
          callback:this.callback
        }
      ],
    }
  },
  methods:{
    btnClick(e){
      console.log(e);
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
