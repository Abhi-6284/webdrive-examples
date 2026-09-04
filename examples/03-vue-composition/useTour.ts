import { ref, onMounted, onUnmounted } from "vue";
import { WebDrive, type WebDriveOptions } from "webdrive";

export function useTour(options: WebDriveOptions) {
  const tour = ref<WebDrive | null>(null);
  const isActive = ref(false);

  onMounted(() => {
    tour.value = new WebDrive({
      ...options,
      onStart: () => {
        isActive.value = true;
        options.onStart?.();
      },
      onClose: () => {
        isActive.value = false;
        options.onClose?.();
      },
      onComplete: () => {
        isActive.value = false;
        options.onComplete?.();
      },
    });
  });

  onUnmounted(() => {
    tour.value?.destroy();
  });

  const start = (index: number = 0) => tour.value?.start(index);
  const stop = () => tour.value?.stop();
  const next = () => tour.value?.next();
  const previous = () => tour.value?.previous();

  return {
    tour,
    isActive,
    start,
    stop,
    next,
    previous,
  };
}
