import { USDataCenter } from "@zohocrm/typescript-sdk-2.0/routes/dc/us_data_center";
import { InitializeBuilder } from "@zohocrm/typescript-sdk-2.0/routes/initialize_builder";
import { UserSignature } from "@zohocrm/typescript-sdk-2.0/routes/user_signature";
import token from "./Oauth";
import sdkConfig from "./sdk-config";
import tokenStore from "./token-store";

export async function initializeZohoSDK() {
  let resourcePath: string = "/Users/user_name/Documents/typescript-app";

  try {
    console.log("🔹 Initializing Zoho SDK...");

    const user = new UserSignature("jerin.wilson@gmail.com"); // Ensure this is your Zoho-registered email
    const environment = USDataCenter.PRODUCTION();

    await new InitializeBuilder()
      .user(user)
      .environment(environment)
      .token(token)
      .SDKConfig(sdkConfig)
      .store(tokenStore) // Ensure tokenStore is passed
      .resourcePath(resourcePath)
      .initialize();

    console.log("✅ Zoho SDK Initialized Successfully!");
  } catch (error) {
    console.error("❌ Zoho SDK Initialization Failed:", error);
    throw error;
  }
}
