<template>
    <div class="flex justify-center">
        <Button id="play" ref="play" @click="onClickPlay()" :content="`&#9654; `" :className="`text-blue-500`"
            style="font-size: 50px;" />
        <Button id="pause" ref="pause" @click="onClickPause()" :content="`&#9208; `" :className="`text-blue-500`"
            style="font-size: 50px;" />
        <Button id="speed" ref="speed" @click="onSpeedSimulation()" :content="`&#9193; `" :className="`text-blue-500`" style="font-size: 50px;" />
    </div>
</template>

<script>
import emiter from '../main';
import Button from './Button.vue';

export default {
    name: 'SimulationControl',
    components: { Button },
    data() {
        return {
            startSimulation: null,
            pauseSimulation: null,
            speedSimulation: null,
            playDisableStatus: false,
            pauseDisableStatus: false,
            speedDisableStatus: false,
        }
    },
    methods: {
        onClickPlay() {
            this.startSimulation();
        },
        onClickPause() {
            this.pauseSimulation();
        },
        onSpeedSimulation() {
            this.speedSimulation();
        }
    },
    mounted() {
        emiter.on('start-simulation', value => {
            this.startSimulation = value;
        });
        emiter.on('pause-simulation', value => {
            this.pauseSimulation = value;
        });
        emiter.on('speed-simulation', value => {
            this.speedSimulation = value;
        });
    }
}
</script>

<style>

</style>