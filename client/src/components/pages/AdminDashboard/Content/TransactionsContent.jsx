import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
  useTable,
  useSortBy,
  useFilters,
} from 'react-table'
import { Input } from '../../../ui/input'
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from '../../../ui/table/table'

export default function TransactionsContent() {
  const [data, setData] = useState([])
  const [filterInput, setFilterInput] = useState('')

  const columns = React.useMemo(
    () => [
      {
        Header: 'Transaction ID',
        accessor: 'id',
      },
      { Header: 'User Name', accessor: 'userName' },
      { Header: 'User ID', accessor: 'userId' },
      { Header: 'Amount', accessor: 'amount' },
      { Header: 'Date', accessor: 'date' },
    ],
    []
  )

  useEffect(() => {
    const demoData = [
      {
        id: '1',
        userName: 'jim ',
        userId: 'user1',
        amount: '100',
        date: '2022-01-01',
      },
      {
        id: '2',
        userName: 'blank ',
        userId: 'user2',
        amount: '200',
        date: '2022-01-02',
      },
      {
        id: '3',
        userName: ' ss',
        userId: 'user3',
        amount: '300',
        date: '2022-01-03',
      },
    ]

    setData(demoData)
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
