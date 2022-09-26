<template>
  <div class="w-full grid grid-cols-2">
    <div class="w-full col-span-1">
      <h1 class="text-2xl font-bold text-center mt-2">Informações:</h1>
      <ul class="w-full p-4">
        <li class="flex justify-between w-full bg-slate-100 my-2 p-4 rounded-md">
          Quantidade de ração disperdiçada (KG):
          <span v-if="manualFlow.length != 0" class="font-bold text-red-700">{{(manualFlow[manualFlow.length - 1].totalAccumulatedWaste/1000).toFixed(2)}}</span>
        </li>
        <li class="flex justify-between w-full bg-slate-100 my-2 p-4 rounded-md">
          Dinheiro perdido com ração (R$):
          <span v-if="manualFlow.length != 0" class="font-bold text-red-700">{{(manualFlow[manualFlow.length - 1].totalAccumulatedLostMoney).toFixed(2)}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import emiter from '../main';

export default {
name: 'Data',
data() {
  return {
    manualFlow: []
  }
},
mounted() {
  emiter.on('send-data', value => {
    this.manualFlow = value
  });
}
}
</script>

<style>

</style>