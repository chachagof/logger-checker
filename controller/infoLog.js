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
                for (let i = 0; i < jsonLog.length; i++) {
                    if (jsonLog[i].level === 'info' && InfoController.isValidJSON(jsonLog[i].message)) {
                        let msg = JSON.parse(jsonLog[i].message)
                        if (msg.Comment) {
                            let pid = msg.Pid
                            let bet = msg.Comment.endsWith('bet')
                            let win = msg.Comment.endsWith('win')
                            if (!infoData[pid]) {
                                infoData[pid] = {
                                    bet: 0,
                                    win: 0
                                }
                            }

                            if (bet) {
                                infoData[pid].bet++
                            } else if (win) {
                                infoData[pid].win++
                            }
                        }
                    }
                }

                let strangePerson = []
                for (let [player, data] of Object.entries(infoData)) {
                    if (data.bet < data.win) {
                        strangePerson.push(player)
                    }
                }

                infoData['strange'] = strangePerson

                fs.writeFileSync(outputPath, JSON.stringify(infoData, null, 2))

                console.log('Log file check done:', logFile)
            } catch (error) {
                console.log('Transform log file failed:', error)
            }
        })
    },
    isValidJSON: (str) => {
        try {
            JSON.parse(str);
            return true;
        } catch (error) {
            return false;
        }
    }
}

module.exports = InfoController