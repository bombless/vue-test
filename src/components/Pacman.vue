<template>
    <div>
        <table>
            <tr v-for="(col, x) in status.board"><td v-for="(item, y) in col" v-html="show(item, x, y)" :alt="y + ',' + (3 - x)"></td></tr>
        </table>
    </div>
</template>
<style>
#next { border: 1px solid black; }
</style>
<script>

import * as types from '../pacman-types'
import { getSvg } from '../pacman-wall-painter'
import { Status } from '../pacman-status'
import * as mc from '../pacman-mc'

let board = [
  [new types.Void(), new types.Void(), new types.Wall()],
  [new types.Wall(), new types.Wall(), new types.Wall()],
  [new types.Void(), new types.Void(), new types.Wall()],
  [new types.Ghost(), new types.Wall(), new types.Candy()]
]

let mcShape = mc.RIGHT
let candyShape = '<svg width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg"><circle cx="15" cy="15" r="5" fill="yellow"/></svg>'
let voidShape = '<svg width="30" height="30" xmlns="http://www.w3.org/2000/svg"></svg>'
let ghostShape =
  `<svg width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
    <text x="15" y="15" font-family="Verdana" text-anchor="middle" alignment-baseline="middle" font-size="15">&#x1f47b;</text></svg>`

export default {
  name: 'pacman',
  data () {
    return {
      status: new Status(board)
    }
  },
  methods: {
    show (item, x, y) {
      let position = [y, 3 - x]
      console.log(position, item instanceof types.Wall)
      if (item instanceof types.Candy) {
        return candyShape
      }
      if (item instanceof types.Ghost) {
        return ghostShape
      }
      if (item instanceof types.Wall) {
        let svg = getSvg(this.status.board, position)
        if (svg) return svg
      }
      if (this.status.pacman_position[0] === x && this.status.pacman_position[1] === y) {
        return mcShape
      } else {
        return voidShape
      }
    }
  }
}

</script>
