import {ExelComponent} from '@core/ExelComponent'
import {createTable} from '@/components/table/table.templete';
import {resizeHandler} from '@/components/table/table.resize';
import {shouldResize} from '@/components/table/table.function';

export class Table extends ExelComponent {
  static className = 'exel__table'
  constructor($root) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown']
    })
  }

  toHTML() {
    return createTable(18)
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      resizeHandler(event, this.$root)
    }
  }
}
