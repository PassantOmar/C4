<template>
    <div class="row">
      <div class="col-lg-4 col-md-5">
        <SignUp>
        </SignUp>
      </div>
      <div class="col-lg-8 col-md-7">
        <SignIn>
        </SignIn>
      </div>
    </div>
</template>
<script>
import SignUp from 'src/components/Dashboard/Views/SignUp.vue'
import SignIn from 'src/components/Dashboard/Views/SignIn.vue'
export default {
  components: {
    SignUp,
    SignIn
  }
}

</script>
