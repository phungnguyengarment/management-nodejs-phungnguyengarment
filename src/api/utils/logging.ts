const info = (namespace: string, message: string, object?: any) => {
  if (object) {
    console.info(`👉[${getTimeStamp()}] [🟢INFO] [${namespace}] ${message} \n`, object)
  } else {
    console.info(`👉[${getTimeStamp()}] [🟢INFO] [${namespace}] ${message} \n`)
  }
}

const warn = (namespace: string, message: string, object?: any) => {
  if (object) {
    console.warn(`👉[${getTimeStamp()}] [🟡WARN] [${namespace}] ${message} \n`, object)
  } else {
    console.warn(`👉[${getTimeStamp()}] [🟡WARN] [${namespace}] ${message} \n`)
  }
}

const error = (namespace: string, message: string, object?: any) => {
  if (object) {
    console.error(`👉[${getTimeStamp()}] [🔴ERROR] [${namespace}] ${message} \n`, object)
  } else {
    console.error(`👉[${getTimeStamp()}] [🔴ERROR] [${namespace}] ${message} \n`)
  }
}

const debug = (namespace: string, message: string, object?: any) => {
  if (object) {
    console.debug(`👉[${getTimeStamp()}] [🔵DEBUG] [${namespace}] ${message} \n`, object)
  } else {
    console.debug(`👉[${getTimeStamp()}] [🔵DEBUG] [${namespace}] ${message} \n`)
  }
}

const getTimeStamp = (): string => {
  return new Date().toISOString()
}

export default { info, warn, error, debug }
