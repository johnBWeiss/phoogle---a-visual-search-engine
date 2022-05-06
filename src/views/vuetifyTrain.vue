<template>
  <v-container class="pa-0 mb-12 d-flex flex-column ">
    <v-row class="mt-12">
      <v-col cols="12" class=" mt-12 mb-0  d-flex justify-center" wrap>
        <!-- <v-btn @click="oneScreenShot"> </v-btn> -->


        <h1 class="mt-12">
          <span class="blueFont capital">P</span><span class="blueFont">h</span><span class="redFont ">o</span><span
            class=" orangeFont">o</span>
          <span class=" blueFont">g</span><span class=" greenFont  capital ">l</span><span class="redFont ">e</span>
        </h1>

      </v-col>

      <v-col cols="12" class=" d-flex justify-center mb-3">
        <input type="text" v-model="searchWord" class="input-field mt-0" placeholder="מה תרצו לחפש היום?
">
      </v-col>
      <v-col cols="12" class="d-flex justify-center align-center  mb-4 mt-3 ">
        <v-btn class="blue white--text" @click="randomName">חיפוש </v-btn>
      </v-col>
      <!-- <div class="container" mt-12> -->
      <v-col v-if="!loaded" class="d-flex justify-center align-center spinner mt-12 " cols="12">

        <!-- <atom-spinner :animation-duration="inifnite" :size="70" :color="'#ff1d5e'" /> -->

        <BreedingRhombusSpinner :animation-duration="infinite" :size="70" :color="'tomato'" />



      </v-col>
      <!-- </div> -->

    </v-row>
    <!-- <v-col cols="12" class="d-flex justify-center align-center mt-8 mb-3 "></v-col> -->
    <v-row class="d-flex justify-center align-center " mt-12>
      <v-col cols="12" md="3" lg="4" xl="4" v-for="item in phootle" :key="item.link">
        <v-card color="#ffa500" :elevation="7">

          <a :href="item.link" target="_blank">
            <v-card-text class="black--text d-flex justify-center align-center  ">{{ item.title.substring(0, 37) }}
            </v-card-text>
            <v-img :src="item.imageCode">
            </v-img>

            <!-- <v-card-text class="black--text green">{{ item.link }}</v-card-text> -->
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
  data() {
    return {
      linkArray: [],
      counter: 0,
      testState: '',
      loaded: true,
      searchWord: '',
      phootle:
        []

    }
  },
  methods:
  {
    async capture() {
      await this.$store.dispatch('screenShotCapture')

    },
    async oneScreenShot() {

      console.time('one at a time')
      console.time('just one')

      this.loaded = false
      // this.phootle = []
      // if (this.counter === 0) {

      this.counter++

      let links = []
      await this.$store.dispatch('linkFetch', this.searchWord)
      links = await this.$store.getters.linkArray
      this.linkArray = links


      await this.$store.dispatch('screenShotCaptureFetch', this.linkArray[this.counter].link)
      const imageScreenShot = await this.$store.getters.imageArray
      this.phootle = (imageScreenShot)
      console.timeEnd('just one')

      // }
      // else {
      await this.$store.dispatch('screenShotCaptureFetch', this.linkArray[this.counter].link)
      const imageScreenShot1 = await this.$store.getters.imageArray
      this.phootle = (imageScreenShot1)
      this.counter++
      await this.$store.dispatch('screenShotCaptureFetch', this.linkArray[this.counter].link)
      const imageScreenShot2 = await this.$store.getters.imageArray
      this.phootle = (imageScreenShot2)
      this.counter++

      // }


      // await this.$store.dispatch('screenShotCaptureFetch', links[2].link)
      // const imageScreenShot2 = await this.$store.getters.imageArray
      // this.phootle.push(imageScreenShot2)
      // await this.$store.dispatch('screenShotCaptureFetch', links[0].link)
      // const imageScreenShot1 = await this.$store.getters.imageArray
      // this.phootle.push(imageScreenShot1)
      console.log('how long');

      // const imageArray = await this.$store.getters.imageArray
      // this.phootle = imageArray
      this.loaded = true
      console.timeEnd('one at a time')

    },
    async randomName() {
      this.loaded = false
      this.phootle = []
      await this.$store.dispatch("fetcher", this.searchWord)
      const imageArray = await this.$store.getters.imageArray
      this.phootle = imageArray
      console.log("this is the getter og image array", imageArray);
      this.loaded = true
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


};
</script>

<style scoped>
label textarea {
  vertical-align: middle;
}



h1 {
  font-size: 5em;
  font-family: 'Readex Pro', sans-serif;
}

.title {
  font-size: 9em;

}

.capital {
  font-size: 1.05em;
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

/* .container {
  display: flex;
  justify-content: center;
  width: 100%;
} */

/* .results {
  height: 300px;
} */

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

.v-card {
  border: 5px solid;
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
  color: #2196F3;
}
</style>