<script setup lang="ts">
import { useTour } from "./useTour";
import "webdrive/styles.css";

const { start, isActive } = useTour({
  id: "vue-demo-tour",
  steps: [
    {
      element: "#vue-banner",
      title: "Vue 3 Integration",
      description: "Seamless product walkthroughs powered by Vue 3 Composition API.",
      position: "bottom"
    },
    {
      element: "#vue-card",
      title: "Reactive State",
      description: "WebDrive highlights elements cleanly across Vue reactivity.",
      position: "top"
    }
  ]
});
</script>

<template>
  <div style="font-family: sans-serif; padding: 40px; max-width: 600px; margin: auto;">
    <header id="vue-banner">
      <h1>Vue 3 Composition API Showcase</h1>
      <p>Framework-agnostic tours in Vue 3.</p>
    </header>

    <div id="vue-card" style="margin-top: 30px; border: 1px solid #ddd; padding: 20px; border-radius: 8px;">
      <p>This is a reactive Vue component card.</p>
      <button
        @click="start(0)"
        :disabled="isActive"
        style="padding: 8px 16px; background: #42b883; color: #fff; border: none; border-radius: 4px; cursor: pointer;"
      >
        Launch Vue Tour
      </button>
    </div>
  </div>
</template>
