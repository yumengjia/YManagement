import { applyMiddleware, combineReducers, legacy_createStore as createStore} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'

import user from './reducers/user'
import { headTitle } from './reducers/categorys'
import { allProducts } from './reducers/products'
import { categorys } from './reducers/categorys'

const allReducers = combineReducers({
    user,
    headTitle,
    allProducts,
    categorys
})

const store = createStore(allReducers, composeWithDevTools(applyMiddleware(thunk)))

export default store
