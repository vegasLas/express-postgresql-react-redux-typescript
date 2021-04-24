
import { applyMiddleware, compose, createStore, combineReducers, Action } from "redux";
import thunkMiddleware, { ThunkAction } from 'redux-thunk'
import infoReducer from "./info-reducer";



let reducers = combineReducers({
    info: infoReducer 
})

type PropertiesType<T> = T extends { [key: string]: infer U } ? U : never

export type InferActionsTypies<T extends { [key: string]: (...args: any[]) => any }> = ReturnType<PropertiesType<T>>


type ReducersType = typeof reducers

export type AppReducersType = ReturnType<ReducersType>

export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, AppReducersType, unknown, A>
//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)));
//@ts-ignore
window.__store__ = store;

export default store;