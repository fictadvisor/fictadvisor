import { defineConfig, env } from 'prisma/config';

export default defineConfig({
  schema: 'prisma/cohorta/schema.prisma',
  datasource: {
    url: env('COHORTA_DATABASE_URL'),
  },
});
