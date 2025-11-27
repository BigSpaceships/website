<script lang="ts" setup>
import { ref, onMounted, onUnmounted, Ref } from "vue";

import Star from "./Star.vue"
import Color, { ColorInstance } from "color";

type Star = {
    x: number,
    y: number,
    vx: number,
    vy: number,
    scale: number,
    duration: number,
    startTime: number,
    color: ColorInstance,
}

const stars = ref([] as Star[]);

const starContainer: Ref<HTMLDivElement | null> = ref(null);

const mouseX = ref(0);
const mouseY = ref(0);

const click = ref(false);

let isMounted = false;

let lastTime = 0;

let nextRandomStarTime = 0;

function mouseClick(e: MouseEvent) {
    console.log("click");

    click.value = true;
    mouseX.value = e.offsetX;
    mouseY.value = e.offsetY;
}

function clickHandled() {
    click.value = false;
}

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

    if (click.value) {
        spawnStarCluster(currentTime);

        clickHandled();
    }

    if (nextRandomStarTime <= currentTime) {
        spawnRandomStar(currentTime);

        nextRandomStarTime = currentTime + Math.random() * 200 + 100;
    }

    lastTime = currentTime;

    window.requestAnimationFrame(updateStars);
}

function spawnStarCluster(currentTime: DOMHighResTimeStamp) {
    for (let i = 0; i < 25; i++) {
        const theta = Math.random() * Math.PI * 2;
        const dist = Math.random() * 4 + 1;

        const velocity = Math.random() * .08;

        const duration = Math.random() * 700 + 300;

        stars.value.push({
            x: mouseX.value + Math.cos(theta) * dist,
            y: mouseY.value + Math.sin(theta) * dist,
            vx: Math.cos(theta) * velocity,
            vy: Math.sin(theta) * velocity,
            duration,
            scale: Math.random() * 2 + 4,
            startTime: currentTime,
            color: Color('white'),
        });
    }
}

function spawnRandomStar(currentTime: DOMHighResTimeStamp) {
    if (starContainer.value == null) return;

    const width = starContainer.value.clientWidth;
    const height = window.innerHeight;
    const x = Math.random() * width;
    let y = (Math.random() * 2 - 1);

    const boundingRect = starContainer.value.getBoundingClientRect();

    const center = -boundingRect.y + window.innerHeight / 2;
    const halfHeight = height / 2;

    const newOffset = y + .2 * Math.pow(Math.abs(y) / 1.5, .3) * Math.sign(y);

    y = center + newOffset * halfHeight;

    const duration = Math.random() * 400 + 400;

    stars.value.push({
        x, y,
        vx: Math.random() * .03,
        vy: Math.random() * .04 - .01,
        duration,
        scale: Math.random() * 2 + 3,
        startTime: currentTime,
        color: Color('white')
    });
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
    <div class="star-container" ref="starContainer" @click="mouseClick">
        <Star v-for="star in stars" :x="star.x" :y="star.y"
            :scale="star.scale * easeSizeScale((lastTime - star.startTime) / star.duration)"
            :color="star.color"/>
    </div>
</template>

<style scoped>
.star-container {
    position: absolute!important;

    top: 0;
    left: 0;

    width: 100%;
    height: 100%;

    overflow: hidden;

    z-index: 0!important;
}
</style>
