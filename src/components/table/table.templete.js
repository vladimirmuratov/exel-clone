import {toInlineStyles} from '@core/utils'
import {defaultStyles} from '@/constants'
import {parse} from '@core/parse'

const CODES = {
  A: 65,
  Z: 90
}

const DEFAULT_WIDTH = 120
const DEFAULT_HEIGHT = 24

function getWidth(state = {}, index) {
  return (state[index] || DEFAULT_WIDTH) + 'px'
}

function getHeight(state = {}, index) {
  return (state[index] || DEFAULT_HEIGHT) + 'px'
}

function toCell(state, rowNumber) {
  return function(_, colNumber) {
    const id = `${rowNumber}:${colNumber}`
    const width = getWidth(state.colState, colNumber)
    const data = state.dataState[id]
    const styles = toInlineStyles({
      ...defaultStyles,
      ...state.stylesState[id]
    })

    return `<div 
            class="cell" 
            data-type="cell"
            data-col="${colNumber}" 
            data-id="${id}"
            data-value="${data || ''}"
            style="${styles}; width: ${width};"
            contenteditable
          >
            ${parse(data) || ''}
          </div>`
  }
}

function toColumn({colName, index, width}) {
  return `
        <div 
          class="column"
          data-type="resizable"
          data-col="${index}"
          style="width: ${width}"
        >
            ${colName}
            <div class="col-resize" data-resize="col"></div>
        </div>
        `
}

function createRow(index, content, state = {}) {
  const resize = index ? '<div class="row-resize" data-resize="row"></div>' : ''
  const height = getHeight(state, index)
  return `
    <div 
        class="row"
        data-type="resizable"
        data-row="${index}"
        style="height: ${height}"
      >
        <div class="row-info">
            ${index ? index : ''}
            ${resize}
        </div>
        <div class="row-data">${content}</div>
    </div>
    `
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index)
}

function withWidthFrom(state) {
  return function(colName, index) {
    return {
      colName,
      index,
      width: getWidth(state.colState, index)
    }
  }
}

export function createTable(rowsCount = 15, state = {}) {
  const colsCount = CODES.Z - CODES.A + 1
  const rows = []
  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(withWidthFrom(state))
      .map(toColumn)
      .join('')

  rows.push(createRow(null, cols))

  for (let rowNumber = 0; rowNumber < rowsCount; rowNumber++) {
    const cells = new Array(colsCount)
        .fill('')
        .map(toCell(state, rowNumber))
        .join('')

    rows.push(createRow(rowNumber + 1, cells, state.rowState))
  }

  return rows.join('')
}
