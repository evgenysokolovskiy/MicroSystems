// Парсить данные из parse и передать функции

const fs = require('fs')
const xlsx = require('node-xlsx') // parse excel file

// 1) Схлопнуть данные по инвентарным номерам

const clonedeep = require('lodash.clonedeep')

// Номер колонки в таблице Excel
const INDEXES = {
    inn: 1, // Инвентарный номер
    act: 2, // Номер акта выполненных работ
    order: 3, // Номер межцехового заказа
    customer: 4, // Заказчик
    executor: 5, // Исполнитель
    startDate: 6, // Дата начала ремонта
    endDate: 7, // Дата окончания ремонта
    typeOfRepair: 8, // Вид ремонта
    node: 9, // Узлы
    description: 10, //Расшифровка узлов
    percent: 11 // Процент выполнения
}

const collapseDataByInn = function(data) {
    const d = clonedeep(data)
    const {
        inn,
        act,
        order,
        customer,
        executor,
        startDate,
        endDate,
        typeOfRepair,
        node,
        description,
        percent
    } = INDEXES
    const obj = {}

    let nodes = {}
    let descriptions = {}
    d.forEach(item => {
        if (!obj[item[inn]]) {
            nodes = {}
            descriptions = {}
        }
        if (item[typeOfRepair] === 'Текущий ремонт') {
            nodes[item[node]] = true
            descriptions[item[description]] = true
        }

        obj[item[inn]] = {
            inn: item[inn],
            act: item[act],
            order: item[order],
            customer: item[customer],
            executor: item[executor],
            startDate: item[startDate],
            endDate: item[endDate],
            typeOfRepair: item[typeOfRepair].split(' ')[0],
            nodes: Object.keys(nodes).join('\n'),
            description: Object.keys(descriptions).join('\n'),
            percent: item[percent]
        }
    })

    // Преобразовать данные в массив объектов
    const values = Object.values(obj)
    const arr = [...values]

    return arr
}

module.exports = function({
    app,
    parsePathRepairCompleted,
    repairPlan,
    plan,
    offPlan,
    collapseNodes,
    buildPath
}) {
    fs.readdir(parsePathRepairCompleted, function(err, files) {
        const paths = files.map(item => `${parsePathRepairCompleted}/${item}`)
        for (let i = 0; i < paths.length; i++) {
            new Promise(function(resolve, reject) {
                // Прочитать файл по ссылке paths[i]
                const data = xlsx.parse(`${paths[i]}`)[0].data

                if (data) {
                    resolve(
                        (() => {
                            // Сформировать данные для отчётов excel
                            repairPlan({
                                plan,
                                offPlan,
                                collapseNodes,
                                data: collapseDataByInn(data),
                                buildPath
                            })
                        })()
                    )
                } else {
                    reject(new Error('Err'))
                }
            }).catch(err => console.log(err))
        }
    })
}
