<template>
  <v-app>
    
    <Menus>
    </Menus>
    
    <v-main>
      <router-view/>
    </v-main>



  </v-app>
</template>

<script>
import Menus from './components/Menus.vue'

export default {
  name: 'App',

  components: {
    Menus
  },

  data: () => ({
    //
  }),
};
</script>



