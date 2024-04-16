<script setup lang="ts" generic="T extends any, O extends any">
const { toast } = useToast()
const game = useGameStore()

/** 去除默认事件 */
useEventListener('keydown', (e) => {
  e.preventDefault()
})
/** 处理键盘事件 */
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
/** 键盘事件移动函数 */
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
/** 添加键盘事件 */
useEventListener('keyup', handleKeyUp)

/** 计时 */
const now = $(useNow())
const timerMS = $computed(() => Math.round(((game.timePiece.endMS ?? +now) - (game.timePiece.startMS ?? +now)) / 1000))

/** 关卡列表 */
const checkpointNum: Array<string> = $computed(() => {
  return game.checkpoint.map(item => item.id)
})

/** 监听关卡切换副作用 */
watchEffect(() => {
  game.gameScene = JSON.parse(localStorage.getItem('data')!)[Number(game.currentCheckpointNum) - 1].scene
  game.timePiece = {}
  game.status = 'wait'
})

/** 检查游戏状况 */
watchEffect(() => {
  game.handleGameStatus()
})
</script>

<template>
  <main flex-base flex-col>
    <h1 my-3 text-xl font="bold mono">
      推箱子小游戏
    </h1>
    <div flex-base gap-5 mb-3>
      <div view-base>
        <div i-carbon-timer />
        计时：{{ timerMS }}
      </div>
      <span>|</span>
      <div view-base>
        <div i-carbon:spine-label />
        <span>关卡数：</span>
        <SelectCheckpoint v-model="game.currentCheckpointNum" :checkpoint-num />
      </div>
    </div>
    <GameScene :game-scene="game.gameScene!" />
    <div mt-5 flex gap-4>
      <button v-ripple="'rgba(255, 255, 255, 0.35)'" btn-base bg="green-500/70" text-white @click="game.startGame()">
        开始
      </button>
      <button v-ripple="'rgba(255, 255, 255, 0.35)'" btn-base bg="gray-300/70" text-black @click="game.resetGameScene()">
        重置
      </button>
      <SelectSize v-model="game.viewSize" />
      <TipsPlay />
    </div>
    <NextDialog v-model="game.nextCheckpoint" :current-checkpoint-num="game.currentCheckpointNum" />
    <Toaster class="p-5 color-red" />
    <Confetti :passed="game.status === 'won'" />
  </main>
</template>
