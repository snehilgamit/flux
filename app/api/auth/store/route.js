import User from "@/models/User";
import ConnectMongoDB from "@/utils/ConnectMongoDB";
import { NextResponse } from "next/server";
export async function POST(req) {
    await ConnectMongoDB()
    const { data } = await req.json()
    const userData = Object.fromEntries(new URLSearchParams(data));
    await User.updateOne({user_id:'5116183770'},{$push:{session:userData}})
    return NextResponse.json({ok:true})
}