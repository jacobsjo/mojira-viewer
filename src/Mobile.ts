import { createSharedComposable, useWindowSize } from '@vueuse/core'
import { computed } from 'vue'
const { width, height } = useWindowSize()

export const useIsMobile = createSharedComposable(() => computed(() => width.value <= 800))
