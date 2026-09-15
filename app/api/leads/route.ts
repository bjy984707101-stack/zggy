import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/server";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const supabase = await createServerSupabaseClient();
    const { error } = await supabase.from("leads").insert({
      name: body.name,
      phone: body.phone,
      company: body.company || "",
      message: body.message || "",
      property_id: body.propertyId || null,
    });
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "提交失败" }, { status: 500 });
  }
}
