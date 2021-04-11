<template>
	<v-main>
		<v-layout>
			<v-flex md3></v-flex>
			<v-flex>
				<v-card class="pa-3 primary white--text" >
					<v-card-title >
						Login
					</v-card-title>
					<v-form @submit.prevent="login">
						<v-text-field dark label="Correo" v-model="correo"></v-text-field>
						<v-text-field dark label="Contraseña" v-model="contraseña"></v-text-field>
						<v-btn class="error" block type="submit">acceder</v-btn>
					</v-form>
				</v-card>
			</v-flex>
			<v-flex md3></v-flex>
		</v-layout>
	</v-main>	
</template>


<script>
import firebase from 'firebase';
import {mapMutations} from 'vuex';



	export default {
		name: 'Login',
		data(){
			return{
				correo: '',
		        contraseña: ''
			}
			

		},

		created(){
			this.ver()
		},


		methods: {
			...mapMutations(['mostrarBotones']),

			ver(){
				this.mostrarBotones({cerrarSesion:false,iniciar:false,registrar:true})
			},
			
			login() {
				firebase
				.auth()
				.signInWithEmailAndPassword(this.correo, this.contraseña)
  				.then((user) => this.$router.replace('Lista-Tareas'), (error) => console.error(error));
			}
		},

		
		
		
	}
</script>


<style>
	
</style>