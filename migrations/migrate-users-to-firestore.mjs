/**
 * Imports users from JSON file and into firestore database. Must use node. Bun
 * doesn't work with Firebase admin sdk
 *
 * Usage...
 * node migrate-users-to-firestore users.json
 */

import { database, serverTimestamp } from './firebase.mjs'
import { readFile } from 'fs/promises'
import { waitOneSecond, MAX_PER_BATCH } from './util.mjs'

const main = async () => {
    try {
        /**
         * JSON file to import. Throw if not provided
         */
        const importFile = process.argv.slice(2)[0]
        if (!importFile) {
            throw Error('Error - user file not provided...')
        }

        /**
         * Parse user file
         */
        const fileJSON = JSON.parse(await readFile(new URL(importFile, import.meta.url)))

        console.log(
            `ℹ️ Starting preparation of users import into firebase...\n`,
            `👥 Users: ${fileJSON.length}`
        )

        /**
         * Total amount of batches required
         */
        const totalBatches = Math.ceil(fileJSON.length / MAX_PER_BATCH)

        /**
         * References to batches to commit them after settings items in batch
         */
        const batches = [...Array.from(Array(totalBatches))]

        console.log(
            `ℹ️ There will be ${Math.ceil(fileJSON.length / MAX_PER_BATCH)} batch's committed to firebase`
        )

        /**
         * Loop through batches and create individual batch references
         */
        batches.forEach((item, index) => {
            console.log(`✨ Creating database batch reference at index ${index}`)
            batches[index] = {
                batchRef: database.batch(),
                documents: [
                    ...fileJSON.slice(
                        index * MAX_PER_BATCH,
                        index === 0 ? MAX_PER_BATCH : (index + 1) * MAX_PER_BATCH
                    ),
                ],
            }
        })

        /**
         * Loop through batches and set data for each batch
         */
        batches.forEach((item, index) => {
            console.log(`ℹ️ Starting set data for batch ${index}...`)
            console.log(`ℹ️ Loop through and do batchRef.set ${item.documents.length} times...`)

            item.documents.forEach((document) => {
                const usersCollectionRef = database.collection('users').doc(document.id)
                item.batchRef.set(usersCollectionRef, document)
            })
        })

        /**
         * Loop through batches, write to firestore
         */
        for (var i = 0; i < batches.length; i++) {
            console.log(`⏳ Starting commit for batch ${i}...`)
            await waitOneSecond()
            console.log(`Loop through documents for batch ${i} and add to batch...`)
            console.log(`Commit batch ${i} with ${batches[i].documents.length} documents...`)

            /**
             * Uncomment this line to push data to firebase
             */
            // batches[i].batchRef.commit().then(function () {
            //     console.log(`✅ Wrote batch ` + i)
            // })
        }
    } catch (err) {
        console.error(err)
    }
}

main()
