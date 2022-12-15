export default () => ({
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
})