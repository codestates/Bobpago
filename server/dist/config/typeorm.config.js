"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeORMConfig = void 0;
exports.typeORMConfig = {
    type: 'mysql',
    host: process.env.DATABASE_HOST,
    port: +process.env.DATABASE_PORT,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: [__dirname + '/../entities/*.entity.{js,ts}'],
    migrations: [__dirname + '/../migrations/*.ts'],
    cli: { migrationsDir: 'src/migrations' },
    charset: 'utf8mb4',
    synchronize: true,
    logging: true,
    keepConnectionAlive: true,
};
//# sourceMappingURL=typeorm.config.js.map