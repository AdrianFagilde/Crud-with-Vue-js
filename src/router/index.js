import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from 'firebase'


Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    redirect: 'User-Login'
  },
  {
    path: '/',
    name: 'User-Login',
    component: () => import(/* webpackChunkName: "about" */ '../views/User-Login.vue')
  },
  {
    path: '/user-login',
    name: 'User-Login',
    component: () => import(/* webpackChunkName: "about" */ '../views/User-Login.vue')
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue'),
    meta: {
      permiso: true
    }
  },
  {
    path: '/lista-Tareas',
    name: 'Lista-Tareas',
    component: () => import(/* webpackChunkName: "about" */ '../views/Lista-Tareas.vue'),
    meta: {
      permiso: true
    }

  },


]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


 router.beforeEach((to, from, next) => {
  let correo = firebase.auth().currentUser;  
  console.log(correo)
  let autorizacion = to.matched.some(record => record.meta.permiso);
  if(autorizacion && !correo) {
    firebase.auth().onAuthStateChanged;

    next('User-Login')
  } else if (!autorizacion && correo){
    firebase.auth().onAuthStateChanged;

    next('Lista-Tareas')
  }else{
    firebase.auth().onAuthStateChanged;

    next()
  }
}) 

export default router
