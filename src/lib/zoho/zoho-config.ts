import { USDataCenter } from "@zohocrm/typescript-sdk-2.0/routes/dc/us_data_center";
import { InitializeBuilder } from "@zohocrm/typescript-sdk-2.0/routes/initialize_builder";
import { UserSignature } from "@zohocrm/typescript-sdk-2.0/routes/user_signature";
import path from "path";
import token from "./Oauth";
import sdkConfig from "./sdk-config";
import tokenStore from "./token-store";

import * as fs from "fs";

export async function initializeZohoSDK() {
  const resourcePath = path.resolve(process.cwd(), "zoho_resources");

  if (!fs.existsSync(resourcePath)) {
    fs.mkdirSync(resourcePath, { recursive: true });
  }

  try {
    console.log("🔹 Initializing Zoho SDK...");

    const user = new UserSignature("jerin.wilson@gmail.com");
    const environment = USDataCenter.PRODUCTION();

    await new InitializeBuilder()
      .user(user)
      .environment(environment)
      .token(token)
      .SDKConfig(sdkConfig)
      .store(tokenStore)
      .resourcePath(resourcePath)
      .initialize();

    console.log("Zoho SDK Initialized Successfully!");
  } catch (error) {
    console.error("Zoho SDK Initialization Failed:", error);
    throw error;
  }
}
