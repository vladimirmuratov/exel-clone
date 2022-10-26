const CODES = {
  A: 65,
  Z: 90
}

function toCell(rowNumber, colNumber) {
  return `<div 
            class="cell" 
            data-type="cell"
            data-col="${colNumber}" 
            data-id="${rowNumber}:${colNumber}" 
            contenteditable
          ></div>`
}

function toColumn(colName, index) {
  return `
        <div class="column" data-type="resizable" data-col="${index}">
            ${colName}
            <div class="col-resize" data-resize="col"></div>
        </div>
        `
}

function createRow(index, content) {
  const resize = index ? '<div class="row-resize" data-resize="row"></div>' : ''
  return `
    <div class="row" data-type="resizable">
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

export function createTable(rowsCount = 15) {
  const colsCount = CODES.Z - CODES.A + 1
  const rows = []
  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(toColumn)
      .join('')

  rows.push(createRow(null, cols))

  for (let rowNumber = 0; rowNumber < rowsCount; rowNumber++) {
    const cells = new Array(colsCount)
        .fill('')
        .map((_, colNumber) => toCell(rowNumber, colNumber))
        .join('')

    rows.push(createRow(rowNumber + 1, cells))
  }

  return rows.join('')
}
