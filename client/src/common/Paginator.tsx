import React from 'react'
import classes from './Paginator.module.css'
import cn from 'classnames'

type PropsType = { pagesCount: number, currentPage: number, setCurrentPage: (pageNumber: number) => void }

let Paginator: React.FC<PropsType> = ({ setCurrentPage, pagesCount, currentPage }) => {
    let pages: Array<number> = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }
    return <div className={classes.paginator}>
        {pages
            .map((p) => {
                return <a className=
                    {cn({
                        [classes.selectedPage]:
                            currentPage === p
                    },
                        classes.pageNumber)}
                    key={p}
                    onClick={(e) => {
                        setCurrentPage(p)
                    }}>{p}</a>
            })
        }
    </div>
}

export default Paginator;