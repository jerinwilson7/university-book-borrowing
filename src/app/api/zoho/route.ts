import { initializeZohoSDK } from "@/lib/zoho/zoho-config";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    console.log(" API Request Received: Initializing Zoho SDK...");
    await initializeZohoSDK();
    console.log("Zoho SDK Initialized Successfully!");
    return NextResponse.json(
      { message: "Zoho SDK Initialized" },
      { status: 200 }
    );
  } catch (error) {
    console.error(" Zoho SDK Initialization Failed:", error);
    return NextResponse.json(
      { error: "Failed to initialize Zoho SDK", details: error },
      { status: 500 }
    );
  }
}
