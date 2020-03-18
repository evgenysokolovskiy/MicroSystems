// Преобразовать фактические данные

module.exports = function({ fact }) {
    const { running, grinding, rough, clean, final } = fact

    const obj = {
        running: (() => convertDataFinal(running))(),
        grinding: (() => convertDataFinal(grinding))(),
        rough: (() => convertDataFinal(rough))(),
        clean: (() => convertDataFinal(clean))(),
        final: (() => convertDataFinal(final))()
    }
    return obj
}

function convertDataFinal(data) {
    const obj = {}
    data &&
        Object.values(data).forEach(item => {
            if (obj[item['type']]) {
                obj[item['type']] = [...obj[item['type']], item]
            } else {
                obj[item['type']] = [item]
            }
        })
    return obj
}
