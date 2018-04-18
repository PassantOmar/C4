<template>
  <div class="card">
    <div class="header">
      <h4 class="title">{{title}}</h4>
    </div>
    <div class="content">
      <ul class="list-unstyled team-members">
        <li>
          <div class="row">
            <div class="col-xs-3">
              <div class="avatar">
                <img :src="User.image" alt="Circle Image" class="img-circle img-no-padding img-responsive">

              </div>
            </div>
            <div class="col-xs-6 ">
              {{User.firstname}}
              <br>
              <span :class="getStatusClass(User.status)">
                <mid>{{User.lastname}}</mid>

              </span>
              <br>
              <span :class="getStatusClass('Busy')">
                <small>{{User.role}} User</small>
              </span>

            </div>

            <div class="col-xs-3 text-right">
              <mid style="padding-right:8px">{{User.email}}</mid>
              <button class="btn btn-sm btn-success btn-icon" @click="notifyVue('top', 'right', User.email, 2)">
                <i class="fa fa-envelope"></i>
              </button>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  export default {
    data () {
      return {
        title: 'My Profile XD',
        User: {
          status: 'Available',
          image: 'static/img/faces/face-0.jpg',
          firstname: '',
          lastname: '',
          email: '',
          age: 0,
          location: '',
          role: ''
        },
        type: ['', 'info', 'success', 'warning', 'danger']
      }
    },
    methods: {
      getStatusClass (status) {
        switch (status) {
          case 'Offline':
            return 'text-muted'
          case 'Available':
            return 'text-success'
          case 'Busy':
            return 'text-danger'
          default:
            return 'text-success'
        }
      },
      notifyVue (verticalAlign, horizontalAlign, message, col) {
        this.$notifications.notify(
          {
            message: message,
            icon: 'ti-comments-smiley',
            horizontalAlign: horizontalAlign,
            verticalAlign: verticalAlign,
            type: this.type[col]
          })
      }
    },
    created () {
      axios.get('http://localhost:3000/api/user/getAllMyData', {
        headers: { authorization: sessionStorage.getItem('token') }
      })
      .then((response) => {
        var res = response.data.data
        this.User.firstname = res.firstname
        this.User.lastname = res.lastname
        this.User.email = res.email
        this.User.age = res.age
        this.User.role = res.role
        console.log(this.User)
        console.log(response)
      })
      .catch((error) => {
        console.log(error)
      })
    }
  }

</script>
<style>

</style>
