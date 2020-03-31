import React from 'react'
// Antd
import { Table } from 'antd'

const dataSource = [
  {
    key: '1',
    type: '9.525',
    card: '234-56-20',
    batchLoadingTime: '26.02.20 21:00',
    unLoadingTime: '01.01.20 19:00',
    running: '220',
    grinding: '205',
    rough: '',
    clear: '',
    final: ''
  },
]

const columns = [
  {
    title: 'Тип',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: '№ карты',
    dataIndex: 'card',
    key: 'card',
  },
  {
    title: 'Загрузка',
    dataIndex: 'batchLoadingTime',
    key: 'batchLoadingTime',
  },
  {
    title: 'Выгрузка',
    dataIndex: 'unLoadingTime',
    key: 'unLoadingTime',
  },
  {
    title: 'Обкатка',
    dataIndex: 'running',
    key: 'running',
  },
  {
    title: 'Шлифовка',
    dataIndex: 'grinding',
    key: 'grinding',
  },
  {
    title: 'Доводка черновая',
    dataIndex: 'rough',
    key: 'rough',
  },
  {
    title: 'Доводка чистовая',
    dataIndex: 'clear',
    key: 'clear',
  },
  {
    title: 'Доводка окончательная',
    dataIndex: 'final',
    key: 'final',
  },
]

export default function(props) {
    return (
        <>
            <div>
                <Table dataSource={dataSource} columns={columns} />
            </div>
        </>
    )
}
