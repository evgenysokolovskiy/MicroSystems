// ТЕХНОЛОГИЯ

// Доказатели вносятся вручную
// Начальная точка
const START = {
    date: 0,
    norm: [9.77, 9.82]
}
// Конечная точка
const END = {
    date: 0,
    norm: [9.62, 9.64]
}
// Длина
const LEN = 22

// Промежуточные показатели рассчитываются
let technology = [START]
const a = START.norm[0]
const A = (START.norm[0] - END.norm[0]) / (LEN - 1)
const b = START.norm[1]
const B = (START.norm[1] - END.norm[1]) / (LEN - 1)
for (let i = 1; i < LEN; i++) {
    const max = (a - A * i).toFixed(3)
    const min = (b - B * i).toFixed(3)
    const item = {
        date: i,
        norm: [max, min]
    }
    technology = [...technology, item]
}

// Фактические показатели
let factDiameter = [
    {
        date: 0,
        fact: 9.65
    },
    {
        date: 1,
        fact: 9.635
    },
    {
        date: 2,
        fact: 9.72
    },
    {
        date: 3,
        fact: 9.7
    },
    {
        date: 4,
        fact: 9.68
    },
    {
        date: 5,
        fact: 9.65
    },
    {
        date: 6,
        fact: 9.62
    },
    {
        date: 7,
        fact: 9.7
    },
    {
        date: 8,
        fact: 9.7
    },
    {
        date: 9,
        fact: 9.76
    },
    {
        date: 10,
        fact: 9.74
    },
    {
        date: 11,
        fact: 9.72
    },
    {
        date: 12,
        fact: 9.72
    },
    {
        date: 13,
        fact: 9.69
    },
    {
        date: 14,
        fact: 9.68
    },
    {
        date: 15,
        fact: 9.7
    },
    {
        date: 16,
        fact: 9.68
    },
    {
        date: 17,
        fact: 9.66
    },
    {
        date: 18,
        fact: 9.67
    },
    {
        date: 19,
        fact: 9.65
    },
    {
        date: 20,
        fact: 9.642
    },
    {
        date: 21,
        fact: 9.639
    }
]

const diameter = technology.map(item => {
    factDiameter.forEach(fact => {
        if (item['date'] === fact['date']) {
            item['fact'] = fact['fact']
            return item
        }
    })
    return item
})

// Определить попадание факта в нормативный диапазон
// Если попадает, то добавить свойство 'falseFact'
// В противном случае - свойство 'trueFact'
export const dataDiameter = diameter.map(item => {
    item['fact'] > item['norm'][0] && item.fact < item['norm'][1]
        ? (item['trueFact'] = item['fact'])
        : (item['falseFact'] = item['fact'])
    return item
})

export const dataInconstancyDimension = [
    {
        date: '0',
        inconstancy: 40,
        dimension: 20
    },
    {
        date: '1',
        inconstancy: 39.1,
        dimension: 19.5
    },
    {
        date: '2',
        inconstancy: 38.1,
        dimension: 19.1
    },
    {
        date: '3',
        inconstancy: 37.1,
        dimension: 18.6
    },
    {
        date: '4',
        inconstancy: 36.2,
        dimension: 18.1
    },
    {
        date: '5',
        inconstancy: 35.3,
        dimension: 17.6
    },
    {
        date: '6',
        inconstancy: 34.3,
        dimension: 17.2
    },
    {
        date: '7',
        inconstancy: 33.4,
        dimension: 16.7
    },
    {
        date: '8',
        inconstancy: 32.4,
        dimension: 16.2
    },
    {
        date: '9',
        inconstancy: 31.5,
        dimension: 15.7
    },
    {
        date: '10',
        inconstancy: 30.5,
        dimension: 15.3
    },
    {
        date: '11',
        inconstancy: 29.6,
        dimension: 14.8
    },
    {
        date: '12',
        inconstancy: 28.6,
        dimension: 14.3
    },
    {
        date: '13',
        inconstancy: 27.7,
        dimension: 13.8
    },
    {
        date: '14',
        inconstancy: 26.7,
        dimension: 13.4
    },
    {
        date: '15',
        inconstancy: 25.8,
        dimension: 12.9
    },
    {
        date: '16',
        inconstancy: 24.8,
        dimension: 12.4
    },
    {
        date: '17',
        inconstancy: 23.9,
        dimension: 12.0
    },
    {
        date: '18',
        inconstancy: 23.0,
        dimension: 11.5
    },
    {
        date: '19',
        inconstancy: 22.0,
        dimension: 11.0
    },
    {
        date: '20',
        inconstancy: 21.1,
        dimension: 10.5
    },
    {
        date: '21',
        inconstancy: 20,
        dimension: 10
    }
]

export const datapPessureSpeed = [
    {
        date: '0',
        pressure: 2,
        speed: 50
    },
    {
        date: '1',
        pressure: 2,
        speed: 50
    },
    {
        date: '2',
        pressure: 2,
        speed: 50
    },
    {
        date: '3',
        pressure: 5,
        speed: 40
    },
    {
        date: '4',
        pressure: 5,
        speed: 40
    },
    {
        date: '5',
        pressure: 5,
        speed: 40
    },
    {
        date: '6',
        pressure: 5,
        speed: 60
    },
    {
        date: '7',
        pressure: 10,
        speed: 60
    },
    {
        date: '8',
        pressure: 10,
        speed: 60
    },
    {
        date: '9',
        pressure: 10,
        speed: 60
    },
    {
        date: '10',
        pressure: 10,
        speed: 70
    },
    {
        date: '11',
        pressure: 10,
        speed: 70
    },
    {
        date: '12',
        pressure: 10,
        speed: 70
    },
    {
        date: '13',
        pressure: 10,
        speed: 30
    },
    {
        date: '14',
        pressure: 10,
        speed: 30
    },
    {
        date: '15',
        pressure: 10,
        speed: 30
    },
    {
        date: '16',
        pressure: 8,
        speed: 60
    },
    {
        date: '17',
        pressure: 7,
        speed: 60
    },
    {
        date: '18',
        pressure: 6,
        speed: 45
    },
    {
        date: '19',
        pressure: 5,
        speed: 45
    },
    {
        date: '20',
        pressure: 4,
        speed: 20
    },
    {
        date: '21',
        pressure: 4,
        speed: 20
    }
]
