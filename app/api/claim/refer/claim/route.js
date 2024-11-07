import Task from "@/models/Task";
import ConnectMongoDB from "@/utils/ConnectMongoDB";
import { NextResponse } from "next/server";
import User from "@/models/User";
import { session } from "@/app/api/auth/session/route";

export async function POST(req) {
    try {
        await ConnectMongoDB()
        const { data, uuid } = await req.json()
        const { pathname } = new URL(req.url)
        const { ok, user, message } = await session(data)
        if (!ok) {
            return NextResponse.json(ok, message)
        }
        const user_id = user.user_id
        const get_user = await User.findOne({ user_id })
        const task = await Task.findOne({ uuid })
        if (task.api !== pathname) {
            return NextResponse.json({ ok: false, message: 'Something went wrong.' })
        }
        if (!task) {
            return NextResponse.json({ ok: false, message: 'Something went wrong.' })
        }
        if (!get_user) {
            return NextResponse.json({ ok: false, message: 'Invalid user.' })
        }
        if (get_user.completed_tasks[uuid]) {
            return NextResponse.json({ ok: false, message: 'You have already fluxed.' })
        }
        if(task.referral_target >= get_user.referrals.length){
            return NextResponse.json({ok:false,message:`More ${task.referral_target-get_user.referrals.length} refer need to claim.`})
        }
        
        else {
            const reward = task.reward
            let query = 'completed_tasks.' + uuid
            const updatedUser = await User.updateOne({ user_id }, { $inc: { flux: reward }, [query]: true })
            if (!updatedUser.modifiedCount) {
                return NextResponse.json({ ok: false, message: 'Try after sometime.' })
            }
            return NextResponse.json({ ok: true, message: 'Fluxed' })
        }
    } catch {
        return NextResponse.json({ ok: false, message: 'Error while claiming task.' })
    }
}