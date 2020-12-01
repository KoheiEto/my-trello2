<template>
  <!-- <v-app>
    <v-content> -->
      <div id="app">
    <!-- <v-toolbar-title>Mytrello</v-toolbar-title> -->
    <router-view />
    <!-- <board /> -->
    </div>
    
    <!-- </v-content>
  </v-app> -->
</template>

<script>
/* import Board from './components/Board.vue'; */
import { mapActions } from "vuex";
import firebase from 'firebase'
//import Board from './components/Board.vue'


export default {
  name: 'App',
  components: {
    //Board,
  },
  created () {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setLoginUser(user);
        this.fetchLists();
        //this.lists = this.$store.state.lists; 
         
        if(this.$router.currentRoute.name === "home") {
        this.$router.push({ name: 'board' }, () => {});
        }
      } else {
        this.deleteLoginUser()
        this.$router.push({ name: "home" }, () => {});
      }
    })
  },
  data: () => ({
    //
  }),
  methods: {
    ...mapActions([
      "fetchLists",
      "setLoginUser",
      "deleteLoginUser",
    ]),
  },
};
</script>
