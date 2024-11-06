export const dailyLoginData = { title: 'Daily rewards', description: 'Log in daily to claim increasing rewards and earn up to 127 $FLUX over 7 days!', reward: '127 FLUX' }

export const nftMintData = { title: 'Claim Free NFT', description: 'Reach Level 10 and claim your free NFT instantly!', reward: '1 NFT', claimApi: '/api/game/Missions/nftmint/level10', availableMints: [{ title: "Level 10", description: "Mint special NFT on level 10.", Func: () => { }, btnTxt: "Mint", api: '/', isCompletedBtnTxt: 'Done', 'href': "" }] }

export const socialTaskData = {
    title: 'Social Media Tasks', description: 'Follow us on social media and instantly earn 10 kM! Click to get started.', reward: '10 kM', claimApi: '/api/game/Missions/socialTask/claim',
    availableTasks: [
        { id: 1, title: "Follow on X", description: "Follow our Step3 X account and earn 3 k.m instantly!", api: '/api/game/Missions/socialTask/1', btnTxt: "Follow", isCompletedBtnTxt: 'Done', 'href': "https://x.com/intent/follow?screen_name=step3net" },

        { id: 2, title: "Join our Telegram Group", description: "Join our Step3 Telegram group and earn 2 k.m instantly!", api: '/api/game/Missions/socialTask/2', btnTxt: "Join", isCompletedBtnTxt: 'Done', 'href': "https://t.me/step3official" },

        { id: 3, title: "Subscribe on Telegram Channel", description: "Subscribe to our Step3 Telegram channel and earn 2 k.m instantly!", api: '/api/game/Missions/socialTask/3', btnTxt: "Subscribe", isCompletedBtnTxt: 'Done', 'href': "https://t.me/step3Announcments" },

        { id: 4, title: "Subscribe on YouTube", description: "Subscribe to our Step3 YouTube channel and earn 3 k.m instantly!", api: '/api/game/Missions/socialTask/4', btnTxt: "Subscribe", isCompletedBtnTxt: 'Done', 'href': "https://www.youtube.com/@step3net" },
    ]
}

export const LeaderBoardData = { reward: "19250 kM", title: "Leaderboard", description: "The ultimate goal is to win the grand prize of 19,250 kM. This challenge encourages participants to stay active, reach new milestones, and earn impressive rewards based on their rankings, with substantial prizes for those who make it to the top of the leaderboard." }

export const TasksData = {title: 'Tasks', description: 'Complete Tasks and instantly earn kMs! Click to get started.', reward: '∞ kMs',}