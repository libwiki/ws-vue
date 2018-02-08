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
        /**
         * 前置补 '0' 操作
         * @param  {Number|String} num|string 数值
         * @param  {Number} length 总长度
         * @param  {String} char   补值
         * @return {String}        
         */
        prefixInteger(num, length,char='0') {
            return(Array(length).join(char)+num).slice(-length);
        },
        /**
         * 获取日期信息的数组
         * @param  {String} val 默认为当前时间
         * @return {Array}     
         */
        getDate(val=Date.now()){
            let date=new Date(val),
            dayNums=[31,28,31,30,31,30,31,31,30,31,30,31],
            dateArray=[
                date.getFullYear(),//0. 年份(4位)
                this.prefixInteger(date.getMonth(),2),//1. 月份(0~11)
                this.prefixInteger(date.getDate(),2),//2. 1~31
                this.prefixInteger(date.getHours(),2),//3. 小时(0~23)
                this.prefixInteger(date.getMinutes(),2),//4. 分钟(0-59)
                this.prefixInteger(date.getSeconds(),2),//5. 秒数(0-59)
                date.getMilliseconds(),//6. 毫秒数(0-999)
                date.getTime(),//7. 总毫秒
                date.getDay(),//8. 星期(0~6)
            ];
            //9. 是否闰年
            if(dateArray[0]%4===0&&dateArray[0]%100!==0||dateArray[0]%400===0){
                dateArray.push(true);
            }else{
                dateArray.push(false);
            }
            //10. 当月天数
            if(dateArray[9]&&parseInt(dateArray[1])===1){
                dateArray.push(29);
            }else{
                dateArray.push(dayNums[parseInt(dateArray[1])]);
            }
            //11. 当月一号 星期数（0~6）
            let d;
            if(parseInt(dateArray[2])===1){
                d=dateArray;
            }else{
                d=this.getDate(parseInt(dateArray[0])+'-'+(parseInt(dateArray[1])+1)+'-1');
            }
            dateArray.push(d[8]);
            return dateArray;
        },
	},
}