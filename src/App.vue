<template>
  <v-app>
    <v-app-bar app color="primary">
      <router-link to="/phoogleSearch" class="ml-2 lg">
        <v-icon large light color='#ff6347'>mdi-home </v-icon>
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
