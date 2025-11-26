<template>
    <div class="moon-container">
        <img src="/Moon.svg" class="art moon" />
    </div>
</template>

<style>
.art {
    pointer-events: none;
    z-index: 1;
}

.art.moon {
    width: 40%;
    aspect-ratio: 1;

    float: right;
}

.moon-container {
    pointer-events: none;

    display: block;

    top: -250px;
}

@media only screen and (max-width: 760px) {
    .art.moon {
        width: 75%;
    }

    .moon-container {
        top: 250px;
        right: -30px;
    }
}
</style>
