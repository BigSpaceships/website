<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from "vue";

import Star from "./Star.vue"

type Star = {
    x: number,
    y: number,
    vx: number,
    vy: number,
    scale: number,
    duration: number,
    startTime: number,
}

const stars = ref([] as Star[]);

const props = defineProps({
    mouseX: { type: Number, required: true },
    mouseY: { type: Number, required: true },
    clicked: { type: Boolean, required: true },
});

const emit = defineEmits<{
    (e: "processedClick"): void
}>();

let isMounted = false;

let lastTime = 0;

function updateStars(currentTime: DOMHighResTimeStamp) {
    if (!isMounted) {
        return;
    }

    const deltaTime = lastTime - currentTime;

    for (let i = 0; i < stars.value.length; i++) {
        if (stars.value[i].duration + stars.value[i].startTime <= currentTime) {
            stars.value.splice(i, 1);

            i--;

            continue;
        }

        stars.value[i].x += stars.value[i].vx * deltaTime;
        stars.value[i].y += stars.value[i].vy * deltaTime;

        stars.value[i].vy += .0001 * deltaTime;
    }

    if (props.clicked) {
        spawnStar(currentTime);

        emit("processedClick");
    }

    lastTime = currentTime;

    window.requestAnimationFrame(updateStars);
}

function spawnStar(currentTime: DOMHighResTimeStamp) {
    for (let i = 0; i < 25; i++) {
        const theta = Math.random() * Math.PI * 2;
        const dist = Math.random() * 4 + 1;

        const velocity = Math.random() * .08;

        const duration = Math.random() * 700 + 300;

        stars.value.push({
            x: props.mouseX + Math.cos(theta) * dist,
            y: props.mouseY + Math.sin(theta) * dist,
            vx: Math.cos(theta) * velocity,
            vy: Math.sin(theta) * velocity,
            duration,
            scale: Math.random() * 2 + 4,
            startTime: currentTime,
        });
    }
}

function easeSizeScale(progress: number): number {
    return 1 - 0.6 * Math.exp(3 * (progress - 1));
}

onMounted(() => {
    isMounted = true;

    window.requestAnimationFrame(updateStars);
});

onUnmounted(() => {
    isMounted = false;
});
</script>

<template>
    <div class="star-container">
        <Star v-for="star in stars" :x="star.x" :y="star.y" :scale="star.scale * easeSizeScale((lastTime - star.startTime) / star.duration)"/>
    </div>
</template>

<style scoped>
.star-container {
    position: absolute;

    top: 0;
    left: 0;

    width: 100%;
    height: 100%;
    z-index: 10;
}
</style>
