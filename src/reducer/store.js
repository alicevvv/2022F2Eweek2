// 包覆 actionType 跟 reducer
import { createStore } from 'redux'
import { myReducer } from "./reducer";

const store = createStore(myReducer)

export default store