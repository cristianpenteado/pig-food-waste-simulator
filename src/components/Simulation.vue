<template>
  <Header />
  <main class="grid grid-cols-2 gap-2">
    <section>
      <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" :for="numberAnimals">
            Quantidade de animais
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            :id="numberAnimals" type="number" v-model="numberAnimals" :min="1">
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" :for="consumptionGrams">
            Consumo por animail (em gramas)
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            :id="consumptionGrams" v-model="consumptionGrams" :min="100" type="number">
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" :for="feedPrice">
            Preço da ração (R$)
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            :id="feedPrice" type="number" v-model="feedPrice">
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" :for="period">
            Período (em anos)
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            :id="period" type="number" v-model="period" min="1">
        </div>
        <Button content="Simular"
          :className="'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'"
          @click="activatePlayer" />
      </form>
    </section>
    <aside>
      <Data />
    </aside>
  </main>
  <div id="simulation" ref="simulation" class="off">
    <SimulationControl />
    <ProgressBar />
  </div>

</template>
  
<script >
import Input from './Input.vue';
import Header from './Header.vue';
import MyChart from './MyChart.vue';
import ProgressBar from './ProgressBar.vue';
import Button from './Button.vue';
import SimulationControl from './SimulationControl.vue';
import Data from './Data.vue';
import emiter from '../main';


export default {
  name: "Simulation",
  components: {
    Button,
    Data,
    Header,
    Input,
    MyChart,
    ProgressBar,
    SimulationControl
  },
  data: function () {
    return {
      consumptionGrams: 3000,
      period: 1,
      feedPrice: 2.3,
      numberAnimals: 100,
      westLost: [],
      delayInMs: 1000,
      moneyLost: [],
      manualFlow: [],
    }
  },
  methods: {
    activatePlayer() {
      this.$refs.simulation.classList.toggle("on");
    },
    generateRandomWaste() {
      return parseFloat((Math.random() * (0.06 - 0.001) + 0.001).toFixed(2));
    },
    async controlTimeSimulation() {
      const time = this.period * 12;

      for (let i = 0; i < time; i++) {
        this.manualFlowCalculation();
        await this.delay(this.delayInMs);
      }
    },
    delay(time) {
      return new Promise(resolve => setTimeout(resolve, time));
    },
    manualFlowCalculation() {
      let wastingWhenTreating = 0;
      let wastingTooMuchRation = 0;
      let wastingUneatenRation = 0;
      let wastingRationByTheAnimal = 0;
      let wasteTotalMonth = 0;

      let wastingOfRationTrolley = this.wastingOfRationTrolley();

      for (let i = 0; i < 30; i++) {
        let consumptionAccumulatedGrams = this.consumptionGrams;
        let firstWaste = this.wastingWhenTreating(consumptionAccumulatedGrams);
        consumptionAccumulatedGrams = consumptionAccumulatedGrams - (firstWaste / this.numberAnimals);
        wastingWhenTreating = wastingWhenTreating + firstWaste;


        let secondWaste = this.wastingTooMuchRation(consumptionAccumulatedGrams);
        consumptionAccumulatedGrams = consumptionAccumulatedGrams - (secondWaste / this.numberAnimals);
        wastingTooMuchRation = wastingTooMuchRation + secondWaste;

        let thirdWaste = this.wastingUneatenRation(consumptionAccumulatedGrams);
        consumptionAccumulatedGrams = consumptionAccumulatedGrams - (thirdWaste / this.numberAnimals);
        wastingUneatenRation = wastingUneatenRation + thirdWaste;

        let fourthWaste = this.wastingRationByTheAnimal(consumptionAccumulatedGrams);
        consumptionAccumulatedGrams = consumptionAccumulatedGrams - (fourthWaste / this.numberAnimals);
        wastingRationByTheAnimal = wastingRationByTheAnimal + fourthWaste;
      }

      wasteTotalMonth = wastingWhenTreating + wastingTooMuchRation + wastingUneatenRation + wastingRationByTheAnimal + wastingOfRationTrolley;
      console.log(wasteTotalMonth / 1000)
      this.manualFlow.push({
        wastingWhenTreating: wastingWhenTreating,
        wastingTooMuchRation: wastingTooMuchRation,
        wastingUneatenRation: wastingUneatenRation,
        wastingRationByTheAnimal: wastingRationByTheAnimal,
        wasteTotalMonth: wasteTotalMonth,
        wastingOfRationTrolley: wastingOfRationTrolley,
        totalAccumulatedWaste: this.manualFlow.length == 0 ? wasteTotalMonth : (this.manualFlow[this.manualFlow.length - 1].totalAccumulatedWaste + wasteTotalMonth),
        moneyLostMonthly: (wasteTotalMonth / 1000) * this.feedPrice,
        totalAccumulatedLostMoney: this.manualFlow.length == 0 ? ((wasteTotalMonth / 1000) * this.feedPrice) : (this.manualFlow[this.manualFlow.length - 1].totalAccumulatedLostMoney + ((wasteTotalMonth / 1000) * this.feedPrice)),
        consumedRationAccumulatedMonth: (this.consumptionGrams * this.numberAnimals) * 30,
        consumedRationAccumulated: this.manualFlow.length == 0 ? ((this.consumptionGrams * this.numberAnimals) * 30) : (this.manualFlow[this.manualFlow.length - 1].consumedRationAccumulated + ((this.consumptionGrams * this.numberAnimals) * 30)),
      })
      this.moneyLost.push(this.manualFlow[this.manualFlow.length - 1].totalAccumulatedLostMoney)
      this.westLost.push(this.manualFlow[this.manualFlow.length - 1].totalAccumulatedWaste)
      console.log(this.manualFlow)
      if (this.manualFlow.length > 0) {
        emiter.emit('send-data', this.manualFlow);
        emiter.emit('send-data-chart', this.moneyLost);
      }
    },
    wastingOfRationTrolley() {
      return ((this.generateRandomWaste() * (this.consumptionGrams * this.numberAnimals)) * 7);
    },

    wastingWhenTreating(value) {
      return ((this.generateRandomWaste() * (value * this.numberAnimals)));
    },

    wastingTooMuchRation(value) {
      return ((this.generateRandomWaste() * (value * this.numberAnimals)));
    },

    wastingUneatenRation(value) {
      return ((this.generateRandomWaste() * (value * this.numberAnimals)));
    },

    wastingRationByTheAnimal(value) {
      return ((this.generateRandomWaste() * (value * this.numberAnimals)));
    },

    generateRandomWaste() {
      const randomWastePercentage = (Math.random() * (0.06 - 0.001) + 0.001);
      return parseFloat(randomWastePercentage.toFixed(3));
    },

    onPause() {
      console.log(this.delayInMs)
      if (this.delayInMs == 10000000) {
        this.delayInMs = 1000
      }
      else {
        this.delayInMs = 10000000
      }
    },
    onTimer() {
      this.delayInMs = this.delayInMs - 100
    },
  },
  mounted() {
    emiter.emit('start-simulation', this.controlTimeSimulation);
    emiter.emit('pause-simulation', this.onPause);
    emiter.emit('speed-simulation', this.onTimer);
  },
};
</script>
  
<style>
.off {
  display: none;
}

.on {
  display: block;
}
</style>