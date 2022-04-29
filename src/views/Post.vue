<template>
  <v-container align-center fill-height mt-2 mb-2>
    <v-spacer></v-spacer>
    <v-data-table light :headers="headers" :items="posts" :items-per-page="5" :search="search"
      :sort-by="['title', 'body']" :sort-desc="[false, true]" multi-sort class="elevation-1">
      <template v-slot:top>
        <v-text-field v-model="search" label="search" class="mx-4"></v-text-field>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <div class="d-flex justify-space-between">
          <v-icon @click="deleteItem(item)">mdi-delete</v-icon>
          <v-icon @click="editItem(item)">mdi-pencil</v-icon>
        </div>
      </template>
    </v-data-table>
    <v-spacer></v-spacer>
    <post-handler v-if="edit" @close="edit = false" :dialog="edit" :edit="edit" text="edit" :current="current" />
    <post-handler v-if="deleter" @close="deleter = false" :dialog="deleter" text="delete" :current="current" />
  </v-container>
</template>

<script>
import PostHandler from "@/components/Handlers/PostHandler.vue";

export default {
  name: "postY",
  components: { PostHandler },
  data() {
    return {
      search: "",
      edit: false,
      deleter: false,
      posts: [],
      current: {},
      headers: [
        { text: "body", value: "body" },
        { text: "id", value: "id" },
        { text: "title", value: "title" },
        { text: "userID ", value: "userId" },
        { text: "actions ", value: "actions" },
      ],
    };
  },
  methods: {
    async getPosts() {
      await this.$store.dispatch("index");
      this.posts = this.$store.getters.posts;
    },
    editItem(item) {
      this.edit = true;
      this.current = item;
    },
    deleteItem(item) {
      this.deleter = true;
      this.current = item;
    },
  },
  created() {
    this.$vuetify.ltr = true

    let posts = this.$store.getters.posts;
    if (!posts.length) {
      this.getPosts();
    } else {
      this.posts = this.$store.getters.posts;
    }
  },
};
</script>

<style>
</style>