import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import { auth } from '@clerk/nextjs/server';
import {prisma} from "@/lib/prisma"
import axios from 'axios';
import { fal } from "@fal-ai/client";




// Configuration
cloudinary.config({ 
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
});

interface CloudinaryUploadResult {
    public_id : string,
    [key: string] : any,
    bytes: number,
    duration?: number 
}

interface FalSubmissionResponse {
    request_id: string;
    message: string;
  }

export async function POST(request: NextRequest){
    try{
        const {userId} = await auth();
        if(!userId){
            return NextResponse.json({error:"Unauthorized access",status: 401})
        }   
    
        // credentials check
        if(
            !process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ||
            !process.env.CLOUDINARY_API_KEY ||
            !process.env.CLOUDINARY_API_SECRET
        ){
            return NextResponse.json({error:"Cloudinary credentials not found"}, {status: 500})
        }

        const formData = await request.formData();
        const file = formData.get("file") as File | null;
        const title = formData.get("title") as string;
        const description = formData.get("description") as string;
        const originalSize = formData.get("originalSize") as string;
        const prompt = formData.get("prompt") as string 
        const numInferenceSteps  = Number(formData.get("numInferenceSteps")) 
        const seed = Number(formData.get("seed"))  
        const proMode = Boolean(formData.get("proMode")) 
        const aspectRatio = formData.get("aspectRatio") as string
        const resolution = formData.get("resolution") as string
        const numFrames = formData.get("numFrames")
        const safetyEnabled = Boolean(formData.get("safetyEnabled"))
        const strength = Number(formData.get("strength"))
        
        if (!prompt?.trim()) {
            return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
        }
        
        if (!['16:9', '9:16'].includes(aspectRatio)) {
            return NextResponse.json({ error: "Invalid aspect ratio" }, { status: 400 });
        }

        if(!file){
            return NextResponse.json({error:"File not found ", status: 400})
        }

        // Uploading video to cloudinary 
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes)

        const result = await new Promise<CloudinaryUploadResult>(
            (resolve, reject) =>{
                const uploadStream = cloudinary.uploader.upload_stream(
                    {
                        resource_type:"video",
                        folder: "video-upload",
                        transformation:[
                            {quality:"auto",fetch_format:"mp4"}
                        ]
                    },
                    (error,result) =>{
                        if(error){
                            reject(error)
                        }
                        else{
                            resolve(result as CloudinaryUploadResult)
                        }
                    }
                )

                uploadStream.end(buffer)
            }
        )
        
        // Fal API Integration.

        const videoUrl = cloudinary.url(result.public_id, { 
                            resource_type: "video", 
                            secure:true,
                            format: 'mp4'
                        });       
        
        
        const payload = {
                prompt: prompt,                
                num_inference_steps: numInferenceSteps,
                aspect_ratio: aspectRatio,
                resolution: `${resolution}p`,
                enable_safety_checker: safetyEnabled,
                video_url: videoUrl,
                strength: strength,
                seed: seed,
                pro_mode: proMode,
                num_frames: numFrames,
        } 

        const response = await axios.post<FalSubmissionResponse>(`${process.env.NEXT_PUBLIC_BASE_URL}/api/api-fal`,payload)
        const {request_id} = response.data      
        const transformedVideo = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/get-transformed-video`, request_id)

        const apiResponse = transformedVideo.data

        const fetchResult = await cloudinary.uploader.upload(apiResponse, {
            resource_type: "video",
            type: "fetch",  
            folder: "transformed-video",
        });

        console.log("Video stored at ", fetchResult.secure_url)

        const video = await prisma.video.create({
            data: {
                title,
                description,
                publicId: result.public_id,
                originalUrl: videoUrl,
                transformedUrl: fetchResult.secure_url, 
                originalSize: originalSize,
                compressedSize: String(result.bytes),
                duration: result.duration || 0,
                prompt: prompt, 
                numInferenceSteps: Math.max(1, Math.min(numInferenceSteps, 30)),
                seed: seed, 
                proMode: proMode, 
                aspectRatio: aspectRatio, 
                resolution: resolution,
                numFrames: Number(numFrames),
                enableSafetyChecker: safetyEnabled,
                strength: strength,
            },
            });

            return NextResponse.json(          
            video
        )

    }catch(error){
        console.error("Upload video failed :: ", error);
        return NextResponse.json({
            error: "Upload video failed"
        },{
            status: 500
        }
    )
    }
}