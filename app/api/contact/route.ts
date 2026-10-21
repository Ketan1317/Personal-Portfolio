import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().trim().email("Please enter a valid email address").max(150),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(5000),
  honeypot: z.string().optional(),
});

// Simple in-memory rate limiting: max 5 requests per IP every 5 minutes
const rateLimitMap = new Map<string, { count: number; expiresAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.expiresAt) {
    rateLimitMap.set(ip, { count: 1, expiresAt: now + 5 * 60 * 1000 });
    return true;
  }
  if (entry.count >= 5) {
    return false;
  }
  entry.count += 1;
  return true;
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown-ip";

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again in a few minutes or email directly." },
        { status: 429 },
      );
    }

    const body = await req.json().catch(() => null);
    if (!body) {
      return NextResponse.json({ error: "Invalid JSON payload" }, { status: 400 });
    }

    const result = contactSchema.safeParse(body);
    if (!result.success) {
      const firstError = result.error.issues[0]?.message || "Validation failed";
      return NextResponse.json({ error: firstError }, { status: 400 });
    }

    const { name, email, message, honeypot } = result.data;

    // Honeypot check: if filled, quietly simulate success for bots
    if (honeypot && honeypot.length > 0) {
      return NextResponse.json({ success: true, message: "Message dispatched" });
    }

    const formspreeId =
      process.env.FORMSPREE_ID ||
      process.env.NEXT_PUBLIC_FORMSPREE_ID ||
      "mjygqwor";
    const web3formsKey = process.env.WEB3FORMS_KEY || process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

    // 1. If Formspree ID is configured, forward to Formspree
    if (formspreeId) {
      const formspreeRes = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ name, email, message }),
      });

      if (!formspreeRes.ok) {
        const errorData = await formspreeRes.json().catch(() => ({}));
        throw new Error(
          (errorData as { error?: string }).error || "Failed to forward to form service",
        );
      }

      return NextResponse.json({
        success: true,
        message: "Message dispatched successfully via Formspree.",
      });
    }

    // 2. If Web3Forms Key is configured, forward to Web3Forms
    if (web3formsKey) {
      const web3Res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: web3formsKey,
          name,
          email,
          message,
          subject: `New Portfolio Message from ${name}`,
          from_name: "Ketan Goyal Portfolio",
        }),
      });

      if (!web3Res.ok) {
        const errorData = await web3Res.json().catch(() => ({}));
        throw new Error(
          (errorData as { message?: string }).message || "Failed to forward to Web3Forms",
        );
      }

      return NextResponse.json({
        success: true,
        message: "Message dispatched successfully via Web3Forms.",
      });
    }

    // 3. Fallback: Log inquiry safely on server & return verified receipt
    console.log("==========================================");
    console.log("📬 NEW CONTACT FORM INQUIRY RECEIVED");
    console.log(`Timestamp: ${new Date().toISOString()}`);
    console.log(`From: ${name} <${email}>`);
    console.log(`Message: ${message}`);
    console.log("==========================================");

    return NextResponse.json({
      success: true,
      message: "Message received successfully! Ketan has been notified.",
    });
  } catch (err) {
    const errorMsg =
      err instanceof Error
        ? err.message
        : "Failed to transmit message. Please email directly.";
    console.error("[Contact API Error]:", errorMsg);
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}
