import { OAuthBuilder } from "@zohocrm/typescript-sdk-2.0/models/authenticator/oauth_builder";
import { OAuthToken } from "@zohocrm/typescript-sdk-2.0/models/authenticator/oauth_token";
import config from "../config";

let token: OAuthToken;

const {
  accessToken,
  clientId,
  clientSecret,
  redirectURL,
  grantToken,
  refreshToken,
} = config.env.zoho;

if (refreshToken) {
  token = new OAuthBuilder()
    .clientId(clientId)
    .clientSecret(clientSecret)
    .refreshToken(refreshToken)
    .redirectURL(redirectURL)
    .build();
} else if (grantToken) {
  token = new OAuthBuilder()
    .clientId(clientId)
    .clientSecret(clientSecret)
    .grantToken(grantToken)
    .redirectURL(redirectURL)
    .build();
} else if (accessToken) {
  token = new OAuthBuilder().accessToken(accessToken).build();
} else {
  throw new Error("No valid authentication method provided.");
}

export default token;
