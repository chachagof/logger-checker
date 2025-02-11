const IllegalCardsController = require('./controller/illegalCards')

const LOG_DIR = './checkLog'
const OUTPUT_DIR = './output'

IllegalCardsController.logFilterIllegalCardsByDate(LOG_DIR, OUTPUT_DIR)
