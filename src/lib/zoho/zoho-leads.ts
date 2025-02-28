import {
  GetRecordsParam,
  RecordOperations,
} from "@zohocrm/typescript-sdk-2.0/core/com/zoho/crm/api/record/record_operations";
import { ResponseWrapper } from "@zohocrm/typescript-sdk-2.0/core/com/zoho/crm/api/record/response_wrapper";
import { APIResponse } from "@zohocrm/typescript-sdk-2.0/routes/controllers/api_response";
import { HeaderMap } from "@zohocrm/typescript-sdk-2.0/routes/header_map";
import { ParameterMap } from "@zohocrm/typescript-sdk-2.0/routes/parameter_map";

export async function getLeads() {
  try {
    console.log("Fetching Zoho Leads...");
    const recordOperations = new RecordOperations();
    const paramInstance = new ParameterMap();

    await paramInstance.add(
      GetRecordsParam.FIELDS,
      "id,Last_Name,First_Name,Email,Company"
    );
    const headerInstance = new HeaderMap();

    const response: APIResponse<ResponseWrapper> =
      await recordOperations.getRecords("Leads", paramInstance, headerInstance);

    if (response && response.getObject()) {
      const responseWrapper = response.getObject() as ResponseWrapper;
      const leads = responseWrapper.getData();

      console.log(" Leads Fetched Successfully:", leads);
      return leads;
    } else {
      console.warn("⚠️ No leads found or invalid response.");
      return [];
    }
  } catch (error) {
    console.error(" Error Fetching Leads:", error);
    throw error;
  }
}
