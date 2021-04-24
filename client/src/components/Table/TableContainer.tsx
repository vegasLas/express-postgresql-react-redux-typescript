import React from "react"
import { connect } from "react-redux"
import { compose } from "redux"
import { infoType } from "../../redux/info-reducer"
import { AppReducersType } from "../../redux/redux-store"
import { actions, getInfo, setActualCondition } from "../../redux/info-reducer"
import Table from "./Table"

class TableContainer extends React.PureComponent<PropsType> {
    constructor(props: PropsType) {
        super(props);
        this.setFilter = this.setFilter.bind(this)
        this.onChangeInput = this.onChangeInput.bind(this)
    }
    componentDidMount() {
        this.props.getInfo()
    }
    async setFilter(e: any) {
        await this.props.setFilterValue({ [e.target.name]: e.target.value })
        this.props.setActualCondition(this.props.filterConditionValue, this.props.filterColumnValue)
        e.preventDefault()
    }
    async onChangeInput(e: any) {
        await this.props.setFilterValue({ [e.target.name]: e.target.value })
        this.props.setFilterInfo()
    }
    render() {
        const { setCurrentPage, currentPage, filteredInfo, filterConditionValue, filterColumnValue, info, filterInputValue } = this.props
        return (
            <Table
                filteredInfo={filteredInfo}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
                filterConditionValue={filterConditionValue}
                filterColumnValue={filterColumnValue}
                setFilter={this.setFilter}
                onChangeInput={this.onChangeInput}
                filterInputValue={filterInputValue} info={info} />
        )
    }
}
type MapStatePropsType = {
    info: infoType,
    filterInputValue: string,
    filterConditionValue: string,
    filterColumnValue: string,
    filteredInfo: infoType,
    currentPage: number,


}
type MapDispatchPropsType = {
    getInfo: () => void,
    setFilterValue: (filterValue: Object) => void,
    setCurrentPage: (pageNumber: number) => void,
    setActualCondition: (filterConditionValue: string, filterColumnValue: string) => void,
    setFilterInfo: () => void

}
type OwnProps = {
    setFilter: (e: any) => void
}
type PropsType = MapStatePropsType & MapDispatchPropsType
let mapStateToProps = (state: AppReducersType): MapStatePropsType => ({
    info: state.info.info,
    filterInputValue: state.info.filterInputValue,
    filterConditionValue: state.info.filterConditionValue,
    filterColumnValue: state.info.filterColumnValue,
    filteredInfo: state.info.filteredInfo,
    currentPage: state.info.currentPage

})

export default compose<React.ComponentType>(
    connect<MapStatePropsType, MapDispatchPropsType, OwnProps, AppReducersType>(mapStateToProps, { setCurrentPage: actions.setCurrentPage, setFilterInfo: actions.setFilterInfo, setFilterValue: actions.setFilterValue, setActualCondition, getInfo })
)(TableContainer)