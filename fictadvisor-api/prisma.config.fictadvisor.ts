import { defineConfig, env } from 'prisma/config';

export default defineConfig({
  schema: 'prisma/fictadvisor/schema.prisma',
  datasource: {
    url: env('FICTADVISOR_DATABASE_URL'),
  },
});
