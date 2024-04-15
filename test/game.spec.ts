import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it } from 'vitest'
import type { Position } from '~/stores/game'
import { BlockStatus, useGameStore } from '~/stores/game'

describe('game', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })
  it('keepPosition', () => {
    const gameScene = $ref<BlockStatus[][]>([
      [1, 1, 1, 1, 1],
      [1, 2, 2, 0, 1],
      [1, 0, 3, 0, 1],
      [1, 0, 5, 0, 1],
      [1, 1, 1, 1, 1],
    ])
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

    expect(keeperPosition).toEqual({
      x: 3,
      y: 2,
    })
  })
  it('moveUp', () => {
    const gameStore = useGameStore()
    const gameScene = $ref<BlockStatus[][]>([
      [1, 1, 1, 1, 1],
      [1, 2, 2, 0, 1],
      [1, 0, 3, 5, 1],
      [1, 0, 0, 0, 1],
      [1, 1, 1, 1, 1],
    ])
    gameStore.move(gameScene, 'up')
    expect(gameScene).toEqual([
      [1, 1, 1, 1, 1],
      [1, 2, 2, 5, 1],
      [1, 0, 3, 0, 1],
      [1, 0, 0, 0, 1],
      [1, 1, 1, 1, 1],
    ])
  })
  it('moveDown', () => {
    const gameStore = useGameStore()
    const gameScene = $ref<BlockStatus[][]>([
      [1, 1, 1, 1, 1],
      [1, 2, 2, 0, 1],
      [1, 0, 3, 5, 1],
      [1, 0, 0, 0, 1],
      [1, 1, 1, 1, 1],
    ])
    gameStore.move(gameScene, 'down')
    expect(gameScene).toEqual([
      [1, 1, 1, 1, 1],
      [1, 2, 2, 0, 1],
      [1, 0, 3, 0, 1],
      [1, 0, 0, 5, 1],
      [1, 1, 1, 1, 1],
    ])
  })
  it('moveRight', () => {
    const gameStore = useGameStore()
    const gameScene = $ref<BlockStatus[][]>([
      [1, 1, 1, 1, 1],
      [1, 2, 2, 0, 1],
      [1, 0, 3, 0, 1],
      [1, 0, 5, 0, 1],
      [1, 1, 1, 1, 1],
    ])
    gameStore.move(gameScene, 'right')
    expect(gameScene).toEqual([
      [1, 1, 1, 1, 1],
      [1, 2, 2, 0, 1],
      [1, 0, 3, 0, 1],
      [1, 0, 0, 5, 1],
      [1, 1, 1, 1, 1],
    ])
  })
  it('moveLeft', () => {
    const gameStore = useGameStore()
    const gameSceneL = $ref<BlockStatus[][]>([
      [1, 1, 1, 1, 1],
      [1, 2, 2, 0, 1],
      [1, 0, 3, 0, 1],
      [1, 0, 5, 0, 1],
      [1, 1, 1, 1, 1],
    ])
    gameStore.move(gameSceneL, 'left')
    expect(gameSceneL).toEqual([
      [1, 1, 1, 1, 1],
      [1, 2, 2, 0, 1],
      [1, 0, 3, 0, 1],
      [1, 5, 0, 0, 1],
      [1, 1, 1, 1, 1],
    ])
  })
})
