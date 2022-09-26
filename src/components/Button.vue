<template>
    <div class="flex items-center justify-between">
        <button :class="className" type="button">
        {{ content }}
        </button>
    </div>
</template>

<script>
import emiter from '../main';    

export default {
    name: "Button",
    props: ['className', 'content'],
    data() {
        return {
            status: null,
        }
    },
    mounted() {
        emiter.on('set-disable-play', value => {
            this.status = value;
        })
    }
}
</script>

<style>

</style>