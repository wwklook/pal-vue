<script setup lang="ts">
import { ref, computed } from 'vue'
import palData from '@/assets/palData'
import palBreedingResultList from '@/assets/palBreedingResultList'

const getImageUrl = (name: string) => {
  try {
    return new URL(`../assets/images/${name}.webp`, import.meta.url).href
  } catch {
    return new URL(`../assets/images/default.webp`, import.meta.url).href
  }
}

const parent1 = ref('')
const parent2 = ref('')
const targetPal = ref('')
const currentPage = ref(1)
const pageSize = 10 // 每页显示3x2=6个结果

const possibleBreedings = computed(() => {
  if (!parent1.value && !parent2.value && !targetPal.value) return []

  let filteredResults = palBreedingResultList


  if (parent1.value) {
    filteredResults = filteredResults.filter(item =>
      item.parent1_key === parent1.value
    )
  }

  if (parent2.value) {
    filteredResults = filteredResults.filter(item =>
      item.parent2_key === parent2.value
    )
  }

  if (targetPal.value) {
    filteredResults = filteredResults.filter(item =>
      item.child_key === targetPal.value
    )
  }

  return filteredResults.map(item => {
    let firstParent, secondParent
    if (parent1.value) {
      firstParent = parent1.value
      secondParent = item.parent1_key === parent1.value ? item.parent2_key : item.parent1_key
    } else if (parent2.value) {
      firstParent = parent2.value
      secondParent = item.parent1_key === parent2.value ? item.parent2_key : item.parent1_key
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
        avatar: getImageUrl(firstParent)
      },
      parent2: {
        label: secondParentInfo?.label || secondParent,
        avatar: getImageUrl(secondParent)
      },
      child: {
        label: resultInfo?.label || item.child_key,
        avatar: getImageUrl(item.child_key)
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

const breedingResult = computed(() => {
  if (!parent1.value || !parent2.value || !targetPal.value) return null

  const result = palBreedingResultList.find(
    item => (
      (item.parent1_key === parent1.value && item.parent2_key === parent2.value) ||
      (item.parent1_key === parent2.value && item.parent2_key === parent1.value)
    ) && item.child_key === targetPal.value
  )

  return result
})

const handleParent1Change = (value: string) => {
  console.log(value);
  parent1.value = value
}

const handleParent2Change = (value: string) => {
  console.log(value);
  parent2.value = value
}

const handleTargetChange = (value: string) => {
  console.log(value);
  targetPal.value = value
}
</script>

<template>
  <main>
    <t-typography>
      <h2>配种公式</h2>
    </t-typography>

    <div class="breeding-form">
      <t-space align="center">
        <t-select
          v-model="parent1"
          class="parent-select"
          placeholder="选择父级帕鲁1"
          clearable
          @change="handleParent1Change"
        >
          <t-option
            v-for="pal in palData"
            :key="pal.value"
            :value="pal.value"
            :label="pal.label"
          />
        </t-select>
        <span class="plus">+</span>
        <t-select
          v-model="parent2"
          class="parent-select"
          placeholder="选择父级帕鲁2"
          clearable
          @change="handleParent2Change"
        >
          <t-option
            v-for="pal in palData"
            :key="pal.value"
            :value="pal.value"
            :label="pal.label"
          />
        </t-select>
        <span class="equals">=</span>
        <t-select
          v-model="targetPal"
          class="target-select"
          placeholder="选择目标帕鲁"
          clearable
          @change="handleTargetChange"
        >
          <t-option
            v-for="pal in palData"
            :key="pal.value"
            :value="pal.value"
            :label="pal.label"
          />
        </t-select>
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
        v-else-if="parent1 && parent2 && targetPal"
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
</style>
