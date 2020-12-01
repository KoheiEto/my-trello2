<template>
  <v-container text-xs-cemter>
    <v-col row wrap justify-cemter>

      <v-row xs12 class="text-center">
        <h1>リスト編集</h1>
      </v-row>
    
      <v-row xs12 mt-5>
        <v-card>
          <v-card-text>
            <v-form>
              <v-text-field v-model="list.title"></v-text-field>
              <div class="text-center">
                <v-btn @click="$router.push({ name:'board' })">戻る</v-btn>
                <v-btn class="ml-2" @click="submit">更新</v-btn>
              </div>
            </v-form>
          </v-card-text>
        </v-card>
      </v-row>

    </v-col>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  created() {
      if (!this.$route.params.list_id) 
      return
      const list = this.$store.getters.getAddressById(
        this.$route.params.list_id)
      if (list) {
        this.list = list
      } else {
        this.$router.push({ name: 'board' })
      }
  },
  data() {
    return {
      list: {},
    }
  },
  methods: {
    submit() {
    if (this.$route.params.list_id) {
      this.updateList({ id: this.$route.params.list_id, list: this.list });
    } else {
      this.addList(this.list)
    }
    this.$router.push({ name: 'board' });
    this.list = {}
    },
    ...mapActions(['addList', 'updateList'])
    },
  }
  
  /* methods: {
    submit () {
      if (this.$route.params.address_id) {
        this.updateAddress({ id: this.$route.params.address_id, address: this.address })
      } else {
        this.addAddress(this.address)
      }
      this.$router.push({ name: 'board' })
      this.address = {}
    },
    ...mapActions(['addAddress', 'updateAddress'])
  } */

</script>