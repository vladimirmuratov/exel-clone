import {ExelComponent} from '@core/ExelComponent'
import {createTable} from '@/components/table/table.templete'
import {resizeHandler} from '@/components/table/table.resize'
import {isCell,
  matrix,
  nextSelector,
  shouldResize} from '@/components/table/table.function'
import {TableSelection} from '@/components/table/TableSelection'
import {$} from '@core/dom'
import * as actions from '@/redux/actions'
import {defaultStyles} from '@/constants'
import {parse} from '@core/parse'

export class Table extends ExelComponent {
    static className = 'exel__table'

    constructor($root, options) {
      super($root, {
        name: 'Table',
        listeners: ['mousedown', 'keydown', 'input'],
        ...options
      })
    }

    prepare() {
      this.selection = new TableSelection()
    }

    init() {
      super.init()
      this.selectCell(this.$root.find('[data-id="0:0"]'))
      this.$on('formula:input', value => {
        this.selection.current
            .attr('data-value', value)
            .text(parse(value))
        this.updateTextInStore(value)
      })
      this.$on('formula:done', () => {
        this.selection.current.focus()
      })
      this.$on('toolbar:applyStyle', value => {
        this.selection.applyStyle(value)
        this.$dispatch(actions.applyStyle({
          value,
          ids: this.selection.selectedIds
        }))
      })
    }

    selectCell($cell) {
      this.selection.select($cell)
      this.$emit('table:select', $cell)
      const styles = $cell.getStyles(Object.keys(defaultStyles))
      this.$dispatch(actions.changeStyles(styles))
    }

    toHTML() {
      return createTable(18, this.store.getState())
    }

    async resizeTable(event) {
      try {
        const data = await resizeHandler(event, this.$root)
        this.$dispatch(actions.tableResize(data))
      } catch (e) {
        console.warn('Resize error', e.message)
      }
    }

    onMousedown(event) {
      if (shouldResize(event)) {
        this.resizeTable(event)
      } else if (isCell(event)) {
        const $target = $(event.target)
        if (event.shiftKey) {
          const cells = matrix($target, this.selection.current)
              .map(id => this.$root.find(`[data-id="${id}"]`))
          this.selection.selectGroup(cells)
        } else {
          this.selectCell($target)
        }
      }
    }

    onKeydown(event) {
      const keys = [
        'Enter',
        'Tab',
        'ArrowLeft',
        'ArrowRight',
        'ArrowDown',
        'ArrowUp'
      ]

      const {key} = event
      if (keys.includes(key) && !event.shiftKey) {
        event.preventDefault()
        const id = this.selection.current.id(true)
        const $next = this.$root.find(nextSelector(key, id))
        this.selectCell($next)
      }
    }

    onInput(event) {
      // this.$emit('table:input', $(event.target))
      this.updateTextInStore($(event.target).text())
    }

    updateTextInStore(value) {
      this.$dispatch(actions.changeText({
        id: this.selection.current.id(),
        value
      }))
    }
}
