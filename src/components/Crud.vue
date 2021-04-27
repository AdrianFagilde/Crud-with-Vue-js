<template>
    <v-container grid-list-md>
        <v-layout row wrap>
            <v-flex md6>
                <v-btn class="success" @click="crearTarea" block>crear nueva tarea</v-btn>
                <v-dialog v-model="dialog" max-width="600px">
                    <v-card class="mb-2 pa-3" v-if="estado">
                        <v-form @submit.prevent="agregarTareas">
                            <v-text-field label="Titulo de Tarea" v-model="newTitulo"></v-text-field>
                            <v-textarea label="Descripcion" v-model="newDescripcion"></v-textarea>
                            <v-btn class="success" block type="submit">agregar tarea</v-btn>
                        </v-form>
                    </v-card>
                    <v-card class="mb-2 pa-3" v-if="!estado">
                        <v-form @submit.prevent="guardar(index)">
                            <v-text-field label="Titulo de Tarea" v-model="newTitulo"></v-text-field>
                            <v-textarea label="Descripcion" v-model="newDescripcion"></v-textarea>
                            <v-btn class="warning" block type="submit">Guardar</v-btn>
                        </v-form>
                    </v-card>
                </v-dialog>
            </v-flex>
            <v-flex md6>
                <div class="text-center">
                    <v-progress-circular v-if="mostrar" indeterminate color="error">
                    </v-progress-circular>
                </div>
                <v-card class="mb-2" v-for="(item, index) in tareas" :key="index">
                    <v-card-text>
                        <v-chip label color="primary" text-color="white" class="mb-2">
                            <v-icon left>mdi-tag</v-icon>
                            {{item.titulo}}
                        </v-chip>
                        <p class="black--text">{{item.descripcion}}</p>
                        <v-btn color="info" @click="editar(index, item.id)">Editar</v-btn>
                        <v-btn color="error" @click="preguntarEliminar(item.id)">eliminar</v-btn>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
        <v-snackbar v-model="snackbar2">
            {{ mensaje }}
            <template v-slot:action="{ attrs }">
                <v-btn color="pink" text v-bind="attrs" @click="eliminar()">
                    si
                </v-btn>
                <v-btn color="pink" text v-bind="attrs" @click="snackbar = false">
                    Close
                </v-btn>
            </template>
        </v-snackbar>
        <v-snackbar v-model="snackbar">
            {{ mensaje }}
            <template v-slot:action="{ attrs }">
                <v-btn color="pink" text v-bind="attrs" @click="snackbar = false">
                    Close
                </v-btn>
            </template>
        </v-snackbar>
    </v-container>
</template>




<script>
import {db} from '../main.js';
import {mapMutations} from  'vuex';



	export default{ 
		name: 'Crud', 
		data() { 
			return{ tareas: [],
				newTitulo: '' ,
				newDescripcion: '',
				snackbar: false,
        snackbar2: false,
				mensaje: '',
				estado: true,
				indexTarea: null,
        mostrar: false,
        dialog: false,
        id:null

        
			} 
		},
    created(){

      this.getTareas();

    },
    methods:{

      ...mapMutations(['mostrarBotones','mostrarDrawer']),

      async getTareas(){
        
        try{
          
          this.mostrarBotones({cerrarSesion:true,iniciar:false,registrar:false})
          this.mostrarDrawer()
          this.mostrar = true
          const snapshot = await db.collection('tareas').get()
          const tareas = []

          

          snapshot.forEach(doc => {
            console.log(doc.data());
            let eventoData = doc.data();
            eventoData.id = doc.id;
            tareas.push(eventoData);

          })


          this.tareas = tareas
          this.mostrar = false


        }catch(error){
          console.log(error)
        }
      },
      
      		 async agregarTareas(){

      			
        		if(this.newTitulo === '' || this.newDescripcion === ''){
        			this.snackbar = true
        			this.mensaje = 'Por favor llenar los espacios'
        		}
        		else{

        			await db.collection('tareas').add({
              titulo: this.newTitulo,
              descripcion: this.newDescripcion
        			})
        			this.newDescripcion = ''
        			this.newTitulo = ''
        			this.snackbar = true
        			this.mensaje = 'La Tarea se agregado exitosamente'
              this.dialog = false
              this.getTareas()
        		}
      		},
      		async eliminar(){

            try{

              await db.collection('tareas').doc(this.id).delete()
              this.snackbar2 = false
              this.getTareas()

            }catch(error){
              console.log(error)
            }

            
      			
      		},
      		async editar(index, item){
            this.dialog = true
      			this.estado = false
      			this.newTitulo = this.tareas[index].titulo
      			this.newDescripcion = this.tareas[index].descripcion
      			this.indexTarea = item

      		},
      		async guardar(){
      			await db.collection('tareas').doc(this.indexTarea).update({
              titulo: this.newTitulo,
              descripcion: this.newDescripcion
            })
            this.dialog = false
      			
      			this.newTitulo = ''
      			this.newDescripcion = ''
      			this.snackbar = true
        		this.mensaje = 'La Tarea se ha editado exitosamente'

            this.getTareas()

      		},
          crearTarea(){
            this.dialog = true 
            this.estado = true
          },
          preguntarEliminar(index){
            this.snackbar2 = true
            this.mensaje = 'Seguro que desea eliminar la tarea'
            this.id = index

          }
    }

   
}


</script>