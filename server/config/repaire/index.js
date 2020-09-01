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

/*
    Условия анализа текущего состояния оборудования.
    Учитывается наработка и аварийные выходы из строя оборудования
*/
module.exports.PERCENT_MONTH = 5
module.exports.MIN_MTBF_MONTH = 8
module.exports.MIN_SUM_TIME_MONTH = 0
