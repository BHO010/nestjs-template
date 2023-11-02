import 'dotenv/config'
import entites from 'src/entities';

export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    type: "mysql",
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: entites,
    synchronize: true,
  },
  auth: {
    redirect_uri: process.env.REDIRECT_URI,
    salt_rounds: process.env.SALT_ROUNDS,
		jwt: {
			accessSecret: process.env.JWT_ACCESS_SECRET,
			refreshSecret: process.env.JWT_REFRESH_SECRET,
			expiresInSeconds: parseInt(process.env.JWT_EXPIRATION_TIME_SECONDS) || 900,
		},
		google: {
			clientId: process.env.GOOGLE_OAUTH_CLIENT_ID,
			clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
			callbackURL: process.env.GOOGLE_OAUTH_CALLBACK_URL,
		},
	},
  COOKIE_OPTIONS: {
    httpOnly: true,
  }
  
});