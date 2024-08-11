<script lang="ts" setup>

const props = defineProps({
    x: { type: Number, required: true },
    y: { type: Number, required: true },
});
</script>

<template>
    <div class="star" :style="{ top: props.y + 'px', left: props.x + 'px' }">
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
