<template>
	<v-main>
		<v-layout>
			<v-flex md3></v-flex>
			<v-flex>
				<v-card class="pa-3 primary white--text" >
					<v-card-title >
						Registro
					</v-card-title>
					<v-form @submit.prevent="registrar()">
						<v-text-field dark label="new Correo" v-model="newCorreo"></v-text-field>
						<v-text-field dark label="new Contraseña" v-model="newContraseña"></v-text-field>
						<v-btn class="error" block type="submit">registrar</v-btn>
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

	export default{
		name: 'Registro',

		data(){
			return{
				newCorreo: '',
				newContraseña: ''

        
			}
		},
		created(){
			this.mostrarBotones({
            cerrarSesion:false,
            iniciar: true,
            registrar: false
          })
    
		},

		methods:{
			...mapMutations(['mostrarBotones']),


			registrar(){
				firebase
				.auth()
				.createUserWithEmailAndPassword(this.newCorreo, this.newContraseña)
                 .then((userCredential) => {
                   // Signed in
                 var user = userCredential.user;
                 this.$router.replace('Lista-Tareas')
                 // ...
                 })
                .catch((error) => {
                var errorCode = error.code;
                 var errorMessage = error.message;
                   // ..
  });

			}
		}
	}
</script>