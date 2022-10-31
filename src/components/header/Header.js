import {ExelComponent} from '@core/ExelComponent'
import {$} from '@core/dom';
import {changeTitle} from '@/redux/actions';
import {defaultTitle} from '@/constants';
import {debounce} from '@core/utils';

export class Header extends ExelComponent {
  static className = 'exel__header'
  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input'],
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
                <div class="button">
                    <span class="material-icons">
                    delete
                    </span>
                </div>
                <div class="button">
                    <span class="material-icons">
                    logout
                    </span>
                </div>
            </div>
    `
  }

  onInput(event) {
    const $target = $(event.target)
    this.$dispatch(changeTitle($target.text()))
  }
}
