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
    //measurementTime: 5, // Время измерения
    diameter: 5, // Текущий диаметр шара, мм
    inconstancy: 6, // Непостоянство, мкм
    dimension: 7, // Разноразмерность, мкм
    qualityProducts: 8, //Качественная продукция
    defectiveProducts: 9 // Бракованная продукция
}

// Шлифовка
module.exports.INDEXES_GRINDING = {
    date: 0, // Дата
    type: 1, // Тип шара по диаметру, мм
    cardNumber: 2, // Номер карты
    batchLoadingTime: 3, // Время загрузки партии
    weight: 4, // Вес партии, кг
    //measurementTime: 5, // Время измерения
    diameter: 5, // Текущий диаметр шара, мм
    inconstancy: 6, // Непостоянство, мкм
    sphere: 7, // Сфера, мкм
    dimension: 8, // Разноразмерность, мкм
    qualityProducts: 9, //Качественная продукция
    defectiveProducts: 10 // Бракованная продукция
}

// Доводка (черновая)
module.exports.INDEXES_ROUGH = {
    date: 0, // Дата
    type: 1, // Тип шара по диаметру, мм
    cardNumber: 2, // Номер карты
    batchLoadingTime: 3, // Время загрузки партии
    weight: 4, // Вес партии, кг
    //measurementTime: 5, // Время измерения
    diameter: 5, // Текущий диаметр шара, мм
    inconstancy: 6, // Непостоянство, мкм
    sphere: 7, // Сфера, мкм
    dimension: 8, // Разноразмерность, мкм
    qualityProducts: 9, //Качественная продукция
    defectiveProducts: 10 // Бракованная продукция
}

// Доводка (чистовая)
module.exports.INDEXES_CLEAN = {
    date: 0, // Дата
    type: 1, // Тип шара по диаметру, мм
    cardNumber: 2, // Номер карты
    //degree: 3, // Степень
    batchLoadingTime: 3, // Время загрузки партии
    weight: 4, // Вес партии, кг
    //measurementTime: 6, // Время измерения
    diameter: 5, // Текущий диаметр шара, мм
    inconstancy: 6, // Непостоянство, мкм
    sphere: 7, // Сфера, мкм
    //dimension: 10, // Разноразмерность, мкм
    surfaceСondition: 8, // Состояние поверхности
    qualityProducts: 9, //Качественная продукция
    defectiveProducts: 10 // Бракованная продукция
}

// Доводка (окончательная)
module.exports.INDEXES_FINAL = {
    date: 0, // Дата
    type: 1, // Тип шара по диаметру, мм
    cardNumber: 2, // Номер карты
    //degree: 3, // Степень
    batchLoadingTime:3, // Время загрузки партии
    weight: 4, // Вес партии, кг
    //measurementTime: 6, // Время измерения
    diameter: 5, // Текущий диаметр шара, мм
    inconstancy: 6, // Непостоянство, мкм
    sphere: 7, // Сфера, мкм
    //dimension: 10, // Разноразмерность, мкм
    surfaceСondition: 8, // Состояние поверхности
    qualityProducts: 9, //Качественная продукция
    defectiveProducts: 10 // Бракованная продукция
}