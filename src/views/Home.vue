<template>
  <button @click="login">Googleアカウントでログイン</button>
</template>

<script>
import { mapActions } from "vuex";
export default {
  methods: {
    ...mapActions(["login"]),
  },
}
</script>