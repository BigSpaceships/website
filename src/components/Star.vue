<script lang="ts" setup>
import Color from 'color';

const props = defineProps({
    x: { type: Number, required: true },
    y: { type: Number, required: true },
    scale: { type: Number, required: true },
    color: { type: Color, required: true },
});
</script>

<template>
    <div class="star" :style="{ top: props.y + 'px', left: props.x + 'px', width: props.scale + 'px', backgroundColor: props.color.string() }">
    </div>
</template>

<style scoped>
.star {
    aspect-ratio: 1;

    position: absolute;
}
</style>
