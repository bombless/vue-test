import * as types from './pacman-types'

export {
  getSvg
}

function getSvg (board, position) {
  let minusSets = []
  if (!hasLeft(board, position)) {
    minusSets.push(enumHasLeft)
  } else {
    console.log('hasLeft')
  }
  if (!hasRight(board, position)) {
    minusSets.push(enumHasRight)
  } else {
    console.log('hasRight')
  }
  if (!hasTop(board, position)) {
    minusSets.push(enumHasTop)
  } else {
    console.log('hasTop')
  }
  if (!hasBottom(board, position)) {
    minusSets.push(enumHasBottom)
  } else {
    console.log('hasBottom')
  }
  console.log(minusSets)
  let result = [].slice.apply(fullList)
  for (let minus of minusSets) {
    result = setMinus(result, minus)
  }
  console.log('result', result)
  return load(result[0])
}

const hasTop = (board, position) => { // looks like left, actually bottom
  let x = position[0]
  let y = position[1]
  let spotX = 3 - (y + 1)
  let spotY = x
  return (spotX in board) && (board[spotX][spotY] instanceof types.Wall)
}

const hasRight = (board, position) => { // looks like right, actually top
  let x = position[0]
  let y = position[1]
  let spotX = 3 - y
  let spotY = x + 1
  return (spotY in board[spotX]) && (board[spotX][spotY] instanceof types.Wall)
}

const hasBottom = (board, position) => { // looks like top, actually left
  let x = position[0]
  let y = position[1]
  let spotX = 3 - (y - 1)
  let spotY = x
  return (spotX in board) && (board[spotX][spotY] instanceof types.Wall)
}

const hasLeft = (board, position) => { // looks like bottom, actually right
  let x = position[0]
  let y = position[1]
  let spotX = 3 - y
  let spotY = x - 1
  return (spotY in board[spotX]) && (board[spotX][spotY] instanceof types.Wall)
}

const enumHasLeft = '─ ┼ ┘ ┐ ┬ ┴ ┤ ╴'.split(' ')
const enumHasRight = '─ ┼ ┌ └ ┬ ┴ ├ ╶'.split(' ')
const enumHasTop = '│ ┼ ┘ └ ┴ ┤ ├ ╵'.split(' ')
const enumHasBottom = '│ ┼ ┌ ┐ ┬ ┤ ├ ╷'.split(' ')

const fullList = '┼ ┤ ┴ ┬ ├ ┌ ┘ └ ┐ │ ─ ╶ ╴ ╵ ╷ •'.split(' ')

function setMinus (left, right) {
  let rightSet = {}
  let ret = []
  for (let k of right) rightSet[k] = true
  for (let k of left) if (!(k in rightSet)) ret.push(k)
  return ret
}

function load (sigil) {
  switch (sigil) {
    case '│':
      return (
  `<svg width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
    <line x1="15" y1="0" x2="15" y2="30" stroke-width="2" stroke="black"/></svg>`)
    case '─':
      return (
   `<svg width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
      <line x1="0" y1="15" x2="30" y2="15" stroke-width="2" stroke="black"/></svg>`
      )
    case '┼':
      return (
  `<svg width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
    <line x1="0" y1="15" x2="30" y2="15" stroke-width="2" stroke="black"/>
    <line x1="15" y1="0" x2="15" y2="30" stroke-width="2" stroke="black"/></svg>`
      )
    case '┌':
      return (
  `<svg width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
    <line x1="15" y1="15" x2="30" y2="15" stroke-width="2" stroke="black"/>
    <line x1="15" y1="15" x2="15" y2="30" stroke-width="2" stroke="black"/></svg>`
      )
    case '┘':
      return (
  `<svg width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
    <line x1="0" y1="15" x2="15" y2="15" stroke-width="2" stroke="black"/>
    <line x1="15" y1="0" x2="15" y2="15" stroke-width="2" stroke="black"/></svg>`
      )
    case '└':
      return (
  `<svg width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
    <line x1="15" y1="15" x2="30" y2="15" stroke-width="2" stroke="black"/>
    <line x1="15" y1="0" x2="15" y2="15" stroke-width="2" stroke="black"/></svg>`
      )
    case '┐':
      return (
  `<svg width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
    <line x1="0" y1="15" x2="15" y2="15" stroke-width="2" stroke="black"/>
    <line x1="15" y1="30" x2="15" y2="15" stroke-width="2" stroke="black"/></svg>`
      )
    case '┬':
      return (
  `<svg width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
    <line x1="0" y1="15" x2="30" y2="15" stroke-width="2" stroke="black"/>
    <line x1="15" y1="15" x2="15" y2="30" stroke-width="2" stroke="black"/></svg>`
      )
    case '┴':
      return (
  `<svg width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
    <line x1="0" y1="15" x2="30" y2="15" stroke-width="2" stroke="black"/>
    <line x1="15" y1="0" x2="15" y2="15" stroke-width="2" stroke="black"/></svg>`
      )
    case '┤':
      return (
  `<svg width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
    <line x1="0" y1="15" x2="15" y2="15" stroke-width="2" stroke="black"/>
    <line x1="15" y1="0" x2="15" y2="30" stroke-width="2" stroke="black"/></svg>`
      )
    case '├':
      return (
  `<svg width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
    <line x1="15" y1="15" x2="30" y2="15" stroke-width="2" stroke="black"/>
    <line x1="15" y1="0" x2="15" y2="30" stroke-width="2" stroke="black"/></svg>`
      )
    case '•':
      return (
  `<svg width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
    <circle fill="black" cx="15" cy="15" r="5"/></svg>`
      )
    case '╶':
      return (
  `<svg width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
    <line x1="15" y1="15" x2="30" y2="15" stroke-width="2" stroke="black"/></svg>`
      )
    case '╴':
      return (
  `<svg width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
    <line x1="15" y1="15" x2="0" y2="15" stroke-width="2" stroke="black"/></svg>`
      )
    case '╵':
      return (
  `<svg width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
    <line x1="15" y1="15" x2="15" y2="0" stroke-width="2" stroke="black"/></svg>`
      )
    case '╷':
      return (
  `<svg width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
    <line x1="15" y1="15" x2="15" y2="30" stroke-width="2" stroke="black"/></svg>`
      )
  }
}
