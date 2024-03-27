import cors, { CorsOptions } from 'cors'
import express, { Application } from 'express'
import { responseEnhancer } from '~/middleware/express-formatter/index'
import { sequelizeInstance } from './api/models'
import AppRoutes from './api/routes'
import appConfig from './config/app.config'

export default class App {
  constructor() {}

  public initialize(app: Application) {
    this.config(app)
    this.syncDatabase()
    // New app routes
    new AppRoutes(app)
  }

  private config(app: Application) {
    const corsOptions: CorsOptions = {
      origin: [
        'https://management.phungnguyengarment.vn',
        'https://www.management.phungnguyengarment.vn',
        'http://localhost:5173'
      ]
    }
    // Accept json body request
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    // (helmet) helps secure Express apps by setting HTTP response headers.
    // app.use(helmet())
    // app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }))
    // (morgan) HTTP request logger middleware for node.js
    // app.use(morgan('dev'))
    // (cors) Provide some options Headers for accept others localhost to allow request
    app.use(cors(corsOptions))
    // Handle custom formatter response express (middleware)
    app.use(responseEnhancer())
  }

  private syncDatabase() {
    sequelizeInstance?.sync()
  }
}

const app: Application = express()
const appServer: App = new App()

appServer.initialize(app)

app
  .listen(Number(appConfig.server.server_port), appConfig.server.server_host, function () {
    console.log(`Server is running on port: ${appConfig.server.server_port} :: ${appConfig.server.server_url}`)
  })
  .on('error', (err: any) => {
    if (err.code === 'EADDRINUSE') {
      console.log('Error: address already in use')
    } else {
      console.log(err)
    }
  })
