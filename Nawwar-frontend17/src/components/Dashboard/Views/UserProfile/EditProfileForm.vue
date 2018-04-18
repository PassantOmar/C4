<template>
  <div class="card">
    
    <div class="header">
      <h1 class="title">Add Child</h1>
    </div>
    
    <div class="content">
      <form>
        <div class="row">
          <div class="col-md-5">
            <fg-input type="text"
                      label="Username"
                      placeholder="Enter a username"
                      v-model="user.username">
            </fg-input>
          </div>
          <div class="col-md-3">
  <img src="static/img/baby.jpg" height="150px" width="150px">
            <fg-input type="text"
                      label="Firstname"
                      placeholder="Enter your Firstname"
                      v-model="user.firstname">
            </fg-input>
          </div>
          <div class="col-md-4">
            <fg-input type="text"
                      label="LastName"
                      placeholder="Enter your Lastname"
                      v-model="user.lastname">
            </fg-input>
          </div>
        </div>
        <div class="col-md-3">

          <fg-input type="number"
                    label="age"
                    placeholder="Enter your age"
                    v-model="user.age">
          </fg-input>
        </div>

        <div class="row">
          <div class="col-md-6">
            <fg-input type="password"
                      label="Password"
                      placeholder="Enter your Password"
                      v-model="user.password">
            </fg-input>
          </div>
          <div class="col-md-6">
            <fg-input type="password"
                      label="Repeat Password"
                      placeholder="Password"
                      v-model="user.password1">
            </fg-input>
          </div>
        </div>

        <div class="row">
          <div class="col-md-12">
            <fg-input type="text"
                      label="Email"
                      placeholder="Enter your Email"
                      v-model="user.email">
            </fg-input>
          </div>
        </div>

        <div class="text-center">
          <button type="submit" class="btn btn-info btn-fill btn-wd" @click.prevent= "register" onclick="alert('Child added successfuly!')">
            Add child
          </button>
        </div>
        <div class="clearfix"></div>
      </form>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      user: {
        username: '',
        firstname: '',
        lastname: '',
        password: '',
        password1: '',
        email: '',
        age: 5,
        role11: 'parent'
      }
    }
  },
  methods: {
    register1 () {
      alert('Your data: ' + JSON.stringify(this.user))
    },
    register () {
      axios.post('http://localhost:3000/api/auth/register', {
        username: this.user.username,
        firstname: this.user.firstname,
        lastname: this.user.lastname,
        password: this.user.password,
        confirmPassword: this.user.password1,
        email: this.user.email,
        age: this.user.age,
        role: 'child'
      })
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {
        console.log(error)
      })
      window.location.reload()
    },
    change () {
      let config = {
        headers: {
          authorization: sessionStorage.getItem('token')
        }
      }
      axios.patch('http://localhost:3000/api/user/updateuserrole' + '/' + config, {
        role: this.user.role11
      })
       .then((response) => {
         console.log(response)
         console.log('Hi')
         window.location.reload()
       })
      window.location.reload()
    }
  }
}

</script>
<style>

</style>
