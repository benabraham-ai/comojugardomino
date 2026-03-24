import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

interface WaitlistEntry {
  email: string;
  locale: string;
  timestamp: string;
}

interface WaitlistData {
  emails: WaitlistEntry[];
}

const DATA_FILE = path.join(process.cwd(), "data", "waitlist.json");

async function getWaitlistData(): Promise<WaitlistData> {
  try {
    const data = await fs.readFile(DATA_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    // File doesn't exist or is invalid, return empty structure
    return { emails: [] };
  }
}

async function saveWaitlistData(data: WaitlistData): Promise<void> {
  // Ensure data directory exists
  const dir = path.dirname(DATA_FILE);
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, locale } = body;

    // Validate email
    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();

    if (!isValidEmail(normalizedEmail)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Get current data
    const data = await getWaitlistData();

    // Check for duplicates
    if (data.emails.some((entry) => entry.email === normalizedEmail)) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 409 }
      );
    }

    // Add new entry
    const newEntry: WaitlistEntry = {
      email: normalizedEmail,
      locale: locale || "es",
      timestamp: new Date().toISOString(),
    };

    data.emails.push(newEntry);

    // Save data
    await saveWaitlistData(data);

    return NextResponse.json(
      { success: true, message: "Successfully added to waitlist" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Waitlist API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const data = await getWaitlistData();
    return NextResponse.json({ count: data.emails.length });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
