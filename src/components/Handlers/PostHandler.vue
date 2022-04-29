<template>
  <pop-up :dialog="dialog" @close="close" :text="text">
    <v-card class="pa-8" color="secondary" light>
      <template v-slot>
        <h1>{{ text }} post</h1>
        <v-form class="mt-6">
          <v-text-field
            v-if="edit"
            :rules="textRules"
            v-model="post.title"
            label="post title"
            required
          ></v-text-field>
          <v-text-field
            v-if="edit"
            :rules="textRules"
            v-model="post.body"
            label="post body"
          ></v-text-field>
          <v-btn color="primary" @click="modifyPost" class="mt-6">submit</v-btn>
        </v-form></template
      >
    </v-card></pop-up
  >
</template>

<script>
import _ from "lodash";
import PopUp from "../generics/PopUp.vue";
export default {
  name: "PostHandler",
  components: { PopUp },
  props: { dialog: Boolean, text: String, current: Object, edit: Boolean },
  data() {
    return {
      editor: false,
      post: {},
      textRules: [(v) => !!v || "this field is required!"],
    };
  },
  methods: {
    close() {
      this.$emit("close");
    },
    modifyPost() {
      if (this.edit) {
        this.$store.dispatch("post/update", this.post);
      } else {
        this.$store.dispatch("post/destroy", this.post);
      }
      this.close();
    },
  },

  mounted() {
    this.post = _.cloneDeep(this.current);
  },
};
</script>

<style>
</style>