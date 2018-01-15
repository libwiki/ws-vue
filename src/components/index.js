import * as Base from './base'
import Icon from './icon'
import {Button,BtnGroup} from './button'
import {Col,Row} from './layout'
import Modal from './modal'
import Message from './message'
import MessageBox from './message-box'
import Test from './test'

const components={
	...Base,
	Icon,
	Button,
	BtnGroup,
	Row,
	Col,
	MsgBox:MessageBox,
	Test,
}
const install=function(Vue,options={}){
	if(install.installed)return;
	Object.keys(components).forEach(key => {
        Vue.component(key, components[key])
    })

    //Vue.prototype.$modal=Modal
    //Vue.prototype.$msg=Message.Instance().message
    //Vue.prototype.$msgbox=MessageBox.Instance().open

    const test=Vue.extend(Test)
    const TestInstance=new test()
    document.body.appendChild(TestInstance.$mount().$el)
    Vue.prototype.$Test=TestInstance
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