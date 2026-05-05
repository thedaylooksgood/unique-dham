/**
 * Utility for handling contact form submissions via Email and WhatsApp.
 * File: contact.ts
 */

export interface ContactData {
  name: string;
  phone: string;
  subject: string;
  message: string;
  productId?: string;
  pujaId?: string;
  source?: string;
}

// WhatsApp number without the '+' symbol for optimal wa.me API compatibility
const WHATSAPP_NUMBER = "918250888275";

/**
 * Sends form data to our internal API route securely.
 */
export async function sendToEmail(data: ContactData): Promise<boolean> {
  try {
    const response = await fetch("/api/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return Boolean(result?.success);
  } catch (error) {
    console.error("[EmailService] Error sending enquiry via API:", error);
    return false;
  }
}

/**
 * Generates a dynamic greeting based on the user's local time.
 */
function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 17) return "Good Afternoon";
  return "Good Evening";
}

/**
 * Opens WhatsApp with a highly professional, box-formatted message.
 * Safely encodes all native emojis and unicode box characters so they 
 * never appear as question marks.
 */
export function sendToWhatsApp(data: ContactData): void {
  const referenceId = data.productId || data.pujaId;
  const refLine = referenceId ? `\n│ 🆔 Ref ID: ${referenceId}` : "";
  const messageBody = data.message?.trim() || "I am interested in learning more. Please guide me.";

  // 1. Build the message naturally using standard template literals.
  // We use standard Unicode box-drawing characters for a clean, app-like UI.
  const rawMessage = `🙏 Pranam & ${getGreeting()},

I am reaching out from your website with a new enquiry. Please find my details below:

┌──────────────────────────────
│ 👤 Name: ${data.name}
│ 📞 Phone: ${data.phone}
│ 🎯 Interest: ${data.subject}
│ 📍 Source: ${data.source || 'Website'}${refLine}
└──────────────────────────────

📝 *Message & Intentions:*
${messageBody}

🌐 _maauniquedham.com_`;

  // 2. Encode the ENTIRE string at once. This guarantees emojis, spaces, 
  // and box characters render perfectly on WhatsApp without glitching.
  const encodedMessage = encodeURIComponent(rawMessage);
  
  // 3. Construct the final URL and open safely.
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
  window.open(whatsappUrl, "_blank", "noopener,noreferrer");
}

/**
 * Unified submission handler.
 * Logic: 
 * - Puja Booking: Email + WhatsApp
 * - Sacred Store: WhatsApp ONLY
 * - Volunteer: WhatsApp ONLY
 */
export async function handleEnquiry(data: ContactData): Promise<boolean> {
  try {
    const sourceLower = data.source?.toLowerCase() || "";
    const isSacredStore = sourceLower.includes("store");
    const isVolunteer = sourceLower.includes("volunteer");
    
    const shouldSendEmail = !isSacredStore && !isVolunteer;

    // Send email silently in the background if applicable
    if (shouldSendEmail) {
      sendToEmail(data).catch(err => 
        console.error("[HandleEnquiry] Background email delivery failed", err)
      );
    }
    
    // Always open WhatsApp immediately for instant user feedback
    sendToWhatsApp(data);
    
    return true;
  } catch (error) {
    console.error("[HandleEnquiry] Unexpected error during submission:", error);
    return false;
  }
}
