export const config = {
  env: {
    apiEndpoint: process.env.NEXT_PUBLIC_API_ENDPOINT!,
    databaseUrl: process.env.DATABASE_URL!,
    imageKit: {
      publicKey: process.env.NEXT_PUBLIC_IMAGE_KIT_PUBLIC_KEY!,
      urlEndpoint: process.env.NEXT_PUBLIC_IMAGE_KIT_URL_ENDPOINT!,
      privateKey: process.env.IMAGE_KIT_PRIVATE_KEY!,
    },
    upstash: {
      redisUrl: process.env.UPSTASH_REDIS_URL!,
      redisToken: process.env.UPSTASH_REDIS_TOKEN!,
      qstashUrl: process.env.QSTASH_URL!,
      qstashToken: process.env.QSTASH_TOKEN!,
    },
  },
};

export default config;
