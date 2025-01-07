import User from "@/models/User";
import ConnectMongoDB from "@/utils/ConnectMongoDB";
import { isHashValid } from "@/utils/telegramAuth";
import { NextResponse } from "next/server";

export async function session(data) {
    const userData = Object.fromEntries(new URLSearchParams(data))
    const { id } = JSON.parse(userData.user)
    const findUser = await User.findOne({ user_id: id })
    if (findUser) {
        const isValid = await isHashValid(userData, process.env.BOT_TOKEN) // check whatever telegram user is valid or not
        if (isValid) {
            return { ok: true, user: findUser }
        }
        return { ok: false, message: 'Invalid hash' }
    }
    return { ok: false, message: 'Invalid account' }
}

// Handle post request
export async function POST(req) {
    try {
        await ConnectMongoDB()

        const body = await req.json()
        const { data } = body

        const status = await session(data) // check of session

        if (status.ok) {
            return NextResponse.json({ ok: true, message: null })
        } else {
            return NextResponse.json(status)
        }

    } catch (e) {
        return NextResponse.json({ ok: false, message: 'Error while accessing account' })
    }
}

