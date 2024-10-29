import User from "@/models/User";
import ConnectMongoDB from "@/utils/ConnectMongoDB";
import { isHashValid } from "@/utils/telegramAuth";
import { NextResponse } from "next/server";
export async function POST(req) {
    try {
        await ConnectMongoDB()
        const body =await req.json()
        console.log(body)
        const { data } = body
        const userData = Object.fromEntries(new URLSearchParams(data))
        const { id } = JSON.parse(userData.user)
        const findUser = await User.findOne({ user_id: id })
        if (findUser) {
            const isValid = await isHashValid(userData, process.env.BOT_TOKEN)
            if (isValid) {
                return NextResponse.json({ ok: true, message: null, referralCode: findUser.referralCode })
            }
            return NextResponse.json({ ok: false, message: 'Invalid hash' })
        }
        return NextResponse.json({ ok: false, message: 'Invalid account' })

    } catch (e) {
        console.log(e)
        return NextResponse.json({ ok: false, message: 'Error while accessing account' })
    }
}

