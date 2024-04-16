<script setup lang="ts">
defineProps<{
  currentCheckpointNum: string
}>()

const nextCheckpoint = defineModel<boolean>({ required: true })
</script>

<template>
  <AlertDialog v-model:open="nextCheckpoint">
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>恭喜通过第{{ Number(currentCheckpointNum) - 1 }}关🌼</AlertDialogTitle>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogAction @click="() => nextCheckpoint = false">
          下一关
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>
