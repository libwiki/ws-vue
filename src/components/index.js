import * as Base from './base'
import Icon from './icon'
import {Button,BtnGroup} from './button'
import {Col,Row} from './layout'
import Modal from './modal'
import Message from './message'
import MessageBox from './message-box'


const components={
	...Base,
	Icon,
	Button,
	BtnGroup,
	Row,
	Col,
	MsgBox:MessageBox,
}
const install=function(vue,options={}){
	if(install.installed)return;
	Object.keys(components).forEach(key => {
        vue.component(key, components[key])
    })

    vue.prototype.$modal=Modal
    vue.prototype.$msg=Message.Instance().message
    vue.prototype.$msgbox=MessageBox.Instance().open
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