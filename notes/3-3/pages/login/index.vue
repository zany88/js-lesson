<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">

        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">{{ isLogin?'Sign in':'Sign up' }}</h1>
          <p class="text-xs-center">
            <nuxt-link v-if="isLogin" to="/register"> Need an account? </nuxt-link>
            <nuxt-link v-else to="/login">Have an account?</nuxt-link>
          </p>

          <ul class="error-messages">
            <template v-for="(messages,filed) in errors" >
              <li
                  v-for="(message,index) in messages"
                  :key="index">{{message}}</li>
            </template>
          </ul>

          <form @submit.prevent="onSubmit">
            <fieldset class="form-group" v-if="!isLogin">
              <input v-model="user.username" class="form-control form-control-lg" type="text"
                     required
                     placeholder="Your Name">
            </fieldset>

            <fieldset class="form-group">
              <input v-model="user.email" class="form-control form-control-lg" type="text"
                     required
                     placeholder="Email">
            </fieldset>

            <fieldset class="form-group">
              <input v-model="user.password" class="form-control form-control-lg" type="password"
                     required
                     placeholder="Password">
            </fieldset>

            <button class="btn btn-lg btn-primary pull-xs-right" >
              {{ isLogin?'Sign in':'Sign up' }}
            </button>
          </form>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import request from '../utils/request'
import { login, register} from '@/api/index'
// const Cookie = process.clinet ? require('js-cookie') : undefined
const Cookie = process.client ? require('js-cookie') : undefined

export default {
  middleware:['notAuthenticated'],
  name: "login",
  computed:{
    isLogin(){
      return this.$route.name==='login'
    }
  },
  data(){
    return {
      user:{
        email:'441680363@qq.com',
        password:'zhoujp88',
        username:'',
      },
      errors:{}
    }
  },
  created() {
    console.log(Cookie)
  },
  methods:{
    async onSubmit(){
      try {
        const { data } = this.isLogin?
            await login(this.user):
            await register(this.user)

        // const  data  = this.isLogin?
        //     await login(this.user):
        //     await register(this.user)
        console.log(data)
        this.$store.commit('setUser',data.user)
        Cookie.set('user',data.user)
        this.$router.push('/')
      }catch (e){
        this.errors = e.response.data.errors
        console.log(e)
      }

    }
  }
}
</script>

<style scoped>

</style>
