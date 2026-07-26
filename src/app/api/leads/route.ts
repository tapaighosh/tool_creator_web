import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Lead from "@/models/Lead";

// Rate limiting: simple in-memory store (upgrade to Redis for production)
const rateLimit = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 5; // 5 submissions per window
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimit.get(ip);

  if (!record || now > record.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }

  if (record.count >= RATE_LIMIT_MAX) {
    return false;
  }

  record.count++;
  return true;
}

// POST /api/leads — Submit a new lead
export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { name, email, company, phone, service, message } = body;

    // Basic validation
    if (!name || !email || !service || !message) {
      return NextResponse.json(
        { error: "Name, email, service, and message are required." },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    await connectDB();

    const lead = await Lead.create({
      name: name.trim().slice(0, 100),
      email: email.trim().toLowerCase().slice(0, 200),
      company: company?.trim().slice(0, 200),
      phone: phone?.trim().slice(0, 30),
      serviceInterest: service.trim().slice(0, 100),
      message: message.trim().slice(0, 2000),
    });

    return NextResponse.json(
      {
        success: true,
        message: "Thank you! We'll be in touch within 24 hours.",
        id: lead._id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Lead submission error:", error);

    if (error instanceof Error && error.message.includes("validation")) {
      return NextResponse.json(
        { error: "Please check your input and try again." },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}

// GET /api/leads — Retrieve all leads (admin only)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const secret = searchParams.get("secret");
    const adminSecret = process.env.ADMIN_SECRET;

    if (!adminSecret || secret !== adminSecret) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "50");
    const skip = (page - 1) * limit;

    const [leads, total] = await Promise.all([
      Lead.find({})
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Lead.countDocuments({}),
    ]);

    return NextResponse.json({
      leads,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Leads fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch leads." },
      { status: 500 }
    );
  }
}
