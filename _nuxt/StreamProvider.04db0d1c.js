function o(a){let e,t=a[0],s=1;for(;s<a.length;){const n=a[s],r=a[s+1];if(s+=2,(n==="optionalAccess"||n==="optionalCall")&&t==null)return;n==="access"||n==="optionalAccess"?(e=t,t=r(t)):(n==="call"||n==="optionalCall")&&(t=r((...c)=>t.call(e,...c)),e=void 0)}return t}const l={UNKNOWN:2,DEADLINE_EXCEEDED:4},u=10;class i{__init(){this.reconnectCount={}}constructor(){i.prototype.__init.call(this),this.streamManager=new Map}subscribe({fn:e,key:t,args:s}){if(this.streamManager.has(t))return;const n={...s,onEndCallback:c=>{this.reconnectOnTimeout(t,c)},onStatusCallback:c=>{Object.values(l).includes(c.code)&&this.reconnect(t)}},r=e(n);this.streamManager.set(t,{stream:r,fn:e,args:n})}cancel(e){this.exists(e)&&(o([this,"access",t=>t.streamManager,"access",t=>t.get,"call",t=>t(e),"optionalAccess",t=>t.stream,"access",t=>t.unsubscribe,"call",t=>t()]),this.streamManager.delete(e))}reconnect(e){if(!this.exists(e))return;const{fn:t,args:s}=this.streamManager.get(e),n=t(s);this.streamManager.set(e,{stream:n,fn:t,args:s})}exists(e){return this.streamManager.has(e)}getReconnectCount(e){return this.reconnectCount[e]||0}incrementReconnectCount(e){return this.reconnectCount[e]=(this.reconnectCount[e]||0)+1}reconnectOnTimeout(e,t){this.getReconnectCount(e)<=u?setTimeout(()=>{this.reconnect(e),this.incrementReconnectCount(e)},1e3):t&&console.error(JSON.stringify({status:t}))}}const h=new i;export{h as s};
