/**
 * Must use node to run script. Bun doesn't work, it yells about grpc/http2 stuff
 */

import { readFile } from 'fs/promises'
import { initializeApp, cert, getApps, getApp } from 'firebase-admin/app'
import { getFirestore, FieldValue } from 'firebase-admin/firestore'
import { getAuth } from 'firebase-admin/auth'
// const certFile = require('../../../workhays-firebase-firebase-adminsdk-vc5g8-0be33c0262.json')
// import certFile from '../../../workhays-firebase-firebase-adminsdk-vc5g8-0be33c0262.json'

const certFile = JSON.parse(
    await readFile(
        new URL(
            '../../../workhays-firebase-firebase-adminsdk-vc5g8-0be33c0262.json',
            import.meta.url
        )
    )
)

console.log('🔥 Initializing Firebase')

let app =
    getApps.length === 0
        ? initializeApp({
              credential: cert(certFile),
              databaseURL: 'https://workhays-firebase.firebaseio.com',
              projectId: 'workhays-firebase',
              serviceAccountId: '',
          })
        : getApp()

// Initialize our project application
// initializeApp({
//     credential: cert(certFile),
//     databaseURL: 'https://workhays-firebase.firebaseio.com',
// })

console.log('✅ Initialized firebase...')

// Set up database connection
const firestoreDb = getFirestore(app)

// Set up auth connection
const firebaseAuth = getAuth(app)

// firestoreDb.settings({ timestampsInSnapshots: true })
export const database = firestoreDb
export const auth = firebaseAuth
export const serverTimestamp = () => FieldValue.serverTimestamp()
