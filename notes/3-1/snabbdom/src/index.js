// import $ from 'jquery'
import {h, init} from 'snabbdom'
import './main.css'
// 导入模块
import style from 'snabbdom/modules/style'
import eventlisteners from 'snabbdom/modules/eventlisteners'

let patch = init([
    style,
    eventlisteners
])
let data = {
    selected: undefined,
    movies: [
        {rank: 1, title: 'This is an', desc: 'Lorem ipsum dolor sit amet, sed pede integer vitae bibendum, accumsan sit, vulputate aenean tempora ipsum. Lorem sed id et metus, eros posuere suspendisse nec nunc justo, fusce augue placerat nibh purus suspendisse. Aliquam aliquam, ut eget. Mollis a eget sed nibh tincidunt nec, mi integer, proin magna lacus iaculis tortor. Aliquam vel arcu arcu, vivamus a urna fames felis vel wisi, cursus tortor nec erat dignissim cras sem, mauris ac venenatis tellus elit.'},
        {rank: 2, title: 'example of', desc: 'Consequuntur ipsum nulla, consequat curabitur in magnis risus. Taciti mattis bibendum tellus nibh, at dui neque eget, odio pede ut, sapien pede, ipsum ut. Sagittis dui, sodales sem, praesent ipsum conubia eget lorem lobortis wisi.'},
        {rank: 3, title: 'Snabbdom', desc: 'Quam lorem aliquam fusce wisi, urna purus ipsum pharetra sed, at cras sodales enim vestibulum odio cras, luctus integer phasellus.'},
        {rank: 4, title: 'doing hero transitions', desc: 'Et orci hac ultrices id in. Diam ultrices luctus egestas, sem aliquam auctor molestie odio laoreet. Pede nam cubilia, diam vestibulum ornare natoque, aenean etiam fusce id, eget dictum blandit et mauris mauris. Metus amet ad, elit porttitor a aliquet commodo lacus, integer neque imperdiet augue laoreet, nonummy turpis lacus sed pulvinar condimentum platea. Wisi eleifend quis, tristique dictum, ac dictumst. Sem nec tristique vel vehicula fringilla, nibh eu et posuere mi rhoncus.'},
        {rank: 5, title: 'using the', desc: 'Pede nam cubilia, diam vestibulum ornare natoque, aenean etiam fusce id, eget dictum blandit et mauris mauris. Metus amet ad, elit porttitor a aliquet commodo lacus, integer neque imperdiet augue laoreet, nonummy turpis lacus sed pulvinar condimentum platea. Wisi eleifend quis, tristique dictum, ac dictumst. Sem nec tristique vel vehicula fringilla, nibh eu et posuere mi rhoncus.'},
        {rank: 6, title: 'module for hero transitions', desc: 'Sapien laoreet, ligula elit tortor nulla pellentesque, maecenas enim turpis, quae duis venenatis vivamus ultricies, nunc imperdiet sollicitudin ipsum malesuada. Ut sem. Wisi fusce nullam nibh enim. Nisl hymenaeos id sed sed in. Proin leo et, pulvinar nunc pede laoreet.'},
        {rank: 7, title: 'click on ar element in', desc: 'Accumsan quia, id nascetur dui et congue erat, id excepteur, primis ratione nec. At nulla et. Suspendisse lobortis, lobortis in tortor fringilla, duis adipiscing vestibulum voluptates sociosqu auctor.'},
        {rank: 8, title: 'the list', desc: 'Ante tellus egestas vel hymenaeos, ut viverra nibh ut, ipsum nibh donec donec dolor. Eros ridiculus vel egestas convallis ipsum, commodo ut venenatis nullam porta iaculis, suspendisse ante proin leo, felis risus etiam.'},
        {rank: 9, title: 'to witness', desc: 'Metus amet ad, elit porttitor a aliquet commodo lacus, integer neque imperdiet augue laoreet, nonummy turpis lacus sed pulvinar condimentum platea. Wisi eleifend quis, tristique dictum, ac dictumst.'},
        {rank: 10, title: 'the effect', desc: 'Et orci hac ultrices id in. Diam ultrices luctus egestas, sem aliquam auctor molestie odio laoreet. Pede nam cubilia, diam vestibulum ornare natoque, aenean etiam fusce id, eget dictum blandit et mauris mauris'},
    ]
};
let data1 =['Sort by:','Rank','Title','Description']
let app =document.querySelector('#app')
function setVnode(data){
    return  h('div#container',[
        h('h1','Top 10 movies'),
        h('div.top-head',[
            h('div.top-left', {},
                data1.map((i)=>h('div.top-one',{
                        on:{click:[oneFun,i]}
                    },i)
                )
            ),
            h('div.top-right',{on:{click:add}},'Add')
        ]),
        h('div.content',{},data.movies.map((i)=>h('div.col',{},[
            h('div.itemid',i.rank),
            h('div.itemtitle',i.title),
            h('div.item',i.desc),
            h('div.cha',{on:{click:[del,i]}},'x'),
        ])))

    ])
}
function render(oldVnode,newVnode) {
    return patch(oldVnode, newVnode)
}
let old = render(app,setVnode(data))
function oneFun(item) {
    let ms = data
    if(item ==='Title'){
        ms.movies.sort(((a, b) => a.title.toLowerCase().charCodeAt(0) - b.title.toLowerCase().charCodeAt(0)))
    }else if(item ==='Rank'){
        ms.movies.sort((a,b)=>a.rank-b.rank)
    }else {
        ms.movies.sort(((a, b) => a.desc.toLowerCase().charCodeAt(0) - b.desc.toLowerCase().charCodeAt(0)))
    }

    old = render(old,setVnode(ms))
}

function del(item) {
    let ms = data
    for (let i = 0; i <ms.movies.length ; i++) {
        if(ms.movies[i].rank===item.rank){
            ms.movies.splice(i,1)
            break
        }
    }
    old = render(old,setVnode(ms))
}
function add() {
    let ms = data
    let a = parseInt(Math.random()*10)
    for (let i = 0; i < ms.movies.length; i++) {
        if(a===i){
            ms.movies.push(ms.movies[i])
            break
        }
    }
    old = render(old,setVnode(ms))
}

