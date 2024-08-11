<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue"
import Greeting from "./components/Greeting.vue"
import Stars from "./components/Stars.vue"

const mouseX = ref(0);
const mouseY = ref(0);

const click = ref(false);

function mouseMove(e: MouseEvent) {
    mouseX.value = e.clientX;
    mouseY.value = e.clientY;
}

function mouseClick(e: MouseEvent) {
    click.value = true;
    mouseX.value = e.clientX;
    mouseY.value = e.clientY;
}

function clickHandled() {
    click.value = false;
}

onMounted(() => {
    document.addEventListener("mousemove", mouseMove);
    document.addEventListener("mousedown", mouseClick);
});

onUnmounted(() => {
    document.removeEventListener("mousemove", mouseMove);
    document.removeEventListener("mousedown", mouseClick);
});
</script>

<template>
    <Greeting /> 
    <Stars :mouseX="mouseX" :mouseY="mouseY" :clicked="click" @processed-click="clickHandled"/>
</template>

<style scoped>
</style>
