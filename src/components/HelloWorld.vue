<template>
  <div class="root">
      hello {{this.name}}
  </div>
</template>

<script>
export default {
    name:'HelloWorld',
    data(){
        return {
            name:'vue1'
        }
    }
}
</script>

<style>
.root{
    color: aquamarine;
}
</style>