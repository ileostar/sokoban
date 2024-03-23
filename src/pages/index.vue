<script setup lang="ts" generic="T extends any, O extends any">
import WallImg from '~/assets/wall.png'
import FloorImg from '~/assets/floor.png'
import KeeperImg from '~/assets/keeper.png'
import CargoImg from '~/assets/cargo.png'
import CargoTargetImg from '~/assets/cargo_on_target.png'
import EmptyImg from '~/assets/empty.png'
import KeeperTargetImg from '~/assets/keeper_on_target.png'
import TargetImg from '~/assets/target.png'
import { BlockStaus } from '~/stores/game'

defineOptions({
  name: 'IndexPage',
})

const gameStore = useGameStore()
const gameScene = ref(gameStore.gameScene)

function getImg(status: BlockStaus) {
  switch (status) {
    case BlockStaus.Floor :
      return FloorImg
    case BlockStaus.Wall :
      return WallImg
    case BlockStaus.Keeper :
      return KeeperImg
    case BlockStaus.Cargo :
      return CargoImg
    case BlockStaus.CargoTarget :
      return CargoTargetImg
    case BlockStaus.Empty :
      return EmptyImg
    case BlockStaus.KeeperTarget :
      return KeeperTargetImg
    case BlockStaus.Target :
      return TargetImg
  }
}
</script>

<template>
  <div flex="~ col" items-center justify-center>
    <div flex="~ col" h-100 w-100 gap-1 b-2 b-gray-3 rd-2 p-2>
      <div v-for="items, index in gameScene" :key="index" flex="~ 1" gap-1>
        <img v-for="item in items" :key="item" flex-1 rd-1 bg-gray opacity-70 :src="getImg(item)">
      </div>
    </div>
    <div class="control" mt-5 flex gap-4>
      <button v-ripple="'rgba(255, 255, 255, 0.35)'" h-10 w-20 rd-2 bg-green-500 text-white>
        开始
      </button>
      <button v-ripple="'rgba(255, 255, 255, 0.35)'" h-10 w-20 rd-2 bg-gray-300 text-black>
        重置
      </button>
    </div>
  </div>
</template>
