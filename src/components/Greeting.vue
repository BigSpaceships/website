<script setup lang="ts">

</script>

<template>
    <div class="greeting">
        <h1>Noah</h1>
        <h1>Hanford</h1>

        <h4>Software Engineering <span class="greeting-location">@ <a href="https://www.rit.edu/">RIT</a></span></h4>
    </div>
</template>

<style scoped>
.greeting {
    display: inline-block;

    text-align: left;

    margin: 160px 80px;
    padding: 20px;
}

h4 {
    font-size: 1.25em;
    font-weight: 300;

    color: var(--yellow);

    margin: 10px 7px;
}

h4 a, h4 a:visited {
    color: unset;
}

h1 {
    font-size: 6em;
    font-weight: 400;

    color: var(--blue-light);

    margin: -20px 0px;
}

@media screen and (max-width: 700px) {
    .greeting {
        margin: auto;

        text-align: center;
    }

    .greeting h1 {
        font-size: 3.4em;
    }
}
</style>
