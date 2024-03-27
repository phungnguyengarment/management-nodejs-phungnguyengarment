import { format } from 'date-fns'
import fs from 'fs'
import logging from '~/utils/logging'

const NAMESPACE = 'helpers/log-event'

const logEvent = async (message: string) => {
  try {
    const dateFormatted = `${format(new Date(), 'dd/MM/yyyy|MM:SS:HH')}`
    const content = `👉[UserID] [${dateFormatted}] : '${message}' \n`
    fs.promises
      .appendFile('logs.log', content)
      .then(() => {
        logging.info(NAMESPACE, 'Error is logged')
      })
      .catch((err) => {
        if (err) throw err
      })
  } catch (error) {
    logging.error(NAMESPACE, `${error}`)
  }
}

export default logEvent
