import 'dotenv/config'

const appConfig = {
  app_name: process.env.APP_NAME ?? '',
  company_name: process.env.COMPANY_NAME ?? '',
  secret_key: process.env.SECRET_KEY ?? '',
  server: {
    server_host: process.env.SERVER_HOST ?? '',
    server_port: process.env.SERVER_PORT ?? 8001,
    server_url: process.env.SERVER_URL ?? ''
  },
  database: {
    db_host: process.env.DB_HOST ?? '',
    db_port: process.env.DB_PORT ?? '',
    username: process.env.DB_USERNAME ?? '',
    password: process.env.DB_PASSWORD ?? '',
    db_name: process.env.DB_NAME ?? ''
  },
  nodemailer: {
    admin_user: process.env.MAIL_ADMIN ?? '',
    admin_password: process.env.MAIL_PASSWORD ?? '' // App password in gmail
  }
}

export default appConfig
