<template>
  <v-app>
    <v-app-bar app color="primary">
      <router-link to="/DashBoard" class="ml-4 ">
        <!-- <v-icon>mdi-home </v-icon> -->
      </router-link>
      <!-- <router-link to="/Post" class="ml-4">
        <v-icon>mdi-message </v-icon>
      </router-link> -->
      <router-link to="/vuetifyTrain" class="ml-2 lg">
        <v-icon large light color='#ff6347'>mdi-home </v-icon>
      </router-link>
      <router-link to="/carComp" class="ml-4">
        <!-- <v-icon>mdi-car </v-icon> -->
      </router-link>
    </v-app-bar>
    <v-main mb-12>
      <router-view />

    </v-main>


  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    icons: ["mdi-facebook", "mdi-twitter", "mdi-linkedin", "mdi-instagram"],
  }),
};
</script>
