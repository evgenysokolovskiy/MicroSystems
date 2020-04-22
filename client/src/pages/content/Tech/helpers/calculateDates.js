// Конвертировать дату в строку
export function convertDateToString(milliseconds) {
    if (!milliseconds) return
    const date = new Date(milliseconds)
    const hours = date.getHours()
    const minutes = date.getMinutes()
    const d = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()

    return `${d}.${month}.${year} ${hours}:${minutes}`
}

// Конкатенировать дату и время проверки
// конвертировать в дату(в миллисекундах) с округлением до получаса
export function convertStringToDate(obj) {
    if (!obj['date'] || !obj['measurementTime']) return
    const dd = obj['date'].split('.')[0]
    const mm = obj['date'].split('.')[1] - 1
    const yyyy = obj['date'].split('.')[2]
    let hours = obj['measurementTime'].split('.')[0]
    const minutes = obj['measurementTime'].split('.')[1]

    // Округлить время до получаса
    const m = minutes > 15 && minutes < 45 && minutes !== 0 ? 30 : '00'
    const h = minutes > 44 ? (hours === 23 ? '00' : ++hours) : hours
    const d = new Date(yyyy, mm, dd, h, m).getTime() /* - 86400000*/
    return d
}

// Конвертировать строку в дату (в миллисекундах) с округлением до получаса
export function convertStringToDateBatchLoadingTime(str) {
    if (!str) return
    const dd = str.split('.')[0]
    const mm = str.split('.')[1] - 1
    const yyyy = str.split('.')[2].split(' ')[0]
    let hours = str.split(' ')[1].split('.')[0]
    const minutes = str.split(' ')[1].split('.')[1]

    // Округлить время до получаса
    const m = minutes > 15 && minutes < 45 && minutes !== 0 ? 30 : '00'
    const h = minutes > 44 ? (hours === 23 ? '00' : ++hours) : hours

    return new Date(yyyy, mm, dd, h, m).getTime()
}