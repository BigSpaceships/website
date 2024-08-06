<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from "vue";

import Star from "./Star.vue"

type Star = {
    x: Number,
    y: Number,
}

let updateId = 0;

const stars = ref([] as Star[]);

const props = defineProps({
    mouseX: Number,
    mouseY: Number,
});

function updateStars() {
    stars.value.push({
        x: props.mouseX,
        y: props.mouseY,
    });
}

onMounted(() => {
    updateId = window.setInterval(updateStars, 100);
});

onUnmounted(() => {
    window.clearInterval(updateId);
});
</script>

<template>
    <div class="star-container">
        <Star v-for="star in stars" :x="star.x" :y="star.y" />
    </div>
</template>

<style scoped>
    .star-container {
        position: fixed;
        
        top: 0;
        left: 0;

        width: 100%;
        height: 100%;
        z-index: 10;
    }
</style>
