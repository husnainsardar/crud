<template>
    <div class="container">
       <div class="row">
           <div v-if="errors.length" class="danger">
             <p><b>Please correct the following error(s):</b>
                <ul>
                    <li v-for="error in errors">{{ error }}</li>
                 </ul>
              </p>
           </div>
            <div class="col-12">
                <form @submit.prevent="createItem">
                    <div class="form-group">
                        <label>Name</label>
                        <input type="text" class="form-control"  v-model="newItem.name">
                        <div>{{ errors.name }}</div>
                    </div>
                    <div class="form-group">
                        <label>Age</label>
                        <input type="number" min="0" max="200" class="form-control" v-model="newItem.age">
                    </div>
                    <div class="form-group">
                        <label>Profession</label>
                        <input type="text" class="form-control" v-model="newItem.profession">
                    </div>
                    <br />
                    <button type="submit" class="btn btn-primary">Add Record</button>
                     
                </form>
                 <p class="alert alert-info" role="alert" v-if="message">{{ message }}</p> 
            </div>
            
            
        </div>
        <table class="table">
            <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Age</th>
                <th>Profession</th>
                <th>Action</th>
            </tr>
            <tr v-for= "datas in data">
                <td>{{datas.id}}</td>
                <td>{{datas.name}}</td>
                <td>{{datas.age}}</td>
                <td>{{datas.profession}}</td>
                <td >  
                    <button @click="setVal(datas.id, datas.name, datas.age,datas.profession)" class="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal"  >
                    Edit</button>
                    <button @click="deleteitem(datas)" class="btn btn-lg btn-danger">Delete</button>
                </td>
            </tr>
        </table>
        
                <!-- !-- Modal -->
        <div id="myModal" class="modal" role="dialog">
           <div class="modal-dialog">
                     <!-- Modal content -->
                    <div class="modal-content">
                        
                            <div class="modal-header">
                                <h4 class="modal-title">Edit Data</h4>
                                 <button type="button" class="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div v-if="errors1.length" class="danger">
                                   <p><b>Please correct the following error(s):</b>
                                          <ul>
                                            <li v-for="error1 in errors1">{{ error1 }}</li>
                                                 </ul>
                                              </p>
                                             </div>
                            <div class="modal-body">
                                 <input type="hidden" disabled class="form-control" id="d_id" name="id" 
                                          :value="this.d_id">
                                  Name: <input type="text" class="form-control"  id="d_name" name="age"
                                       required  :value="this.d_name">
                                  Age: <input type="text" class="form-control"  min="0" id="d_age" name="age"
                                        required  :value="this.d_age">
                                  Profession: <input type="text" class="form-control" id="d_profession" name="profession"
                                        required  :value="this.d_profession">
                            </div>
                            <div class="modal-footer">
                                 <button type="button" class="btn btn-primary" @click="editData()" >Save changes</button>
                                 <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            </div>
                    </div>
               </div>
           </div> 
 </div>
</template>

<script>
    export default {
       data(){
           return{
             newItem : { 'name': '', 'age': '', 'profession': '' },
             hasError: true,
             data:[],
             d_id: '',
             d_name: '',
             d_age: '',
             d_profession:'',
              message: null,
              errors: [],
              errors1: [],
               
           }
       },
                    mounted: function mounted() {
                            this.getitems();
                        },
        methods:{
            getitems()
                        {
                            var _this = this;
                            axios.get('/vueitems').then(function(response) {
                            _this.data = response.data;
                            });
                        },
            createItem() {
             
                       var input = this.newItem;
                        var _this = this;
                     if (input['name'] !== '' && input['age'] !== '' && input['profession'] !== '') {
                                     axios.post('/storeitems', input).then(function(response) {
                                    _this.newItem = { 'name': '', 'age': '', 'profession': '' }
                                    _this.getitems();
                                      });
                                      this.message = 'The Data is Added successfully.';
                                    this.errors = [];
                    } else {
                            
                                     this.errors = []; 
                    
                                if (this.newItem.name ===  '') {
                                     this.errors.push('Name is required.');
                                }
                                if (this.newItem.age ===  '') {
                                     this.errors.push('Age is required.');
                                 }
                                if (this.newItem.profession ===  '') {
                                     this.errors.push('Profession is required.');
                                 }
                            
                         }
                 
                },
             deleteitem(datas)
                        {
                             var _this = this;
                            this.$confirm("Are you sure?").then(() => {
                               axios.delete('/vueitems/'+ datas.id ).then(function(response) {
                            _this.getitems();
                            
                                });
                                 this.message = 'The Data is Deleted successfully.';
                                    this.errors = [];
                             });  
                        },
            setVal(val_id, val_name, val_age,val_profession)
                        {
                            this.d_id = val_id;
                            this.d_name = val_name;
                            this.d_age = val_age;
                            this.d_profession = val_profession;
              
                        },
            editData()
                        {
                            
                            var _this = this;
                            var id_val_1 = document.getElementById('d_id');
                            var name_val_1 = document.getElementById('d_name');
                            var age_val_2 = document.getElementById('d_age');
                            var profession_val_3 = document.getElementById('d_profession');
                            
                            if (name_val_1.value !=='' && age_val_2.value !=='' && profession_val_3.value !==''){
                                var model = document.getElementById('myModal').value;
                            axios.put('/edititems/' + id_val_1.value, { val_1: name_val_1.value, val_2: age_val_2.value,val_3: profession_val_3.value })
                            .then(response => {
                             _this.getitems();
                            });
                                $("#myModal").modal("toggle");
                               this.message = 'The Data is updated successfully.';
                            }
                            else {
                            
                    this.errors1 = []; 
                    
                    if (name_val_1.value ===  '') {
                        this.errors1.push('Name is required.');
                    }
                    if (age_val_2.value ===  '') {
                        this.errors1.push('Age is required.');
                    }
                    if (profession_val_3.value ===  '') {
                        this.errors1.push('Profession is required.');
                    }
                            
                         }
                            
                        },
                
         }
    }
</script>