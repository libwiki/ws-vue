import 'animate.css'; // https://daneden.github.io/animate.css/
import TWEEN from '@tweenjs/tween.js'; // https://github.com/tweenjs/tween.js/
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
}

const install=function(Vue,options={}){
	if(install.installed)return;
	Object.keys(components).forEach(key => {
        Vue.component(key, components[key]);
    })

	const Messagebox=MessageBox.Instance(Vue)
    Vue.prototype.TWEEN=TWEEN;
    Vue.prototype.$modal=Modal.Instance(Vue);
    Vue.prototype.$msg=Message.Instance(Vue).setMsg;
    Vue.prototype.$messagebox=Messagebox;
    Vue.prototype.$msgbox=Messagebox.open;
}

if(typeof window !=='undefined'&&window.Vue){
    install(window.Vue)
}
const Api={
	version:'1.0.0',
	install,
	...components,
}

export default Api