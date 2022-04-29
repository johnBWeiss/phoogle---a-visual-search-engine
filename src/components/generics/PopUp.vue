<template>
  <v-dialog max-width="600px" :value="dialog" @click:outside="close">
    <v-card>
      <slot> </slot>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "PopUp",
  props: { dialog: Boolean, text: String },
  methods: {
    close() {
      this.$emit("close");
    },
  },
};
</script>

<style>
</style>