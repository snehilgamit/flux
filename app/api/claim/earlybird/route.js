import Event from "@/models/Event";
import ConnectMongoDB from "@/utils/ConnectMongoDB";
import { NextResponse } from "next/server";
import { session } from "../../auth/session/route";
import User from "@/models/User";

export async function POST(req) {
    const { data } = await req.json()
    await ConnectMongoDB()
    const { ok, user, message } = await session(data)
    if (!ok) {
        return NextResponse.json(ok, message)
    }
    if (user.early_bird) {
        return NextResponse.json({ ok: false, message: 'Already claimed have spot.' })
    }
    const earlyBirdEvent = await Event.findOne({ uuid: 'd8f9ddf1-73ce-481c-a1d8-f938b556047e' })
    if (!earlyBirdEvent.isActive) {
        return NextResponse.json({ ok: false, message: 'Over' })
    }
    const current_timestamp = Date.now()
    if (current_timestamp < earlyBirdEvent.start) {
        return NextResponse.json({ ok: false, meessage: "Mint isn't started yet." })
    }
    if (current_timestamp > earlyBirdEvent.end) {
        return NextResponse.json({ ok: false, message: "Mint is closed." })
    }
    if (earlyBirdEvent.left <= 0) {
        return NextResponse.json({ ok: false, message: 'All spot are claimed.' })
    }
    const mint = await Event.updateOne({ uuid: 'd8f9ddf1-73ce-481c-a1d8-f938b556047e', start: { $lte: current_timestamp }, end: { $gte: current_timestamp }, left: { $gt: 0 } }, { $inc: { left: -1 } })
    if (!mint.modifiedCount) {
        return NextResponse.json({ ok: false, message: 'Error while claming.' })
    }
    const update = await User.updateOne({ user_id: user.user_id }, { early_bird: true })
    if (!update.modifiedCount) {
        await Event.updateOne({ uuid: 'd8f9ddf1-73ce-481c-a1d8-f938b556047e', start: { $lte: current_timestamp }, end: { $gte: current_timestamp }, left: { $gt: 0 } }, { $inc: { left: 1 } })
        return NextResponse.json({ ok: false, message: 'Error while claming.' })
    }
    return NextResponse.json({ ok: true, message: 'claimed' })
}