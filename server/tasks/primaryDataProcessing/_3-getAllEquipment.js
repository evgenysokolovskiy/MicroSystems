// 1) Получить данные по всем единицам оборудования в нужном формате

const clonedeep = require('lodash.clonedeep')
const splitProductionEquipment = require(appRoot +
    '/server/tasks/primaryDataProcessing/_2-splitProductionEquipment')

module.exports = function (data) {
    // объект, где ключи - это номера производств
    // Значения - массив объектов, принадлежащих производству
    const d = clonedeep(splitProductionEquipment(data))
    // keys - Обозначение производств (свойства объекта)
    const keys = Object.keys(d)
    let obj = {}

    keys.forEach((key) => {
        const source = d[key]['data'].map((item) => {
            let sumAmount = 0 // Суммарное количество остановок по всем узлам
            let sumTime = 0 // Суммарное время остановок по всем узлам
            // 1) Сохранить исходные данные по всем узлам
            item['allNodes'] = clonedeep(item['nodes'])

            // 2) Произвести расчёты для необходимых показателей по всем исходным узлам
            Object.keys(item['nodes']).forEach((node) => {
                // Данные рассчитываются по оставшимся узлам (где количество простоев больше лимита)
                // Суммировать количества простоев
                sumAmount += item.nodes[node].amount
                // Суммировать время простоев
                // Дробное значение времени в исходной таблице excel предоставляется с запятой, имеет тип строки
                // Необходимо преобразовать к числу с плавающей точкой
                // Для натуральных чисел преобразование не требуется
                let time
                const itemnodesTime = item.nodes[node].time
                typeof itemnodesTime === 'string'
                    ? (time = +itemnodesTime.replace(',', '.'))
                    : (time = +itemnodesTime)
                sumTime += time

                // Добавить свойство "sumAmount" - сумма количества простоев
                item['sumAmount'] = sumAmount
                // Добавить свойство "sumTime" - сумма времени простоев
                item['sumTime'] = sumTime
                // Добавить свойство - процент sumtime (сумма времени простоев) от наработки оборудования
                item['percentTimeOfMtbf'] = (sumTime / item['mtbf']) * 100
            })

            return item
        })

        obj[key] = source.sort((a, b) => +a['num'] - +b['num'])
    })

    //console.log(obj['57'])
    return obj
}
