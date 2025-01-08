<script setup lang="ts">
import { ref } from 'Vue'
import palData from '@/assets/palData'

// 定义选项接口
interface Option {
  value: string
  label: string
}

const options = palData

// 创建三个选择器的值
const selectValue1 = ref('')
const selectValue2 = ref('')
const selectValue3 = ref('')

// 创建三个弹出层的可见状态
const popupVisible1 = ref(false)
const popupVisible2 = ref(false)
const popupVisible3 = ref(false)

// 选项点击处理函数
const onOptionClick = (item: Option, index: number) => {
  switch(index) {
    case 1:
      selectValue1.value = item.value
      popupVisible1.value = false
      break
    case 2:
      selectValue2.value = item.value
      popupVisible2.value = false
      break
    case 3:
      selectValue3.value = item.value
      popupVisible3.value = false
      break
  }
}

// 清除处理函数
const onClear = (index: number) => {
  switch(index) {
    case 1:
      selectValue1.value = ''
      break
    case 2:
      selectValue2.value = ''
      break
    case 3:
      selectValue3.value = ''
      break
  }
}

// 弹出层可见性变化处理函数
const onPopupVisibleChange = (val: boolean, context: { trigger: string }, index: number) => {
  switch(index) {
    case 1:
      popupVisible1.value = val
      break
    case 2:
      popupVisible2.value = val
      break
    case 3:
      popupVisible3.value = val
      break
  }
}

// 输入变化处理函数
const onInputChange = (val: string, context: { trigger: string; e: Event }) => {
  console.log(val, context)
}

// 焦点处理函数
const onFocus = (val: string, context: { e: FocusEvent }) => {
  console.log('focus:', val, context)
}
</script>

<template>
  <main>
    <!-- 第一个选择器 -->
    <t-select-input
      :value="selectValue1"
      :popup-visible="popupVisible1"
      :popup-props="{ overlayInnerStyle: { padding: '6px' } }"
      style="width: 300px; margin-bottom: 16px;"
      placeholder="请输入帕鲁1"
      clearable
      allow-input
      @popup-visible-change="(val, context) => onPopupVisibleChange(val, context, 1)"
      @clear="() => onClear(1)"
      @focus="onFocus"
      @input-change="onInputChange"
    >
      <template #panel>
        <ul class="tdesign-demo__select-input-ul-single">
          <li v-for="item in options" :key="item.value" @click="() => onOptionClick(item, 1)">
            {{ item.label }}
          </li>
        </ul>
      </template>
      <template #suffixIcon>
        <chevron-down-icon />
      </template>
    </t-select-input>

    <!-- 第二个选择器 -->
    <t-select-input
      :value="selectValue2"
      :popup-visible="popupVisible2"
      :popup-props="{ overlayInnerStyle: { padding: '6px' } }"
      style="width: 300px; margin-bottom: 16px;"
      placeholder="请输入帕鲁2"
      clearable
      allow-input
      @popup-visible-change="(val, context) => onPopupVisibleChange(val, context, 2)"
      @clear="() => onClear(2)"
      @focus="onFocus"
      @input-change="onInputChange"
    >
      <template #panel>
        <ul class="tdesign-demo__select-input-ul-single">
          <li v-for="item in options" :key="item.value" @click="() => onOptionClick(item, 2)">
            {{ item.label }}
          </li>
        </ul>
      </template>
      <template #suffixIcon>
        <chevron-down-icon />
      </template>
    </t-select-input>

    <!-- 第三个选择器 -->
    <t-select-input
      :value="selectValue3"
      :popup-visible="popupVisible3"
      :popup-props="{ overlayInnerStyle: { padding: '6px' } }"
      style="width: 300px"
      placeholder="请输入目标帕鲁"
      clearable
      allow-input
      @popup-visible-change="(val, context) => onPopupVisibleChange(val, context, 3)"
      @clear="() => onClear(3)"
      @focus="onFocus"
      @input-change="onInputChange"
    >
      <template #panel>
        <ul class="tdesign-demo__select-input-ul-single">
          <li v-for="item in options" :key="item.value" @click="() => onOptionClick(item, 3)">
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
