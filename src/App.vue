<template>
  <v-app>
   
      <Menu></Menu>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import Menu from './components/Menus.vue';

export default {
  name: 'App',

  components: {
    Menu,
  },

  data: () => ({
    //
  }),
};
</script>
