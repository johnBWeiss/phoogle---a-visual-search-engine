<template>

  <v-layout align-center fill-height flex-column justify-center class="black">
    <v-spacer></v-spacer>
    <v-card width="25%" color="red pa-4">
      <v-text-field class="mb-n5 pa-5 " v-model="searchValue" placeholder="מלאו מספר רכב"></v-text-field>
      <div class="div">
        <v-btn align-center @click="getItems(searchValue)">
          <v-icon>mdi-heart</v-icon>
        </v-btn>

      </div>
      <v-spacer></v-spacer>
      <div class=" d-flex justify-center">
        <v-card v-if="noResults" class="mt-8 d-flex text-center" width="40%">
          <v-card-text>
            לא נמצאו תוצאות </v-card-text>
        </v-card>
      </div>
      <v-spacer></v-spacer>



    </v-card>
    <v-data-table v-if="showData" light :headers="headers" :items="items" :items-per-page="5" :search="search"
      :sort-desc="[false, true]" multi-sort :loading="loading" loading-text="טוען...אנא המתינו"
      class="elevation-1 mt-12">
      <template v-slot:top>
        <v-text-field v-model="search" label="סינון" class="mx-4"></v-text-field>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <div class="d-flex justify-space-between">
          <v-icon @click="deleteItem(item)">mdi-delete</v-icon>
          <v-icon @click.prevent="editItem(item)">mdi-pencil</v-icon>
        </div>
      </template>
    </v-data-table>
    <v-card>
      <v-icon @click="randomName()">mdi-pencil</v-icon>
    </v-card>

    <v-spacer></v-spacer>
  </v-layout>
</template>

<script>

export default {
  data() {
    return {
      loading: true,
      headers: [
        { text: "מספר רכב ", value: "מספר רכב" },
        { text: "סוג מנוע ", value: "סוג מנוע" },
        { text: "גיר ", value: "גיר" },
        { text: "אגרת רכב", value: "אגרת רכב" },
        { text: " בעלות נוכחית", value: "בעלות נוכחית" },
        { text: "דגם", value: "דגם" },
        // { text: "יצרן ", value: "יצרן" },
        // { text: "מספר שלדה", value: "מספר שלדה" },
        // { text: "צבע", value: "צבע" },
        { text: "שנת עלייה לכביש ", value: "שנת עלייה לכביש" },
        { text: "תאריך טסט אחרון ", value: "תאריך טסט אחרון" },
        // { text: "תוצרת ", value: "תוצרת" },
        { text: "תוקף רישיון ", value: "תוקף רישיון" },
        { text: "דגם ", value: "תת דגם" },
        { text: "מחיר ", value: "מחיר" },

        { text: "פעולות ", value: "actions" }],
      items: [],
      search: "",
      searchValue: "",
      noResults: false,
      showData: false

    };
  },
  methods: {
    async getItems(payload) {
      this.loading = true
      try {

        await this.$store.dispatch("scraper", payload)
        if (this.$store.getters.error) {
          this.loading = false
          this.noResults = true


          setTimeout(() => {
            this.noResults = false

          }, 2000);
        }
        else {
          this.items = this.$store.getters.carValue;
          this.loading = false
          this.showData = true
          this.noResults = false
        }

      } catch (e) {
        console.log(e);
        this.loading = false
        this.noResults = true

        setTimeout(() => {
          this.noResults = false

        }, 2000);
      }




    },
    loadItems() {
      this.loading = true
      this.items = this.$store.getters.carValue;
      this.loading = false
      if (this.items.length > 0) {
        this.showData = true
        this.noResults = false
      }
    }

  },

  created() {
    this.$vuetify.rtl = true
    let items = this.$store.getters.carValue;
    if (!items.length) {
      this.loadItems();
    }
    // else {
    //   this.items = this.$store.getters.carValue;
    //   this.loading = false
    // }
  },



};
</script>
<style>
.div {
  justify-content: center;
  display: flex;


}
</style>



