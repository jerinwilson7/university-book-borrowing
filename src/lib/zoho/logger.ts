import { Environment } from "@zohocrm/typescript-sdk-2.0/routes/dc/environment";
import { USDataCenter } from "@zohocrm/typescript-sdk-2.0/routes/dc/us_data_center";
import { LogBuilder } from "@zohocrm/typescript-sdk-2.0/routes/logger/log_builder";
import {
  Levels,
  Logger,
} from "@zohocrm/typescript-sdk-2.0/routes/logger/logger";
import { UserSignature } from "@zohocrm/typescript-sdk-2.0/routes/user_signature";
/*
 * Create an instance of Logger Class that takes two parameters
 * level -> Level of the log messages to be logged. Can be configured by typing Levels "." and choose any level from the list displayed.
 * filePath -> Absolute file path, where messages need to be logged.
 */
export let logger: Logger = new LogBuilder()
  .level(Levels.INFO)
  .filePath("./node_sdk_logs.log") // Saves in the project root
  .build();

//Create an UserSignature instance that takes user Email as parameter
export let user: UserSignature = new UserSignature("jerin.wilson@gmail.com");

/*
 * Configure the environment
 * which is of the pattern Domain.Environment
 * Available Domains: USDataCenter, EUDataCenter, INDataCenter, CNDataCenter, AUDataCenter
 * Available Environments: PRODUCTION(), DEVELOPER(), SANDBOX()
 */
let environment: Environment = USDataCenter.PRODUCTION();
