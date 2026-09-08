import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

/**
 * Called by the game's release workflow right after a new GitHub release is
 * published so the site refreshes immediately instead of waiting for the ISR
 * window. Requires `REVALIDATE_SECRET` to match, sent as `?secret=` or as an
 * `Authorization: Bearer` header.
 */
export async function POST(req: NextRequest) {
  const expected = process.env.REVALIDATE_SECRET;
  if (!expected) {
    return NextResponse.json({ ok: false, error: "REVALIDATE_SECRET not configured" }, { status: 503 });
  }

  const provided =
    req.nextUrl.searchParams.get("secret") ??
    req.headers.get("authorization")?.replace(/^Bearer\s+/i, "");

  if (provided !== expected) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  revalidateTag("release", "max");
  revalidatePath("/");
  return NextResponse.json({ ok: true, revalidated: ["release", "/"], at: new Date().toISOString() });
}

export async function GET() {
  return NextResponse.json({ ok: true, hint: "POST with ?secret= to revalidate" });
}
