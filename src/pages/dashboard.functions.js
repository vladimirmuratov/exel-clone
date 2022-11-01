import {storage} from '@core/utils'

function toHTML(key) {
  const state = storage(key)
  const number = Number(key.split(':')[1])
  return `
    <li class="db__record">
        <a href="#exel/${number}">${state.title}</a>
        <strong>
            ${new Date(state.openedDate).toLocaleDateString()}
            ${new Date(state.openedDate).toLocaleTimeString()}
        </strong>
    </li>
    `
}

function getAllKeys() {
  const keys = []
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (!key.includes('exel')) {
      continue
    }
    keys.push(key)
  }
  return keys
}

export function createRecordsTable() {
  const keys = getAllKeys()

  if (!keys.length) {
    return `<p>Вы пока не создали ни одной таблицы.</p>`
  }

  return `
    <div class="db__list-header">
        <span>Название</span>
        <span>Дата открытия</span>
    </div>
    <ul class="db__list">
        ${keys.map(toHTML).join('')}
    </ul>
  `
}
