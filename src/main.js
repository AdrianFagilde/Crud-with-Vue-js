import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import firebase from 'firebase/app';
import 'firebase/firestore';



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDXvy8jAVJZwRc8nHBtNhLyS4EzCA9zOgk",
  authDomain: "crud-with-vue-js.firebaseapp.com",
  projectId: "crud-with-vue-js",
  storageBucket: "crud-with-vue-js.appspot.com",
  messagingSenderId: "993746303624",
  appId: "1:993746303624:web:895e803e64f1ac2a5f3d3d"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


export const db = firebase.firestore();


Vue.config.productionTip = false

firebase.auth().onAuthStateChanged(function(user){
  new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
  
})


