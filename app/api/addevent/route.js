import Event from "@/models/Event";
import ConnectMongoDB from "@/utils/ConnectMongoDB";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from 'uuid';

export async function POST(req) {
    // const uuid = uuidv4();
    // const name = 'Early birds Claim'
    // const start = new Date().getTime()
    // const end = new Date('2025-01-01T00:00:00.00Z').getTime()
    // const tasks = [
    //     {
    //         name: 'Telegram', isCompleted: false
    //     },
    //     {
    //         name: 'X', isCompleted: false
    //     },
    //     {
    //         name: 'Youtube', isCompleted: false
    //     },
    //     {
    //         name: 'X like and retweet', isCompleted: false
    //     }

    // ]
    // const data = { uuid, name, limit: 500, reward: 'Early bird role', description: 'get early bird spot by completing following tasks', role: 'all', end, start, tasks }
    // await ConnectMongoDB()
    // await Event.create(data)
    return NextResponse.json({ message:'Deleted' })
}