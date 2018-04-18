<template>
  <div class="card">
    <div class="header">
      <h4 class="title">Apply Teacher Request</h4>
    </div>
    <div class="content">
      <form>
        <div class="row">
          <div class="col-md-5">
            <!-- <fg-input type="text"
                      label="Subject"
                      placeholder="Enter Subject"
                      v-model="user.subject">
            </fg-input> -->
          </div>
          <div class="col-md-3">

            <!-- <fg-input type="number"
                      label="Years Of Experience"
                      placeholder="Enter Years Of Experience"
                      v-model="user.yearsofexperience">
            </fg-input> -->
          </div>
        </div>

        <div class="text-center">
          <button v-if="show == true" type="submit" class="btn btn-info btn-fill btn-wd" v-on:click="newTeacherRequest">
            Submit Request
          </button>
          <h1 v-if="show == false">Request Submitted</h1>
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
        email: ''
      },
      token: sessionStorage.getItem('token'),
      show: true
    }
  },
  methods: {
    newTeacherRequest () {
      axios.patch('http://localhost:3000/api/user/newTeacherRequest', {},
        {
          headers: { authorization: this.token }
        })
      .then((response) => {
        this.show = false
        console.log(response)
      })
      .catch((error) => {
        console.log(error)
      })
    }
  }
}

</script>
<style>

</style>
