<!-- <template>
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <paper-table :title="table1.title" :sub-title="table1.subTitle" :data="user.data" :columns="table1.columns">

          </paper-table>
        </div>
      </div>
    </div>
</template>
<script> -->
<template>
  <div>
    <!-- <div class="row">
        </div>
      </div>+
    </div> -->
    <!-- <div>
      <input type="text" v-model= "name" > Name <br>
      <input type="text" v-model= "price"> Price <br>
      <input type="text" v-model= "deleteP"> Delete Product <br>
      <input type="text" v-model= "updatePname"> Update Name <br>
      <input type="text" v-model= "updatePprice"> Update Price <br>
      <input type="text" v-model= "updatePid"> ID of product to be updated <br>
      <button v-on:click="AddToApi"> add product</button>
      <button v-on:click="DeleteP"> delete product</button>
      <button v-on:click="UpdateP"> update product</button>
    </div> -->

    <div>
    <table id="firstTable" style="width:100%">
    <thead>
      <tr>
        <th>Role</th>
        <th>ChildScore</th>
        <th>ID</th>
        <th>Username</th>
        <th>FirstName</th>
        <th>LastName</th>
        <th>Password</th>
        <th>Email</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="user in User.data">
        <td>{{user.role}}</td>
        <td>{{user.childScore}}</td>
        <td>{{user._id}}</td>
        <td>{{user.username}}</td>
        <td>{{user.firstname}}</td>
        <td>{{user.lastname}}</td>
        <td>{{user.password}}</td>
        <td>{{user.email}}</td>
        <!-- <button v-on:click="DeleteP"> delete product</button> -->
      </tr>
    </tbody>
    </table>
  </div>
</div>

</template>

<script>
import axios from 'axios'
import PaperTable from 'components/UIComponents/PaperTable.vue'
const tableColumns = ['role', 'childScore', 'ID', 'username', 'firstname', 'lastname', 'password', 'email', '']
const tableData = [{
  role: '',
  childScore: '',
  id: '',
  username: '',
  firstname: '',
  lastname: '',
  password: '',
  email: ''
},
{
  role: '',
  childScore: '',
  id: '',
  username: '',
  firstname: '',
  lastname: '',
  password: '',
  email: ''
}]
export default {
  components: {
    PaperTable
  },
  data () {
    return {
      table1: {
        title: 'Stripped Table',
        subTitle: 'Here is a subtitle for this table',
        columns: [...tableColumns],
        data: [...tableData]
      },
      table2: {
        title: 'Table on Plain Background',
        subTitle: 'Here is a subtitle for this table',
        columns: [...tableColumns],
        data: [...tableData]
      },
      User: [],
      // data: {
      id: '',
      username: '',
      firstname: '',
      lastname: '',
      password: '',
      email: ''
      // }
    }
  },
  created () {
    this.getusers()
  },
  getuser () {
    let config = {
      headers: {
        authorization: sessionStorage.getItem('token')
      }
    }
    axios.get('http://localhost:3000/api/auth/getAllMyTata', config)
    .then((response) => {
      this.user = response.data
      console.log(response)
    })
    .catch((error) => {
      console.log(error)
    })
  }
}
</script>
