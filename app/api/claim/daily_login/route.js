import ConnectMongoDB from "@/utils/ConnectMongoDB";
import { NextResponse } from "next/server";
import { session } from "../../auth/session/route";
import User from "@/models/User";

export async function POST(req) {
    const { data, payload } = await req.json()
    const { boc } = payload
    await ConnectMongoDB()
    const { ok, user, message } = await session(data)
    if (!ok) {
        return NextResponse.json(ok, message)
    }
    const user_id = user.user_id
    const get_user = await User.findOne({ user_id });
    if (!get_user) {
        return NextResponse.json({ ok: false, message: 'Invalid account request.' })
    }
    const temp = new Date(get_user.daily_login.timestamp)
    temp.setDate(temp.getDate() + 1)
    temp.setHours(0, 0, 0, 0)
    const timestamp = temp.getTime()
    const claimed_time = Date.now()
    if (timestamp <= claimed_time) {
        const updateUser = await User.updateOne({ user_id, 'daily_login.timestamp': { $lte: claimed_time } }, { 'daily_login.timestamp': claimed_time, $inc: { 'daily_login.strike': get_user.daily_login.strike == 7 ? -6 : 1 },$push:{transactions:{boc,type:'Daily claim'}} })
        if (!updateUser.modifiedCount) {
            return NextResponse.json({ ok: false, message: 'You have already fluxed' })
        }
        return NextResponse.json({ ok: true, message: 'Fluxed' })
    }
    return NextResponse.json({ ok: false, message: 'You can flux tomorrow.' })
}

