/*
spot     - номер производства
model    - модель оборудования
inn      - инвентарный номер
num      - цеховой номер
code     - код неисправности
amount   - количество остановок по данной неисправности
time     - время простоев по данной неисправности
ps       - производственная система
mtbf  	 - Наработка оборудования
*/

// Номер колонки в таблице Excel
module.exports.INDEXES = {
    spot: 1,
    model: 2,
    inn: 3,
    num: 4,
    code: 5,
    description: 6,
    amount: 8,
    time: 9,
    ps: 10,
    mtbf: 11
}

// Предельное количество аварийных остановок для производств
module.exports.LIMIT_NUMBER_EMERGENCY_STOPS = {
    '50': 10,
    '56': 5,
    '57': 4,
    '61': 5,
    '63': 5
}

// Период планирования (число частей)
module.exports.PLANNING_PERIOD = 6
module.exports.NAMES_PLANNING_PERIOD = [
    /*
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
*/
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь'
]
/* 
    Условия для планирования среднего ремонта:
    - Общее число узлов (механика + электрика) > LENGTH_MEDIUM_REPAIR_NODES
    - Минимальное количество узлов по механике - MIN_LENGTH_MEDIUM_REPAIR_MECHANIC_NODES

    Для оборудования, не выполняющего данные условия, планируется узловой ремонт
*/
module.exports.LENGTH_MEDIUM_REPAIR_NODES = 4
module.exports.MIN_LENGTH_MEDIUM_REPAIR_MECHANIC_NODES = 3
