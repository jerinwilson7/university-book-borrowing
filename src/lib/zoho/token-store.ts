import { FileStore } from "@zohocrm/typescript-sdk-2.0/models/authenticator/store/file_store";

const tokenStore = new FileStore("./zoho_tokens.txt");

export default tokenStore;
