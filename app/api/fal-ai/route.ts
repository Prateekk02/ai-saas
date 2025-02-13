import { NextRequest, NextResponse } from 'next/server';
import { fal } from '@fal-ai/client';

// Checking Fal ai credential.
if (!process.env.FAL_KEY) {
  throw new Error("Fal AI API credentials not found in environment variables");
}

fal.config({
  credentials: process.env.FAL_KEY,
});

export async function POST(request: NextRequest) {
  try {
    
    const {
      prompt,
      video_url,
      num_inference_steps,
      seed,
      pro_mode,
      aspect_ratio,
      resolution,
      num_frames,
      enable_safety_checker,
      strength,
    } = await request.json();

    // Validate required fields 
    if (!prompt || !video_url) {
      return NextResponse.json(
        { error: "Missing required fields: prompt or video_url" },
        { status: 400 }
      );
    }

    // Build the payload as per Fal API specification.
    const payload = {
      prompt,
      num_inference_steps: num_inference_steps ?? 1, 
      seed: seed ?? 0,
      pro_mode: pro_mode ?? false,
      aspect_ratio: aspect_ratio ?? "16:9",
      resolution: resolution ? `${resolution}p` : "480", 
      num_frames: num_frames ? Number(num_frames) : 129,
      enable_safety_checker: enable_safety_checker ?? true,
      strength: strength ?? 0.85,
      video_url,
    };

    console.log("Payload to Fal API:", payload);

    // Submit the job to Fal API.
    const { request_id } = await fal.queue.submit("fal-ai/hunyuan-video/video-to-video", {
      input: payload,
      webhookUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/api/api-fal`, 
    });

    console.log("Fal API Request ID:", request_id);

    return NextResponse.json({
      request_id,
      message: "Fal API job submitted. Use the request ID to poll for the result or wait for the webhook callback."
    });
  } catch (error) {
    console.error("Fal API integration error:", error);
    return NextResponse.json({ error: "Fal API integration error" }, { status: 500 });
  }
}
