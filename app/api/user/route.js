import User from "@/models/User";
import ConnectMongoDB from "@/utils/ConnectMongoDB";
import { isHashValid } from "@/utils/telegramAuth";
import { NextResponse } from "next/server";
export async function POST(req) {
    try {
        await ConnectMongoDB()
        const body = await req.json()
        const { data } = body
        if(!data){
            return NextResponse.json({ok:false,message:"UnAuthorize request"});
        }
        const userData = Object.fromEntries(new URLSearchParams(data))
        const { id } = JSON.parse(userData.user)
        const findUser = await User.findOne({ user_id: id })
        if (findUser) {
            const isValid = await isHashValid(userData, process.env.BOT_TOKEN)
            if (isValid) {
                const referrals = []
                const findReferrals = await User.find({ 'enteredReferralCode': findUser.referralCode })
                findReferrals.forEach((el) => {
                    referrals.push(el.username)
                })
                if (findUser.referralOnboarding == 1) {
                    await User.updateOne({ user_id: id }, { $set: { referralOnboarding: 0 } })
                }
                const referredBy = await User.findOne({ referralCode: findUser.enteredReferralCode })

                if (referredBy) {
                    const user = { username: findUser.username, first_name: findUser.first_name, last_name: findUser.last_name, referralCode: findUser.referralCode, referrals, referralOnboarding: findUser.referralOnboarding, referredBy: { first_name: referredBy.first_name, last_name: referredBy.last_name, username: referredBy.username } }
                    return NextResponse.json({ ok: true, user })
                }
                const user = { username: findUser.username, first_name: findUser.first_name, last_name: findUser.last_name, referralCode: findUser.referralCode, referrals, referralOnboarding: findUser.referralOnboarding }
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
