import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export default {
  type: 'postgres',
  synchronize: false,
  entities: [`${__dirname}/entities/*.js`],
  migrations: [`${__dirname}/migrations/*.js`],
  cli: {
    migrationsDir: `${__dirname}/migrations`,
  },
} as TypeOrmModuleOptions;
