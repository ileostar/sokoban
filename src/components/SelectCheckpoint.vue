<script setup lang="ts">
defineProps<{
  checkpointNum: Array<string>
}>()

const currentCheckpointNum = defineModel<string>({ required: true })
</script>

<template>
  <Select v-model="currentCheckpointNum" class="h-5 w-20" align="center">
    <SelectTrigger class="w-20">
      <SelectValue placeholder="视图大小" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem v-for="item in checkpointNum" :key="item" :value="item">
        {{ item }}
      </SelectItem>
    </SelectContent>
  </Select>
</template>
