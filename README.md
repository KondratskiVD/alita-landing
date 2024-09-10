1. input in terminal of current project 'firebase init'
2. at 'APP Engine' - create your project (https://console.cloud.google.com/appengine/)
3. at 'APIs & Service' activate 'Cloud Functions API' and 'Firebase login' (https://console.cloud.google.com/apis/dashboard)
4. Create database at firebse console with 'specific region' and insert this region in file functions/index.js (22 line):
// exports.submitForm = functions.region('specific region')

replace databaseURL: 'https://id-alita-firebase.firebaseio.com' on your 'project_id' (by name of 'firebase console')
// you can find project_id at settings of project (General tab)

input in terminal 'firebase deploy --only functions,hosting'
