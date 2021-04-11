import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  
  		cerrarSesion: false,
  		iniciar: false,
  		registrar: false

  		
  },
  mutations: {
  	mostrarBotones(state, cs){
  		state.cerrarSesion = cs.cerrarSesion;
  		state.iniciar = cs.iniciar;
  		state.registrar = cs.registrar;



  	}
  },
  actions: {
  },
  modules: {
  }
})
