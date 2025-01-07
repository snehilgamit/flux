import Event from "@/models/Event";
import ConnectMongoDB from "@/utils/ConnectMongoDB";
import { NextResponse } from "next/server";
import { session } from "../../auth/session/route";
import User from "@/models/User";
import { error } from "@/utils/toast";
const TonWeb = require("tonweb")

const early_bird_uuid = 'd8f9ddf1-73ce-481c-a1d8-f938b556047e'

export async function POST(req) {
    const { data, payload } = await req.json()
    await ConnectMongoDB()
    const { public_key, boc } = payload
    try {
        if (!public_key) {
            return NextResponse.json({ ok: false, message: 'Error, refresh and try again.' })
        }
        const isValid = TonWeb.utils.Address.isValid(public_key)
        if (!isValid) {
            throw error('Invalid key')
        }
    } catch {
        return NextResponse.json({ ok: false, message: 'Error, refresh and try again.' })
    }

    const { ok, user, message } = await session(data)
    if (!ok) {
        return NextResponse.json(ok, message)
    }
    if (user.early_bird) {
        return NextResponse.json({ ok: false, message: 'Already claimed have spot.' })
    }
    const early_bird_event = await Event.findOne({ uuid: early_bird_uuid })
    if (!early_bird_event.isActive) {
        return NextResponse.json({ ok: false, message: 'Over' })
    }
    const current_timestamp = Date.now()
    if (current_timestamp < early_bird_event.start) {
        return NextResponse.json({ ok: false, message: "Mint isn't started yet." })
    }
    if (current_timestamp > early_bird_event.end) {
        return NextResponse.json({ ok: false, message: "Mint is closed." })
    }
    if (early_bird_event.left <= 0) {
        return NextResponse.json({ ok: false, message: 'All spots are claimed.' })
    }
    const mint = await Event.updateOne({ uuid: early_bird_uuid, start: { $lte: current_timestamp }, end: { $gte: current_timestamp }, left: { $gt: 0 } }, { $inc: { left: -1 } })
    if (!mint.modifiedCount) {
        return NextResponse.json({ ok: false, message: 'Error while claming.' })
    }
    const update_mint = await User.updateOne({ user_id: user.user_id }, { early_bird: true, 'wallet.public_key': public_key, 'wallet.status': true })
    if (!update_mint.modifiedCount) {
        await Event.updateOne({ uuid: early_bird_uuid, start: { $lte: current_timestamp }, end: { $gte: current_timestamp }, left: { $gt: 0 } }, { $inc: { left: 1 }, $push: { transactions: { boc, type: 'earlybird claim' } } },)
        return NextResponse.json({ ok: false, message: 'Error while claming.' })
    }
    return NextResponse.json({ ok: true, message: 'Claimed.' })
}