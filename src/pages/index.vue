<script setup lang="ts" generic="T extends any, O extends any">
import WallImg from '@/assets/wall.png'
import FloorImg from '@/assets/floor.png'
import KeeperImg from '@/assets/keeper.png'
import CargoImg from '@/assets/cargo.png'
import CargoTargetImg from '@/assets/cargo_on_target.png'
import EmptyImg from '@/assets/empty.png'
import KeeperTargetImg from '@/assets/keeper_on_target.png'
import TargetImg from '@/assets/target.png'
import { BlockStatus } from '@/stores/game'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { useToast } from '@/components/ui/toast/use-toast'
import Toaster from '@/components/ui/toast/Toaster.vue'
import { Button } from '@/components/ui/button'

defineOptions({
  name: 'IndexPage',
})

const { toast } = useToast()

const game = useGameStore()

onMounted(() => {
  toast({
    title: 'TIPS',
    description: '请按开始键进行游戏！',
  })
})

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

watchEffect(() => {
  game.gameScene = toRaw(game.checkpoint[Number(game.currentCheckpointNum) - 1].scene)
})

/**
 * 添加键盘事件
 */
useEventListener('keyup', handleKeyUp)
function handleKeyUp(event: Event) {
  const keyboardEvent = event as KeyboardEvent
  const { key } = keyboardEvent

  if (['ArrowUp', 'ArrowDown', 'ArrowRight', 'ArrowLeft'].includes(key)) {
    if (game.status !== 'play') {
      toast({
        title: 'TIPS',
        description: '请按开始键！',
      })
    }
    else if (game.status === 'play') {
      handleArrowKeys(keyboardEvent)
    }
  }
}
function handleArrowKeys(e: KeyboardEvent) {
  if (e.key === 'ArrowUp')
    game.move(game.gameScene!, 'up')
  else if (e.key === 'ArrowDown')
    game.move(game.gameScene!, 'down')
  else if (e.key === 'ArrowLeft')
    game.move(game.gameScene!, 'left')
  else if (e.key === 'ArrowRight')
    game.move(game.gameScene!, 'right')
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

/** 计时 */
const now = $(useNow())
const timerMS = $computed(() => Math.round(((game.timePiece.endMS ?? +now) - (game.timePiece.startMS ?? +now)) / 1000))

const checkpointNum = $computed(() => {
  return game.checkpoint.map(item => item.id)
})

/** 检查游戏状况 */
watchEffect(() => {
  game.handleGameStatus()
})
</script>

<template>
  <div flex="~ col" items-center justify-center>
    <h1 my-3 text-xl font-bold font-mono>
      推箱子小游戏
    </h1>
    <div mb-3 flex items-center gap-5>
      <div text="3.5" flex="~ gap-1" items-center font-mono>
        <div i-carbon-timer />
        计时：{{ timerMS }}
      </div>
      <span>|</span>
      <div text="3.5" flex="~ gap-1" items-center font-mono>
        <div i-carbon:spine-label />
        关卡数：
        <Select v-model="game.currentCheckpointNum" class="h-5 w-15" align="center">
          <SelectTrigger class="w-15">
            <SelectValue placeholder="视图大小" />
          </SelectTrigger>
          <SelectContent class="w-15">
            <SelectItem v-for="item in checkpointNum" :key="item" :value="item" class="w-15">
              {{ item }}
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
    <div flex="~ gap-10" justify-center>
      <div flex="~ col" overflow-hidden b-4 b-gray-3 rd-2 b-double dark:b-gray-5>
        <div v-for="items, y in game.gameScene" :key="y" flex="~ 1">
          <img v-for="item, x in items" :key="x" :class="getImgSize" flex-1 bg-gray dark:opacity-75 :src="getViewImg(item)">
        </div>
      </div>
    </div>
    <div class="control" mt-5 flex gap-4>
      <button v-ripple="'rgba(255, 255, 255, 0.35)'" bg="green-500/70" h-10 w-20 rd-2 text-white outline-none @click="game.startGame()">
        开始
      </button>
      <button v-ripple="'rgba(255, 255, 255, 0.35)'" bg="gray-300/70" h-10 w-20 rd-2 text-black outline-none @click="game.resetGameScene()">
        重置
      </button>

      <Select v-model="game.viewSize">
        <SelectTrigger class="w-25">
          <SelectValue placeholder="视图大小" />
        </SelectTrigger>
        <SelectContent>
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
    </div>
    <AlertDialog>
      <AlertDialogTrigger as-child>
        <Button variant="outline">
          Show Dialog
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
    <Toaster class="p-5 color-red" />
    <Confetti :passed="game.status === 'won'" />
  </div>
</template>
