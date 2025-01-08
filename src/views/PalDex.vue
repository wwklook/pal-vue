<script setup lang="ts">
import { ref } from 'vue'
import palData from '@/assets/palData'

// 定义选项接口
interface Option {
  value: string
  label: string
  avatar: string
  alt: string
}

const getImageUrl = (name: string) => {
  try {
    return new URL(`../assets/images/${name}.webp`, import.meta.url).href
  } catch {
    return new URL(`../assets/images/default.webp`, import.meta.url).href
  }
}

// 处理图片路径
const options = palData.map(pal => ({
  ...pal,
  avatar: getImageUrl(pal.value)
}))

</script>

<template>
  <main>
    <t-typography>
      <h2>帕鲁图鉴</h2>
      <t-text>共 {{ options.length }} 只帕鲁</t-text>
    </t-typography>
    <div class="pal-list">
      <t-card
        v-for="pal in options"
        :key="pal.value"
        :hover="true"
        class="pal-card"
      >
        <template #cover>
          <t-image
            :src="pal.avatar"
            :alt="pal.alt"
            class="pal-avatar"
            fit="contain"
          />
        </template>
        <template #footer>
          <div class="pal-name">{{ pal.label }}</div>
        </template>
      </t-card>
    </div>
  </main>
</template>
<style lang="scss" scoped>
.tdesign-demo__select-input-ul-single {
  display: flex;
  flex-direction: column;
  padding: 0;
  gap: 2px;
}
.tdesign-demo__select-input-ul-single > li {
  display: block;
  border-radius: 3px;
  line-height: 22px;
  cursor: pointer;
  padding: 3px 8px;
  color: var(--td-text-color-primary);
  transition: background-color 0.2s linear;
  white-space: nowrap;
  word-wrap: normal;
  overflow: hidden;
  text-overflow: ellipsis;
}

.tdesign-demo__select-input-ul-single > li:hover {
  background-color: var(--td-bg-color-container-hover);
}

.pal-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 24px;
  padding: 16px;
}

.pal-card {
  width: 100%;
  cursor: pointer;
  transition: transform 0.2s;
  margin: 4px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  }
}

.pal-avatar {
  width: 100%;
  height: 160px;
  object-fit: contain;
}

.pal-name {
  text-align: center;
  font-size: 14px;
  padding: 8px 0;
}

.t-typography {
  text-align: center;
  margin-top: 24px;
}
</style>
