import { InfoRestApi } from '../resApi/InfoRestApi';
import { BaseThunkType, InferActionsTypies } from "./redux-store"

// List types whitch we use
export type ObjectInType = { id: number, date: string, name: string, amount: number, range: number }
export type infoType = Array<Array<ObjectInType>>


const initialState = {
    info: [] as infoType,
    filterInputValue: "" as string,
    filterConditionValue: "equally" as string,
    filterColumnValue: "name" as string,
    filteredInfo: [] as infoType,
    currentPage: 1 as number,
    pageSize: 10 as number
}
// Разбиваем массивы в массиве, на их элементы
// чтобы не было вложенности
function flatArray(arr: ObjectInType[] | ObjectInType[][]) {
    var result = [] as Array<ObjectInType>
    arr.forEach((el: ObjectInType[] | ObjectInType) => {
        if (Array.isArray(el)) {
            result = [...result, ...flatArray(el)]
        } else {
            result = [...result, el]
        }
    })
    return result
}
// Компануем массив в зависимости от размера странички(числа злементов в нем)ж
function distributorObjectsInArray(arr: infoType) {
    let result = [] as Array<any>
    let count = 1
    for (var i = 0; i < arr.length; i++) {
        if (!(i % initialState.pageSize)) {
            if (i !== 0) {
                count++
            }
            result[count] = []
        }
        result[count].push(arr[i])
    }
    result.shift()
    return result
}


export type initialStateType = typeof initialState
const infoReducer = (state = initialState, action: ActionsType): initialStateType => {
    switch (action.type) {
        case "SET_INFO":
            return {
                ...state,
                info: distributorObjectsInArray(Array.from(action.info))
            }
        case "SET_FILTER_VALUE":
            return {
                ...state,
                ...action.payload
            }
        case "SET_CURRENT_PAGE":
            return {
                ...state,
                currentPage: action.pageNumber
            }
        case "SET_FILTERED_INFO":
            let InfoCopy = [] as any[]; // 
            let { filterInputValue, filterConditionValue, filterColumnValue, info } = state
            if (filterInputValue) {
                if (info.length > 1) {
                    InfoCopy = flatArray(Array.from(info))
                    if (filterColumnValue === "name") {
                        if (Number(filterInputValue) === NaN && typeof Number(filterInputValue) !== "number") {
                            InfoCopy = []
                        } else if (filterConditionValue === "equally") {
                            InfoCopy = InfoCopy.filter(o => o.name === filterInputValue)
                        } else if (filterConditionValue === "contains") {
                            InfoCopy = InfoCopy.filter(o => o.name.search(filterInputValue) !== -1)
                        }
                    }
                    else if (filterColumnValue === "amount" || "range") {
                        if (Number(filterInputValue) === NaN && typeof Number(filterInputValue) !== "number") {
                            InfoCopy = []
                        } else if (filterConditionValue === "more") {
                            InfoCopy = InfoCopy.filter(o => o[filterColumnValue] > Number(filterInputValue))
                        } else if (filterConditionValue === "less") {
                            InfoCopy = InfoCopy.filter(o => o[filterColumnValue] < Number(filterInputValue))
                        } else if (filterConditionValue === "equally") {
                            InfoCopy = InfoCopy.filter(o => o[filterColumnValue] === Number(filterInputValue))
                        }
                    }
                }
            }
            return {
                ...state,
                filteredInfo: distributorObjectsInArray([...InfoCopy])

            }
        default:
            return state
    }
}
export type ActionsType = InferActionsTypies<typeof actions>
type ThunkType = BaseThunkType<ActionsType>
export const actions = {

    setInfo: (info: infoType) => {
        return { type: "SET_INFO", info } as const
    },
    setFilterValue: (filterValues: Object) => {
        return {
            type: "SET_FILTER_VALUE",
            payload: { ...filterValues }
        } as const
    },
    setFilterInfo: () => {
        return {
            type: "SET_FILTERED_INFO",
        } as const
    },
    setCurrentPage: (pageNumber: number) => {
        return {
            type: "SET_CURRENT_PAGE",
            pageNumber
        } as const
    },

}

export const getInfo = (): ThunkType => async (dispatch) => {
    let data = await InfoRestApi.getInfo()
    dispatch(actions.setInfo(data));
}

// Следим за автоматическим изменением корректных условий, при изменнении колонки
export const setActualCondition = (filterConditionValue: string, filterColumnValue: string): ThunkType => async (dispatch) => {
    if (filterColumnValue === "name" &&
        filterConditionValue === ("more" || "less")) {
        dispatch(actions.setFilterValue({ filterConditionValue: "contains" }))
    }
    else if (
        filterColumnValue === ("amount" || "range") && filterConditionValue === "contains") {
        dispatch(actions.setFilterValue({ filterConditionValue: "equally" }))
    }
}
export default infoReducer