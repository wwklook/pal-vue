<script setup lang="ts">
import { ref, computed } from 'vue'
import {
  palData,
  attrData,
  workData,
} from '@/assets/baseData'


const filterAttr = ref('')
const filterWork = ref('')

const filterPalList = computed(() => {
  return palData.filter((pal) => {
    const isAttrMatch = filterAttr.value ? pal.attrs.some(attr => attr.includes(filterAttr.value)) : true
    const isWorkMatch = filterWork.value ? pal.works?.some(work => work.name.includes(filterWork.value)) : true
    return isAttrMatch && isWorkMatch
  })
})
</script>

<template>
  <main class="pal-dex">
    <t-typography>
      <h2>帕鲁图鉴</h2>
    </t-typography>
    <div class="filter">
      <div class="attr-filter">
        <div>按元素筛选</div>
        <div class="filter-list">
          <div
            v-for="attr in attrData"
            class="filter-item"
            :key="attr.name"
            :content="attr.name"
            :class="{ active: filterAttr === attr.name }"
            @click="filterAttr = filterAttr === attr.name ? '' : attr.name">
            <t-tooltip :content="attr.name">
              <t-image :src="attr.src" :alt="attr.name" style="width: 24px; height: 24px;" />
            </t-tooltip>
          </div>
        </div>
      </div>
      <div class="work-filter">
        <div>按工作筛选</div>
        <div class="filter-list">
          <div
            v-for="work in workData"
            class="filter-item"
            :key="work.name"
            :content="work.name"
            :class="{ active: filterWork === work.name }"
            @click="filterWork = filterWork === work.name ? '' : work.name">
            <t-tooltip :content="work.name">
              <t-image :src="work.src" :alt="work.name" style="width: 24px; height: 24px;" />
            </t-tooltip>
          </div>
        </div>
      </div>

    </div>
    <div class="pal-list">
      <t-card
        v-for="pal in filterPalList"
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
          <div class="pal-attrs">
            <div
              v-for="attr in pal.attrs"
              :key="attr"
              :content="attr"
              :class="{ active: filterAttr === attr }">
              <t-image
                style="width: 24px; height: 24px;"
                :src="`/images/attr/${attr}.png`"
                :alt="attr"
              />
            </div>
          </div>
          <div class="pal-works">
            <div
              class="work-item"
              v-for="work in pal.works"
              :key="work.name"
              :content="work.name"
              :class="{ active: filterWork === work.name }">
              <t-image
                style="width: 20px; height: 20px;"
                :src="`/images/work/${work.name}.png`"
                :alt="work.name"
              />
              <div class="work-level">{{ work.level }}</div>
            </div>
          </div>
        </template>
        <template #footer>
          <div class="pal-name">{{ pal.label }} #{{ pal.number }}</div>
        </template>
      </t-card>
    </div>
  </main>
</template>
<style lang="scss" scoped>
.pal-dex {
  padding: 0 100px;
}

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
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 24px;
  padding: 16px;
}

.pal-card {
  width: 200px;
  background-color: #f3f3f3;
  cursor: pointer;
  transition: transform 0.2s;
  margin: 4px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  padding: 10px 20px;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  }
}

.pal-avatar {
  width: 140px;
  height: 140px;
  object-fit: contain;
  overflow: hidden;
}

.pal-name {
  text-align: center;
  font-size: 14px;
  padding: 12px 0;
}

.t-typography {
  text-align: center;
  margin-top: 24px;
}

.filter {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}

.filter-list {
  display: flex;
  flex-direction: row;
  gap: 6px;
}

.filter-item {
  cursor: pointer;
  border: 1px solid #afafaf;
  background-color: var(--td-brand-color-default);
  border-radius: 4px;
  padding: 4px;
  .t-image__wrapper {
    background-color: transparent;
  }
}

.filter-list > div:hover {
  border-color: var(--td-brand-color-default);
}

.filter-item.active {
  border-color: var(--td-brand-color-default);
  background-color: #d7d7d7;
}

.pal-works {
  position: absolute;
  top: 5px;
  right: 5px;
  .t-image__wrapper {
    background-color: transparent;
  }
}

.pal-attrs {
  position: absolute;
  top: 5px;
  left: 5px;
  .t-image__wrapper {
    background-color: transparent;
  }
}

.work-item {
  display: flex;
  align-items: center;
  gap: 2px;
}

.work-level {
  font-size: 12px;
  color: #666;
}

</style>
