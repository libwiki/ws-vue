/**
 * XMLHttpRequest 简单封装（主要用于上传组件）
 * @param  {string} url     请求路径（请带上前缀 例：http://）
 * @param  {Object} data    传输的数据 在该函数内会使用FormData进行二次处理（存在则自动使用post请求）
 * @param  {Object} options 一些配置项
 * @return {Promise}
 */
export default function(url,data={},options={}){
  return new Promise((resolve,reject)=>{
    const xhr=new XMLHttpRequest();
    const config=Object.assign({
      methods:'get',
      timeout:6000,
      headers:{
        //'Content-Type':'application/x-www-form-urlencoded',
      },
      onerror(e){
        console.log(e)
      },
      ontimeout(){},
      onprogress(){},
    },options);
    let dataKeys=Object.keys(data);
    if(dataKeys.length>0){
      config.methods='post';
      let formData=new FormData();
      dataKeys.forEach(key=>{
        formData.append(key,data[key])
      });
      data=formData;
    }
    xhr.open(config.methods,url);
    if(config.headers){
      Object.keys(config.headers).forEach(key=>{
        xhr.setRequestHeader(key,config.headers[key]);
      })
    }
    xhr.timeout=config.timeout;
    if(config.with){
      xhr.withCredentials=config.with;
    }
    xhr.onload=function(){
      if((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304){
        let rs=xhr.response||xhr.responseText;
        try {
          resolve(JSON.parse(rs));
        } catch (e) {
          resolve(rs);
        }
      }else{
        let msg='';
        if(xhr.response) {
          msg=xhr.response.error||xhr.response||xhr.responseText;
        }else{
          msg=`error: ${url}  status: ${xhr.status}`;
        }
        reject(msg)
      }
    }
    if(xhr.upload){
      xhr.upload.onprogress=e=>{
        if(e.total>0){
          e.percent=parseInt(e.loaded/e.total*100);
        }
        config.onprogress(e);
      }
    }
    xhr.onerror=config.onerror;
    xhr.ontimeout=config.ontimeout;
    try{
      xhr.send(data);
    }catch(e){
      reject(e)
    }
  })
}