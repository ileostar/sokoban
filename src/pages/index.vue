<script setup lang="ts" generic="T extends any, O extends any">
import WallImg from '~/assets/wall.png'
import FloorImg from '~/assets/floor.png'
import KeeperImg from '~/assets/keeper.png'
import CargoImg from '~/assets/cargo.png'
import CargoTargetImg from '~/assets/cargo_on_target.png'
import EmptyImg from '~/assets/empty.png'
import KeeperTargetImg from '~/assets/keeper_on_target.png'
import TargetImg from '~/assets/target.png'
import { BlockStatus } from '~/stores/game'

defineOptions({
  name: 'IndexPage',
})

const gameStore = useGameStore()
const gameScene = $ref(gameStore.gameScene)
const gameStatus = $ref(gameStore.status)

/**
 * 根据游戏场景数组返回图片
 */
function getImg(status: BlockStatus) {
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

/**
 * 添加键盘事件
 */
watchEffect(() => {
  document.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowUp')
      gameStore.move(gameScene, 'up')
    else if (e.key === 'ArrowDown')
      gameStore.move(gameScene, 'down')
    else if (e.key === 'ArrowLeft')
      gameStore.move(gameScene, 'left')
    else if (e.key === 'ArrowRight')
      gameStore.move(gameScene, 'right')
  })
})

watchEffect(() => {
  gameStore.handleGameStatus()
})
</script>

<template>
  <div flex="~ col" items-center justify-center>
    <h1 my-5 font-bold font-sans>
      推箱子小游戏
    </h1>
    <div flex="~ col" h-100 w-100 b-2 b-gray-3 rd-2 p-2>
      <div v-for="items, y in gameScene" :key="y" flex="~ 1">
        <img v-for="item, x in items" :key="x" flex-1 bg-gray opacity-70 :src="getImg(item)">
      </div>
    </div>
    <div class="control" mt-5 flex gap-4>
      <button v-ripple="'rgba(255, 255, 255, 0.35)'" h-10 w-20 rd-2 bg="green-500/70" text-white>
        开始
      </button>
      <button v-ripple="'rgba(255, 255, 255, 0.35)'" h-10 w-20 rd-2 bg="gray-300/70" text-black @click="gameStore.resetGameScene()">
        重置
      </button>
    </div>
    <Confetti :passed="gameStatus === 'won'" />
  </div>
</template>
