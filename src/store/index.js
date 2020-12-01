import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    login_user: null,
    lists: [
      /* {
        title: 'Backlog',
        cards: [
          { body: 'English' },
          { body: 'Mathematics' },
        ]
      },
      {
        title: 'Todo',
        cards: [
          { body: 'Science' }
        ]
      },
      {
        title: 'Doing',
        cards: []
      } */
    ],
  },
  mutations: {
    //ログイン・ログアウト
    setLoginUser (state, user) {
      state.login_user = user
    },
    deleteLoginUser (state) {
      state.login_user = null
    },
    //リスト
    addList (state, { id, list }) {
      /* state.lists.push({ title: payload.title, cards: [] }) */
      list.id = id;
      state.lists.push(list);
    },
    removeList(state, {id}) {
      const index = state.lists.findIndex(list => list.id === id)
      state.lists.splice(index, 1)
    },
    updateList(state, {id, list}) {
      const index = state.lists.findIndex((list) => list.id === id);
      state.lists[index] = list;
      //console.log(list);
    },
    //カード
    addCardToList(state, cards) {
      state.lists[cards.titleId].cards.push({ body: cards.cardBody })
    },
    /* addCardToList(state, id, cardId, body) {
      state.lists[id.listIndex].cards.push({ body: body.body })
    }, */
    removeCardFromList(state, payload) {
      state.lists[payload.listIndex].cards.splice(payload.cardIndex, 1)
    },
  },
  actions: {
    //ログイン・ログアウト
    setLoginUser({ commit }, user) {
      commit('setLoginUser', user)
    },
    deleteLoginUser({commit }) {
      commit('deleteLoginUser')
    },
    //firebaseのgoogleログイン・ログアウト
    login() {
      const google_auth_provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithRedirect(google_auth_provider)
    },
    logout() {
      firebase.auth().signOut()
    },
    //firestoreからデータ取得(リスト)
    fetchLists ({getters, commit }) {
        firebase
          .firestore()
          .collection(`users/${getters.uid}/addresses`)
          .get()
          .then(snapshot => {

            snapshot.forEach(doc =>
               commit('addList', { id: doc.id, list: doc.data() }))
       })
    },
    //firesyoreにデータ追加(リスト)
    addList({ getters, commit }, list) {
      if (getters.uid) {
        firebase
          .firestore()
          .collection(`users/${getters.uid}/addresses`)
          .add(list)
          .then((doc) => {
            commit("addList", { id: doc.id, list });
          });
      }
    },
    //firestoreのデータ削除(リスト)
    removeList ({getters,commit}, {id}) {
      if(getters.uid) {
        firebase
        .firestore()
        .collection(`users/${getters.uid}/addresses`)
        .doc(id)
        .delete()
        .then(() => {
          commit('removeList', {id})
        })
      }
    },
    //firestoreからデータ取得(カード)
    fetchCards ({getters, commit}) {
      firebase()
        .firestore
        .collection(`users/${getters.uid}/addresses/${getters}`)
        .get()
          .then(snapshot => {

            snapshot.forEach(doc =>
               commit('addList', { id: doc.id, list: doc.data() }))
       })
    },
    //firesyoreにデータ追加(カード)
    addCardToList({ getters, commit }, { id, body }) {
      if (getters.uid) {
        firebase
          .firestore()
          .collection(`users/${getters.uid}/addresses/${id}`)
          .add(body)
          .then((doc) => {
            const cards = 'titleId:' + doc.id +',cardId:' + id + ',cardBody:' + body 
            commit("addCardToList", { cards });
          });
      }
    },
    /* addCardToList(context, payload) {
      context.commit('addCardToList', payload)
    }, */
    removeCardFromList(context, payload) {
      context.commit('removeCardFromList', payload)
    },
    /* updateList(context, payload) {
      context.commit('updateList', payload)
    }, */
    //更新
    updateList({getters, commit}, {id, list}) {
    if(getters.uid) {
      firebase
        .firestore()
        .collection(`users/${getters.uid}/addresses`)
        .doc(id)
        .update(list)
        .then(() => {
          commit("updateList", {id, list});
        });
    }
   },
  },
  getters: {
    totalCardCount(state) {
      let count = 0
      //state.lists.map(lists => count += lists.length)
      count = state.lists.length
      return count
    },
    userName: state => state.login_user ? state.login_user.displayName :'',
    photoURL: state => state.login_user ? state.login_user.photoURL :'',
    uid: (state) => (state.login_user ? state.login_user.uid : null),
    getAddressById: (state) => (id) =>
      state.lists.find((list) => list.id === id),
  }
})
