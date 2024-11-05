import ConnectMongoDB from "@/utils/ConnectMongoDB";
import { NextResponse } from "next/server";
import User from "@/models/User";
import { session } from "@/app/api/auth/session/route";
export async function POST(req) {
    const { data } = await req.json()
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
        return NextResponse.json({ ok: true, message: null })
    }
    return NextResponse.json({ ok: false, message: null })
}