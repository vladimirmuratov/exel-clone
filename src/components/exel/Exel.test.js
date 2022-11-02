/**
 * @jest-environment jsdom
 */

import {Exel} from './Exel'

describe('Exel', () => {
  let exel
  let $root

  beforeEach(() => {
    exel = new Exel({})
    $root = document.createElement('div')
    $root.className = 'exel'
  })

  test('should be defined', () => {
    expect(exel).toBeDefined()
  })

  test('should render $root', () => {
    exel.getRoot()
    expect($root.outerHTML).toBe('<div class="exel"></div>')
  })
})
