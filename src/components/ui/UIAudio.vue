<template>
  <div class="audio">
    <div>
      <p class="audio__name">{{ fileName }}.mp3</p>
    </div>

    <div class="mt-2 flex items-center gap-3">
      <button
        class="audio__btn"
        @click="togglePlay"
      >
        <svg
          v-if="isPlaying"
          class="h-5 w-5"
        >
          <use xlink:href="@/assets/icons/sprites/btns.svg#pause"></use>
        </svg>
        <svg
          v-else
          class="h-5 w-5"
        >
          <use xlink:href="@/assets/icons/sprites/btns.svg#play"></use>
        </svg>
      </button>
      <span class="audio__time">{{ currentTime }} / {{ duration }}</span>
      <input
        class="audio__range"
        :class="{
          'mr-9': visibleSoundSettings,
        }"
        type="range"
        value="0"
        :max="maxProgress"
        v-model="currentProgress"
        @input="seekAudio"
      />
      <div
        class="audio__sound"
        :class="{
          'audio__sound--active': visibleSoundSettings,
        }"
      >
        <div class="audio__sound-wrapper">
          <button
            class="audio__sound-btn"
            @click="visibleSoundSettings = !visibleSoundSettings"
          >
            <svg
              class="h-5 w-5"
              :class="{
                'rotate-90': visibleSoundSettings,
              }"
            >
              <use xlink:href="@/assets/icons/sprites/btns.svg#sound"></use>
            </svg>
          </button>

          <input
            type="range"
            class="audio__sound-range"
            value="100"
            step="1"
          />
        </div>
      </div>

      <audio
        ref="audioPlayer"
        :src="src"
        type="audio/mp3"
      ></audio>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, ref, onMounted } from 'vue';

interface IProps {
  src: string;
  fileName: string;
}

defineProps<IProps>();

const isPlaying = ref(false);
const audioPlayer = ref<HTMLAudioElement | null>(null);
const currentTime = ref('00:00');
const duration = ref('00:00');
const currentProgress = ref(0);
const maxProgress = ref(0);
const visibleSoundSettings = ref(false);

function togglePlay() {
  if (!audioPlayer.value) return;

  if (audioPlayer.value.paused) {
    audioPlayer.value.play();
  } else {
    audioPlayer.value.pause();
  }

  isPlaying.value = !audioPlayer.value.paused;
}

function updateTime() {
  if (!audioPlayer.value) return;

  currentTime.value = formatTime(audioPlayer.value.currentTime);
  currentProgress.value = audioPlayer.value.currentTime;
}

function loadMetadata() {
  if (!audioPlayer.value) return;

  duration.value = formatTime(audioPlayer.value.duration);
  maxProgress.value = audioPlayer.value.duration;
}

function seekAudio() {
  if (!audioPlayer.value) return;

  audioPlayer.value.currentTime = currentProgress.value;
}

function formatTime(seconds: number): string {
  const rounded = Math.floor(seconds);
  const minutes = Math.floor(rounded / 60)
    .toString()
    .padStart(2, '0');
  const remainingSeconds = (rounded % 60).toString().padStart(2, '0');
  return `${minutes}:${remainingSeconds}`;
}

onMounted(() => {
  if (audioPlayer.value) {
    audioPlayer.value.addEventListener('loadedmetadata', loadMetadata);
    audioPlayer.value.addEventListener('timeupdate', updateTime);
  }
});
</script>

<style scoped>
.audio {
  @apply relative flex w-full flex-col rounded-lg border border-solid border-gray-100 p-3.5;
}

.audio__btn {
  @apply flex h-9 w-9 min-w-9 items-center justify-center rounded-full bg-purple-800;
}

.audio__name {
  @apply text-xs font-medium text-gray-900;
}

.audio__time {
  @apply block min-w-max text-xs text-gray-700;
}

.audio__range {
  @apply w-full;
}

.audio__sound {
  @apply h-5 w-5;
}

.audio__sound-range {
  @apply hidden h-full w-full;
}

.audio__sound-wrapper {
  @apply flex items-center justify-center;
}

.audio__sound--active {
  @apply absolute -right-5 bottom-12 h-auto w-auto rotate-270 rounded-md border border-solid border-blue-gray-100 bg-white px-2 py-1;
}

.audio__sound--active .audio__sound-wrapper {
  @apply flex w-20 gap-1;
}

.audio__sound--active .audio__sound-range {
  @apply block;
}
</style>
