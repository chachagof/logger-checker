const fs = require('fs')
const path = require('path')
const IllegalCardsController = require('./controller/illegalCards')

const LOG_DIR = './checkLog'
const OUTPUT_DIR = './output'
const totalIllegalCards = []

if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR)
}

const logFiles = fs.readdirSync(LOG_DIR)

logFiles.forEach(logFile => {
    try {
        const outputPath = path.join(OUTPUT_DIR, logFile.replace('.log', '-illegalCard.json'))
        const logPath = path.join(LOG_DIR, logFile)

        console.log('Now is handling:', logFile, '...')

        //TIPS: translate log filet to json
        const logData = fs.readFileSync(logPath, 'utf8')
        const jsonLog = logData.trim().split('\n').map(line => JSON.parse(line))


        //TIPS: for check illegal card
        const illegalCards = []
        for (let i = 0; i < jsonLog.length; i++) {
            if (jsonLog[i].message === 'illegal cards') {
                const errDetail = {}
                errDetail.Uid = jsonLog[i - 1].message.match(/\[(\d+)\]/)[1]
                errDetail.message = jsonLog[i].message
                errDetail.time = jsonLog[i].timestamp
                illegalCards.push(errDetail)
                totalIllegalCards.push(errDetail)
            }
        }

        fs.writeFileSync(outputPath, JSON.stringify(illegalCards, null, 2))

        console.log('Log file check done:', logFile)

    } catch (error) {
        console.log('Transform log file failed:', error)
    }
})

IllegalCardsController.filterIllegalCards(totalIllegalCards, OUTPUT_DIR)
