<script setup lang="ts">
import { ref, computed, unref } from 'vue'
import type { SelectInputProps } from 'tdesign-vue-next';
import palData from '@/assets/palData'
import palBreedingResultList from '@/assets/palBreedingResultList'

type TPalValue = {
  label: string
  value: string
}

const getImageUrl = (name: string) => {
  if (!name) return ''
  try {
    return new URL(`../assets/images/${name}.webp`, import.meta.url).href
  } catch {
    return new URL(`../assets/images/default.webp`, import.meta.url).href
  }
}

const options1 = ref(palData)
const options2 = ref(palData)
const options3 = ref(palData)

const popupVisible1 = ref(false)
const popupVisible2 = ref(false)
const popupVisible3 = ref(false)
const parent1 = ref<TPalValue | null>(null)
const parent2 = ref<TPalValue | null>(null)
const targetPal = ref<TPalValue | null>(null)
const currentPage = ref(1)
const pageSize = 10 // 每页显示10个结果

const possibleBreedings = computed(() => {
  if (!unref(parent1)?.value && !unref(parent2)?.value && !unref(targetPal)?.value) return []

  let filteredResults = palBreedingResultList

  if (unref(parent1)?.value) {
    filteredResults = filteredResults.filter(item =>
      item.parent1_key === unref(parent1)?.value
    )
  }

  if (unref(parent2)?.value) {
    filteredResults = filteredResults.filter(item =>
      item.parent2_key === unref(parent2)?.value
    )
  }

  if (unref(targetPal)?.value) {
    filteredResults = filteredResults.filter(item =>
      item.child_key === unref(targetPal)?.value
    )
  }

  return filteredResults.map(item => {
    let firstParent, secondParent
    if (unref(parent1)?.value) {
      firstParent = unref(parent1)?.value
      secondParent = item.parent1_key === unref(parent1)?.value ? item.parent2_key : item.parent1_key
    } else if (unref(parent2)?.value) {
      firstParent = unref(parent2)?.value
      secondParent = item.parent1_key === unref(parent2)?.value ? item.parent2_key : item.parent1_key
    } else {
      firstParent = item.parent1_key
      secondParent = item.parent2_key
    }

    const firstParentInfo = palData.find(p => p.value === firstParent)
    const secondParentInfo = palData.find(p => p.value === secondParent)
    const resultInfo = palData.find(p => p.value === item.child_key)

    return {
      parent1: {
        label: firstParentInfo?.label || firstParent,
        avatar: getImageUrl(firstParent || '')
      },
      parent2: {
        label: secondParentInfo?.label || secondParent,
        avatar: getImageUrl(secondParent || '')
      },
      child: {
        label: resultInfo?.label || item.child_key,
        avatar: getImageUrl(item.child_key || '')
      }
    }
  })
})

const paginatedBreedings = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  const end = start + pageSize
  return possibleBreedings.value.slice(start, end)
})

const handlePageChange = (e: { current: number; }) => {
  currentPage.value = e.current;
}

const handleParent1Click = (pal: { label: string; value: string }) => {
  popupVisible1.value = false
  parent1.value = pal
}

const handleParent2Click = (pal: { label: string; value: string }) => {
  popupVisible2.value = false
  parent2.value = pal
}

const handleTargetClick = (pal: { label: string; value: string }) => {
  popupVisible3.value = false
  targetPal.value = pal
}

const onInput1Change: SelectInputProps['onInputChange'] = (val) => {
  // 过滤功能
  options1.value = palData.filter(item => item.label.includes(val) || item.pinyin.includes(val))
};

const onInput2Change: SelectInputProps['onInputChange'] = (val) => {
  // 过滤功能
  options2.value = palData.filter(item => item.label.includes(val) || item.pinyin.includes(val))
};

const onTargetChange: SelectInputProps['onInputChange'] = (val) => {
  // 过滤功能
  options3.value = palData.filter(item => item.label.includes(val) || item.pinyin.includes(val))
};

</script>

