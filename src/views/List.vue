<template>

  <div class="list">
    <div class="listheader">
      <p class="list-title">{{ title }}</p>
      <!-- <p class="list-counter">total: {{ totalCardInList }}</p> -->
      <router-link 
                    :to="{ 
                      name: 'card_edit', 
                      params: {list_id: id},
                      }">
                    <v-icon  small class="deletelist mr-2">mdi-pencil</v-icon>
      </router-link>
      <div class="deletelist" @click="removeList(id)">×</div>
  
      
    </div>
    <!-- 子から親へ emit -->
    <!-- 親から子へ props -->
    <!-- <draggable group="cards" 
               :list="cards"
               @end="$emit('change')"
               :animation="200"> -->
      <!-- <card  
       /> -->
       <!-- v-for="(item, index) in cards"
          :body="item.body"
          :key="item.id"
          :cardIndex="index"
          :listIndex="listIndex" -->
      <!-- <card /> -->

     <!--  v-for="(i,index) in item" :key="i.id" :cards="i.cards" :listIndex="index" /> -->
      <!-- <card-add :listIndex="listIndex" /> -->
      <!-- <card-add :listId="id"/> -->
      
      <!-- <card-edit /> -->
      <!-- </draggable> -->
    
    
    </div>
  
  
</template>

<script>
//import CardEdit from './CardEdit.vue'
//import draggable from 'vuedraggable'
//import CardAdd from './CardAdd.vue'
//import Card from './Card.vue'

export default {
  components: {
    //CardEdit,
    //CardAdd,
    //Card,
    //draggable,
  },
  created() {
    //this.lists = this.$store.state.lists;
  },
  //propsには親コンポーネントから受け取るデータを定義できる
  //受け取ったデータはdataプロパティと同様にアクセスできる
  data() {
    return {
      //lists:[],
    }
    /* title: {
      type: String,
      required: true
    } *//* ,
    cards: {
      type: Array,
      required: true
    } */
   /*  listIndex: {
      type: Number,
      required: true
    } */
  },
  props: {
    id: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    listIndex: {
      type: Number,
      required: true
    },
  },
  computed: {
    /* totalCardInList() {
      return this.cards.length
    } */
  },
  methods: {
    removeList: function(id) {
      if(confirm('本当にリストを削除しますか?')){
        this.$store.dispatch('removeList', {id})
        //console.log('ok')
      }
    },
  }
}
</script>