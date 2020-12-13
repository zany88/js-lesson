import { request } from "@/plugins/request";
export const login = user =>
    request({
        method: 'POST',
        url:'/api/users/login',
        data:{user}
    })

export const register = user =>
    request({
        method: 'POST',
        url:'/api/users',
        data:{user}
    })

export const getTags = params =>
    request({
        method: 'GET',
        url:'/api/tags',
    })

export const getArticles = params =>
    request({
        method: 'GET',
        url:'/api/articles',
        params
    })
export const getFeedArticles = params =>
    request({
        method: 'GET',
        url:'/api/articles/feed',
        params
    })

export const addFavorite = slug =>
    request({
        method: 'POST',
        url:`/api/articles/${slug}/favorite`,
    })
export const delFavorite = slug =>
    request({
        method: 'DELETE',
        url:`/api/articles/${slug}/favorite`,
    })
export const getArticle = slug =>
    request({
        method: 'GET',
        url:`/api/articles/${slug}`,
    })

export const getComments = slug =>
    request({
        method: 'GET',
        url:`/api/articles/${slug}/comments`,
    })


