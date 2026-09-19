import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const rawBody = await request.text();
    let payload;
    try {
      payload = JSON.parse(rawBody);
    } catch {
      payload = { raw: rawBody };
    }

    const triggerEvent = payload.triggerEvent || payload.event || "UNKNOWN_EVENT";
    const bookingData = payload.payload || payload;

    console.log(`[Cal.com Webhook] Received event: ${triggerEvent}`, {
      title: bookingData?.title,
      startTime: bookingData?.startTime,
      organizer: bookingData?.organizer?.name || bookingData?.organizer?.email,
      attendee: bookingData?.attendees?.[0]?.name || bookingData?.attendees?.[0]?.email,
    });

    // Optional: Forward to Google Sheets if configured
    const googleSheetUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
    if (googleSheetUrl && (triggerEvent === "BOOKING_CREATED" || triggerEvent === "BOOKING_RESCHEDULED")) {
      try {
        await fetch(googleSheetUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: bookingData?.attendees?.[0]?.name || "Cal.com Attendee",
            email: bookingData?.attendees?.[0]?.email || "N/A",
            company: bookingData?.attendees?.[0]?.name || "N/A",
            inquiryType: `Cal.com Booking: ${triggerEvent}`,
            message: `Event: ${bookingData?.title || "Intro Call"} | Time: ${bookingData?.startTime || "N/A"} | Meeting URL: ${bookingData?.metadata?.videoCallUrl || "Google Meet"}`,
            timestamp: new Date().toISOString(),
          }),
        });
      } catch (sheetErr) {
        console.error("[Cal.com Webhook] Error forwarding to Google Sheets:", sheetErr);
      }
    }

    return NextResponse.json(
      {
        received: true,
        event: triggerEvent,
        message: "Webhook processed successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[Cal.com Webhook] Error handling webhook:", error);
    return NextResponse.json(
      { error: "Webhook handler error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    status: "active",
    endpoint: "Cal.com Webhook Handler",
    supportedEvents: [
      "BOOKING_CREATED",
      "BOOKING_RESCHEDULED",
      "BOOKING_CANCELLED",
      "BOOKING_REJECTED",
      "BOOKING_PAID"
    ]
  });
}
