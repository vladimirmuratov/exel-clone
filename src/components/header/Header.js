import {ExelComponent} from '@core/ExelComponent'
import {$} from '@core/dom'
import {changeTitle} from '@/redux/actions'
import {defaultTitle} from '@/constants'
import {debounce} from '@core/utils'
import {ActiveRoute} from '@core/routes/ActiveRoute'

export class Header extends ExelComponent {
  static className = 'exel__header'
  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input', 'click'],
      ...options
    })
  }

  prepare() {
    this.onInput = debounce(this.onInput, 300)
  }

  toHTML() {
    const title = this.store.getState().title || defaultTitle
    return `
       <input type="text" class="input" value="${title}"/>
            <div>
                <div class="button" data-button="remove">
                    <span class="material-icons" data-button="remove">
                    delete
                    </span>
                </div>
                <div class="button" data-button="exit">
                    <span class="material-icons" data-button="exit">
                    logout
                    </span>
                </div>
            </div>
    `
  }

  onClick(event) {
    const $target = $(event.target)
    if ($target.data.button === 'exit') {
      ActiveRoute.navigate('')
    } else if ($target.data.button === 'remove') {
      const answer = confirm('Вы действительно хотите удалить эту таблицу?')
      if (answer) {
        localStorage.removeItem(`exel:${ActiveRoute.param}`)
        ActiveRoute.navigate('')
      }
    }
  }

  onInput(event) {
    const $target = $(event.target)
    this.$dispatch(changeTitle($target.text()))
  }
}
