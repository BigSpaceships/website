<script setup lang="ts">
import { onMounted } from "vue"
import Header from "./components/Header.vue"
import Stars from "./components/Stars.vue"

import { RouterView } from "vue-router";

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
    <Stars />
    <Header />
    <RouterView />
</template>

<style>
#app>* {
    position: relative;
    /* z-index: 1; */
}
</style>
