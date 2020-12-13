<template>
  <div class="home-page">

    <div class="banner">
      <div class="container">
        <h1 class="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">

        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li v-if="user" class="nav-item">
                <nuxt-link class="nav-link"
                           exact
                           :class="{active:tab==='you_feed'}"
                           :to="{name:'home',query:{tab:'you_feed'}}">Your Feed</nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link class="nav-link"
                           exact
                           :class="{active:tab==='global_feed'}"
                           :to="{name:'home',query:{tab:'global_feed'}}">Global Feed</nuxt-link>
              </li>
              <li v-if="tag" class="nav-item">
<!--                <nuxt-link class="nav-link" href="">{{tag}}</nuxt-link>-->

                <nuxt-link class="nav-link"
                           exact
                           :class="{active:tab==='tag'}"
                           :to="{name:'home',query:{tab:'tag',tag:tag}}">#{{tag}}</nuxt-link>
              </li>
            </ul>
          </div>

          <div class="article-preview"
               v-for="article in articles"
               :key="article.slug"
          >
            <div class="article-meta">
              <nuxt-link
                  :to="{
                  name:'profile',
                  params:{username:article.author.username}
                  }">
                <img :src="article.author.image" />
              </nuxt-link>
              <div class="info">
                <nuxt-link
                    :to="{
                  name:'profile',
                  params:{username:article.author.username}
                  }">
                  {{article.author.username}}
                </nuxt-link>
                <span class="date">{{article.createdAt | date  }}h</span>
              </div>
              <button class="btn btn-outline-primary btn-sm pull-xs-right"
                      :class="{active:article.favorited}"
                      @click="onFavorite(article)"
                      :disabled="article.favoriteDisabled"
              >
                <i class="ion-heart"></i> {{article.favoritesCount}}
              </button>
            </div>
            <nuxt-link :to="{name:'article', params:{slug:article.slug}}" class="preview-link">
              <h1>{{article.title}}</h1>
              <p>{{ article.description }}</p>
              <span>Read more...</span>
            </nuxt-link>
          </div>


        </div>

        <nav>
          <ul class="pagination">

            <!-- ngRepeat: pageNumber in $ctrl.pageRange($ctrl.totalPages) -->
            <li class="page-item"
                :class="{active: item === page}"
                v-for="item in totalPage"
                :key="item"
                >

            <nuxt-link class="page-link" :to="{name:'home',query:{page:item,tag:$route.query.tag}}">{{item}}</nuxt-link>

          </li>
            <!-- end ngRepeat: pageNumber in $ctrl.pageRange($ctrl.totalPages) -->
          </ul>
        </nav>

        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>

            <div class="tag-list">
              <nuxt-link v-for="tag in tags" :key="tag"
                  :to="{name:'home',query: {tab:'tag',tag}}" class="tag-pill tag-default">{{tag}}</nuxt-link>
            </div>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
import { getArticles, getTags,getFeedArticles,addFavorite,delFavorite } from '@/api/index'
import { mapState } from 'vuex'

export default {
name: "home",
  async asyncData({query,store}){
    const page = Number.parseInt(query.page||1)
    const limit = 20
    const { tag } =query
    const tab =query.tab||'global_feed'
    const loadArticles = store.state.user&&tab==='your_feed'? getFeedArticles:getArticles
    const [articleRes, tagRes] = await Promise.all([loadArticles({
      limit,
      offset:(page-1)* limit,
      tag
    }),getTags()])
    const {articles,articlesCount } = articleRes.data
    const { tags } = tagRes.data
    articles.forEach(article=>article.favoriteDisabled = false)
    return {
      articles ,
      articlesCount,
      tags,
      limit,
      page,
      tag,
      tab:query.tab||'global_feed'
    }
  },
  watchQuery:['page','tag','tab'],
  computed:{
    ...mapState(['user']),
    totalPage(){
      return Math.ceil(this.articlesCount/this.limit)
    }
  },
  methods:{
    async onFavorite(article){
      article.favoriteDisabled = true
      if(article.favorited){
        await delFavorite(article.slug)
        article.favorited =false
        article.favoritesCount+=-1
      }else {
        await addFavorite(article.slug)
        article.favorited =true
        article.favoritesCount+=1
      }
      article.favoriteDisabled = false
    }
  }
}
</script>

<style scoped>

</style>
