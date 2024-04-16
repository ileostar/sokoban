<script setup lang="ts">
const viewSize = defineModel<string>({ required: true })
</script>

<template>
  <Select v-model="viewSize">
    <SelectTrigger class="w-22">
      <SelectValue placeholder="视图大小" />
    </SelectTrigger>
    <SelectContent class="w-22">
      <SelectGroup>
        <SelectItem value="small">
          小
        </SelectItem>
        <SelectItem value="middle">
          中
        </SelectItem>
        <SelectItem value="big">
          大
        </SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
</template>


