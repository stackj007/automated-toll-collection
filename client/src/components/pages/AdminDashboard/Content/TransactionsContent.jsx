import React, { useEffect, useState } from 'react'
import {
  useTable,
  useSortBy,
  useFilters,
} from 'react-table'
import { Input } from '../../../ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from '../../../ui/table/Table.jsx'

import axios from 'axios'

export default function TransactionsContent() {
  const [data, setData] = useState([])
  const [filterInput, setFilterInput] = useState('')

  const columns = React.useMemo(
    () => [
      {
        Header: 'Transaction ID',
        accessor: 'id',
      },

      { Header: 'User ID', accessor: 'userId' },
      { Header: 'Amount', accessor: 'amount' },
      { Header: 'Type', accessor: 'type' },
      { Header: 'Status', accessor: 'status' },
      { Header: 'Date', accessor: 'date' },
    ],
    []
  )

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get('api/transactions')
        setData(response.data)
      } catch (error) {
        console.error('Error fetching transactions:', error)
      }
    }
    fetchTransactions()
  }, [])

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setAllFilters,
  } = useTable(
    {
      columns,
      data,
    },
    useFilters,
    useSortBy
  )

  const handleFilterChange = (e) => {
    const value = e.target.value || undefined
    setFilterInput(value)
    setAllFilters([{ id: 'id', value }])
  }

  return (
    <div>
      <h2>Transactions</h2>
      <Input
        placeholder="Filter transactions..."
        value={filterInput}
        onChange={handleFilterChange}
      />

      <Table {...getTableProps()}>
        <TableHeader>
          {headerGroups.map((headerGroup, i) => (
            <TableRow
              {...headerGroup.getHeaderGroupProps()}
              key={i}
            >
              {headerGroup.headers.map((column, j) => (
                <TableCell
                  {...column.getHeaderProps()}
                  key={j}
                >
                  {column.render('Header')}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row)
            return (
              <TableRow {...row.getRowProps()} key={i}>
                {row.cells.map((cell, j) => (
                  <TableCell
                    {...cell.getCellProps()}
                    key={j}
                  >
                    {cell.render('Cell')}
                  </TableCell>
                ))}
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}
