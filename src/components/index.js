import 'animate.css'; // https://daneden.github.io/animate.css/
import TWEEN from '@tweenjs/tween.js'; // https://github.com/tweenjs/tween.js/
import store from '@/store' // 父子组件通讯数据存贮
import * as Base from './base'
import Icon from './icon'
import {Button,BtnGroup} from './button'
import {Col,Row} from './layout'
import Modal from './modal'
import Message from './message'
import MessageBox from './message-box'
import Tag from './tag'
import Tabs from './tabs'
import {Carousel,CarouselItem} from './carousel'
import Tooltip from './tooltip'
import * as Form from './form'
import * as Dates from './date'
import Upload from './upload'


const components={
	...Base,
	Icon,
	Button,
	BtnGroup,
	Row,
	Col,
	Tag,
	Tabs,
	Carousel,
	CarouselItem,
	Tooltip,
	...Form,
	...Dates,
	Upload,
}

const install=function(Vue,options={}){
	if(install.installed)return;
	Object.keys(components).forEach(key=>{
        Vue.component(key, components[key]);
    })

	store.Instance(Vue);// 父子组件通讯数据存贮实例初始化

	const Messagebox=MessageBox.Instance(Vue);
    Vue.prototype.TWEEN=TWEEN;
    Vue.prototype.$modal=Modal.Instance(Vue);
    Vue.prototype.$msg=Message.Instance(Vue).setMsg;
    Vue.prototype.$messagebox=Messagebox;
    Vue.prototype.$msgbox=Messagebox.open;
}

if(typeof window !=='undefined'&&window.Vue){
    install(window.Vue)
}
export default{
	version:'1.0.0',
	install
}