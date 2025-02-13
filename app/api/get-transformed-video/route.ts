import { NextResponse, NextRequest } from "next/server";
import { fal } from "@fal-ai/client";


if (!process.env.FAL_KEY) {
  throw new Error("Fal AI API credentials not found in environment variables");
}

fal.config({
  credentials: process.env.FAL_KEY,
});

export async function POST(request: NextRequest) {
  try {

    const { request_id } = await request.json();

    if (!request_id) {
      console.log("Request ID not found");
      return NextResponse.json(
        { error: "Request ID not found" },
        { status: 400 } 
      );
    }

    const result = await fal.queue.result("fal-ai/hunyuan-video/video-to-video", {
      requestId: request_id,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Failed fetching transformed video", error);
    return NextResponse.json({ error: "Failed fetching transformed video" }, { status: 502 });
  }
}
