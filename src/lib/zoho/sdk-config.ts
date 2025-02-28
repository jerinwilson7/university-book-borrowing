import { SDKConfig } from "@zohocrm/typescript-sdk-2.0/routes/sdk_config";
import { SDKConfigBuilder } from "@zohocrm/typescript-sdk-2.0/routes/sdk_config_builder";

const sdkConfig: SDKConfig = new SDKConfigBuilder()
  .pickListValidation(false)
  .autoRefreshFields(true)
  .build();

export default sdkConfig;
