export default () => ({
  logLevel: process.env.LOG_LEVEL ?? 'info',
  production: process.env.NODE_ENV === 'production',
  port: process.env.PORT ? parseInt(process.env.PORT) : 3000,
  baseUrl: process.env.BASE_URL,
  frontBaseUrl: process.env.FRONT_BASE_URL,
  static: {
    servePath: '/static',
    dir: process.env.STATIC_DIR,
  },
  security: {
    secret: process.env.SECRET ?? '42',
    jwt: {
      ttl: process.env.JWT_TTL ?? '86400s',
      refreshTtl: process.env.JWT_REFRESH_TTL ?? '1209600s',
    },
  },
  database: {
    host: process.env.DB_HOST ?? '127.0.0.1',
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
    username: process.env.DB_USER ?? 'postgres',
    password: process.env.DB_PASSWORD ?? 'postgres',
    database: process.env.DB_NAME ?? 'postgres',
    schema: process.env.DB_SCHEMA ?? 'public',
    logging: process.env.DB_LOGGING ?? 'true',
  },
  telegram: {
    botToken: process.env.TELEGRAM_BOT_TOKEN,
    chatId: process.env.TELEGRAM_CHAT_ID,
    proxyBaseUrl: process.env.TELEGRAM_PROXY_URL,
  },
});
