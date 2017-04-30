import * as types from './pacman-types'
import * as errors from './pacman-errors'

class Status {
  constructor (board, position = [0, 0], score = 0) {
    this.pacman_position = position
    this.board = board
    this.score = score
  }
  moveTo (position) {
    if (!(position[0] in this.board) || !(position[1] in this.board[position[0]])) {
      throw new errors.BadArguments('参数错误')
    }
    let newBoard = copyArray(this.board)
    let newScore = this.score
    if (newBoard[position[0]][position[1]] instanceof types.Candy) {
      newScore += 1
      newBoard[position[0]][position[1]] = new types.Void() // 站的位置始终是void
      return new Status(newBoard, [].slice.call(position), newScore)
    }
    if (newBoard[position[0]][position[1]] instanceof types.Void) {
      return new Status(newBoard, [].slice.call(position), newScore)
    }
    if (newBoard[position[0]][position[1]] instanceof types.Wall) {
      throw new errors.Conflict()
    }
  }
}

function copyArray (src) {
  let ret = []
  for (let i = 0; i < src.length; ++i) {
    let row = []
    for (let j = 0; j < src[i].length; ++j) {
      row.push(src[i][j])
    }
    ret.push(row)
  }
  return ret
}

export { Status }
