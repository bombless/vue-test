<template>
    <div>
      score {{status.score}}
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
import { translate } from '../pacman-position-translator'

let board = [
  [new types.Void(), new types.Wall(), new types.Wall(), new types.Void()],
  [new types.Candy(), new types.Void(), new types.Wall(), new types.Wall()],
  [new types.Void(), new types.Void(), new types.Void(), new types.Wall()],
  [new types.Void(), new types.Void(), new types.Void(), new types.Wall()],
  [new types.Ghost(), new types.Wall(), new types.Candy(), new types.Wall()]
]

const mcShape = mc.RIGHT
const candyShape = '<svg width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg"><circle cx="15" cy="15" r="5" fill="yellow"/></svg>'
const voidShape = '<svg width="30" height="30" xmlns="http://www.w3.org/2000/svg"></svg>'
const ghostShape =
  `<svg width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
    <text x="15" y="15" font-family="Verdana" text-anchor="middle" alignment-baseline="middle" font-size="15">&#x1f47b;</text></svg>`

export default {
  mounted () {
    addEventListener('keyup', (evt) => {
      switch (evt.keyCode) {
        case 38:
          this.mcShape = mc.TOP
          return this.up()
        case 40:
          this.mcShape = mc.BOTTOM
          return this.down()
        case 37:
          this.mcShape = mc.LEFT
          return this.left()
        case 39:
          this.mcShape = mc.RIGHT
          return this.right()
      }
    })
  },
  name: 'pacman',
  data () {
    return {
      status: new Status(board),
      mcShape
    }
  },
  methods: {
    left () {
      const translator = translate(...this.status.pacman_position, board.length)
      this.status = this.status.moveTo([translator.x({x: -1}), translator.y({x: -1})])
    },
    right () {
      const translator = translate(...this.status.pacman_position, board.length)
      this.status = this.status.moveTo([translator.x({x: 1}), translator.y({x: 1})])
    },
    up () {
      const translator = translate(...this.status.pacman_position, board.length)
      this.status = this.status.moveTo([translator.x({y: 1}), translator.y({y: 1})])
    },
    down () {
      const translator = translate(...this.status.pacman_position, board.length)
      this.status = this.status.moveTo([translator.x({y: -1}), translator.y({y: -1})])
    },
    show (item, x, y) {
      const position = translate(x, y, board.length)
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
        return this.mcShape
      } else {
        return voidShape
      }
    }
  }
}

</script>
