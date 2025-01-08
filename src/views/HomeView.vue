<script setup lang="ts">
import { ref } from 'Vue'
import palData from '@/assets/palData'
// import { palList } from '@/assets/child'
const options = palData

// window.palList = palList

const selectValue = ref('')
const popupVisible = ref(false)
const onOptionClick = (item: any) => {
  selectValue.value = item.value
  // 选中后立即关闭浮层
  popupVisible.value = false
}
const onClear = () => {
  selectValue.value = ''
}
const onPopupVisibleChange = (val, context) => {
  console.log(context)
  popupVisible.value = val
}
const onInputChange = (val, context) => {
  // 过滤功能
  console.log(val, context)
}

function onFocus(val, context) {
  console.log('focus:', val, context)
}
</script>

<template>
  <main>
    <t-select-input
      :value="selectValue"
      :popup-visible="popupVisible"
      :popup-props="{ overlayInnerStyle: { padding: '6px' } }"
      style="width: 300px"
      placeholder="请输入帕鲁1"
      clearable
      allow-input
      @popup-visible-change="onPopupVisibleChange"
      @clear="onClear"
      @focus="onFocus"
      @input-change="onInputChange"
    >
      <template #panel>
        <ul class="tdesign-demo__select-input-ul-single">
          <li v-for="item in options" :key="item.value" @click="() => onOptionClick(item)">
            {{ item.label }}
          </li>
        </ul>
      </template>
      <template #suffixIcon>
        <chevron-down-icon />
      </template>
    </t-select-input>
    <t-select-input
      :value="selectValue"
      :popup-visible="popupVisible"
      :popup-props="{ overlayInnerStyle: { padding: '6px' } }"
      style="width: 300px"
      placeholder="请输入帕鲁2"
      clearable
      allow-input
      @popup-visible-change="onPopupVisibleChange"
      @clear="onClear"
      @focus="onFocus"
      @input-change="onInputChange"
    >
      <template #panel>
        <ul class="tdesign-demo__select-input-ul-single">
          <li v-for="item in options" :key="item.value" @click="() => onOptionClick(item)">
            {{ item.label }}
          </li>
        </ul>
      </template>
      <template #suffixIcon>
        <chevron-down-icon />
      </template>
    </t-select-input>
    <t-select-input
      :value="selectValue"
      :popup-visible="popupVisible"
      :popup-props="{ overlayInnerStyle: { padding: '6px' } }"
      style="width: 300px"
      placeholder="请输入目标帕鲁"
      clearable
      allow-input
      @popup-visible-change="onPopupVisibleChange"
      @clear="onClear"
      @focus="onFocus"
      @input-change="onInputChange"
    >
      <template #panel>
        <ul class="tdesign-demo__select-input-ul-single">
          <li v-for="item in options" :key="item.value" @click="() => onOptionClick(item)">
            {{ item.label }}
          </li>
        </ul>
      </template>
      <template #suffixIcon>
        <chevron-down-icon />
      </template>
    </t-select-input>
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
</style>
