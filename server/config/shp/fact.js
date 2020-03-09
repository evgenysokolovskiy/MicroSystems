/* Номера колонок в таблице Excel */

// Штамповка
module.exports.INDEXES_STAMPING = {
    date: 0, // Дата
    type: 1, // Тип шара по диаметру, мм
    cardNumber: 2, // Номер карты
    batchLoadingTime: 3, // Время загрузки партии
    weight: 8, // Вес партии, кг
    measurementTime: 4, // Время измерения
    diameter: 5, // Текущий диаметр шара, мм
    height: 6, // Высота
    d: 7, // Диаметр облоя
    //inconstancy: 7, // Непостоянство, мкм
    //dimension: 8, // Разноразмерность, мкм
    qualityProducts: 9, //Качественная продукция
    defectiveProducts: 10 // Бракованная продукция
}

// Обкатка
module.exports.INDEXES_RUNNING = {
    date: 0, // Дата
    type: 1, // Тип шара по диаметру, мм
    cardNumber: 2, // Номер карты
    batchLoadingTime: 3, // Время загрузки партии
    weight: 4, // Вес партии, кг
    measurementTime: 5, // Время измерения
    diameter: 6, // Текущий диаметр шара, мм
    inconstancy: 7, // Непостоянство, мкм
    dimension: 8, // Разноразмерность, мкм
    qualityProducts: 9, //Качественная продукция
    defectiveProducts: 10 // Бракованная продукция
}

// Шлифовка
module.exports.INDEXES_GRINDING = {
    date: 0, // Дата
    type: 1, // Тип шара по диаметру, мм
    cardNumber: 2, // Номер карты
    batchLoadingTime: 3, // Время загрузки партии
    weight: 4, // Вес партии, кг
    measurementTime: 5, // Время измерения
    diameter: 6, // Текущий диаметр шара, мм
    inconstancy: 7, // Непостоянство, мкм
    sphere: 8, // Сфера, мкм
    dimension: 9, // Разноразмерность, мкм
    qualityProducts: 10, //Качественная продукция
    defectiveProducts: 11 // Бракованная продукция
}

// Доводка (черновая)
module.exports.INDEXES_ROUGH = {
    date: 0, // Дата
    type: 1, // Тип шара по диаметру, мм
    cardNumber: 2, // Номер карты
    batchLoadingTime: 3, // Время загрузки партии
    weight: 4, // Вес партии, кг
    measurementTime: 5, // Время измерения
    diameter: 6, // Текущий диаметр шара, мм
    inconstancy: 7, // Непостоянство, мкм
    sphere: 8, // Сфера, мкм
    dimension: 9, // Разноразмерность, мкм
    qualityProducts: 10, //Качественная продукция
    defectiveProducts: 11 // Бракованная продукция
}

// Доводка (чистовая)
module.exports.INDEXES_CLEAN = {
    date: 0, // Дата
    type: 1, // Тип шара по диаметру, мм
    cardNumber: 2, // Номер карты
    degree: 3, // Степень
    batchLoadingTime: 4, // Время загрузки партии
    weight: 5, // Вес партии, кг
    measurementTime: 6, // Время измерения
    diameter: 7, // Текущий диаметр шара, мм
    inconstancy: 8, // Непостоянство, мкм
    sphere: 9, // Сфера, мкм
    //dimension: 10, // Разноразмерность, мкм
    surfaceСondition: 10, // Состояние поверхности
    qualityProducts: 11, //Качественная продукция
    defectiveProducts: 12 // Бракованная продукция
}

// Доводка (окончательная)
module.exports.INDEXES_FINAL = {
    date: 0, // Дата
    type: 1, // Тип шара по диаметру, мм
    cardNumber: 2, // Номер карты
    degree: 3, // Степень
    batchLoadingTime: 4, // Время загрузки партии
    weight: 5, // Вес партии, кг
    measurementTime: 6, // Время измерения
    diameter: 7, // Текущий диаметр шара, мм
    inconstancy: 8, // Непостоянство, мкм
    sphere: 9, // Сфера, мкм
    //dimension: 10, // Разноразмерность, мкм
    surfaceСondition: 10, // Состояние поверхности
    qualityProducts: 11, //Качественная продукция
    defectiveProducts: 12 // Бракованная продукция
}
