<template>
  <div :class="wrapper">
    <div :class="button">Hello!!</div>
  </div>
</template>
<script lang="ts">
import { compose, tokens } from 'classy-ui'
import { defineComponent } from '@vue/composition-api'
export default defineComponent({
  setup() {
    return {
      wrapper: compose(tokens.display.FLEX, tokens.justifyContent.CENTER),
      button: compose(
        tokens.opacity.OPACITY_50,
        tokens.padding.SPACING_6,
        tokens.borderWidth.WIDTH_1,
        tokens.color.GRAY_800,
        tokens.backgroundColor.GRAY_400,
        tokens.borderRadius.MEDIUM,
      ),
    }
  },
})
</script>
