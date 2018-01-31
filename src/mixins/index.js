export default {
	methods:{
		/**
		 * 计算一段文字所占内容宽度（通常英文字符占一个位置，中文占两个位置）
		 * 实现input随内容增加自动增长等
		 * @param  {Stting} val           字符串
		 * @param  {Number} defaultLength 默认长度 input text最短距离为5个字符位置 其余可设 0
		 * @return {Number}               长度 至少为1
		 */
		getCharLength(val,defaultLength=5){
            let len=val.length,pattern = /[^\x00-\x80]/g,length=0,count=0;
            if(len<=0||typeof val !=='string')return 1;
            for (let i = 0; i <= len; i++) {
            	if(pattern.test(val)||val==='%'||val==='@'){//占位两字符
                    length+=2;
                }else{
                	count++;
                	length++;
                }
            }
            if(count===0){
            	length+=2;
            }else if(count===1){
            	length++;
            }
            let rs=length>defaultLength?length-defaultLength:1;
            return rs;
		},
        /**
         * 状态渐变(数值) 依赖于Tween.js https://github.com/tweenjs/tween.js/
         * @param  {Object}   oldObject 初始对象
         * @param  {Object}   newObject 结果对象
         * @param  {Function} callback  回调函数
         * @param  {Number}   duration  持续时间
         * @param  {Function} type      动画公式
         * @return {void}             
         */
        tween(oldObject,newObject,callback,duration=800,type=this.TWEEN.Easing.Quadratic.Out){
            const TWEEN=this.TWEEN;
            function animate(){
                if(TWEEN.update()){
                    requestAnimationFrame(animate)
                }
            }
            //Linear, Quadratic, Cubic, Quartic, Quintic, Sinusoidal, Exponential, Circular, Elastic, Back and Bounce
            new TWEEN.Tween(oldObject)
                .easing(type)
                .to(newObject, duration)
                .onUpdate(function(rs){
                    if(typeof callback === 'function')callback(rs);
                }).start();
            animate();
        },
	},
}