import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import { auth } from '@clerk/nextjs/server';
import {prisma} from "@/lib/prisma"


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

        if(!file){
            return NextResponse.json({error:"File not found ", status: 400})
        }

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

        const video = await prisma.video.create({

            data: {
                title,
                description,
                publicId: result.public_id,
                duration: result.duration || 0 ,
                compressedSize: String(result.bytes),
                originalSize: originalSize

            }
        })

        return NextResponse.json(          
            video
        )

    }catch(error){
        console.log("Upload video failed :: ",error)
        return NextResponse.json({
            error: "Upload video failed"
        },{
            status: 500
        }
    )
    }
}