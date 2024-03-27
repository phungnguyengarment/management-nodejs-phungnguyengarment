import { SequelizeOptions } from 'sequelize-typescript'
import appConfig from './app.config'

const databaseConfig: SequelizeOptions = {
  username: appConfig.database.username,
  password: appConfig.database.password,
  database: appConfig.database.db_name,
  host: appConfig.database.db_host,
  dialect: 'mysql',
  pool: {
    max: 5, //Số lượng kết nối tối đa trong pool.
    min: 0, //Số lượng kết nối tối thiểu trong pool.
    acquire: 30000, //Thời gian tối đa để một kết nối được thực hiện, tính bằng mili giây.
    idle: 10000 //Thời gian tối đa một kết nối có thể ở trong pool mà không được sử dụng, tính bằng mili giây.
  }
}

export default databaseConfig
