import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const page = path => () => import(`~/pages/${path}`).then(m => m.default || m)

const routes = [
    { path: '/', name: 'home', component: page('index.vue'),  meta: { requiresAuth: false } },
    { path: '/login', name: 'login', component: page('authentication/login.vue'),  meta: { requiresAuth: false } },
    { path: '/registration', name: 'registration', component: page('authentication/registration.vue'),  meta: { requiresAuth: false } },
    { path: '/rooms', component: page('education/rooms/layout.vue'), children: [
        { path: '/', name: 'rooms.list', component: page('education/rooms/list.vue'),  meta: { requiresAuth: true } },
        { path: 'create', name: 'rooms.create', component: page('education/rooms/create.vue'),  meta: { requiresAuth: true } },
        { path: 'show/:id', name: 'rooms.show', component: page('education/rooms/room.vue'),  meta: { requiresAuth: true } },
        { path: 'edit/:id', name: 'rooms.edit', component: page('education/rooms/edit.vue'),  meta: { requiresAuth: true } },
        { path: 'join/:link', name: 'rooms.join', component: page('education/rooms/join.vue'),  meta: { requiresAuth: true } },
        { path: 'add-post/:id', name: 'rooms.add.post', component: page('education/rooms/posts/create.vue'),  meta: { requiresAuth: true } },
        { path: ':roomId/posts/:postId', component: page('education/rooms/layout.vue'), children: [
            { path: '', name: 'rooms.post.detail', component: page('education/rooms/posts/detail.vue'),  meta: { requiresAuth: true } },
            { path: 'edit', name: 'rooms.post.update', component: page('education/rooms/posts/update.vue'),  meta: { requiresAuth: true } },
        ] },
        { path: ':roomId/assignments/:postId', component: page('education/rooms/layout.vue'), children: [
            { path: '', name: 'rooms.assignments.list', component: page('education/rooms/assignments/list.vue'),  meta: { requiresAuth: true } },
        ]},
    ] },
    { path: '/dialogs', component: page('education/dialogs/layout.vue'), children: [
        { path: '/', name: 'dialogs.list', component: page('education/dialogs/preview.vue'),  meta: { requiresAuth: true } },
        { path: 'show/:id', name: 'dialogs.view', component: page('education/dialogs/dialog.vue'),  meta: { requiresAuth: true } }
    ] },
    { path: '/profile', name: 'profile', component: page('profile/index.vue'),  meta: { requiresAuth: true } }
]

export function createRouter () {
    return new Router({
        routes,
        mode: 'history'
    })
}