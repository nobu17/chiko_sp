import { AppEnv } from '../config/appenv'

const auth0Config = {
  domain: AppEnv.AUTH0_DOMAIN,
  client_id: AppEnv.AUTH0_CLIENT_ID
}

export default auth0Config
