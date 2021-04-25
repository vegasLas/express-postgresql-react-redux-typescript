import moment from "moment"
import React from "react"
import { ObjectInInfoType } from "../../redux/info-reducer"

type TableRawPropsType = {
    object: ObjectInInfoType
}
const TableRaw: React.FC<TableRawPropsType> = ({ object }) => {
    const { date, name, amount, range } = object
    return (<tr className="table__raw">
        <th className="table__date">{moment(date).format('MMMM Do YYYY')}</th>
        <th className="table__name">{name}</th>
        <th className="table__count">{amount}</th>
        <th className="table__range">{range}</th>
    </tr>)
}
export default TableRaw