import { useMemo, useState } from 'react'
import { useTable, useSortBy, useFilters } from 'react-table'
import { Input } from '../../../ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from '../../../ui/table/Table.jsx'

import useTransactions from '../../../../hooks/UseTransactions'

export default function TransactionsContent() {
  const [filterInput, setFilterInput] = useState('')

  const { transactions, isLoading, error } = useTransactions()

  const columns = useMemo(
    () => [
      {
        Header: 'Transaction ID',
        accessor: 'id',
      },
      { Header: 'User ID', accessor: 'user.id' },
      { Header: 'Amount', accessor: 'amount' },
      { Header: 'Type', accessor: 'type' },
      { Header: 'Status', accessor: 'status' },
      {
        Header: 'Date',
        accessor: 'date',
        Cell: ({ value }) => {
          const date = new Date(value)
          return date.toLocaleDateString()
        },
      },
    ],
    []
  )

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
      data: transactions,
    },
    useFilters,
    useSortBy
  )

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>{error.message}</p>

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
            <TableRow {...headerGroup.getHeaderGroupProps()} key={i}>
              {headerGroup.headers.map((column, j) => (
                <TableCell {...column.getHeaderProps()} key={j}>
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
                  <TableCell {...cell.getCellProps()} key={j}>
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
