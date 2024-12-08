<script lang="ts" setup>
import { useTemplateRef } from 'vue';

const canvas = useTemplateRef("unity-canvas")
const warningBanner = useTemplateRef("unity-warning");

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
</script>

<template>
    <div id="unity-container" ref="unity-container" class="unity-desktop">
        <canvas id="unity-canvas" ref="unity-canvas" width=960 height=600 tabindex="-1"></canvas>
        <div id="unity-loading-bar">
            <div id="unity-logo"></div>
            <div id="unity-progress-bar-empty">
                <div id="unity-progress-bar-full"></div>
            </div>
        </div>
        <div id="unity-warning" ref="unity-warning"> </div>
        <div id="unity-footer">
            <div id="unity-logo-title-footer"></div>
            <div id="unity-fullscreen-button"></div>
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