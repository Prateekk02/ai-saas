import {prisma} from "@/lib/prisma"
import { NextRequest,NextResponse } from "next/server"

export async function GET(request:NextRequest){
    try{
        const videos = await prisma.video.findMany({
            orderBy: {createdAt: 'desc'}
        })

        return NextResponse.json(videos)
    }catch(error){
        console.log(error)
        return NextResponse.json({
            message: "Error fetching videos"           
        },{ status: 500 })
    }
}