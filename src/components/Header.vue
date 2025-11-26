<script setup lang="ts">
import NavLink from "./NavLink.vue"

</script>

<template>
    <header>
        <nav>
            <ul>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/tanks">Tanks</NavLink>
            </ul>
        </nav>
    </header>
</template>

<style>

header nav ul {
    padding: 0px;
    margin: 0px;


    text-align: right;
}

@media screen and (max-width: 700px) {
    header {
        display: none;
    }
}

</style>
