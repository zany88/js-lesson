/*! For license information please see LICENSES */
(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{182:function(e,t,r){"use strict";r.d(t,"h",(function(){return o})),r.d(t,"i",(function(){return c})),r.d(t,"g",(function(){return l})),r.d(t,"d",(function(){return d})),r.d(t,"f",(function(){return f})),r.d(t,"a",(function(){return m})),r.d(t,"b",(function(){return v})),r.d(t,"c",(function(){return h})),r.d(t,"e",(function(){return w}));var n=r(61),o=function(e){return Object(n.b)({method:"POST",url:"/api/users/login",data:{user:e}})},c=function(e){return Object(n.b)({method:"POST",url:"/api/users",data:{user:e}})},l=function(e){return Object(n.b)({method:"GET",url:"/api/tags"})},d=function(e){return Object(n.b)({method:"GET",url:"/api/articles",params:e})},f=function(e){return Object(n.b)({method:"GET",url:"/api/articles/feed",params:e})},m=function(e){return Object(n.b)({method:"POST",url:"/api/articles/".concat(e,"/favorite")})},v=function(e){return Object(n.b)({method:"DELETE",url:"/api/articles/".concat(e,"/favorite")})},h=function(e){return Object(n.b)({method:"GET",url:"/api/articles/".concat(e)})},w=function(e){return Object(n.b)({method:"GET",url:"/api/articles/".concat(e,"/comments")})}},188:function(e,t,r){var n,o;!function(c){if(void 0===(o="function"==typeof(n=c)?n.call(t,r,t,e):n)||(e.exports=o),!0,e.exports=c(),!!0){var l=window.Cookies,d=window.Cookies=c();d.noConflict=function(){return window.Cookies=l,d}}}((function(){function e(){for(var i=0,e={};i<arguments.length;i++){var t=arguments[i];for(var r in t)e[r]=t[r]}return e}function t(s){return s.replace(/(%[0-9A-Z]{2})+/g,decodeURIComponent)}return function r(n){function o(){}function c(t,r,c){if("undefined"!=typeof document){"number"==typeof(c=e({path:"/"},o.defaults,c)).expires&&(c.expires=new Date(1*new Date+864e5*c.expires)),c.expires=c.expires?c.expires.toUTCString():"";try{var l=JSON.stringify(r);/^[\{\[]/.test(l)&&(r=l)}catch(e){}r=n.write?n.write(r,t):encodeURIComponent(String(r)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g,decodeURIComponent),t=encodeURIComponent(String(t)).replace(/%(23|24|26|2B|5E|60|7C)/g,decodeURIComponent).replace(/[\(\)]/g,escape);var d="";for(var f in c)c[f]&&(d+="; "+f,!0!==c[f]&&(d+="="+c[f].split(";")[0]));return document.cookie=t+"="+r+d}}function l(e,r){if("undefined"!=typeof document){for(var o={},c=document.cookie?document.cookie.split("; "):[],i=0;i<c.length;i++){var l=c[i].split("="),d=l.slice(1).join("=");r||'"'!==d.charAt(0)||(d=d.slice(1,-1));try{var f=t(l[0]);if(d=(n.read||n)(d,f)||t(d),r)try{d=JSON.parse(d)}catch(e){}if(o[f]=d,e===f)break}catch(e){}}return e?o[e]:o}}return o.set=c,o.get=function(e){return l(e,!1)},o.getJSON=function(e){return l(e,!0)},o.remove=function(t,r){c(t,"",e(r,{expires:-1}))},o.defaults={},o.withConverter=r,o}((function(){}))}))},257:function(e,t,r){"use strict";r.r(t);r(30);var n=r(3),o=(r(33),r(102)),c=r.n(o),l=(r(188),c.a.create({baseURL:"https://conduit.productionready.io"}),r(182)),d=r(188),f={middleware:["notAuthenticated"],name:"login",computed:{isLogin:function(){return"login"===this.$route.name}},data:function(){return{user:{email:"441680363@qq.com",password:"zhoujp88",username:""},errors:{}}},created:function(){console.log(d)},methods:{onSubmit:function(){var e=this;return Object(n.a)(regeneratorRuntime.mark((function t(){var r,data;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(t.prev=0,!e.isLogin){t.next=7;break}return t.next=4,Object(l.h)(e.user);case 4:t.t0=t.sent,t.next=10;break;case 7:return t.next=9,Object(l.i)(e.user);case 9:t.t0=t.sent;case 10:r=t.t0,data=r.data,console.log(data),e.$store.commit("setUser",data.user),d.set("user",data.user),e.$router.push("/"),t.next=22;break;case 18:t.prev=18,t.t1=t.catch(0),e.errors=t.t1.response.data.errors,console.log(t.t1);case 22:case"end":return t.stop()}}),t,null,[[0,18]])})))()}}},m=r(22),component=Object(m.a)(f,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"auth-page"},[r("div",{staticClass:"container page"},[r("div",{staticClass:"row"},[r("div",{staticClass:"col-md-6 offset-md-3 col-xs-12"},[r("h1",{staticClass:"text-xs-center"},[e._v(e._s(e.isLogin?"Sign in":"Sign up"))]),e._v(" "),r("p",{staticClass:"text-xs-center"},[e.isLogin?r("nuxt-link",{attrs:{to:"/register"}},[e._v(" Need an account? ")]):r("nuxt-link",{attrs:{to:"/login"}},[e._v("Have an account?")])],1),e._v(" "),r("ul",{staticClass:"error-messages"},[e._l(e.errors,(function(t,n){return e._l(t,(function(t,n){return r("li",{key:n},[e._v(e._s(t))])}))}))],2),e._v(" "),r("form",{on:{submit:function(t){return t.preventDefault(),e.onSubmit(t)}}},[e.isLogin?e._e():r("fieldset",{staticClass:"form-group"},[r("input",{directives:[{name:"model",rawName:"v-model",value:e.user.username,expression:"user.username"}],staticClass:"form-control form-control-lg",attrs:{type:"text",required:"",placeholder:"Your Name"},domProps:{value:e.user.username},on:{input:function(t){t.target.composing||e.$set(e.user,"username",t.target.value)}}})]),e._v(" "),r("fieldset",{staticClass:"form-group"},[r("input",{directives:[{name:"model",rawName:"v-model",value:e.user.email,expression:"user.email"}],staticClass:"form-control form-control-lg",attrs:{type:"text",required:"",placeholder:"Email"},domProps:{value:e.user.email},on:{input:function(t){t.target.composing||e.$set(e.user,"email",t.target.value)}}})]),e._v(" "),r("fieldset",{staticClass:"form-group"},[r("input",{directives:[{name:"model",rawName:"v-model",value:e.user.password,expression:"user.password"}],staticClass:"form-control form-control-lg",attrs:{type:"password",required:"",placeholder:"Password"},domProps:{value:e.user.password},on:{input:function(t){t.target.composing||e.$set(e.user,"password",t.target.value)}}})]),e._v(" "),r("button",{staticClass:"btn btn-lg btn-primary pull-xs-right"},[e._v("\n            "+e._s(e.isLogin?"Sign in":"Sign up")+"\n          ")])])])])])])}),[],!1,null,"a23db9f4",null);t.default=component.exports}}]);