import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export default {
  type: 'postgres',
  synchronize: true,
  entities: [
    `${__dirname}/entities/*.js`,
  ],
} as TypeOrmModuleOptions;
