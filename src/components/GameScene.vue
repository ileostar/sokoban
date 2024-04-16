<script setup lang="ts">
import { BlockStatus } from '@/stores/game'

defineProps<{
  gameScene: BlockStatus[][]
}>()

const game = useGameStore()

/**
 * 根据游戏场景数组返回图片
 */
function getViewImg(status: BlockStatus) {
  switch (status) {
    case BlockStatus.Floor :
      return FloorImg
    case BlockStatus.Wall :
      return WallImg
    case BlockStatus.Keeper :
      return KeeperImg
    case BlockStatus.Cargo :
      return CargoImg
    case BlockStatus.CargoTarget :
      return CargoTargetImg
    case BlockStatus.Empty :
      return EmptyImg
    case BlockStatus.KeeperTarget :
      return KeeperTargetImg
    case BlockStatus.Target :
      return TargetImg
  }
}

/** 改变视图大小 */
const getImgSize = $computed(() => {
  if (game.viewSize === 'small')
    return 'h-6 w-6'
  else if (game.viewSize === 'middle')
    return 'h-8 w-8'
  else if (game.viewSize === 'big')
    return 'h-10 w-10'
})
</script>

<template>
  <div flex="~ col" overflow-hidden b-4 b-gray-3 rd-2 b-double dark:b-gray-5>
    <div v-for="items, y in gameScene" :key="y" flex="~ 1">
      <img v-for="item, x in items" :key="x" :class="getImgSize" flex-1 bg-gray dark:opacity-75 :src="getViewImg(item)">
    </div>
  </div>
</template>
