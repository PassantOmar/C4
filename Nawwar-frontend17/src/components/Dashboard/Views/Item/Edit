<template>
<div>
  <div>

  <br></br>
  <br></br>
  </div>

  <div>
<label>   *Item Name    </label>
<input type="text" v-model="name"> </input>
</div>
<div>
<label>   *Item Price   </label>
<input type="text" v-model="price"> </input>

</div>
<div>
<label>   *Item Type   </label>
<input type="text" v-model="type"> </input>
</div>
<label>   *Item Description    </label>
<input type="text" v-model="description"> </input>

<div>

<label>______________________________________________________________ </label>
<br></br>
  <a class="btn btn-primary" v-on:click="addItem" ><b>+</b> Post Item</a>
  <a class="btn btn-primary" href=../components/Views/ ><b>+</b> View Item</a>
</div>
<div class="row col-lg-20 col-md-15 custyle">
  <table class="table table-striped custab">
  <thead>

      <tr>
          <th class="text-center">Item ID</th>
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
              <td class="text-center">{{item._id}}</td>
              <td class="text-center">{{item.name}}</td>
              <td class="text-center">{{item.price}}</td>
              <td class="text-center">{{item.type}}</td>
              <td class="text-center">{{item.description}}</td>
              <td class="text-center">{{item.createdAt}}</td>
              <td class="text-center">{{item.updatedAt}}</td>
              <td class="text-center">{{item.likes}}</td>
              <td class="text-center"><a class='btn btn-info btn-xs' v-on:click="editItem(item._id,item.name,item.price,item.type,item.description)"><span class="glyphicon glyphicon-edit"></span> Edit</a> <a class="btn btn-danger btn-xs" v-on:click="deleteRow(item._id)"><span class="glyphicon glyphicon-remove"></span> Delete</a>
              <a class='btn btn-success btn-xs' v-on:click="incrementlikes(item._id,item.likes)"><span class="glyphicon glyphicon-thumbs-up"></span> Like </a>
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
      axios.get('http://localhost:3000/api/user/getItems')
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
    addItem () {
      if (this.price == null) {
        axios.post('http://localhost:3000/api/user/createItem', {
          name: this.name,
          type: this.type,
          description: this.description
        })
        .then((response) => {
          window.location.reload()
          console.log(response)
        })
      } else {
        axios.post('http://localhost:3000/api/user/createItem', {
          name: this.name,
          price: this.price,
          type: this.type,
          description: this.description
        })
          .then((response) => {
            window.location.reload()
            console.log(response)
          })
      }
    },
    deleteRow (id) {
      axios.delete('http://localhost:3000/api/user/deleteItem/' + id)
      .then((response) => {
        window.location.reload()
        console.log(response)
      })
    },
    incrementlikes (id, li) {
      // this.sumLikes = this.sumLikes + li + 1,
      axios.patch('http://localhost:3000/api/user/updateLikes/' + id, {
        likes: this.sumLikes + li + 1
      })
      .then((response) => {
        window.location.reload()
        console.log(response)
      })
    },
    editItem: function (id, name, price, type, description) {
      var namee = prompt('Please enter edited name for ' + name)
      var pricee = prompt('Please enter edited price for ' + price)
      var typee = prompt('Please enter edited type for ' + type)
      var descriptionn = prompt('Please enter edited description for ' + description)
      if (namee != null && pricee != null && typee != null && descriptionn != null) {
        axios.patch('http://localhost:3000/api/user/updateItem/' + id, {
          name: namee,
          price: pricee,
          type: typee,
          description: descriptionn
        })
        .then((response) => {
          window.location.reload()
          console.log(response)
        })
      }
      if (namee != null && pricee == null && typee != null && descriptionn != null) {
        axios.patch('http://localhost:3000/api/user/updateItem/' + id, {
          name: namee,
          type: typee,
          description: descriptionn
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
