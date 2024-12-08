<script lang="ts" setup>
import { ref, useTemplateRef } from 'vue';

const canvas = useTemplateRef("unity-canvas")
const unityContainer = useTemplateRef("unity-container");
const warningBanner = useTemplateRef("unity-warning");
const loadingBar = useTemplateRef("unity-loading-bar");
// const loadingBarFull = useTemplateRef("unity-progress-bar-full");
const fullscreenButton = useTemplateRef("unity-fullscreen-button");

const loadingProgress = ref(0);

const props = defineProps<{
    gameName: string,
}>();

function updateBannerVisibility() {
    if (warningBanner.value != null) {
        warningBanner.value.style.display = warningBanner.value.children.length ? 'block' : 'none';

    }
}

function unityShowBanner(msg: string, type: string) {
    if (warningBanner.value == null) {
        return;
    }

    var div = document.createElement('div');
    div.innerHTML = msg;
    warningBanner.value.appendChild(div);
    if (type == 'error') {
        div.classList.add("error");
    }
    else {
        if (type == 'warning') {
            div.classList.add("warning");
        }
        setTimeout(function () {
            warningBanner.value?.removeChild(div);
            updateBannerVisibility();
        }, 5000);
    }
    updateBannerVisibility();
}

var baseUrl = "builds.noahhanford.com/" + props.gameName;

var buildUrl = baseUrl + "/Build";
var loaderUrl = buildUrl + "/WebGL.loader.js";
var config = {
    arguments: [],
    dataUrl: buildUrl + "/WebGL.data",
    frameworkUrl: buildUrl + "/WebGL.framework.js",
    codeUrl: buildUrl + "/WebGL.wasm",
    streamingAssetsUrl: baseUrl + "/StreamingAssets",
    companyName: "DefaultCompany",
    productName: "MiniTank",
    productVersion: "0.1",
    showBanner: unityShowBanner,
};

if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
    // Mobile device style: fill the whole browser client area with the game canvas:

    // TODO: make this be removed when we leave as well
    var meta = document.createElement('meta');
    meta.name = 'viewport';
    meta.content = 'width=device-width, height=device-height, initial-scale=1.0, user-scalable=no, shrink-to-fit=yes';
    document.getElementsByTagName('head')[0].appendChild(meta);
    unityContainer.value!.className = "unity-mobile";
    canvas.value!.className = "unity-mobile";

    // To lower canvas resolution on mobile devices to gain some
    // performance, uncomment the following line:
    // config.devicePixelRatio = 1;


} else {
    // Desktop style: Render the game canvas in a window that can be maximized to fullscreen:
    canvas.value!.style.width = "960px";
    canvas.value!.style.height = "600px";
}

loadingBar.value!.style.display = "block";
var script = document.createElement("script");
script.src = loaderUrl;
script.onload = () => {
// TODO: id rather not do this
// @ts-ignore 
    createUnityInstance(canvas, config, (progress: number) => {
        loadingProgress.value = progress;
    }).then((unityInstance: any) => {
        loadingBar.value!.style.display = "none";
        fullscreenButton.value!.onclick = () => {
            unityInstance.SetFullscreen(1);
        };

    }).catch((message: any) => {
        alert(message);
    });
};

unityContainer.value?.appendChild(script);
</script>

<template>
    <div id="unity-container" ref="unity-container" class="unity-desktop">
        <canvas id="unity-canvas" ref="unity-canvas" width=960 height=600 tabindex="-1"></canvas>
        <div id="unity-loading-bar" ref="unity-loading-bar">
            <div id="unity-logo"></div>
            <div id="unity-progress-bar-empty">
                <div id="unity-progress-bar-full" ref="unity-progress-bar-full" :style="{ width: loadingProgress * 100 + 'px' }"></div>
            </div>
        </div>
        <div id="unity-warning" ref="unity-warning"> </div>
        <div id="unity-footer">
            <div id="unity-logo-title-footer"></div>
            <div id="unity-fullscreen-button" ref="unity-fullscreen-button"></div>
            <div id="unity-build-title">MiniTank</div>
        </div>
    </div>
</template>

<style>
#unity-warning div {
    padding: 10px;
}

#unity-warning div.error {
    background-color: red;
}

#unity-warning div.warning {
    background-color: yellow;
}
</style>
