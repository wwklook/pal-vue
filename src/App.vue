<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const activeKey = ref(route.path.slice(1) || 'paldex')

const handleChange = (value: string) => {
  activeKey.value = value
  router.push(`/${value}`)
}

// 监听路由变化
router.afterEach((to) => {
  activeKey.value = to.path.slice(1) || 'paldex'
})
</script>

<template>
  <t-layout>
    <t-header>
      <t-head-menu
        theme="dark"
        :value="activeKey"
        @change="handleChange"
      >
        <t-menu-item value="paldex">帕鲁图鉴</t-menu-item>
        <t-menu-item value="breeding">配种公式</t-menu-item>
      </t-head-menu>
    </t-header>
    <t-content>
      <router-view />
    </t-content>
  </t-layout>
</template>

<style>
.t-layout {
  min-height: 100vh;
}

.t-header {
  padding: 0;
}

.t-content {
  padding: 0 16px;
}
</style>
