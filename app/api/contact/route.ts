import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, company, inquiryType, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    // Google Apps Script Webhook URL (configured in .env.local)
    const googleSheetUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;

    if (googleSheetUrl) {
      const response = await fetch(googleSheetUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          company: company || "N/A",
          inquiryType: inquiryType || "General Inquiry",
          message,
          timestamp: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        console.error("Google Sheets forward failed:", await response.text());
      }
    } else {
      console.warn("GOOGLE_SHEETS_WEBHOOK_URL not set. Inquiries logged to console:", {
        name,
        email,
        company,
        inquiryType,
        message,
        timestamp: new Date().toISOString(),
      });
    }

    return NextResponse.json(
      { success: true, message: "Inquiry received successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
