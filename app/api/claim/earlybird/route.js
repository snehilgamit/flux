import Event from "@/models/Event";
import ConnectMongoDB from "@/utils/ConnectMongoDB";
import { NextResponse } from "next/server";
import { session } from "../../auth/session/route";
import User from "@/models/User";
import { PublicKey } from "@solana/web3.js";
import nacl from "tweetnacl";


export async function POST(req) {
    const { data, payload } = await req.json()
    await ConnectMongoDB()
    const { signed_message, public_key, message: original_message } = payload
    if (!signed_message || !public_key || !original_message) {
        return NextResponse.json({ ok: false, message: 'Error refresh and try again.' })
    }
    const signed_message_buffer = Buffer.from(signed_message, 'base64')
    const publicKey = new PublicKey(public_key)
    const original_message_buffer = Buffer.from(original_message, 'utf-8')
    const verify = nacl.sign.detached.verify(original_message_buffer,signed_message_buffer,publicKey.toBytes())
    if (!verify) {
        return NextResponse.json({ ok: false, message: 'Connect your wallet.' })
    }
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
        return NextResponse.json({ ok: false, message: 'All spots are claimed.' })
    }
    const mint = await Event.updateOne({ uuid: 'd8f9ddf1-73ce-481c-a1d8-f938b556047e', start: { $lte: current_timestamp }, end: { $gte: current_timestamp }, left: { $gt: 0 } }, { $inc: { left: -1 } })
    if (!mint.modifiedCount) {
        return NextResponse.json({ ok: false, message: 'Error while claming.' })
    }
    if (public_key) {
        return NextResponse.json({ ok: false, message: 'Invalid wallet.' })
    }
    const update = await User.updateOne({ user_id: user.user_id }, { early_bird: true, 'wallet.publickey': public_key, 'wallet.status': true })
    if (!update.modifiedCount) {
        await Event.updateOne({ uuid: 'd8f9ddf1-73ce-481c-a1d8-f938b556047e', start: { $lte: current_timestamp }, end: { $gte: current_timestamp }, left: { $gt: 0 } }, { $inc: { left: 1 } })
        return NextResponse.json({ ok: false, message: 'Error while claming.' })
    }
    return NextResponse.json({ ok: true, message: 'Claimed.' })
}