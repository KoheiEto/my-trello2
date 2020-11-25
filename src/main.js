import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import './assets/styles.css'
import firebase from 'firebase'


Vue.config.productionTip = false

 // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyC-bZYQ9KGM6_7cMuG2CN__AsMte9xN17Y",
    authDomain: "my-trello-ebc8d.firebaseapp.com",
    databaseURL: "https://my-trello-ebc8d.firebaseio.com",
    projectId: "my-trello-ebc8d",
    storageBucket: "my-trello-ebc8d.appspot.com",
    messagingSenderId: "287712411722",
    appId: "1:287712411722:web:2d5d371c970ab2fdd0a6b3",
    measurementId: "G-2RNKWNPHJV"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

