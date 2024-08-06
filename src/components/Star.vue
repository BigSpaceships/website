<script lang="ts" setup>

const props = defineProps({
    x: Number,
    y: Number,
});
</script>

<template>
    <div class="star" :style="{top: props.y + 'px', left: props.x + 'px'}">
    </div>
</template>

<style scoped>
.star {
    background-color: white;

    width: 6px;
    height: 6px;

    position: absolute;
}
</style>
