<template>
	<v-main>
		<v-layout>
			<v-flex md3></v-flex>
			<v-flex>
				<v-card class="pa-3 primary white--text" >
					<v-card-title >
						Login
					</v-card-title>
					<v-form ref="form"
                       v-model="valid"
                       lazy-validation
					   @submit.prevent="login">

						<v-text-field dark 
						    label="Correo" 
						    v-model="correo"
						    :rules="correoRules"
						    required
						></v-text-field>
						<v-text-field dark 
						    label="Contraseña" 
						    v-model="contraseña"
						    :counter="10"
						    :rules="contraseñaRules"
						    required
						    ></v-text-field>
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
				valid: true,
				correo: '',
		        contraseña: '',
		        correoRules: [
				    v => !!v || 'correo es requerido',
				    v => /.+@.+\..+/.test(v) || 'El correo es valido'
				],
				contraseñaRules: [
				    v => !!v || 'contraseña requerida',
                    v => (v && v.length <= 10) || 'contraseña valida',

				]


			}
			

		},

		created(){
			this.ver()
		},


		methods: {
			...mapMutations(['mostrarBotones','ocultarDrawer']),
			

			ver(){
				this.mostrarBotones({cerrarSesion:false,iniciar:false,registrar:true})
                this.ocultarDrawer()
			},

			validate () {
              this.$refs.form.validate()
            },
			
			login() {

				this.validate()

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