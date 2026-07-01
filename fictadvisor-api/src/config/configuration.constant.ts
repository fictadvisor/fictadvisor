import process from 'process';

export default () => ({
  logLevel: process.env.LOG_LEVEL ?? 'info',
  port: parseInt(process.env.PORT) || 3000,
  baseUrl: process.env.BASE_URL,
  frontBaseUrl: process.env.FRONT_BASE_URL,
  security: {
    secret: process.env.SECRET ?? '42',
    jwt: {
      ttl: process.env.JWT_TTL ?? '86400s',
      refreshTtl: process.env.JWT_REFRESH_TTL ?? '1209600s',
    },
  },
  email: {
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT),
    username: process.env.SMTP_USERNAME,
    password: process.env.SMTP_PASSWORD,
  },
  telegram: {
    apiUrl: process.env.TELEGRAM_BOT_API_URL,
    botToken: process.env.TELEGRAM_BOT_TOKEN,
  },
  static: {
    servePath: '/static',
    dir: process.env.STATIC_DIR,
  },
  dates: {
    currentYear: process.env.CURRENT_YEAR ?? 2022,
    currentSemester: process.env.CURRENT_SEMESTER ?? 1,
  },
  minio: {
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_KEY,
    endpoint: process.env.S3_ENDPOINT,
    publicUrl: process.env.S3_PUBLIC_URL,
    bucket: process.env.S3_BUCKET,
    region: process.env.S3_REGION || 'us-east-1',
  },
});
