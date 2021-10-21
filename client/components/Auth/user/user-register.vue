<template>
  <div>
    <Steps :current="0" direction="vertical">
        <Step title="Step 1">
          <h1>Hey</h1>
        </Step>
        <Step title="Step 2" content="这里是该步骤的描述信息"></Step>
        <Step title="Step 3" content="这里是该步骤的描述信息"></Step>
        <Step title="Step 4" content="这里是该步骤的描述信息"></Step>
    </Steps>

  </div>
</template>

<script>
  export default {
    name: 'userRegister',
    
    data () {
      return {
        e13: 1,
      }
    },
    methods: {
      prev() {
        this.e13 -= 1;
      },
      next() {
        this.e13 += 1;
      }
    }
  }
</script>

<style>
  .theme--light.v-stepper, .v-card {
    box-shadow: none !important;
  }
  .v-card {
    background: #f8f9fa !important;
  }
  .progress-btn {
    top: 25%;
    left: 20%;
    font-weight: bolder;
  }
</style>