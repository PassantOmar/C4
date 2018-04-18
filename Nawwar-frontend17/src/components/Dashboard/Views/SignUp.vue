<template>
  
    <div class="content">
      <form id="demo" @submit.prevent="submitForm(); + register()">
      <div class="input-group">
        <div class="input-group-addon">
        </div>

        <div class="input-fields">
          <input v-validate="'required'" name="username" type="text" class="form-control"placeholder="username" v-model="user.username">
          <input v-validate="'required|alpha'" name="firstname" type="text" class="form-control" placeholder=firstname v-model="user.firstname">
          <input v-validate="'required|alpha'" name="lastname" type="text" class="form-control" placeholder="lastname" v-model="user.lastname">
          <input v-validate="'required'" name="password" type="password" class="form-control" placeholder="Password" v-model="user.password">
          <input v-validate="'required|confirmed:password'" name="password_confirmation" type="password" class="form-control" placeholder="Password, Again" data-vv-as="password" v-model="user.password1">
          <input v-validate="'required|email'" name="email" type="text" class="form-control" placeholder="email" v-model="user.email">
        </div>
      </div>
      <div class="alert alert-danger" v-show="errors.any()">
        <div v-if="errors.has('username')">
          {{ errors.first('username') }}
        </div>
        <div v-if="errors.has('firstname')">
          {{ errors.first('firstname') }}
        </div>
        <div v-if="errors.has('lastname')">
          {{ errors.first('lastname') }}
        </div>
        <div v-if="errors.has('password')">
          {{ errors.first('password') }}
        </div>
        <div v-if="errors.has('password_confirmation')">
          {{ errors.first('password_confirmation') }}
        </div>
        <div v-if="errors.has('email')">
          {{ errors.first('email') }}
        </div>
      </div>

      <button type="submit" class="btn btn-primary">
            Sign Up
        </button>
    </form>
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
        email: ''
      }
    }
  },
  methods: {
    register () {
      axios.post('http://localhost:3000/api/auth/register', {
        username: this.user.username,
        firstname: this.user.firstname,
        lastname: this.user.lastname,
        password: this.user.password,
        confirmPassword: this.user.password1,
        email: this.user.email
      })
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {
        console.log(error)
      })
      window.location.reload()
    },
    submitForm () {
      this.$validator.validateAll().then(res => {
        if (res) {
          alert('Done!')
        } else {
          alert('Please fill out all the fields!')
        }
      })
    }
  }
}

</script>
<style>
body {
  background: #384047;
  font-family: sans-serif;
  font-size: 10px;
}

form {
  background: #fff;
  padding: 4em 4em 2em;
  max-width: 400px;
  margin: 50px auto 0;
  box-shadow: 0 0 1em #222;
  border-radius: 2px;
}
form h2 {
  margin: 0 0 50px 0;
  padding: 10px;
  text-align: center;
  font-size: 30px;
  color: #666666;
  border-bottom: solid 1px #e5e5e5;
}
form p {
  margin: 0 0 3em 0;
  position: relative;
}
form input {
  display: block;
  box-sizing: border-box;
  width: 100%;
  outline: none;
  margin: 0;
}
form input[type="text"],
form input[type="password"] {
  background: #fff;
  border: 1px solid #dbdbdb;
  font-size: 1.6em;
  padding: .8em .5em;
  border-radius: 2px;
}
form input[type="text"]:focus,
form input[type="password"]:focus {
  background: #fff;
}
form span {
  display: block;
  background: #F9A5A5;
  padding: 2px 5px;
  color: #666;
}
form input[type="submit"] {
  background: rgba(148, 186, 101, 0.7);
  box-shadow: 0 3px 0 0 rgba(123, 163, 73, 0.7);
  border-radius: 2px;
  border: none;
  color: #fff;
  cursor: pointer;
  display: block;
  font-size: 2em;
  line-height: 1.6em;
  margin: 2em 0 0;
  outline: none;
  padding: .8em 0;
  text-shadow: 0 1px #68B25B;
}
form input[type="submit"]:hover {
  background: #94af65;
  text-shadow: 0 1px 3px rgba(70, 93, 41, 0.7);
}
form label {
  position: absolute;
  left: 8px;
  top: 12px;
  color: #999;
  font-size: 16px;
  display: inline-block;
  padding: 4px 10px;
  font-weight: 400;
  background-color: rgba(255, 255, 255, 0);
  -moz-transition: color 0.3s, top 0.3s, background-color 0.8s;
  -o-transition: color 0.3s, top 0.3s, background-color 0.8s;
  -webkit-transition: color 0.3s, top 0.3s, background-color 0.8s;
  transition: color 0.3s, top 0.3s, background-color 0.8s;
}
form label.floatLabel {
  top: -11px;
  background-color: rgba(255, 255, 255, 0.8);
  font-size: 14px;
}

</style>
