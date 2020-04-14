import React from 'react'
// Antd
import { Table } from 'antd'

/*
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
*/

const columns = [
    {
        title: '',
        dataIndex: 'title',
        key: 'title'
    },
    {
        title: 'Штамповка',
        dataIndex: 'stamping',
        key: 'stamping'
    },
    {
        title: 'Обкатка',
        dataIndex: 'running',
        key: 'running'
    },
    {
        title: 'Шлифовка',
        dataIndex: 'grinding',
        key: 'grinding'
    },
    {
        title: 'Доводка черновая',
        dataIndex: 'rough',
        key: 'rough'
    },
    {
        title: 'Доводка чистовая',
        dataIndex: 'clear',
        key: 'clear'
    },
    {
        title: 'Доводка окончательная',
        dataIndex: 'final',
        key: 'final'
    },
    {
        title: 'Сумма',
        dataIndex: 'total',
        key: 'total'
    }
]


const now = (function() {
    const date = new Date()
    return date && date.toISOString().slice(0, 10).split('-').reverse().join('.')
})()


export default function(props) {
    const { quality } = props

    console.log(quality)

    const dataSourceWeight = [
        {
            key: '1',
            title: 'Общий вес',
            stamping: '',
            running: quality['running']['weight'],
            grinding: quality['grinding']['weight'],
            rough: '',
            clear: '',
            final: '',
            total: quality['total']['weight']
        },
        {
            key: '2',
            title: 'Годные, кг',
            stamping: '',
            running: quality['running']['qualityWeight'],
            grinding: quality['grinding']['qualityWeight'],
            rough: '',
            clear: '',
            final: '',
            total: quality['total']['qualityWeight']
        },
        {
            key: '3',
            title: 'Отклонение, кг',
            stamping: '',
            running: quality['running']['defectWeight'],
            grinding: quality['grinding']['defectWeight'],
            rough: '',
            clear: '',
            final: '',
            total: quality['total']['defectWeight']
        },
        {
            key: '4',
            title: 'Отсутствуют данные о проверке, кг',
            stamping: '',
            running: quality['running']['notCheckWeight'],
            grinding: quality['grinding']['notCheckWeight'],
            rough: '',
            clear: '',
            final: '',
            total: quality['total']['notCheckWeight']
        },
        {
            key: '5',
            title: 'Годных, %',
            stamping: '',
            running: (() =>
                (
                    (quality['running']['qualityWeight'] / quality['running']['weight']) *
                    100
                ).toFixed(1))(),
            grinding: (() =>
                (
                    (quality['grinding']['qualityWeight'] / quality['grinding']['weight']) *
                    100
                ).toFixed(1))(),
            rough: '',
            clear: '',
            final: '',
            total: (() =>
                ((quality['total']['qualityWeight'] / quality['total']['weight']) * 100).toFixed(
                    1
                ))()
        }
    ]

    const dataSourceAmount = [
        {
            key: '1',
            title: 'Всего',
            stamping: '',
            running: '',
            grinding: '',
            rough: '',
            clear: '',
            final: '',
            total: ''
        },
        {
            key: '2',
            title: 'Годные',
            stamping: '',
            running: getAmountCards(quality['running']['quality']),
            grinding: getAmountCards(quality['grinding']['quality']),
            rough: '',
            clear: '',
            final: '',
            total: getTotalQualityAmountCards(quality, 'quality')
        },
        {
            key: '3',
            title: 'Отклонение',
            stamping: '',
            running: getAmountCards(quality['running']['defect']),
            grinding: getAmountCards(quality['grinding']['defect']),
            rough: '',
            clear: '',
            final: '',
            total: getTotalQualityAmountCards(quality, 'defect')
        },
        {
            key: '4',
            title: 'Отсутствуют данные о проверке',
            stamping: '',
            running: '',
            grinding: '',
            rough: '',
            clear: '',
            final: '',
            total: ''
        },
        /*{
            key: '5',
            title: 'Годных, %',
            stamping: '',
            running: (() =>
                (
                    (quality['running']['qualityWeight'] / quality['running']['weight']) *
                    100
                ).toFixed(1))(),
            grinding: (() =>
                (
                    (quality['grinding']['qualityWeight'] / quality['grinding']['weight']) *
                    100
                ).toFixed(1))(),
            rough: '',
            clear: '',
            final: '',
            total: (() =>
                ((quality['total']['qualityWeight'] / quality['total']['weight']) * 100).toFixed(
                    1
                ))()
        }*/
    ]    

    return (
        <>
            <div>
                <h4>Статистика производства шарика относительно веса на {now}</h4>
                <Table dataSource={dataSourceWeight} columns={columns} bordered size="small" />
                <h4>Статистика производства шарика относительно количества запущенных процессов на {now}</h4>
                <Table dataSource={dataSourceAmount} columns={columns} bordered size="small" />
            </div>
        </>
    )
}



function getAmountCards(obj) {
  let count = 0
  Object.values(obj).forEach(item => {
      count += Object.keys(item).length
  })
  return count
}

function getTotalQualityAmountCards(obj, param) {
  let count = 0
  Object.entries(obj).forEach(procedure => {
    if (procedure[0] === 'total') return
      count += getAmountCards(procedure[1][param])
  })
  return count
}