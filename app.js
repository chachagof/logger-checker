const IllegalCardsController = require('./controller/illegalCards')
const normalErrorController = require('./controller/normalError')
const fs = require('fs')

const LOG_DIR = './checkLog'
const OUTPUT_DIR = './output'
const ILLEGAL_OUTPUT_DIR = './output/IllegalOutput'
const NORMAL_OUTPUT_DIR = './output/normalOutput'

if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR)
}

IllegalCardsController.logFilterIllegalCardsByDate(LOG_DIR, ILLEGAL_OUTPUT_DIR)
normalErrorController.logFilterNormalErrorByDate(LOG_DIR, NORMAL_OUTPUT_DIR)
