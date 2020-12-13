exports.ids = [2];
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

/***/ 32:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./pages/home/index.vue?vue&type=template&id=8cfd48dc&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"home-page"},[_vm._ssrNode("<div class=\"banner\" data-v-8cfd48dc><div class=\"container\" data-v-8cfd48dc><h1 class=\"logo-font\" data-v-8cfd48dc>conduit</h1> <p data-v-8cfd48dc>A place to share your knowledge.</p></div></div> "),_vm._ssrNode("<div class=\"container page\" data-v-8cfd48dc>","</div>",[_vm._ssrNode("<div class=\"row\" data-v-8cfd48dc>","</div>",[_vm._ssrNode("<div class=\"col-md-9\" data-v-8cfd48dc>","</div>",[_vm._ssrNode("<div class=\"feed-toggle\" data-v-8cfd48dc>","</div>",[_vm._ssrNode("<ul class=\"nav nav-pills outline-active\" data-v-8cfd48dc>","</ul>",[(_vm.user)?_vm._ssrNode("<li class=\"nav-item\" data-v-8cfd48dc>","</li>",[_c('nuxt-link',{staticClass:"nav-link",class:{active:_vm.tab==='you_feed'},attrs:{"exact":"","to":{name:'home',query:{tab:'you_feed'}}}},[_vm._v("Your Feed")])],1):_vm._e(),_vm._ssrNode(" "),_vm._ssrNode("<li class=\"nav-item\" data-v-8cfd48dc>","</li>",[_c('nuxt-link',{staticClass:"nav-link",class:{active:_vm.tab==='global_feed'},attrs:{"exact":"","to":{name:'home',query:{tab:'global_feed'}}}},[_vm._v("Global Feed")])],1),_vm._ssrNode(" "),(_vm.tag)?_vm._ssrNode("<li class=\"nav-item\" data-v-8cfd48dc>","</li>",[_c('nuxt-link',{staticClass:"nav-link",class:{active:_vm.tab==='tag'},attrs:{"exact":"","to":{name:'home',query:{tab:'tag',tag:_vm.tag}}}},[_vm._v("#"+_vm._s(_vm.tag))])],1):_vm._e()],2)]),_vm._ssrNode(" "),_vm._l((_vm.articles),function(article){return _vm._ssrNode("<div class=\"article-preview\" data-v-8cfd48dc>","</div>",[_vm._ssrNode("<div class=\"article-meta\" data-v-8cfd48dc>","</div>",[_c('nuxt-link',{attrs:{"to":{
                  name:'profile',
                  params:{username:article.author.username}
                  }}},[_c('img',{attrs:{"src":article.author.image}})]),_vm._ssrNode(" "),_vm._ssrNode("<div class=\"info\" data-v-8cfd48dc>","</div>",[_c('nuxt-link',{attrs:{"to":{
                  name:'profile',
                  params:{username:article.author.username}
                  }}},[_vm._v("\n                  "+_vm._s(article.author.username)+"\n                ")]),_vm._ssrNode(" <span class=\"date\" data-v-8cfd48dc>"+_vm._ssrEscape(_vm._s(_vm._f("date")(article.createdAt))+"h")+"</span>")],2),_vm._ssrNode(" <button"+(_vm._ssrAttr("disabled",article.favoriteDisabled))+(_vm._ssrClass("btn btn-outline-primary btn-sm pull-xs-right",{active:article.favorited}))+" data-v-8cfd48dc><i class=\"ion-heart\" data-v-8cfd48dc></i>"+_vm._ssrEscape(" "+_vm._s(article.favoritesCount)+"\n              ")+"</button>")],2),_vm._ssrNode(" "),_c('nuxt-link',{staticClass:"preview-link",attrs:{"to":{name:'article', params:{slug:article.slug}}}},[_c('h1',[_vm._v(_vm._s(article.title))]),_vm._v(" "),_c('p',[_vm._v(_vm._s(article.description))]),_vm._v(" "),_c('span',[_vm._v("Read more...")])])],2)})],2),_vm._ssrNode(" "),_vm._ssrNode("<nav data-v-8cfd48dc>","</nav>",[_vm._ssrNode("<ul class=\"pagination\" data-v-8cfd48dc>","</ul>",_vm._l((_vm.totalPage),function(item){return _vm._ssrNode("<li"+(_vm._ssrClass("page-item",{active: item === _vm.page}))+" data-v-8cfd48dc>","</li>",[_c('nuxt-link',{staticClass:"page-link",attrs:{"to":{name:'home',query:{page:item,tag:_vm.$route.query.tag}}}},[_vm._v(_vm._s(item))])],1)}),0)]),_vm._ssrNode(" "),_vm._ssrNode("<div class=\"col-md-3\" data-v-8cfd48dc>","</div>",[_vm._ssrNode("<div class=\"sidebar\" data-v-8cfd48dc>","</div>",[_vm._ssrNode("<p data-v-8cfd48dc>Popular Tags</p> "),_vm._ssrNode("<div class=\"tag-list\" data-v-8cfd48dc>","</div>",_vm._l((_vm.tags),function(tag){return _c('nuxt-link',{key:tag,staticClass:"tag-pill tag-default",attrs:{"to":{name:'home',query: {tab:'tag',tag: tag}}}},[_vm._v(_vm._s(tag))])}),1)],2)])],2)])],2)}
