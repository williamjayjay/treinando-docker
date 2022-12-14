
module.exports = {
  type: process.env.DB_TYPE || 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  // entities:
  //   process.env.NODE_ENV === 'production'
  //     ? ['./dist/modules/**/infra/typeorm/entities/*.js']
  //     : ['./src/modules/**/infra/typeorm/entities/*.ts'],
  migrations:
    process.env.NODE_ENV === 'production'
      ? ['./dist/database/migrations/*.ts']
      : ['./src/database/migrations/*.ts'],
  cli: {
    migrationsDir:
      process.env.NODE_ENV === 'production'
        ? 'dist/database/migrations'
        : 'src/database/migrations'
  }
}
