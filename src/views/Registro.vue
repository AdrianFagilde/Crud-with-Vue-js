<template>
	<v-main>
		<v-layout>
			<v-flex md3></v-flex>
			<v-flex>
				<v-card class="pa-3 primary white--text" >
					<v-card-title >
						Registro
					</v-card-title>
					<v-form ref="form"
                       v-model="valid"
                       lazy-validation
                       @submit.prevent="registrar()">

						<v-text-field dark label="Correo" 
						  v-model="newCorreo"
						  :rules="correoRules"
						  required
						></v-text-field>
						<v-text-field dark 
						   label="Contraseña" 
						   v-model="newContraseña"
						   :counter="10"
						   :rules="contraseñaRules"
						   required
						></v-text-field>
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
				valid: true,
				newCorreo: '',
				newContraseña: '',
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
			this.mostrarBotones({
            cerrarSesion:false,
            iniciar: true,
            registrar: false
          })
    
		},

		methods:{
			...mapMutations(['mostrarBotones']),

			validate () {
              this.$refs.form.validate()
            },


			registrar(){

				this.validate()
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