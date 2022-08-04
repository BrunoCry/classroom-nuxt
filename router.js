import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const page = path => () => import(`~/pages/${path}`).then(m => m.default || m)

const routes = [
    { path: '/', name: 'home', component: page('index.vue') },
    { path: '/login', name: 'login', component: page('authentication/login.vue') },
    { path: '/registration', name: 'registration', component: page('authentication/registration.vue') },
    { path: '/recovery', name: 'recovery', component: page('authentication/recovery.vue') },
    { path: '/rooms', component: page('education/rooms/layout.vue'), children: [
        { path: '/', name: 'rooms.list', component: page('education/rooms/list.vue') },
        { path: 'create', name: 'rooms.create', component: page('education/rooms/create.vue') },
        { path: 'show/:id', name: 'rooms.show', component: page('education/rooms/room.vue') },
        { path: 'edit/:id', name: 'rooms.edit', component: page('education/rooms/edit.vue') },
        { path: 'join/:link', name: 'rooms.join', component: page('education/rooms/join.vue') },
        { path: 'add-post/:id', name: 'rooms.add.post', component: page('education/rooms/posts/create.vue') },
        { path: ':roomId/posts/:postId', component: page('education/rooms/layout.vue'), children: [
            { path: '', name: 'rooms.post.detail', component: page('education/rooms/posts/detail.vue') },
            { path: 'edit', name: 'rooms.post.update', component: page('education/rooms/posts/update.vue') },
        ] },
        { path: ':roomId/assignments', component: page('education/rooms/layout.vue'), children: [
            { path: '', name: 'rooms.assignments.list', component: page('education/rooms/assignments/list.vue') },
        ]},
    ] },
    { path: '/dialogs', component: page('education/dialogs/layout.vue'), children: [
        { path: '/', name: 'dialogs.list', component: page('education/dialogs/preview.vue') },
        { path: 'show/:id', name: 'dialogs.view', component: page('education/dialogs/dialog.vue') }
    ] },
    { path: '/profile', name: 'profile', component: page('profile/index.vue') }
]

export function createRouter () {
    return new Router({
        routes,
        mode: 'history'
    })
}