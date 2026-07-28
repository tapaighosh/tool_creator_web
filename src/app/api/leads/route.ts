import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Lead from "@/models/Lead";

// ─────────────────────────────────────────────
// POST /api/leads  — submit a new lead
// ─────────────────────────────────────────────
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { name, email, company, phone, serviceInterest, message } = body;

    // ── Validation ──────────────────────────────
    if (!name || !email || !message) {
      return NextResponse.json(
        {
          success: false,
          message: "Name, email, and message are required fields.",
        },
        { status: 400 }
      );
    }

    // ── Persist ─────────────────────────────────
    await connectDB();

    const lead = await Lead.create({
      name,
      email,
      company,
      phone,
      serviceInterest,
      message,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Lead saved successfully",
        id: lead._id,
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("[POST /api/leads] error:", error);

    // Surface Mongoose validation errors as 400
    if (
      error instanceof Error &&
      error.name === "ValidationError"
    ) {
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, message: "Internal server error. Please try again." },
      { status: 500 }
    );
  }
}

// ─────────────────────────────────────────────
// GET /api/leads  — admin: list all leads
// ─────────────────────────────────────────────
export async function GET(request: NextRequest) {
  // ── Auth guard ──────────────────────────────
  const adminSecret = request.headers.get("x-admin-secret");

  if (!adminSecret || adminSecret !== process.env.ADMIN_SECRET) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    await connectDB();

    const leads = await Lead.find({}).sort({ createdAt: -1 }).lean();

    return NextResponse.json(leads, { status: 200 });
  } catch (error: unknown) {
    console.error("[GET /api/leads] error:", error);

    return NextResponse.json(
      { success: false, message: "Internal server error. Please try again." },
      { status: 500 }
    );
  }
}
