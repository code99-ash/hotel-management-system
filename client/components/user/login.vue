<template>
  <div>
    <form novalidate class="md-layout" @submit.prevent="validateUser">
      <md-card class="md-layout-item px-3">
        <md-card-header>
          <div class="md-title h1">
              <v-icon large class="mr-2">mdi-login</v-icon> Login
            </div>
        </md-card-header>

        <md-card-content>
            <h6 class="my-2 text-danger">{{result}}</h6>
            <md-field :class="getValidationClass('email')">
                <label for="email">Email</label>
                <md-input type="email" name="email" id="email" autocomplete="email" v-model="form.email" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.email.required">The email is required</span>
                <span class="md-error" v-else-if="!$v.form.email.email">Invalid email</span>
            </md-field>

            <md-field :class="getValidationClass('password')">
                <label>Password</label>
                <md-input v-model="form.password" type="password"></md-input>
                <span class="md-error" v-if="!$v.form.password.required">Password is required</span>
            </md-field>

        </md-card-content>


        <md-progress-bar md-mode="indeterminate" v-if="sending" />

        <md-card-actions>
          <md-button type="submit" class="bg-primary text-light" :disabled="sending">Sign in</md-button>
        </md-card-actions>
      </md-card>

      <md-snackbar :md-active.sync="userSaved">The user {{ lastUser }} was saved with success!</md-snackbar>
    </form>

  </div>
</template>

<script>
  import { validationMixin } from 'vuelidate'
//   import { mdiLogin } from "@mdi/js";
  import {
    required,
    email,
    minLength,
    maxLength
  } from 'vuelidate/lib/validators'

  export default {
    name: 'UserLogin',
    mixins: [validationMixin],
    data: () => ({
        resDialog: false,
        result: '',
        form: {
            email: null,
            password: null,
        },
        userSaved: false,
        sending: false,
        lastUser: null,
    }),
    validations: {
      form: {
        email: {
          required,
          email
        },
        password: {
          required,
        }
      }
    },
    computed: {
      cust() {
        return this.$store.state.customer;
      }
    },
    methods: {
      getValidationClass (fieldName) {
        const field = this.$v.form[fieldName]

        if (field) {
          return {
            'md-invalid': field.$invalid && field.$dirty
          }
        }
      },
      clearForm () {
        this.$v.$reset()
        this.form.email = null
        this.form.password = null
      },
      saveUser () {
        this.sending = true

        // Instead of this timeout, here you can call your API
        window.setTimeout(() => {
          this.lastUser = `${this.form.email}`
          this.userSaved = true
          this.sending = false
          this.clearForm()
        }, 1500)
      },
      validateUser () {
        this.$v.$touch()

        if (!this.$v.$invalid) {
          let fd = new FormData();
                    fd.append('email', this.form.email);
                    fd.append('password', this.form.password);
                    fd.append('customerLogin', true);
          this.sending = true;
          this.$axios.post(`/api/cust-auth.php`, fd).then(response => {
              var resp = response.data; 
              var token = resp.token;
              var expiresIn = resp.expiresIn;
              
              if(resp.message == 'success') {
                this.$cookies.set('XSRF_TOKEN', token, {
                  path: '/',
                  maxAge: 30 * 60
                });
                this.$cookies.set('user', resp.user, {path: '/', maxAge: 30 * 60});

                this.$store.dispatch('setToken', token);
                this.$store.state.auth.email = resp.user.email;
                this.$store.state.auth.user = resp.user;
                this.$router.push('/checkout');
              }else {
                this.sending = false;
                this.resDialog = true
                if(resp.message == 'failed') {
                  this.result = resp.content;
                }
              }
          })
          // .catch(err => {
          //   console.log(err)
          // })
        }
      }
    }
  }
</script>

<style scoped>
  .md-progress-bar {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
  }
  .vh-100 {
      height: 100% !important;
  }
</style>