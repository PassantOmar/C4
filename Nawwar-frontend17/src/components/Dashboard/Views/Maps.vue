<template>
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
        <th>Email</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>{{User.data.role }}</td>
        <td>{{User.data.childScore}}</td>
        <td>{{User.data._id}}</td>
        <td>{{User.data.username}}</td>
        <td>{{User.data.firstname}}</td>
        <td>{{User.data.lastname}}</td>
        <td>{{User.data.email}}</td>
      </tr>
    </tbody>
    </table>
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
    axios.get('http://localhost:3000/api/user/getAllMyData', {
      headers: { authorization: sessionStorage.getItem('token') }
    })
    .then((response) => {
      this.User = response.data
      console.log('-----')
      console.log(this.User)
      console.log(response)
    })
    .catch((error) => {
      console.log(error)
    })
  }
}
</script>
