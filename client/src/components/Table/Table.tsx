import React from "react"
import { infoType, ObjectInType } from "../../redux/info-reducer"
import moment from "moment"
import Paginator from "../../common/Paginator"


type propsType = {
  info: infoType,
  filterInputValue: string,
  filterConditionValue: string,
  filterColumnValue: string,
  setFilter: (e: any) => void,
  onChangeInput: (e: any) => void,
  filteredInfo: infoType,
  setCurrentPage: (pageNumber: number) => void,
  currentPage: number,

}

class Table extends React.PureComponent<propsType> {
  constructor(props: propsType) {
    super(props);
  }

  render() {
    const { currentPage, setCurrentPage, onChangeInput, filteredInfo, filterConditionValue, filterColumnValue, setFilter, filterInputValue, info } = this.props
    let infoTable;
    const markUp = filterColumnValue === "name" ? <>
      <option value="equally">равно</option>
      <option value="contains">содержит</option>
    </> : (filterColumnValue === "amount" || filterColumnValue === "range") ?
      <>
        <option value="equally">равно</option>
        <option value="more">больше</option>
        <option value="less">меньше</option>
      </> : null
    if (filterInputValue.length > 0 || filteredInfo.length > 0) {
      if (!filteredInfo[currentPage - 1]) {
        infoTable = filteredInfo.map(
          (o: any) =>
            <tr key={o.id} className="table__raw">
              <th className="table__date">{moment(o.date).format('MMMM Do YYYY')}</th>
              <th className="table__name">{o.name}</th>
              <th className="table__count">{o.amount}</th>
              <th className="table__range">{o.range}</th>
            </tr>)
      } else {
        infoTable = filteredInfo[currentPage - 1].map(
          (o: any) =>
            <tr key={o.id} className="table__raw">
              <th className="table__date">{moment(o.date).format('MMMM Do YYYY')}</th>
              <th className="table__name">{o.name}</th>
              <th className="table__count">{o.amount}</th>
              <th className="table__range">{o.range}</th>
            </tr>)
      }
    } else {
      infoTable = info.length > 0 && info[currentPage - 1].map(
        (o: any) =>
          <tr key={o.id} className="table__raw">
            <th className="table__date">{moment(o.date).format('MMMM Do YYYY')}</th>
            <th className="table__name">{o.name}</th>
            <th className="table__count">{o.amount}</th>
            <th className="table__range">{o.range}</th>
          </tr>)
    }
    return (
      <main className="main">
        <section className="main__body">
          <div className="filters">
            <div className="filters__filter filter">
              <label htmlFor="filter-column" className="filter__label filter">
                Выбрать колонку:
            </label>
              <select name="filterColumnValue" onChange={setFilter} value={filterColumnValue} id="filter-column" className="filter__input">
                <option value="name">название</option>
                <option value="amount">количество</option>
                <option value="range">растояние</option>
              </select>
            </div>
            <div className="filters__filter filter">
              <label htmlFor="filter-condition" className="filter__label filter">
                Выбрать условие:
            </label>
              <select name="filterConditionValue" onChange={setFilter} value={filterConditionValue} id="filter-condition" className="filter__input" >
                {markUp}
              </select>
            </div>
            <div className="filters__filter filter">
              <label htmlFor="filter-conformity" className="filter__label" >
                Соответсвие по тексту:
            </label>
              <input id="filter-conformity" name="filterInputValue" className="filter__input" value={filterInputValue} onChange={onChangeInput}>
              </input>
            </div>
          </div>
          <table className="table" >
            <caption className="table__caption">Таблица</caption>
            <thead >
              <tr className="table__names">
                <th className="table__name">Дата</th>
                <th className="table__name">Название</th>
                <th className="table__name">Количество</th>
                <th className="table__name">Растояние</th>
              </tr>
            </thead>
            <tbody className="table__body" >
              {infoTable}
            </tbody>
          </table>
          <Paginator pagesCount={filterInputValue.length > 0 || filteredInfo.length > 0 ? filteredInfo.length : info.length} currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </section>
      </main >
    )
  }
}
export default Table