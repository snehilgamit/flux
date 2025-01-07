import User from "@/models/User";
import ConnectMongoDB from "@/utils/ConnectMongoDB";
import { isHashValid } from "@/utils/telegramAuth";
import { NextResponse } from "next/server";
export async function POST(req) {
    try {
        await ConnectMongoDB()
        const body = await req.json()
        const { data } = body
        if (!data || data == null) {
            return NextResponse.json({ ok: false, message: 'Hash is not provided.' })
        }
        
        const userData = Object.fromEntries(new URLSearchParams(data))  // decode url and convert into JSON object 

        const { id, first_name, last_name, username } = JSON.parse(userData.user)
        const findUser = await User.findOne({ user_id: id })

        if (!findUser) {
            const isValid = await isHashValid(userData, process.env.BOT_TOKEN)  // check whatever telegram user is valid or not

            if (isValid) {
                const referralCode = userData.hash.slice(0, 14)
                const enteredReferralCode = userData.start_param
                const findFriend = await User.findOne({ referralCode: enteredReferralCode })
                const newUser = {
                    user_id: id,
                    first_name,
                    last_name,
                    username,
                    referralCode,
                    enteredReferralCode
                }
                // if referral code exist
                if (findFriend) {
                    const fren = { id, first_name, last_name, username }
                    await User.updateOne({ user_id: findFriend.user_id }, { $push: { referrals: fren } })
                } else {
                    newUser.enteredReferralCode = ''
                }

                const createUser = await User.create(newUser)   // adding new user into database.
                
                if (createUser) {
                    return NextResponse.json({ ok: true, message: 'Done' })
                }
                return NextResponse.json({ ok: false, message: 'Something went wonrg' })
            }
            return NextResponse.json({ ok: false, message: 'Invalid hash' })
        }
        return NextResponse.json({ ok: false, message: 'Account exist' })

    } catch (e) {
        return NextResponse.json({ ok: false, message: 'Error while creating account' })
    }
}


