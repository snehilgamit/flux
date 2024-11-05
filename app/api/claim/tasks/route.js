import Task from "@/models/Task";
import ConnectMongoDB from "@/utils/ConnectMongoDB";
import { NextResponse } from "next/server";
import { session } from "../../auth/session/route";
import User from "@/models/User";

export async function GET(req) {
    try {
        await ConnectMongoDB()
        const tasks = await Task.find({ isActive: true })
        return NextResponse.json({ ok: true, tasks, message: null })
    } catch {
        return NextResponse.json({ ok: false, message: 'Error while fetching tasks.' })
    }
}
export async function POST(req) {
    try {
        await ConnectMongoDB()
        const { data, uuid } = await req.json()
        const { ok, user, message } = await session(data)
        if (!ok) {
            return NextResponse.json(ok, message)
        }
        const user_id = user.user_id
        const get_user = await User.findOne({ user_id })
        const task = await Task.findOne({ uuid })
        if (!task) {
            return NextResponse.json({ ok: false, message: 'Something went wrong.' })
        }
        if (!get_user) {
            return NextResponse.json({ ok: false, message: 'Invalid user.' })
        }
        if (!get_user.completed_tasks[uuid]) {
            const reward = task.reward
            const updatedUser = await User.updateOne({user_id},{$inc:{flux:reward},'completed_tasks':{...get_user.completed_tasks,[uuid]:true}})
            if(!updatedUser.modifiedCount){
                return NextResponse.json({ ok: false, message: 'Try after sometime.'}) 
            }
            return NextResponse.json({ ok: true, message: 'Fluxed.'})
        }
        return NextResponse.json({ ok: false, message: 'You have already fluxed.'})
    } catch {
        return NextResponse.json({ ok: false, message: 'Error while claiming task.' })
    }
}