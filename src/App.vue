<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue"
import Greeting from "./components/Greeting.vue"
import Stars from "./components/Stars.vue"

onMounted(() => {
    const elements = document.getElementsByClassName("no-stars");
    for (let i = 0; i < elements.length; i++) {
        const element = elements[i] as HTMLElement;

        element.addEventListener("mousedown", (e: MouseEvent) => {
            e.stopPropagation();
        });
    }
});
</script>

<template>
    <Greeting class="no-stars"/>
    <Stars />
</template>

<style>
#app > * {
    position: relative;
    z-index: 1;
}
</style>
