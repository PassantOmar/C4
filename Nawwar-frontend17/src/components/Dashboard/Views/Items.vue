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
<!-- text boxes for the user to input the items attributes -->
<div>

<label>______________________________________________________________ </label>
<br></br>
  <a class="btn btn-primary" v-on:click="addItem" ><b>+</b> Post Item</a>
  <a class="btn btn-primary" href="http://localhost:8080/#/admin/Item" ><b>+</b> View Items</a>
  <!-- a button to add new items -->
</div>
  </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      name: '',
      price: '',
      type: '',
      description: ''
    }
  },
  methods: {
    addItem () {
      // method for adding an item which connects to createItem in the backend
      if (this.price == null) {
        axios.post('http://localhost:3000/api/item/createItem', {
          name: this.name,
          type: this.type,
          description: this.description
          //  adds item if all attributes except price are given as inputs
        },
          {
            headers: { authorization: sessionStorage.getItem('token') }
            //  retrieves the users token to allow the authorization
          })
        .then((response) => {
          window.location.reload()
          console.log(response)
        })
      } else {
        axios.post('http://localhost:3000/api/item/createItem', {
          name: this.name,
          price: this.price,
          type: this.type,
          description: this.description
          //  adds item if all attributes are given as inputs
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
    }
  }
}
</script>
