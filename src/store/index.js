import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  
  		cerrarSesion: false,
  		iniciar: false,
  		registrar: false,
      ver: false

  		
  },
  mutations: {
  	mostrarBotones(state, cs){
  		state.cerrarSesion = cs.cerrarSesion;
  		state.iniciar = cs.iniciar;
  		state.registrar = cs.registrar;
  	},
    mostrarDrawer(state){
      state.ver = true;
    },
    ocultarDrawer(state){
      state.ver = false;
    }
  },
  actions: {
  },
  modules: {
  }
})
