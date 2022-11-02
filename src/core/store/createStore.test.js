import {createStore} from './createStore'

const initialState = {
  count: 0
}

const reducer = (state = initialState, action) => {
  if (action.type === 'ADD') {
    return {...state, count: state.count + 1}
  }
  return state
}

describe('createStore', () => {
  let store
  let handler

  beforeEach(() => {
    store = createStore(reducer, initialState)
    handler = jest.fn()
  })

  // Проверяем существование методов в store
  test('should return store object', () => {
    expect(store).toBeDefined()
    expect(store.dispatch).toBeDefined()
    expect(store.subscribe).toBeDefined()
    expect(store.getState).toBeDefined()
  })

  // Проверяем что store это объект
  test('should return object as a state', () => {
    expect(store.getState()).toBeInstanceOf(Object)
  })

  // Проверяем что при отсутствии action.type возвращается initialState
  test('should return initial State', () => {
    expect(store.getState()).toEqual(initialState)
  })

  // Проверяем изменение state если action.type существует
  test('should change state if action exists', () => {
    store.dispatch({type: 'ADD'})
    expect(store.getState().count).toBe(1)
  })

  // Проверяем неизменяемость state если action.type НЕ существует
  test('should NOT change state if action don\'t exists', () => {
    store.dispatch({type: 'NOT_EXISTING_ACTION'})
    expect(store.getState().count).toBe(0)
  })

  // Проверяем что subscriber вызывался
  test('should call subscriber function', () => {
    store.subscribe(handler)
    store.dispatch({type: 'ADD'})

    expect(handler).toHaveBeenCalled()
    expect(handler).toHaveBeenCalledWith(store.getState())
  })

  // Проверяем unsubscribe
  test('should NOT call sub if unsubscribe', () => {
    const sub = store.subscribe(handler)

    sub.unsubscribe()

    store.dispatch({type: 'ADD'})

    expect(handler).not.toHaveBeenCalled()
  })

  // Проверяем асинхронность
  test('should dispatch in async', () => {
    return new Promise(resolve => {
      setTimeout(() => {
        store.dispatch({type: 'ADD'})
      }, 500)

      setTimeout(() => {
        expect(store.getState().count).toBe(1)
        resolve()
      }, 1000)
    })
  })
})
