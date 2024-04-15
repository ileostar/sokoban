import { defineStore } from 'pinia'

export enum BlockStatus {
  Wall = 1, // 墙壁
  Floor = 0, // 地板
  Target = 2, // 目标位置
  Cargo = 3, // 货物
  CargoTarget = 4, // 货物目标位置
  Keeper = 5, // 保管员
  KeeperTarget = 6, // 保管员目标位置
  Empty = -1, // 空位置
}

export interface Position {
  x: number
  y: number
}

type Direction = 'left' | 'right' | 'up' | 'down'

type gameStatus = 'play' | 'lost' | 'won'

export const useGameStore = defineStore('game', () => {
  // const WIDTH = 5
  // const Height = 5
  /** 游戏场景数组 */
  const gameScene = $ref<BlockStatus[][]>([
    [1, 1, 1, 1, 1],
    [1, 2, 2, 0, 1],
    [1, 3, 3, 5, 1],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 1, 1],
  ])
  const status = ref() as Ref<gameStatus>

  /**
   * 保管员位置
   */
  const keeperPosition: Position = $computed(() => {
    let keeperLocation: Position = { x: -1, y: -1 }

    gameScene.forEach((row, rowIndex) => {
      row.forEach((blockStatus, colIndex) => {
        if (blockStatus === BlockStatus.Keeper)
          keeperLocation = { x: rowIndex, y: colIndex }
      })
    })

    return keeperLocation
  })

  /** 找到保管员当前位置 */
  function findKeeperLocation(scene: BlockStatus[][]) {
    let keeperLocation: Position = { x: -1, y: -1 }
    scene.forEach((row, rowIndex) => {
      row.forEach((blockStatus, colIndex) => {
        if (blockStatus === BlockStatus.Keeper || blockStatus === BlockStatus.KeeperTarget)
          keeperLocation = { x: rowIndex, y: colIndex }
      })
    })
    return keeperLocation
  }

  /** 获取下一个新的位置信息 */
  const getNewPosition = (scene: BlockStatus[][], cur: Position, dir: Direction) => {
    const temp: Position = {
      x: cur.x,
      y: cur.y,
    }
    if (dir === 'up' && cur.x > 0)
      temp.x = cur.x - 1
    else if (dir === 'down' && cur.x < scene.length - 1)
      temp.x = cur.x + 1
    else if (dir === 'left' && cur.y > 0)
      temp.y = cur.y - 1
    else if (dir === 'right' && cur.y < scene[0].length - 1)
      temp.y = cur.y + 1

    return temp
  }

  /**
   * 保管员移动
   * @param scene 游戏场景数组
   * @param dir 要进行移动的方向
   */
  function move(scene: BlockStatus[][], dir: Direction) {
    /** 获取当前保管员位置 */
    const cur: Position = findKeeperLocation(scene)

    /** 计算移动后的位置 */
    const res: Position = getNewPosition(scene, cur, dir)
    /** 计算移动后的位置的值 */
    const resValue = scene[res.x][res.y]

    /**  重置原本的位置 */
    const resetPreviousPosition = (position: Position) => {
      if (scene[position.x][position.y] === BlockStatus.KeeperTarget)
        scene[position.x][position.y] = BlockStatus.Target
      else
        scene[position.x][position.y] = BlockStatus.Floor
    }
    /** 处理遇到墙情况 */
    if (resValue === BlockStatus.Wall)
      return

    /**  遇到货物情况 */
    const handleCargoMove = () => {
      const cargoNextX = res.x * 2 - cur.x
      const cargoNextY = res.y * 2 - cur.y

      if (
        cargoNextX >= 0
        && cargoNextX < scene.length
        && cargoNextY >= 0
        && cargoNextY < scene[0].length
      ) {
        const cargoNext = scene[cargoNextX][cargoNextY]

        if (
          cargoNext === BlockStatus.Wall
          || cargoNext === BlockStatus.Cargo
          || cargoNext === BlockStatus.CargoTarget
        ) return

        if (cargoNext === BlockStatus.Target)
          scene[cargoNextX][cargoNextY] = BlockStatus.CargoTarget
        else
          scene[cargoNextX][cargoNextY] = BlockStatus.Cargo

        if (resValue === BlockStatus.Cargo)
          scene[res.x][res.y] = BlockStatus.Keeper
        else if (resValue === BlockStatus.CargoTarget)
          scene[res.x][res.y] = BlockStatus.KeeperTarget

        resetPreviousPosition(cur)
      }
    }
    /**  遇到目标情况 */
    const handleTargetMove = () => {
      scene[res.x][res.y] = BlockStatus.KeeperTarget
      resetPreviousPosition(cur)
    }
    /**  正常遇到地板移动情况 */
    const handleFloorMove = () => {
      scene[res.x][res.y] = BlockStatus.Keeper
      resetPreviousPosition(cur)
    }

    /** 处理移动 */
    if (resValue === BlockStatus.Cargo || resValue === BlockStatus.CargoTarget)
      handleCargoMove()
    else if (resValue === BlockStatus.Target)
      handleTargetMove()
    else
      handleFloorMove()
  }

  /** 重置游戏场景 */
  function resetGameScene() {
    const newArr = [
      [1, 1, 1, 1, 1],
      [1, 2, 2, 0, 1],
      [1, 3, 3, 5, 1],
      [1, 0, 0, 0, 1],
      [1, 1, 1, 1, 1],
    ]

    newArr.forEach((items, x) => {
      items.forEach((item, y) => {
        gameScene[x][y] = item
      })
    })
    status.value = 'play'
  }

  /** 判断游戏状态 */
  function handleGameStatus() {
    if (
      gameScene.every((items) => {
        return items.every(item => item !== BlockStatus.Target && item !== BlockStatus.KeeperTarget)
      })
    ) status.value = 'won'
  }

  return {
    gameScene,
    status,
    keeperPosition,
    move,
    resetGameScene,
    handleGameStatus,
  }
})
