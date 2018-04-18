<template>
<div>
  <div>

  <br></br>
  <br></br>
  </div>


<div class="row col-lg-20 col-md-15 custyle"> 
  <!-- table rows and columns settings -->
  <table class="table table-striped custab">
  <thead>

      <tr>
        <!-- table headings -->
          <th class="text-center">Name</th>
          <th class="text-center">$Price</th>
          <th class="text-center">Type</th>
          <th class="text-center">Description</th>
          <th class="text-center">Created at</th>
          <th class="text-center">Updated at</th>
          <th class="text-center">Likes</th>
          <th class="text-center">Action</th>
      </tr>
  </thead>
          <tr v-for="item in this.items" >
              <td class="text-center">{{item.name}}</td>
              <td class="text-center">{{item.price}}</td>
              <td class="text-center">{{item.type}}</td>
              <td class="text-center">{{item.description}}</td>
              <td class="text-center">{{item.createdAt}}</td>
              <td class="text-center">{{item.updatedAt}}</td>
              <td class="text-center">{{item.likes}}</td>
              <!-- retrieves items attributes-->
              <td class="text-center"><a class='btn btn-info btn-xs' v-on:click="editItem(item._id,item.name,item.price,item.type,item.description)"><span class="glyphicon glyphicon-edit"></span> Edit</a> <a class="btn btn-danger btn-xs" v-on:click="deleteRow(item._id)"><span class="glyphicon glyphicon-remove"></span> Delete</a>
              <a class='btn btn-success btn-xs' v-on:click="incrementlikes(item._id,item.likes)"><span class="glyphicon glyphicon-thumbs-up"></span> Like </a>
              <!-- buttons for editting, deleting and liking the items -->
              </td>
              <br></br>
          </tr>
  </table>
  </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      items: [],
      name: '',
      price: '',
      type: '',
      description: '',
      sumLikes: 0
    }
  },
  created () {
    this.showItem()
  },
  methods: {
    showItem: function () {
      // method for retrieving items which connects to getItems in the backend
      axios.get('http://localhost:3000/api/item/getItems', {
        headers: { authorization: sessionStorage.getItem('token') }
        //  retrieves the users token to allow the authorization
      })
      .then((response) => {
        this.printresults(response.data)
        console.log(response)
      })
    },
    printresults (x) {
      for (var i = 0; i < x.data.length; i++) {
        this.items.push(x.data[i])
      }
    },
    deleteRow (id) {
      // method for deleting an item which connects to deleteItem in the backend
      axios.delete('http://localhost:3000/api/item/deleteItem/' + id, {
        headers: { authorization: sessionStorage.getItem('token') }
        //  retrieves the users token to allow the authorization
      })
      .then((response) => {
        window.location.reload()
        console.log(response)
      })
    },
    incrementlikes (id, li) {
      // method for showing interest in an item which connects to updateLikes in the backend
      axios.patch('http://localhost:3000/api/item/updateLikes/' + id, {
        likes: this.sumLikes + li + 1
        //  increments the likes
      },
        {
          headers: { authorization: sessionStorage.getItem('token') }
          //  retrieves the users token to allow the authorization
        })
      .then((response) => {
        window.location.reload()
        console.log(response)
      })
    },
    editItem: function (id, name, price, type, description) {
       // method for editting an item which connects to updateItem in the backend
      var namee = prompt('Please enter edited name for ' + name)
      var pricee = prompt('Please enter edited price for ' + price)
      var typee = prompt('Please enter edited type for ' + type)
      var descriptionn = prompt('Please enter edited description for ' + description)
      if (namee != null && pricee != null && typee != null && descriptionn != null) {
        axios.patch('http://localhost:3000/api/item/updateItem/' + id, {
          name: namee,
          price: pricee,
          type: typee,
          description: descriptionn
          //  updates item if all attributes are given as inputs
        },
          {
            headers: { authorization: sessionStorage.getItem('token') }
            //  retrieves the users token to allow the authorization
          })
        .then((response) => {
          window.location.reload()
          console.log(response)
        })
      }
      if (namee != null && pricee == null && typee != null && descriptionn != null) {
        axios.patch('http://localhost:3000/api/item/updateItem/' + id, {
          name: namee,
          type: typee,
          description: descriptionn
          //  updates item if all attributes are given as inputs except price
        },
          {
            headers: { authorization: sessionStorage.getItem('token') }
          })
        .then((response) => {
          window.location.reload()
          console.log(response)
        })
      }
    }
  }
}
</script>
<style>
  /* table styling */
.custab{
    border: 1px solid #ccc;
    padding: 5px;
    margin: 5% 0;
    box-shadow: 3px 3px 2px #ccc;
    transition: 0.5s;
    padding: 0;
    height: auto;
    }
.custab:hover{
    box-shadow: 3px 3px 0px transparent;
    transition: 0.5s;
    }
</style>
