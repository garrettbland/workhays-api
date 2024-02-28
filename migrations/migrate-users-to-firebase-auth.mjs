/**
 * Tool used to migrate users to firebase auth
 * https://firebase.google.com/docs/auth/admin/import-users
 */

import { auth } from './firebase.mjs'

// Up to 1000 users can be imported at once.
/**
 * Custom claims are available in api/decoded json web token
 */
const userImportRecords = [
    {
        uid: '687daa5e-ceec-46a5-9a8a-c91d20a4e4cb',
        email: 'gbland777@gmail.com',
        emailVerified: true, // default "false". I think I want to set to true for current verified users
        customClaims: {
            // legacy_user: true, // important to know?
            role: 'admin', // admin, user
            status: 'verified', // pending, verified, denied
        },
        passwordHash: Buffer.from('$2a$08$K9p7tdFe1W81F0sHFvLFROALym4CWyUf9.yZJpQHxGWI6YXhjD3/S'),
    },
]

/**
 * This process will overwrite users based on uid
 */
const migrate = () => {
    console.log(`ℹ️ Starting user migration for ${userImportRecords.length} users...`)

    auth.importUsers(userImportRecords, {
        hash: {
            algorithm: 'BCRYPT',
            // key: Buffer.from('w0rkH@ys!2020'),
        },
    })
        .then((userImportResult) => {
            // The number of successful imports is determined via: userImportResult.successCount.
            // The number of failed imports is determined via: userImportResult.failureCount.
            // To get the error details.
            console.log(`✅ Migrated ${userImportResult.successCount} users...`)
            userImportResult.errors.forEach((indexedError) => {
                // The corresponding user that failed to upload.
                console.log(
                    'Error ' + indexedError.index,
                    ' failed to import: ',
                    indexedError.error
                )
            })
        })
        .catch((error) => {
            // Some unrecoverable error occurred that prevented the operation from running.
            console.log('❌ There was an issue importing users...')
            console.log(error)
        })
}

migrate()
