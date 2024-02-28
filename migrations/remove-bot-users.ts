/**
 * Run this script with bun
 *
 * ```bash
 * $ bun run tools/remove-bot-users.ts
 * ```
 */

import users from '../../../../Downloads/users-feb-2024.json'
import employers from '../../../../Downloads/employers-feb-2024.json'

const createFilteredUsersAndEmployersJSON = async () => {
    console.log(`Users ${Bun.argv[2]}`)
    console.log(`Employers ${Bun.argv[3]}`)

    const path = Bun.file(`./migrations/employers-modified-${Date.now()}.json`)
    await Bun.write(path, '{name: "garrett"}')
    console.log('Done')
}

createFilteredUsersAndEmployersJSON()

const main = () => {
    console.log(`ℹ️ Starting bot removal...`)
    console.log(`ℹ️ Total users...${users.length}`)

    let botUsers = []
    let leftOverUsers = []

    /**
     * First, let's get it down to "pending"
     */
    const pendingUsers = users.filter((user) => user.status === 'pending')

    /**
     * Now if a users first name or last name has more than one capital letter, it's a good
     * chance it's random strings and is a bot.
     *
     * If the first or last name contains anything except alphabetic characters, probably a bot
     */

    const moreThanOneCapital = new RegExp('[a-z]*[A-Z][a-z]*[A-Z][a-z]*', 'g')
    const nonAlphabetical = new RegExp('[^a-zA-Z]', 'g')

    pendingUsers.forEach((user) => {
        if (moreThanOneCapital.test(user.first_name) || moreThanOneCapital.test(user.last_name)) {
            botUsers.push(user)
            return
        }
        if (nonAlphabetical.test(user.first_name) || nonAlphabetical.test(user.last_name)) {
            botUsers.push(user)
            return
        }
        leftOverUsers.push(user)
    })

    console.log(`There are ${leftOverUsers.length} leftover users...`)

    console.log(
        `Possible bot users...${botUsers.length} (${(botUsers.length / users.length) * 100}%)`
    )

    console.log(`Post cleanup users: ${users.length - botUsers.length}`)

    /**
     * Remove bot users from employers
     */
    console.log(`Current employers: ${employers.length}`)
    const botUsersIds = botUsers.map((user) => user.id)
    let noBotEmployers = employers.filter((employer) => {
        if (!botUsersIds.includes(employer.user_id)) {
            return employer
        }
    })
    console.log(
        `Post cleanup employers (removed ${employers.length - noBotEmployers.length}): ${noBotEmployers.length}`
    )
}

// main()
