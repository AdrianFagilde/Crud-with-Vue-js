import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';


Vue.use(Vuetify);

export default new Vuetify({
  theme: {
      options: {
        customProperties: true,
      },
    themes: {
      light: {
        primary: '#1E2A78',
        secondary: '#FFE720',
        accent: '#49DEB2',
        error: '#FF2E4C',
        info: '#49BCF6',
        success: '#4CAF50',
        warning: '#FFC107'
      },
    },
  },
});
