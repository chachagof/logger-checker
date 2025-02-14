const path = require('path')
const fs = require('fs')

const InfoController = {
    logFilterByMessage: (LOG_DIR, OUTPUT_DIR) => {
        if (!fs.existsSync(OUTPUT_DIR)) {
            fs.mkdirSync(OUTPUT_DIR)
        }

        const logFiles = fs.readdirSync(LOG_DIR)

        logFiles.forEach(logFile => {
            try {
                const outputPath = path.join(OUTPUT_DIR, logFile.replace('.log', '-filter.json'))
                const logPath = path.join(LOG_DIR, logFile)

                console.log('Now is handling:', logFile, '...')

                //TIPS: translate log filet to json
                const logData = fs.readFileSync(logPath, 'utf8')
                const jsonLog = logData.trim().split('\n').map(line => JSON.parse(line))

                const infoData = {}
                if (jsonLog[i].level === 'info') {
                    if (jsonLog[i].message.endsWith("unexpected leave")) {
                        const title = "unexpected leave"
                        if (!infoData[title]) {
                            infoData[title] = { players: {} }
                        }
                        const player = jsonLog[i].message.match(/\d+/)
                        if (!infoData[title].players[player]) infoData[title].players[player] = { times: 1, date: [jsonLog[i].timestamp] }
                        else {
                            infoData[title].players[player].times++
                            infoData[title].players[player].date.push(jsonLog[i].timestamp)
                        }
                    }
                }

                fs.writeFileSync(outputPath, JSON.stringify(dullicateLog, null, 2))

                console.log('Log file check done:', logFile)
            } catch (error) {
                console.log('Transform log file failed:', error)
            }
        })
    }
}

module.exports = InfoController