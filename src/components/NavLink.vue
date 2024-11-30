<script setup lang="ts">
import { RouterLink, RouteLocationRaw } from 'vue-router';
defineProps<{
    to: RouteLocationRaw,
}>();
</script>

<template>
    <li class="nav-element">
        <RouterLink :to="to">
            <slot></slot>
        </RouterLink>
    </li>
</template>

<style>
li.nav-element {
    display: inline-block;

    margin: 0em 1em;

    list-style: none;

    font-size: 1.2em;
}

li.nav-element a {
    text-decoration: none;

    color: var(--blue-light-mid);

    position: relative;

    transition: color 100ms;
}

li.nav-element a.router-link-active {
    color: var(--yellow);
}

li.nav-element a::after {
    content: '';
    position: absolute;

    bottom: 0;
    left: 0;

    width: 100%;

    height: 2px;

    background-color: var(--blue-light-mid);

    border-radius: 1px;

    transform: scale(0);
    transform-origin: center;

    transition: transform 100ms ease-out;
}

li.nav-element a.router-link-active::after {
    /* background-color: var(--yellow); 
       */
}

li.nav-element a:not(.router-link-active):hover::after {
    transform: scale(1);
}
</style>
