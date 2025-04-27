import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_KEY!
);

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file") as File;
  const user_id = formData.get("user_id") as string;
  const user_name = formData.get("user_name") as string;

  if (!file || !user_id || !user_name) {
    return NextResponse.json({ error: "Missing file or user info" }, { status: 400 });
  }

  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    const fileExt = file.name.split(".").pop();
    const fileId = crypto.randomUUID();
    const filePath = `${user_id}/${fileId}.${fileExt}`;

    const uploadRes = await fetch(`${process.env.SUPABASE_URL}/storage/v1/object/${process.env.SUPABASE_BUCKET}/${filePath}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${process.env.SUPABASE_KEY}`,
        "Content-Type": file.type || "application/octet-stream",
      },
      body: buffer,
    });

    if (!uploadRes.ok) throw new Error("Upload failed");

    const publicUrl = `${process.env.SUPABASE_URL}/storage/v1/object/public/${process.env.SUPABASE_BUCKET}/${filePath}`;

    await supabase.from("uploaded_files").insert({
      id: fileId,
      user_id,
      user_name,
      file_name: file.name,
      file_type: file.type,
      file_url: publicUrl,
      uploaded_at: new Date().toISOString(),
    });

    return NextResponse.json({
      status: "success",
      file_name: file.name,
      url: publicUrl,
    });
  } catch (err: any) {
    console.error("❌ Upload Error:", err);
  
    if (err instanceof Response) {
      const errorText = await err.text();
      console.error("📦 Supabase response error:", errorText);
    }
  
    return NextResponse.json({ status: "error", message: String(err) }, { status: 500 });
  }
  
  }

