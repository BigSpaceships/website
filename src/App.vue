<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue"
import Greeting from "./components/Greeting.vue"
import Stars from "./components/Stars.vue"

const mouseX = ref(0);
const mouseY = ref(0);

function mouseMove(e: MouseEvent) {
    mouseX.value = e.clientX;
    mouseY.value = e.clientY;
}

onMounted(() => {
    document.addEventListener("mousemove", mouseMove);
});

onUnmounted(() => {
    document.removeEventListener("mousemove", mousemove);
});
</script>

<template>
    <Greeting /> 
    <Stars :mouseX="mouseX" :mouseY="mouseY"/>
</template>

<style scoped>
</style>
