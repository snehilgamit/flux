import Event from "@/models/Event";
import Task from "@/models/Task";
import User from "@/models/User";
import ConnectMongoDB from "@/utils/ConnectMongoDB";
import { isHashValid } from "@/utils/telegramAuth";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from 'uuid'
export async function POST(req) {
    try {
        await ConnectMongoDB()
        const body = await req.json()
        const { data } = body
        if (!data) {
            return NextResponse.json({ ok: false, message: "UnAuthorize request" });
        }
        const userData = Object.fromEntries(new URLSearchParams(data))
        const { id } = JSON.parse(userData.user)
        const findUser = await User.findOne({ user_id: id })
        if (findUser) {
            const isValid = await isHashValid(userData, process.env.BOT_TOKEN)
            if (isValid) {
                const referrals = findUser.referrals
                if (findUser.referralOnboarding == 1) {
                    await User.updateOne({ user_id: id }, { $set: { referralOnboarding: 0 } })
                }
                const events = await Event.find({ isActive: true });
                const referredBy = await User.findOne({ referralCode: findUser.enteredReferralCode })
                const user = { username: findUser.username, first_name: findUser.first_name, last_name: findUser.last_name, referralCode: findUser.referralCode, referrals, createdAt: findUser.createdAt, events, early_bird: findUser.early_bird, daily_login: findUser.daily_login,completed_tasks:findUser.completed_tasks }
                if (referredBy) {
                    user.referredBy = { first_name: referredBy.first_name, last_name: referredBy.last_name, username: referredBy.username }
                }
                return NextResponse.json({ ok: true, user })
            }
            return NextResponse.json({ ok: false, message: 'Invalid hash' })
        }
        return NextResponse.json({ ok: false, message: 'Invalid account' })

    } catch (e) {
        console.log(e)
        return NextResponse.json({ ok: false, message: 'Error while accessing account' })
    }
}
