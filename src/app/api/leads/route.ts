import { initializeZohoSDK } from "@/lib/zoho/zoho-config";
import { getLeads } from "@/lib/zoho/zoho-leads";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await initializeZohoSDK();
    const leads = await getLeads();
    return NextResponse.json({ success: true, leads }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch leads" },
      { status: 500 }
    );
  }
}
