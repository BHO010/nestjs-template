import 'dotenv/config'
import entites from 'src/entities';

export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  sql: {
    type: "mysql",
    host: process.env.SQL_DATABASE_HOST,
    port: parseInt(process.env.SQL_DATABASE_PORT, 10),
    username: process.env.SQL_DATABASE_USERNAME,
    password: process.env.SQL_DATABASE_PASSWORD,
    database: process.env.SQL_DATABASE_NAME,
    entities: entites,
    synchronize: true,
  },
  mongo: {
    uri: process.env.MONGO_DATABASE_URI,
    dbName: process.env.MONGO_DATABASE_NAME,
    auth: {
      username: process.env.MONGO_DATABASE_USER,
      password: process.env.MONGO_DATABASE_PASSWORD,
    }
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