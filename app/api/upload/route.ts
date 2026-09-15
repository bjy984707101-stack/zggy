import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/server";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const supabase = await createServerSupabaseClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "未登录管理员账号" }, { status: 401 });

    const form = await req.formData();
    const file = form.get("file");
    const bucket = String(form.get("bucket") || "");
    const prefix = String(form.get("prefix") || "image");
    if (!(file instanceof File)) return NextResponse.json({ error: "未找到图片文件" }, { status: 400 });
    if (!["site-images", "property-images"].includes(bucket)) return NextResponse.json({ error: "非法图片存储桶" }, { status: 400 });
    if (!file.type.startsWith("image/")) return NextResponse.json({ error: "只能上传图片" }, { status: 400 });
    if (file.size > 15 * 1024 * 1024) return NextResponse.json({ error: "图片不能超过 15MB" }, { status: 400 });

    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-");
    const path = `${prefix}-${Date.now()}-${safeName}`;
    const buffer = new Uint8Array(await file.arrayBuffer());
    const { error } = await supabase.storage.from(bucket).upload(path, buffer, {
      contentType: file.type,
      upsert: false,
    });
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });

    const { data } = supabase.storage.from(bucket).getPublicUrl(path);
    return NextResponse.json({ url: data.publicUrl, path });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "上传失败" }, { status: 500 });
  }
}
