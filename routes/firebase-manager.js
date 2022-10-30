// firebase admin setup
var fs = require('firebase-admin');
let serviceAccount = process.env.GOOGLE_CREDENTIALS != null ? JSON.parse(process.env.GOOGLE_CREDENTIALS) : require('../string-haven-69370-firebase-adminsdk-jg9sk-9ecead5f49.json');
const app = fs.initializeApp({
  credential: fs.credential.cert(serviceAccount)
});

// Get the database
const db = fs.firestore();
// Get the "Posts" Collection (In SQL Terms, Table)
const postsColl = db.collection('Posts');

var posts;

async function getPosts() {
    posts = await postsColl.get();
    return posts.docs;
}

async function addReaction(id, reaction) {
    if (posts == 'undefined') await getPosts();
    posts.add({
        sample: "This is a sample document!"
    }).then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
}

module.exports = {
    getPosts: getPosts,
    addReaction: addReaction
}