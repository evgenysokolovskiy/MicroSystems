export const columns = [
    {
        title: '№ п/п',
        dataIndex: 'idx'
    },
    {
        title: 'Модель',
        dataIndex: 'model',
        filters: [
            {
                text: 'SIW3B',
                value: 'SIW3B'
            },
            {
                text: 'SIW-3E',
                value: 'SIW-3E'
            }
        ],
        // specify the condition of filtering result
        // here is that finding the model started with `value`
        onFilter: (value, record) => record.model.indexOf(value) === 0,
        sorter: (a, b) => a.model.length - b.model.length,
        sortDirections: ['descend']
    },
    {
        title: 'Цех. номер',
        dataIndex: 'num',
        sorter: (a, b) => a.num - b.num,
        sortDirections: ['descend', 'ascend']
    },
    {
        title: 'Инв. номер',
        dataIndex: 'inn',
        sorter: (a, b) => a.inn - b.inn,
        sortDirections: ['descend', 'ascend']
    },
    {
        title: '1.01',
        dataIndex: '_101',
        filters: [
            {
                text: 'Имеет неисправность 1.01',
                value: '+'
            },
            {
                text: 'Нет данной неисправности',
                value: ' '
            }
        ],
        onFilter: (value, record) => record._101.indexOf(value) === 0
    },
    {
        title: '1.02',
        dataIndex: '_102',
        filters: [
            {
                text: 'Имеет неисправность 1.02',
                value: '+'
            },
            {
                text: 'Нет данной неисправности',
                value: ' '
            }
        ],
        onFilter: (value, record) => record._102.indexOf(value) === 0
    },
    {
        title: '1.03',
        dataIndex: '_103',
        filters: [
            {
                text: 'Имеет неисправность 1.03',
                value: '+'
            },
            {
                text: 'Нет данной неисправности',
                value: ' '
            }
        ],
        onFilter: (value, record) => record._103.indexOf(value) === 0
    },
    {
        title: '1.04',
        dataIndex: '_104',
        filters: [
            {
                text: 'Имеет неисправность 1.04',
                value: '+'
            },
            {
                text: 'Нет данной неисправности',
                value: ' '
            }
        ],
        onFilter: (value, record) => record._104.indexOf(value) === 0
    },
    {
        title: '1.05',
        dataIndex: '_105',
        filters: [
            {
                text: 'Имеет неисправность 1.05',
                value: '+'
            },
            {
                text: 'Нет данной неисправности',
                value: ' '
            }
        ],
        onFilter: (value, record) => record._105.indexOf(value) === 0
    },
    {
        title: '2.10',
        dataIndex: '_210',
        filters: [
            {
                text: 'Имеет неисправность 2.10',
                value: '+'
            },
            {
                text: 'Нет данной неисправности',
                value: ' '
            }
        ],
        onFilter: (value, record) => record._210.indexOf(value) === 0
    },
    {
        title: '2.11',
        dataIndex: '_211',
        filters: [
            {
                text: 'Имеет неисправность 2.11',
                value: '+'
            },
            {
                text: 'Нет данной неисправности',
                value: ' '
            }
        ],
        onFilter: (value, record) => record._211.indexOf(value) === 0
    }
]

export const data = [
    {
        key: '1',
        idx: '1',
        model: 'SIW3B',
        num: '251002',
        inn: '3234020043',
        _101: ' ',
        _102: '',
        _103: '+',
        _104: '',
        _105: '+',
        _210: '',
        _211: ''
    },
    {
        key: '2',
        idx: '2',
        model: 'SIW3B',
        num: '260104',
        inn: '3234020039',
        _101: ' ',
        _102: '+',
        _103: '',
        _104: '+',
        _105: '',
        _210: '',
        _211: '+'
    },
    {
        key: '3',
        idx: '3',
        model: 'SIW-3E',
        num: '260701',
        inn: '3505160062',
        _101: '+',
        _102: '',
        _103: '',
        _104: '',
        _105: '+',
        _210: '',
        _211: '+'
    },
    {
        key: '4',
        idx: '4',
        model: 'SIW3B',
        num: '260802',
        inn: '3234020020',
        _101: ' ',
        _102: '+',
        _103: '',
        _104: '',
        _105: '+',
        _210: '',
        _211: ''
    },
    {
        key: '5',
        idx: '5',
        model: 'SIW3B',
        num: '251002',
        inn: '3234020043',
        _101: '+',
        _102: '',
        _103: '+',
        _104: '',
        _105: '',
        _210: '',
        _211: '+'
    },
    {
        key: '6',
        idx: '6',
        model: 'SIW3B',
        num: '260104',
        inn: '3234020039',
        _101: ' ',
        _102: '+',
        _103: '',
        _104: '',
        _105: '',
        _210: '+',
        _211: '+'
    },
    {
        key: '7',
        idx: '7',
        model: 'SIW-3E',
        num: '260701',
        inn: '3505160062',
        _101: ' ',
        _102: '',
        _103: '+',
        _104: '',
        _105: '+',
        _210: '+',
        _211: '+'
    },
    {
        key: '8',
        idx: '8',
        model: 'SIW3B',
        num: '260802',
        inn: '3234020020',
        _101: '+',
        _102: '',
        _103: '+',
        _104: '',
        _105: '',
        _210: '',
        _211: '+'
    },
    {
        key: '9',
        idx: '9',
        model: 'SIW3B',
        num: '251002',
        inn: '3234020043',
        _101: '+',
        _102: '+',
        _103: '+',
        _104: '+',
        _105: '+',
        _210: '+',
        _211: '+'
    },
    {
        key: '10',
        idx: '10',
        model: 'SIW3B',
        num: '260104',
        inn: '3234020039',
        _101: '+',
        _102: '+',
        _103: '',
        _104: '',
        _105: '+',
        _210: '',
        _211: '+'
    },
    {
        key: '11',
        idx: '11',
        model: 'SIW-3E',
        num: '260701',
        inn: '3505160062',
        _101: '+',
        _102: '+',
        _103: '',
        _104: '',
        _105: '+',
        _210: '',
        _211: ''
    },
    {
        key: '12',
        idx: '12',
        model: 'SIW3B',
        num: '260802',
        inn: '3234020020',
        _101: '+',
        _102: '',
        _103: '+',
        _104: '',
        _105: '',
        _210: '',
        _211: '+'
    }
]
