<template>
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" :for="inputId">
        {{ myLabel }}
      </label>
      <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" :id="inputId" type="number" :value="myValue">
    </div>
</template>
<script>
export default {
    name: "Input",
    props: {
        myLabel: String,
        inputId: String,
        myValue: String,
    },
    data: function() {
        return {}
    }, 
    methods: {
      onSubmit() {

      }
    }
}
</script>
<style>
    
</style>