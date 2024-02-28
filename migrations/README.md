# Migrations

This directory is a place for the migration scripts to live while converting from a self hosted SQL database to Firebase.

These scripts are all ran in node.js, as the firebase sdk doesn't work with Bun unfortunately.

# To Do

Things that need to be setup for the big bang cutover

-   Script that removes bot users (removes bot users, then corrosponding employers, creates two new json files)
-   Script to migrate users to firestore
-   Script to migrate users to firebase auth
-   Script to migrate employers to firestore
-   Script to migrate jobs to firestore
