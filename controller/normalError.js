const path = require('path')
const fs = require('fs')
const errorType = require('../configs/errorType.json')

const normalErrorController = {
    logFilterNormalErrorByDate: (LOG_DIR, OUTPUT_DIR) => {
        if (!fs.existsSync(OUTPUT_DIR)) {
            fs.mkdirSync(OUTPUT_DIR)
        }

        const logFiles = fs.readdirSync(LOG_DIR)

        logFiles.forEach(logFile => {
            try {
                const outputPath = path.join(OUTPUT_DIR, logFile.replace('.log', '-normalError.json'))
                const logPath = path.join(LOG_DIR, logFile)

                console.log('Now is handling:', logFile, '...')

                //TIPS: translate log filet to json
                const logData = fs.readFileSync(logPath, 'utf8')
                const jsonLog = logData.trim().split('\n').map(line => JSON.parse(line))



                const normalError = {}
                for (let i = 0; i < jsonLog.length; i++) {
                    //for error7 prepare
                    const error7Regexp = new RegExp(errorType.error7, 'g')
                    const error7 = jsonLog[i].message.match(error7Regexp)

                    //not expected disconnect
                    if (jsonLog[i].message.endsWith(errorType.error1)) {
                        const title = errorType.error1
                        if (!normalError[title]) normalError[title] = {
                            times: 0,
                            players: []
                        }
                        normalError[title].times++
                        let player
                        if (jsonLog[i].message.startsWith('unknow')) player = 'unknown'
                        else player = jsonLog[i].message.match(/(\d+)/)[0]
                        normalError[title].players.push(player ? player : 'unknown')
                    }
                    //low balance
                    else if (jsonLog[i].message === errorType.error2) {
                        const title = errorType.error2title
                        if (!normalError[title]) normalError[title] = { times: 0 }
                        normalError[title].times++
                    }
                    // Error:
                    else if (jsonLog[i].message.startsWith(errorType.error3)) {
                        const record = jsonLog[i].message.match(/^Error: .*/)[0]
                        if (!normalError[record]) normalError[record] = {
                            times: 0,
                            date: []
                        }
                        normalError[record].times++
                        normalError[record].date.push(jsonLog[i].timestamp)
                    }
                    //kick off
                    else if (jsonLog[i].message.endsWith(errorType.error4)) {
                        const title = errorType.error4
                        if (!normalError[title]) normalError[title] = {
                            times: 0,
                            Id: []
                        }
                        normalError[title].times++
                        normalError[title].Id.push(jsonLog[i].message.match(/^(.*?) Server/)[1])
                    }
                    //no data in rpc
                    else if (jsonLog[i].message.endsWith(errorType.error5)) {
                        const title = errorType.error5title
                        if (!normalError[title]) normalError[title] = { Id: [] }
                        normalError[title].Id.push(jsonLog[i].message.match(/\d+/)[0])
                    }
                    //no data in neko
                    else if (jsonLog[i].message.endsWith(errorType.error6)) {
                        const title = errorType.error6title
                        if (!normalError[title]) normalError[title] = { Id: [] }
                        normalError[title].Id.push(jsonLog[i].message.match(/\d+/)[0])
                    }
                    //ask card error
                    else if (error7) {
                        const title = errorType.error7
                        if (!normalError[title]) normalError[title] = {
                            times: 0,
                            Id: [],
                            cards: []
                        }
                        normalError[title].times++
                        const content = jsonLog[i].message.match(/\[(.*?)\]/g)
                        normalError[title].Id.push(content[0])
                        normalError[title].cards.push(content[1])
                    }
                    //else error
                    else {
                        const title = jsonLog[i].message
                        if (!normalError[title]) normalError[title] = { times: 0 }
                        normalError[title].times++
                    }
                }
                normalError['total error'] = jsonLog.length

                fs.writeFileSync(outputPath, JSON.stringify(normalError, null, 2))


                console.log('Log file check done:', logFile)
            } catch (error) {
                console.log('Transform log file failed:', error)
            }
        })
    }
}

module.exports = normalErrorController