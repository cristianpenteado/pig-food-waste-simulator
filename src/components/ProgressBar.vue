<template>
    <div class="w-full h-6 bg-gray-200 rounded-full dark:bg-gray-700" style="width: 50%; margin: auto;">
        <div class="h-6 bg-blue-600 rounded-full dark:bg-blue-500" ref="progressBar" :style="`width: 45%`"></div>
    </div>
</template>

<script>
export default {
    name: 'ProgressBar',
    data(){
        return {
            progres: 0,
        }
    },
    mounted() {
    }
}
</script>

<style>

</style>