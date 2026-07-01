import { defineConfig } from 'prisma/config';

export default defineConfig({
  schema: 'prisma/schema.prisma',
  datasource: {
    // Read directly from process.env (rather than prisma's `env()` helper) so
    // commands that don't touch the datasource — e.g. `prisma generate` — don't
    // fail when the URL is unset. Migrate commands load it via dotenv.
    url: process.env.FICTADVISOR_DATABASE_URL as string,
  },
});
