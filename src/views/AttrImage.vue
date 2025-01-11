
<template>
  <div class="image-container">
    <t-image
      src="/images/attr.jpg"
      alt="幻兽帕鲁属性克制图"
      fit="cover"
      class="centered-image"
    />
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.image-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* 使图片垂直居中 */
}

.centered-image {
  max-width: 100%; /* 限制图片最大宽度 */
  max-height: 100%; /* 限制图片最大高度 */
}
</style>
