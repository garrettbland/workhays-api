import { database, serverTimestamp } from './firebase.mjs'
import { readFile } from 'fs/promises'

// const employers_test = [
//     {
//         id: '08571a6f-c4bc-4ee9-b654-7627b5433d46',
//         user_id: 'a8b3c035-4d25-4b1e-8545-116cb0123c26',
//         title: 'G&H WorX, LLC',
//         description:
//             '<div>Primarily fencing and sprinkler system installation, maintenance and ongoing support for residents and commercial businesses. &nbsp; Specialize in land preparation, medium scale landscaping and other tasks related to land maintenance and beautification!</div>',
//         contact: 'Taylor and/or Brian Meder',
//         email: 'brian@ghworx.com',
//         phone: '7856212500',
//         logo_url: 'public/uploads/employers/1658350364106.png',
//         header_image_url: null,
//         website_url: 'www.ghworx.com',
//         facebook_url: 'https://www.facebook.com/GHWorXHays',
//         twitter_url: '',
//         instagram_url: null,
//         youtube_url: null,
//         created_at: '2022-07-20 20:47:21',
//         updated_at: '2022-07-20 20:52:44',
//     },
// ]

/**
 * JSON file to import. Throw if not provided
 */
const file = process.argv.slice(2)[0]
if (!file) {
    throw Error('Error - file name not provided...')
}

const employersFromJSON = JSON.parse(await readFile(new URL(file, import.meta.url)))

// const readDataTest = async () => {
//     try {
//         const result = await database.collection('employers')
//         console.log(result)
//     } catch (err) {
//         console.log(err)
//     } finally {
//         console.log('finally done')
//     }
// }

const MAX_PER_BATCH = 499

const waitOneSecond = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve()
        }, 1010)
    })
}

const addDataTest = async () => {
    try {
        console.log(`ℹ️ Starting migration of ${employersFromJSON.length} employers...`)

        // 500 is max, but just batching one lower just cause
        const totalBatches = Math.ceil(employersFromJSON.length / MAX_PER_BATCH)

        // References to batches so we can commit them later
        const batches = [...Array.from(Array(totalBatches))]

        console.log(
            `ℹ️ There will be ${Math.ceil(employersFromJSON.length / MAX_PER_BATCH)} batch's committed to firebase`
        )

        // loop through and create individual batch references
        batches.forEach((item, index) => {
            console.log(`✨ Creating database batch reference at index ${index}`)
            batches[index] = {
                batchRef: database.batch(),
                documents: [
                    ...employersFromJSON.slice(
                        index * MAX_PER_BATCH,
                        index === 0 ? MAX_PER_BATCH : (index + 1) * MAX_PER_BATCH
                    ),
                ],
            }
        })

        batches.forEach((item, index) => {
            console.log(`✨ Setting data for batch ${index}`)
            console.log(`ℹ️ Loop through and do batchRef.set ${item.documents.length} times...`)
        })

        for (var i = 0; i < batches.length; i++) {
            console.log(`⏳ Starting commit for batch ${i}...`)
            await waitOneSecond()
            console.log(`Loop through documents for batch ${i} and add to batch...`)
            console.log(`Commit batch ${i} with ${batches[i].documents.length} documents...`)
            // batches[i].commit().then(function () {
            //     console.log(`✅ Wrote batch ` + i)
            // })
        }

        // const batch = database.batch()

        // employersFromJSON.forEach((employer) => {
        //     const employerRef = database.collection('employers').doc(employer.id)
        //     batch.set(employerRef, {
        //         ...employer,
        //         createdAt: serverTimestamp(),
        //         updatedAt: serverTimestamp(),
        //         users: [
        //             {
        //                 userId: '1234',
        //                 role: 'owner', // owner/user (owners can delete stuff?) future proofing
        //             },
        //         ],
        //     })
        // })

        // const result = await batch.commit()

        // const result = await database.collection('testing').add({
        //     id: '000b1063-b9cc-4671-b44f-7e53d830f3a6',
        //     employer_id: 'fb3596db-4938-4096-b66f-fd33866bc11b',
        //     title: 'Assistant Professor, Social Work',
        // })
        const result = []
        console.log('✅ Added documents: ', result)
    } catch (err) {
        console.log('❌ There has been an error...')
        console.log(err)
        return err
    }
}

/**
 * Utility to migrate CSV from SQL database export into firebase
 */
const importCSV = (csvFile) => {
    console.log(`ℹ️ Importing ${csvFile} into firebase...`)
    addDataTest()
        .then(() => console.log('✨ Done'))
        .catch((err) => console.error(err))
}

importCSV(file)