<template>
  <main>
    <t-typography>
      <h2>配种公式</h2>
    </t-typography>

    <div class="breeding-form">
      <t-space align="center">
        <t-select-input
          :value="parent1"
          :popup-visible="popupVisible1"
          :popup-props="{ overlayInnerStyle: { padding: '6px' } }"
          class="parent-select"
          placeholder="请选择父级帕鲁1"
          clearable
          allow-input
          @popup-visible-change="(value: boolean) => popupVisible1 = value"
          @input-change="onInput1Change"
          @clear="() => parent1 = null"
        >
          <template #panel>
            <ul class="tdesign-demo__select-input-ul-single">
              <li v-for="pal in options1" :key="pal.value" @click="() => handleParent1Click(pal)">
                {{ pal.label }}
              </li>
            </ul>
          </template>
        </t-select-input>
        <span class="plus">+</span>
        <t-select-input
          :value="parent2"
          :popup-visible="popupVisible2"
          :popup-props="{ overlayInnerStyle: { padding: '6px' } }"
          class="parent-select"
          placeholder="选择父级帕鲁2"
          clearable
          allow-input
          @popup-visible-change="(value: boolean) => popupVisible2 = value"
          @input-change="onInput2Change"
          @clear="() => parent2 = null"
        >
          <template #panel>
            <ul class="tdesign-demo__select-input-ul-single">
              <li v-for="pal in options2" :key="pal.value" @click="() => handleParent2Click(pal)">
                {{ pal.label }}
              </li>
            </ul>
          </template>
        </t-select-input>
        <span class="equals">=</span>
        <t-select-input
          :value="targetPal"
          :popup-visible="popupVisible3"
          :popup-props="{ overlayInnerStyle: { padding: '6px' } }"
          class="target-select"
          placeholder="请选择目标帕鲁"
          clearable
          allow-input
          @popup-visible-change="(value: boolean) => popupVisible3 = value"
          @input-change="onTargetChange"
          @clear="() => targetPal = null"
        >
          <template #panel>
            <ul class="tdesign-demo__select-input-ul-single">
              <li v-for="pal in options3" :key="pal.value" @click="() => handleTargetClick(pal)">
                {{ pal.label }}
              </li>
            </ul>
          </template>
        </t-select-input>
      </t-space>

      <div class="breeding-list" v-if="possibleBreedings.length">
        <t-divider>配种组合</t-divider>
        <div class="breeding-combinations">
          <div class="breeding-grid">
            <div
              v-for="(item, index) in paginatedBreedings"
              :key="index"
              class="breeding-item"
            >
              <div class="pal-info">
                <t-image :src="item.parent1.avatar" class="pal-image" />
                <div class="pal-name">{{ item.parent1.label }}</div>
              </div>
              <span class="operation">+</span>
              <div class="pal-info">
                <t-image :src="item.parent2.avatar" class="pal-image" />
                <div class="pal-name">{{ item.parent2.label }}</div>
              </div>
              <span class="operation">=</span>
              <div class="pal-info">
                <t-image :src="item.child.avatar" class="pal-image" />
                <div class="pal-name">{{ item.child.label }}</div>
              </div>
            </div>
          </div>
        </div>
        <t-pagination
          v-if="possibleBreedings.length > pageSize"
          :total="possibleBreedings.length"
          :page-size="pageSize"
          :current="currentPage"
          @change="handlePageChange"
          show-total
          show-jumper
        />
      </div>
      <t-alert
        v-else-if="parent1?.value && parent2?.value && targetPal?.value"
        theme="warning"
        title="配种失败"
      >
        该组合无法配种出目标帕鲁
      </t-alert>
      <t-alert
        v-else
        theme="warning"
        title="请选择帕鲁"
      >
        请选择帕鲁
      </t-alert>
    </div>
  </main>
</template>

<style lang="scss" scoped>
.t-typography {
  text-align: center;
  margin-top: 24px;
}

.breeding-form {
  max-width: 800px;
  margin: 32px auto;
  padding: 24px;

  .t-alert {
    margin-top: 32px;
  }
}

.parent-select {
  width: 240px;
}

.target-select {
  width: 240px;
}

.plus, .equals {
  font-size: 24px;
  margin: 0 16px;
  color: var(--td-text-color-primary);
}

.breeding-result {
  margin-top: 24px;
  text-align: center;
}

.breeding-list {
  margin-top: 32px;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.breeding-combinations {
  margin: 24px 0;
  padding: 0 16px;
}

.breeding-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 36px 50px;
}

.breeding-item {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  border-bottom: 1px solid var(--td-component-stroke);
  border: 1px solid var(--td-component-stroke);
  border-radius: 8px;
  background-color: var(--td-bg-color-container);

  &:last-child {
    border-bottom: none;
  }
}

.pal-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.pal-name {
  font-size: 14px;
  color: var(--td-text-color-primary);
}

.operation {
  margin: 0 24px;
  font-size: 20px;
  color: var(--td-text-color-secondary);
}

.t-pagination {
  margin-top: 24px;
  display: flex;
  justify-content: center;
}

.pal-image {
  width: 80px;
  height: 80px;
  border-radius: 4px;
  object-fit: contain;
}
.tdesign-demo__select-input-ul-single {
  display: flex;
  flex-direction: column;
  padding: 0;
  gap: 2px;
  max-height: 500px;
  overflow-y: auto;
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
  text-overflow: ellipsis;
}

.tdesign-demo__select-input-ul-single > li:hover {
  background-color: var(--td-bg-color-container-hover);
}

</style>
