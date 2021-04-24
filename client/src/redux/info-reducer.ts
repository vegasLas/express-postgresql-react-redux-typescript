import { InfoRestApi } from '../resApi/InfoRestApi';
import { BaseThunkType, InferActionsTypies } from "./redux-store"

// List types whitch we use


const initialState = {
    info: [] as infoType,
    filterInputValue: "" as string,
    filterConditionValue: "equally" as string,
    filterColumnValue: "name" as string,
    filteredInfo: [] as infoType 
}
export type initialStateType = typeof initialState
const infoReducer = (state = initialState, action: ActionsType): initialStateType => {
    switch (action.type) {
        case "SET_INFO":
            return {
                ...state,
                info: Array.from(action.info)
            }
        case "SET_FILTER_VALUE":
            return {
                ...state,
                ...action.payload
            }
        case "SET_FILTERED_INFO":
            let InfoCopy = [] as Array<any>;
            let { filterInputValue, filterConditionValue, filterColumnValue, info } = state
            if (filterInputValue) {
                if (info.length > 1) {
                    InfoCopy = Array.from(info)
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
            console.log(InfoCopy)
            return {
                ...state,
                filteredInfo: InfoCopy && [...InfoCopy]

            }
        default:
            return state
    }
}
export type infoType = Array<{ id: number, date: string, name: string, amount: number, range: number }>
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

}

export const getInfo = (): ThunkType => async (dispatch) => {
    let data = await InfoRestApi.getInfo()
    dispatch(actions.setInfo(data));
}
export const setActualCondition = (filterConditionValue: string, filterColumnValue: string): ThunkType => async (dispatch) => {
    if (filterColumnValue === "name" &&
        filterConditionValue === ("more" || "less")) {
        console.log("То что мне нужно name")
        dispatch(actions.setFilterValue({ filterConditionValue: "contains" }))
    }
    else if (
        filterColumnValue === ("amount" || "range") && filterConditionValue === "contains") {
        console.log("То что мне нужно amount range")
        dispatch(actions.setFilterValue({ filterConditionValue: "equally" }))
    }
}
export default infoReducer