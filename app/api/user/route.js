import Event from "@/models/Event";
import Task from "@/models/Task";
import User from "@/models/User";
import ConnectMongoDB from "@/utils/ConnectMongoDB";
import { isHashValid } from "@/utils/telegramAuth";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from 'uuid'
import { session } from "../auth/session/route";
export async function POST(req) {
    try {
        await ConnectMongoDB()
        const body = await req.json()
        const { data } = body
        if (!data) {
            return NextResponse.json({ ok: false, message: "UnAuthorize request" });
        }
        const { ok, findUser: user, message } = await session(data)

        if (!ok) {
            return NextResponse.json(ok, message)
        }
        const user_id = user.user_id
        if (findUser) {
            const referrals = findUser.referrals
            if (findUser.referralOnboarding === 1) {
                await User.updateOne({ user_id }, { $set: { referralOnboarding: 0 } })
            }
            const events = await Event.find({ isActive: true });

            const referred_by = await User.findOne({ referralCode: findUser.enteredReferralCode })

            const user = {
                username: findUser.username, first_name: findUser.first_name, last_name: findUser.last_name, referralCode: findUser.referralCode, referrals, createdAt: findUser.createdAt, events, early_bird: findUser.early_bird, daily_login: findUser.daily_login, completed_tasks: findUser.completed_tasks, referralOnboarding: findUser.referralOnboarding
            }

            if (referred_by) {
                user.referredBy = {
                    first_name: referred_by.first_name, last_name: referred_by.last_name, username: referred_by.username
                }
            }
            return NextResponse.json({ ok: true, user })
        }
        return NextResponse.json({ ok: false, message: 'Invalid account' })

    } catch (e) {
        console.log(e)
        return NextResponse.json({ ok: false, message: 'Error while accessing account' })
    }
}
