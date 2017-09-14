import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

import { fromJS } from 'immutable'
import rootReducer from 'reducers'

import AppWrapper from './app.jsx'

require('./public/css/common.css')
require('./public/fonts/font-awesome/font-awesome-core.css')
require('./public/fonts/font-awesome/font-awesome-light.css')
require('./public/fonts/font-awesome/font-awesome-regular.css')
require('./public/fonts/font-awesome/font-awesome-solid.css')
require('./public/fonts/font-awesome/font-awesome-solid.css')
require('./public/fonts/lato.css')

import config from './backend/config'

var status = config.initialize()

/**
 * Get saved state from config
 * var previousAppState = config.getPreviousState()
 * var initialStore = previousAppState
 */


var initialStore = {
  gui: {
    status: status, // {string} Can be need initialization, need unlocking or ready
    activePane: null, // {string}
    activeNavTab: null, // {string}
    activeNavTabType: null,
    activeEntries: [],// can be 'default', empty list, 'loading'
    activeEntry: null, // id string
    searchActive: false,
    entries_rerender: true,
    modal: null,
    modalResponse: null
  },
  db: {},
  logger: {}
}

const store = createStore(rootReducer, fromJS(initialStore), applyMiddleware(thunk))

render(
  <Provider store={store}>
    <AppWrapper />
  </Provider>,
  document.getElementById('root')
)