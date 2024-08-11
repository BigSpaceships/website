<script lang="ts" setup>
const props = defineProps({
    x: { type: Number, required: true },
    y: { type: Number, required: true },
    scale: { type: Number, required: true },
});
</script>

<template>
    <div class="star" :style="{ top: props.y + 'px', left: props.x + 'px', width: props.scale + 'px' }">
    </div>
</template>

<style scoped>
.star {
    background-color: white;

    aspect-ratio: 1;

    position: absolute;
}
</style>
