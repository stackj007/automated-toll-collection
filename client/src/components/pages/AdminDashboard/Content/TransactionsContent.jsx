import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from '../../../ui/table/table'

export default function TransactionsContent() {
  const [transactions, setTransactions] = useState([
    { id: 1, userId: 101, amount: 50, date: '2023-04-01' },
    { id: 2, userId: 102, amount: 30, date: '2023-04-02' },
    { id: 3, userId: 103, amount: 50, date: '2023-04-01' },
    { id: 4, userId: 104, amount: 30, date: '2023-04-02' },
    { id: 5, userId: 105, amount: 50, date: '2023-04-01' },
    { id: 6, userId: 106, amount: 30, date: '2023-04-02' },
    { id: 7, userId: 107, amount: 50, date: '2023-04-01' },
    { id: 8, userId: 108, amount: 30, date: '2023-04-02' },
  ])

  const [users, setUsers] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/users')
        setUsers(response.data)
      } catch (error) {
        console.error('Error fetching users:', error)
      }
    }

    fetchUsers()
  }, [])

  // Function to find user name by userId
  const findUserName = (userId) => {
    const user = users.find((user) => user.id === userId)
    return user ? user.name : 'Unknown'
  }

  // Filter transactions based on search input
  const filteredTransactions = transactions.filter(
    (transaction) =>
      Object.values(transaction).some((val) =>
        val
          .toString()
          .toLowerCase()
          .includes(search.toLowerCase())
      )
  )

  return (
    <div>
      <h2>Transactions</h2>
      <input
        type="text"
        placeholder="Search transactions"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell>Transaction ID</TableCell>
            <TableCell>User Name</TableCell>
            <TableCell>User ID</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Date</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredTransactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell>{transaction.id}</TableCell>
              <TableCell>
                {findUserName(transaction.userId)}
              </TableCell>
              <TableCell>{transaction.userId}</TableCell>
              <TableCell>{transaction.amount}</TableCell>
              <TableCell>{transaction.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
