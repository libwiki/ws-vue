import Icon from './icon'
import {Button,BtnGroup} from './button'
import {Col,Row} from './layout'
import Modal from './modal'
import Message from './message'
import * as Base from './base'

const components={
	Icon,
	Button,
	BtnGroup,
	Row,
	Col,
	//Modal,
	...Base,
}
const install=function(vue,options={}){
	if(install.installed)return;
	Object.keys(components).forEach(key => {
        vue.component(key, components[key])
    })

    vue.prototype.$modal=Modal.Instance()
    vue.prototype.$msg=Message.Instance().message
}

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
}
const api={
	version:'1.0.0',
	install,
	...components,
}
export default api