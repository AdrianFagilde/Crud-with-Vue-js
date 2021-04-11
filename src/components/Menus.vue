<template>
	<v-main>
	<v-app-bar
      color="primary"
      dark
      dense
      app 
    >
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
    	
      		<v-toolbar-title>Crud</v-toolbar-title>
      		<v-spacer></v-spacer>
      		<v-btn white color="error"  v-if="iniciar" class="mr-2" :to="{name: 'User-Login'}">
     			ingresar
    		 </v-btn>
    		 <v-btn white color="error"  v-if="registrar" class="mr-2" :to="{name: 'Registro'}">
     			registrar
    		 </v-btn>
      	
      		<v-btn white color="error" v-if="cerrarSesion" @click="logout()">
      			cerrar sesion
     		</v-btn>

      
    </v-app-bar>


    <v-navigation-drawer app v-model="drawer" temporary color="error">
       
       <v-layout>
       	<v-flex>
       		<h2 align="center" class=" primary white--text headline mb-3 pa-2">Menu </h2>
       	</v-flex>
       </v-layout>

       <v-layout column>
       		<v-flex mx-3>
       			<v-btn color="primary" block >
              <router-link to="/home" class="white--text">Home</router-link>
            </v-btn>
       			<v-btn color="primary" block >
              <router-link to="/tareas" class="white--text">Tareas</router-link>
            </v-btn>
       		</v-flex>
       		
       </v-layout>
       

    </v-navigation-drawer>


	</v-main>
</template>



<script>
import firebase from 'firebase';
import {mapState} from 'vuex';


	export default {
		name: 'Menus',
		data() {
			return{
				drawer: false

			}
		},
	

    methods:{

      logout() {
        firebase.auth().signOut().then(() => this.$router.replace('User-Login'));
       	

      }
    },

    computed:{
    	...mapState(['cerrarSesion','iniciar','registrar'])
    }

	}

</script>


<style scope>



  
</style>