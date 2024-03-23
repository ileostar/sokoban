import { defineStore } from 'pinia'

export enum BlockStaus {
  Wall = 1,
  Floor = 0,
  Target = 2,
  Cargo = 3,
  CargoTarget = 4,
  Keeper = 5,
  KeeperTarget = 6,
  Empty = -1,
}

export const useGameStore = defineStore('game', () => {
  const gameScene: BlockStaus[][] = [
    [1, 1, 1, 1, 1],
    [1, 2, 2, 0, 1],
    [1, 0, 3, 0, 1],
    [1, 0, 0, 5, 1],
    [1, 1, 1, 1, 1],
  ]

  return {
    gameScene,
  }
})
