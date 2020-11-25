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
        <draggable class="list-index"
                   @end="movingList"
                   :list="lists">
          <list v-for="(item, index) in lists"
              :key="item.id"
              :title="item.title"
              :cards="item.cards"
              :listIndex="index"
              @change="movingCard"
          />
          <list-add />
        </draggable>
        
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
import List from './List'
import { mapGetters, mapState } from 'vuex'
import { mapActions } from "vuex";
import firebase from 'firebase'
//import VModal from 'vue-js-modal'


export default {
  components: {
    ListAdd,
    List,
    draggable,
  },
  created () {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setLoginUser(user)
      } else {
        this.deleteLoginUser()
      }
    })
  },
  computed: {
    ...mapGetters([
      "userName", "photoURL"]),
    ...mapState([
      'lists',
    ]),
    totalCardCount() {
      return this.$store.getters.totalCardCount
    },
  },
  methods: {
    show() {
      this.$modal.show("user-modal")
    },
    hide() {
      this.$modal.hide("user-modal")
    },
    showModal() {
      this.$modal.show('user-modal');
    },
    ...mapActions(["login", "logout", "setLoginUser", "deleteLoginUser"]),
  },
}

</script>
