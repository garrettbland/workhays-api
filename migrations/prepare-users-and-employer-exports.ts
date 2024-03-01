/**
 * Prepares users and employers exports from SQL database for firebase import.
 *
 * This script will take in a users json and employers json file that is exported from SQL,
 * pluck out verified users, and then pluck out employers associated with the non verified users.
 * Then will write two new files in this migration directory ready to be parsed by the importer files.
 *
 * Run this script with bun
 *
 * ```bash
 * $ bun run migrations/prepare-users-and-employer-exports.ts [user json file] [employer json file]
 * ```
 */

/**
 * Get command line args
 *
 * `bun run prepare-db-export.ts users.json employers.json`
 */
const usersExportFile = Bun.argv[2]
const employersExportFile = Bun.argv[3]

const main = async () => {
    try {
        /**
         * Read and parse files in command line args
         */
        const usersExport: Record<string, string>[] = JSON.parse(
            await Bun.file(usersExportFile).text()
        )
        const employersExport: Record<string, string>[] = JSON.parse(
            await Bun.file(employersExportFile).text()
        )

        console.log(
            `ℹ️ Starting preparation of database exports...\n`,
            `👥 Users: ${usersExportFile}\n`,
            `🏢 Employers: ${employersExportFile}`
        )

        console.log(`ℹ️ Total Users: ${usersExport.length}`)
        console.log(`ℹ️ Total Employers: ${employersExport.length}`)

        /**
         * Step 1. Get verified users
         */
        const verifiedUsers = usersExport.filter((_) => _.status === 'verified')
        const verifiedUserIds = verifiedUsers.reduce((curr, next) => {
            return [...curr, next.id]
        }, [])
        console.log(`ℹ️ Total verified users: ${verifiedUsers.length}`)

        /**
         * Step 2. Filter out employers that aren't attached to verified user
         */
        const verifiedEmployers = employersExport.filter((employer) => {
            return verifiedUserIds.includes(employer.user_id)
        })
        console.log(`ℹ️ Verified employers: ${verifiedEmployers.length}`)

        /**
         * Create users and employers export files
         */
        const userFileLocation = `./migrations/users-verified-export.json`
        const employerFileLocation = `./migrations/employers-verified-export.json`
        const newUsersFile = Bun.file(userFileLocation)
        const newEmployersFile = Bun.file(employerFileLocation)

        /**
         * Write json file to disk
         */
        await Bun.write(newUsersFile, JSON.stringify(verifiedUsers))
        await Bun.write(newEmployersFile, JSON.stringify(verifiedEmployers))

        console.log(
            `✅ Created new export files...\n`,
            `📄 User file export: ${userFileLocation}\n`,
            `📄 Employer file export: ${employerFileLocation}`
        )
    } catch (err) {
        console.error(err)
    }
}

main()
