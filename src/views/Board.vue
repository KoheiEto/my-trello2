<template>
  <div>
    
    <header>
      my Trello
    </header>
    
    <button @click="login">Googleアカウントでログイン</button>
    <div>
      <button @click="logout">ログアウト</button>
    </div>
    <div>
      <img v-if="photoURL" :src="photoURL" />
      {{ userName }}
    </div>
    
      <main>

        <p class="info-line">All: {{ totalCardCount }} tasks</p>
        
          <draggable :animation="200">
          
            <List v-for="(item, index) in lists" :key="item.id" :title="item.title" :id="item.id"
              :listIndex="index"
             />

             <!-- v-for="(item, index) in lists" :key="item.id" :title="item.title"
              :list-index="index" -->
          
          <!-- :cards="item.cards" -->
          <!-- @change="movingCard" -->
          </draggable>

        <ListAdd />
        
      </main>

      <!-- <button @click="editCard">更新</button> -->

      <!-- <button @click="show">更新</button>
      <modal name="user-modal">
        <h2>ユーザ登録</h2>
      </modal> -->
      
      
        <!-- <v-dialog>lll</v-dialog> -->
      
      

  </div>
  
</template>

<script>
import draggable from 'vuedraggable'
import ListAdd from './ListAdd.vue'
import List from './List.vue'
import { mapGetters, /* mapState */ } from 'vuex'
import { mapActions } from "vuex";
//import firebase from 'firebase'
//import VModal from 'vue-js-modal'


export default {
  created () {
    //await this.showAddresses();
    //this.fetchLists();
    this.lists = this.$store.state.lists;
  },
  data () {
    return {
     lists: [], 
    }
  },
  components: {
    ListAdd,
    List,
    draggable,
  },

  /* created () {
     firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setLoginUser(user)
        this.fetchLists()
        this.lists = this.$store.state.lists;
      } else {
        this.deleteLoginUser()
      }
    }) }, */
    // var user = firebase.auth().currentUser;
    //if (user) {
      //this.setLoginUser(user)
    //} else {
      //this.deleteLoginUser()
    //} 
  //},
  computed: {
    ...mapGetters([
      "userName", "photoURL"]),
    /* ...mapState([
      'lists',
    ]), */
    totalCardCount() {
      return this.$store.getters.totalCardCount
    },
  },
  methods: {

    ...mapActions(["login", "logout", "setLoginUser", "deleteLoginUser", "fetchLists"]),
  },
}

</script>
