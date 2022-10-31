import {Exel} from '@/components/exel/Exel'
import {Header} from '@/components/header/Header';
import {Toolbar} from '@/components/toolbar/Toolbar';
import {Formula} from '@/components/formula/Formula';
import {Table} from '@/components/table/Table';
import './scss/index.scss'
import {createStore} from '@core/createStore';
import {rootReducer} from '@/redux/rootReducer';
import {debounce, storage} from '@core/utils';
import {initialState} from '@/redux/initialState';

const store = createStore(rootReducer, initialState)

const stateListener = debounce(state => {
  storage('exel-state', state)
  console.log('App State: ', state)
}, 300)

store.subscribe(stateListener)

const exel = new Exel('#app', {
  components: [Header, Toolbar, Formula, Table],
  store
})

exel.render()