var staticRenderFns = []


// CONCATENATED MODULE: ./pages/home/index.vue?vue&type=template&id=8cfd48dc&scoped=true&

// EXTERNAL MODULE: ./api/index.js
var api = __webpack_require__(28);

// EXTERNAL MODULE: external "vuex"
var external_vuex_ = __webpack_require__(2);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2-0!./node_modules/vue-loader/lib??vue-loader-options!./pages/home/index.vue?vue&type=script&lang=js&
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


/* harmony default export */ var homevue_type_script_lang_js_ = ({
  name: "home",

  async asyncData({
    query,
    store
  }) {
    const page = Number.parseInt(query.page || 1);
    const limit = 20;
    const {
      tag
    } = query;
    const tab = query.tab || 'global_feed';
    const loadArticles = store.state.user && tab === 'your_feed' ? api["f" /* getFeedArticles */] : api["d" /* getArticles */];
    const [articleRes, tagRes] = await Promise.all([loadArticles({
      limit,
      offset: (page - 1) * limit,
      tag
    }), Object(api["g" /* getTags */])()]);
    const {
      articles,
      articlesCount
    } = articleRes.data;
    const {
      tags
    } = tagRes.data;
    articles.forEach(article => article.favoriteDisabled = false);
    return {
      articles,
      articlesCount,
      tags,
      limit,
      page,
      tag,
      tab: query.tab || 'global_feed'
    };
  },

  watchQuery: ['page', 'tag', 'tab'],
  computed: { ...Object(external_vuex_["mapState"])(['user']),

    totalPage() {
      return Math.ceil(this.articlesCount / this.limit);
    }

  },
  methods: {
    async onFavorite(article) {
      article.favoriteDisabled = true;

      if (article.favorited) {
        await Object(api["b" /* delFavorite */])(article.slug);
        article.favorited = false;
        article.favoritesCount += -1;
      } else {
        await Object(api["a" /* addFavorite */])(article.slug);
        article.favorited = true;
        article.favoritesCount += 1;
      }

      article.favoriteDisabled = false;
    }

  }
});
// CONCATENATED MODULE: ./pages/home/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var pages_homevue_type_script_lang_js_ = (homevue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(1);

// CONCATENATED MODULE: ./pages/home/index.vue



function injectStyles (context) {
  
  
}

/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  pages_homevue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  injectStyles,
  "8cfd48dc",
  "73950de6"
  
)

/* harmony default export */ var home = __webpack_exports__["default"] = (component.exports);

/***/ })

};;
//# sourceMappingURL=2.js.map