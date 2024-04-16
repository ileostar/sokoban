<script setup lang="ts">
import { Direction, BlockStatus } from '@/stores/game';

const game = useGameStore()

function handleMove(scene: BlockStatus[][],dir: Direction) {
  if(game.status !== 'play') {
    toast({
      title: 'TIPS',
      description: '请按开始键！',
    })
  } else{
    game.move(scene,dir)
  }
}
</script>

<template>
  <div flex="~ col" items-center w-60 h-60 bg-gradient-from-amber mt-8>

    <div color-gray h-15 w-15 text-20 font-bold b-2 rd-2 b-gray b-solid  i-carbon:arrow-up @click="handleMove(game.gameScene!,'up')" />

    <div flex justify-between>
      <div color-gray h-15 w-15 text-20 font-bold  i-carbon:arrow-left  @click="handleMove(game.gameScene!,'left')"/>
      <div h-15 w-15 text-20   />
      <div color-gray h-15 w-15 text-20 font-bold  i-carbon:arrow-right  @click="handleMove(game.gameScene!,'right')"/>
    </div>

    <div color-gray h-15 w-15 text-20 font-bold  i-carbon:arrow-down  @click="handleMove(game.gameScene!,'down')" />

    <Toaster class="p-5 color-red" />
  </div>
</template>
