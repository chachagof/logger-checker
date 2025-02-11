const path = require('path')
const fs = require('fs')

const IllegalCardsController = {
    //@param LogData:[{Uid:string, message:string, time:string}]
    filterIllegalCards: (logData, OUTPUT_DIR) => {
        const outputTotalPath = path.join(OUTPUT_DIR, 'totalIllegalCardsRecord.json')
        const filterIllegalCards = logData.reduce((acc, cur) => {
            if (!acc[cur.Uid]) {
                acc[cur.Uid] = {
                    times: 1,
                    date: [cur.time]
                }
            } else {
                acc[cur.Uid].times++
                acc[cur.Uid].date.push(cur.time)
            }
            return acc
        }, {})

        try {
            fs.writeFileSync(outputTotalPath, JSON.stringify(filterIllegalCards, null, 2))
        } catch (error) {
            console.log('Write total illegal cards records failed:', error)
        }

    }
}

module.exports = IllegalCardsController