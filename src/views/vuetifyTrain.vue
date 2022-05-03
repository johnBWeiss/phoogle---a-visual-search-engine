<template>
  <v-container fluid fill-height class="pa-0">
    <v-row>
      <v-col mt-12></v-col>
      <v-col cols="12" class="d-flex justify-center title mt-12 ">

        <h1 class="mt-12">
          <span class="blueFont ">P</span><span class="redFont">h</span><span class="orangeFont ">o</span><span
            class="blueFont ">o</span>
          <span class="greenFont">g</span><span class="redFont ">l</span><span class="orangeFont ">e</span>
        </h1>
      </v-col>
      <v-col cols="12" class=" d-flex justify-center">
        <input type="text" v-model="searchWord" class="input-field mt-12" placeholder="מה תרצו לחפש היום?
">
      </v-col>

      <v-col cols="12" class="d-flex justify-center align-center mt-8 mb-3 ">
        <v-btn class="blue white--text" @click="randomName">חיפוש </v-btn>
      </v-col>
      <div class="container">
        <v-col v-if="!loaded" class="d-flex justify-center align-center spinner   " cols="5">

          <!-- <atom-spinner :animation-duration="inifnite" :size="70" :color="'#ff1d5e'" /> -->


          <BreedingRhombusSpinner :animation-duration="infinite" :size="70" :color="'#ff1d5e'" />

          <!-- <FingerprintSpinner :animation-duration="infinite" :size="70" :color="'#ff1d5e'" /> -->



        </v-col>
      </div>
      <v-col cols="12"></v-col>

      <v-col v-for="item in phootle" :key="item.title" class="d-flex child-flex text-center" sm="6" lg="4" cols="12"
        mt-12>
        <v-card elevation="4" class="results">
          <a :href="item.link">
            <v-card-text class="black--text  ">{{ item.title }}</v-card-text>
            <v-img class=" " :src="item.imageCode">
            </v-img>
            <v-card-text class="black--text green">{{ item.link }}</v-card-text>
          </a>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>


<script>
import { BreedingRhombusSpinner } from 'epic-spinners'
export default {
  components: { BreedingRhombusSpinner },
  name: "vuetify-test",
  methods:
  {
    async capture() {
      await this.$store.dispatch('screenShotCapture')

    },

    async randomName() {
      this.loaded = false
      await this.$store.dispatch("fetcher", this.searchWord)
      const imageLoad = await this.$store.getters.imageStore
      const imageArray = await this.$store.getters.imageArray
      this.phootle = imageArray
      this.loaded = true


      this.Src = 'data:image/jpeg;base64,' + imageLoad

    },
    async created() {
      // const imageLoad = await this.$store.getters.imageStore
      const imageArray = await this.$store.getters.imageArray
      if (imageArray.length > 0) {
        // this.imageSrc = imageLoad
        this.phootle = imageArray
      }
    }
  },
  data() {
    return {
      loaded: true,
      searchWord: '',
    }
  },

};
</script>

<style scoped>
label textarea {
  vertical-align: middle;
}



h1 {
  font-size: 5em;
}

.title {
  font-size: 9em;

}


.input-field {
  vertical-align: middle;
  justify-content: center;
  text-align: center;
  direction: rtl;
  border-radius: 70px;
  box-shadow: 1px 1px 3px -2px rgb(0 0 0 / 20%), 1px 1px 1px 1px rgb(0 0 0 / 14%), 1px 1px 5px 1px rgb(0 0 0 / 12%);
  width: 45%;
  padding: 1%;
  margin-top: 5%;
}

.container {
  display: flex;
  justify-content: center;
  /* height: 200px; */

}

.results {
  height: 300px;
}

input:hover {
  outline-color: rgb(80, 80, 81);
  outline-width: 0.1px;
  box-shadow: 0px 4px 2px -2px rgb(0 0 0 / 20%), 0px 2px 2px 2px rgb(0 0 0 / 14%), 3px 3px 6px 4px rgb(0 0 0 / 12%);

}

input:focus {
  outline: none;
}

input:focus::placeholder {
  color: transparent;
}

::placeholder {
  font-size: large;
}

::placeholder:hover {
  display: none;
}

.orangeFont {
  color: orange;
}

.greenFont {
  color: seagreen;
}

.redFont {
  color: tomato;
}

.blueFont {
  color: royalblue;
}
</style>