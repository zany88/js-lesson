exports.ids = [3];
exports.modules = {

/***/ 28:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return login; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return register; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return getTags; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return getArticles; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return getFeedArticles; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return addFavorite; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return delFavorite; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return getArticle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return getComments; });
/* harmony import */ var _plugins_request__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);

const login = user => Object(_plugins_request__WEBPACK_IMPORTED_MODULE_0__[/* request */ "b"])({
  method: 'POST',
  url: '/api/users/login',
  data: {
    user
  }
});
const register = user => Object(_plugins_request__WEBPACK_IMPORTED_MODULE_0__[/* request */ "b"])({
  method: 'POST',
  url: '/api/users',
  data: {
    user
  }
});
const getTags = params => Object(_plugins_request__WEBPACK_IMPORTED_MODULE_0__[/* request */ "b"])({
  method: 'GET',
  url: '/api/tags'
});
const getArticles = params => Object(_plugins_request__WEBPACK_IMPORTED_MODULE_0__[/* request */ "b"])({
  method: 'GET',
  url: '/api/articles',
  params
});
const getFeedArticles = params => Object(_plugins_request__WEBPACK_IMPORTED_MODULE_0__[/* request */ "b"])({
  method: 'GET',
  url: '/api/articles/feed',
  params
});
const addFavorite = slug => Object(_plugins_request__WEBPACK_IMPORTED_MODULE_0__[/* request */ "b"])({
  method: 'POST',
  url: `/api/articles/${slug}/favorite`
});
const delFavorite = slug => Object(_plugins_request__WEBPACK_IMPORTED_MODULE_0__[/* request */ "b"])({
  method: 'DELETE',
  url: `/api/articles/${slug}/favorite`
});
const getArticle = slug => Object(_plugins_request__WEBPACK_IMPORTED_MODULE_0__[/* request */ "b"])({
  method: 'GET',
  url: `/api/articles/${slug}`
});
const getComments = slug => Object(_plugins_request__WEBPACK_IMPORTED_MODULE_0__[/* request */ "b"])({
  method: 'GET',
  url: `/api/articles/${slug}/comments`
});

/***/ }),

/***/ 30:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./pages/login/index.vue?vue&type=template&id=a23db9f4&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"auth-page"},[_vm._ssrNode("<div class=\"container page\" data-v-a23db9f4>","</div>",[_vm._ssrNode("<div class=\"row\" data-v-a23db9f4>","</div>",[_vm._ssrNode("<div class=\"col-md-6 offset-md-3 col-xs-12\" data-v-a23db9f4>","</div>",[_vm._ssrNode("<h1 class=\"text-xs-center\" data-v-a23db9f4>"+_vm._ssrEscape(_vm._s(_vm.isLogin?'Sign in':'Sign up'))+"</h1> "),_vm._ssrNode("<p class=\"text-xs-center\" data-v-a23db9f4>","</p>",[(_vm.isLogin)?_c('nuxt-link',{attrs:{"to":"/register"}},[_vm._v(" Need an account? ")]):_c('nuxt-link',{attrs:{"to":"/login"}},[_vm._v("Have an account?")])],1),_vm._ssrNode(" <ul class=\"error-messages\" data-v-a23db9f4>"+(_vm._ssrList((_vm.errors),function(messages,filed){return ((_vm._ssrList((messages),function(message,index){return ("<li data-v-a23db9f4>"+_vm._ssrEscape(_vm._s(message))+"</li>")})))}))+"</ul> <form data-v-a23db9f4>"+((!_vm.isLogin)?("<fieldset class=\"form-group\" data-v-a23db9f4><input type=\"text\" required=\"required\" placeholder=\"Your Name\""+(_vm._ssrAttr("value",(_vm.user.username)))+" class=\"form-control form-control-lg\" data-v-a23db9f4></fieldset>"):"<!---->")+" <fieldset class=\"form-group\" data-v-a23db9f4><input type=\"text\" required=\"required\" placeholder=\"Email\""+(_vm._ssrAttr("value",(_vm.user.email)))+" class=\"form-control form-control-lg\" data-v-a23db9f4></fieldset> <fieldset class=\"form-group\" data-v-a23db9f4><input type=\"password\" required=\"required\" placeholder=\"Password\""+(_vm._ssrAttr("value",(_vm.user.password)))+" class=\"form-control form-control-lg\" data-v-a23db9f4></fieldset> <button class=\"btn btn-lg btn-primary pull-xs-right\" data-v-a23db9f4>"+_vm._ssrEscape("\n            "+_vm._s(_vm.isLogin?'Sign in':'Sign up')+"\n          ")+"</button></form>")],2)])])])}
var staticRenderFns = []


// CONCATENATED MODULE: ./pages/login/index.vue?vue&type=template&id=a23db9f4&scoped=true&

// EXTERNAL MODULE: external "axios"
var external_axios_ = __webpack_require__(10);
var external_axios_default = /*#__PURE__*/__webpack_require__.n(external_axios_);

// EXTERNAL MODULE: external "js-cookie"
var external_js_cookie_ = __webpack_require__(26);
var external_js_cookie_default = /*#__PURE__*/__webpack_require__.n(external_js_cookie_);

// CONCATENATED MODULE: ./pages/utils/cookie.js

const tokenKey = 'token';
const getToken = () => external_js_cookie_default.a.get(tokenKey);
const setToken = token => external_js_cookie_default.a.set(tokenKey, token);
const removeToken = () => external_js_cookie_default.a.remove(tokenKey);
// CONCATENATED MODULE: ./pages/utils/request.js


const request = external_axios_default.a.create({
  baseURL: 'https://conduit.productionready.io'
});
/* harmony default export */ var utils_request = (request);
// EXTERNAL MODULE: ./api/index.js
var api = __webpack_require__(28);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2-0!./node_modules/vue-loader/lib??vue-loader-options!./pages/login/index.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

 // const Cookie = process.clinet ? require('js-cookie') : undefined

const Cookie =  false ? undefined : undefined;
/* harmony default export */ var loginvue_type_script_lang_js_ = ({
  middleware: ['notAuthenticated'],
  name: "login",
  computed: {
    isLogin() {
      return this.$route.name === 'login';
    }

  },

  data() {
    return {
      user: {
        email: '441680363@qq.com',
        password: 'zhoujp88',
        username: ''
      },
      errors: {}
    };
  },

  created() {
    console.log(Cookie);
  },

  methods: {
    async onSubmit() {
      try {
        const {
          data
        } = this.isLogin ? await Object(api["h" /* login */])(this.user) : await Object(api["i" /* register */])(this.user); // const  data  = this.isLogin?
        //     await login(this.user):
        //     await register(this.user)

        console.log(data);
        this.$store.commit('setUser', data.user);
        Cookie.set('user', data.user);
        this.$router.push('/');
      } catch (e) {
        this.errors = e.response.data.errors;
        console.log(e);
      }
    }

  }
});
// CONCATENATED MODULE: ./pages/login/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var pages_loginvue_type_script_lang_js_ = (loginvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(1);

// CONCATENATED MODULE: ./pages/login/index.vue



function injectStyles (context) {
  
  
}

/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  pages_loginvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  injectStyles,
  "a23db9f4",
  "11e88018"
  
)

/* harmony default export */ var login = __webpack_exports__["default"] = (component.exports);

/***/ })

};;
//# sourceMappingURL=3.js.map