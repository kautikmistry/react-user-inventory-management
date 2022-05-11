import { useState, useMemo, useContext } from 'react';

// Route
import { Link } from 'react-router-dom';

// Utility
import { sortRows, filterRows, paginateRows } from '../helpers/table_helpers'
import { Pagination } from '../component/Pagination';

// Store
import { GlobalContext } from "../Store/Globalstate";


export const Table = ({ columns, rows }) => {
    const { state, dispatch } = useContext(GlobalContext);
    const [activePage, setActivePage] = useState(1)
    const [filters, setFilters] = useState({})
    const [sort, setSort] = useState({ order: 'asc', orderBy: 'id' })
    const rowsPerPage = 5

    const filteredRows = useMemo(() => filterRows(rows, filters), [rows, filters])
    const sortedRows = useMemo(() => sortRows(filteredRows, sort), [filteredRows, sort])
    const calculatedRows = paginateRows(sortedRows, activePage, rowsPerPage)

    const count = filteredRows.length
    const totalPages = Math.ceil(count / rowsPerPage)

    const handleSearch = (value, accessor) => {
        setActivePage(1)

        if (value) {
            setFilters((prevFilters) => ({
                ...prevFilters,
                [accessor]: value,
            }))
        } else {
            setFilters((prevFilters) => {
                const updatedFilters = { ...prevFilters }
                delete updatedFilters[accessor]

                return updatedFilters
            })
        }
    }

    const handleSort = (accessor) => {
        setActivePage(1)
        setSort((prevSort) => ({
            order: prevSort.order === 'asc' && prevSort.orderBy === accessor ? 'desc' : 'asc',
            orderBy: accessor,
        }))
    }

    const clearAll = () => {
        setSort({ order: 'asc', orderBy: 'id' })
        setActivePage(1)
        setFilters({})
    }

    const deleteItem = id => {
        dispatch({
            type: "DELETE_ITEM",
            payload: id
        })
    };


    return (
        <>
            <table>
                <thead>
                    <tr>
                        {columns.map((column) => {
                            const sortIcon = () => {
                                if (column.accessor === sort.orderBy) {
                                    if (sort.order === 'asc') {
                                        return '⬆️'
                                    }
                                    return '⬇️'
                                } else {
                                    return '️↕️'
                                }
                            }
                            return (
                                <th key={column.accessor}>
                                    <span>{column.label}</span>
                                    {['name', 'price'].includes(column.accessor) &&
                                     <button onClick={() => handleSort(column.accessor)}>{sortIcon()}</button> }
                                </th>
                            )
                        })}
                    </tr>
                    <tr>
                        {columns.map((column) => {
                            return (
                                <th>
                                    {!['delete', 'view'].includes(column.accessor) && <input
                                        key={`${column.accessor}-search`}
                                        type="search"
                                        placeholder={`Search ${column.label}`}
                                        value={filters[column.accessor]}
                                        onChange={(event) => handleSearch(event.target.value, column.accessor)}
                                    />}
                                </th>
                            )
                        })}
                    </tr>
                </thead>
                <tbody>
                    {calculatedRows.map((row) => {
                        return (
                            <tr key={row.id}>
                                {columns.map((column) => {
                                    if (column.format) {
                                        return <td key={column.accessor}>{column.format(row[column.accessor])}</td>
                                    } else if (column.accessor === 'delete') {
                                        return <td key={column.accessor} onClick={() => deleteItem(row.id)}><a href="#!">Delete</a></td>
                                    } else if (column.accessor === 'view') {
                                        return <td key={column.accessor}><Link to={`/item-details/${row.id}`}>View</Link></td>
                                    }
                                    return <td key={column.accessor}>{row[column.accessor]}</td>
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>

            {count > 0 ? (
                <Pagination
                    activePage={activePage}
                    count={count}
                    rowsPerPage={rowsPerPage}
                    totalPages={totalPages}
                    setActivePage={setActivePage}
                />
            ) : (
                <p>No data found</p>
            )}

            <div>
                <p>
                    <button onClick={clearAll} className="btn-default">Clear all Filter</button>
                </p>
            </div>
        </>
    )
}
