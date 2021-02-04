<template>
  <div>
    <form novalidate class="md-layout" @submit.prevent="validateUser">
      <md-card class="md-layout-item md-small-size-100 px-3">
        <md-card-header>
            <div class="md-title h1">
              <v-icon large class="mr-2">mdi-login</v-icon> Register
            </div>
            <button class="btn-default float-right ml-auto mr-2" @click="$emit('closeSignup')">
                <v-icon medium>mdi-close</v-icon>
            </button>
        </md-card-header>
        <md-card-content>
        <h6 class="my-2 text-info">{{res}}</h6>
            <md-field :class="getValidationClass('fullName')">
                <label for="first-name">Full Name</label>
                <md-input name="first-name" id="first-name" autocomplete="given-name" v-model="form.fullName" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.fullName.required">Your full name is required</span>
            </md-field>

            <div class="row">
              <div class="col-md-6">
                <md-field :class="getValidationClass('email')">
                    <label for="email">Email</label>
                    <md-input type="email" name="email" id="email" autocomplete="email" v-model="form.email" :disabled="sending" />
                    <span class="md-error" v-if="!$v.form.email.required">The email is required</span>
                    <span class="md-error" v-else-if="!$v.form.email.email">Invalid email</span>
                </md-field>
              </div>
              <div class="col-md-6">
                <md-field :class="getValidationClass('phoneNo')">
                    <label for="email">Phone Number</label>
                    <md-input type="tel" name="phoneNo" id="phoneNo" autocomplete="phoneNo" v-model="form.phoneNo" :disabled="sending" />
                    <span class="md-error" v-if="!$v.form.phoneNo.required">Phone number is required</span>
                </md-field>
              </div>
            </div>


            <md-field :class="getValidationClass('address')">
                <label for="email">Address</label>
                <md-input type="text" name="address" id="address" autocomplete="address" v-model="form.address" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.address.required">Address is required</span>
            </md-field>

            <md-field :class="getValidationClass('password')">
                <label>Password</label>
                <md-input v-model="form.password" type="password"></md-input>
                <span class="md-error" v-if="!$v.form.password.required">Password is required</span>
            </md-field>

            <md-field :class="getValidationClass('confirmPassword')">
                <label>Confirm Password</label>
                <md-input v-model="form.confirmPassword" type="password"></md-input>
                <span class="md-error" v-if="!$v.form.confirmPassword.sameAsPassword">Passwords do not match</span>
            </md-field>
        </md-card-content>

        <md-progress-bar md-mode="indeterminate" v-if="sending" />

        <md-card-actions>
          <md-button type="submit" class="md-primary" :disabled="sending">Create user</md-button>
        </md-card-actions>
      </md-card>

    </form>
  </div>
</template>

<script>
  import { validationMixin } from 'vuelidate'
  import {
    required,
    email,
    sameAs
  } from 'vuelidate/lib/validators'

  export default {
    name: 'UserSignup',
    mixins: [validationMixin],
    data: () => ({
        res: '',
        form: {
            fullName: null,
            gender: null,
            email: null,
            password: null,
            confirmPassword: null,
        },
        userSaved: false,
        sending: false,
        lastUser: null
    }),
    validations: {
      form: {
        fullName: {
          required,
        },
        phoneNo: {
          required
        },
        address: {
          required
        },
        email: {
          required,
          email
        },
        password: {
          required,
        },
        confirmPassword: {
          sameAsPassword: sameAs('password')
        }
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
        this.form.fullName = null
        this.form.address = null
        this.form.phoneNo = null
        this.form.email = null
        this.form.password = null
        this.form.confirmPassword = null
        this.$emit('closeSignup')
      },
      saveUser () {
        this.sending = true

        // Instead of this timeout, here you can call your API
        window.setTimeout(() => {
          this.lastUser = `${this.form.fullName}`
          this.userSaved = true
          this.sending = false
          this.clearForm()
        }, 1500)
      },
      validateUser () {
        this.$v.$touch()

        if (!this.$v.$invalid) {
          let fd = new FormData();
                    fd.append('fullName', this.form.fullName);
                    fd.append('email', this.form.email);
                    fd.append('phoneNo', this.form.phoneNo);
                    fd.append('address', this.form.address);
                    fd.append('password', this.form.password);
                    fd.append('newCustomer', true);
          this.$axios.post(`/api/cust-auth.php`, fd).then(response => { 
                    this.res = response.data;
                    console.log(response.data)
                }).catch(err => {
                    console.log(err)
                });
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
</style>