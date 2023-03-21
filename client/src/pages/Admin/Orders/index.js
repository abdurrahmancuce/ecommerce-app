import { Text } from '@chakra-ui/react'
import { Table } from 'antd'
import React, { useMemo } from 'react'
import { useQuery } from 'react-query'
import { fetchOrders } from '../../../api'

export default function Orders() {
  const { isLoading, isError, data, error } = useQuery('admin:orders', fetchOrders)

  const columns = useMemo(() => {
    return [
      {
        title: 'User',
        dataIndex: ["user", "email"],
        key: 'user'
      }, {
        title: 'Address',
        dataIndex: 'address',
        key: 'address'
      }, {
        title: 'Items',
        dataIndex: 'items',
        key: 'items',
        render: (items) => <Text>{items.length}</Text>,
      }
    ]
  }, [])

  console.log(data)

  if (isLoading) return <div>Loading...</div>

  if (isError) return <div>An error has occured: {error.message}</div>

  return (
    <div>
      <Text fontSize="2xl" p={5}>Orders</Text>

      <Table dataSource={data} columns={columns} rowKey="_id" />
    </div>
  )
}
