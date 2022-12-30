// firebase admin setup
var fs = require('firebase-admin');

let serviceAccount = process.env.GOOGLE_CREDENTIALS != null ? JSON.parse(process.env.GOOGLE_CREDENTIALS) : require('../string-haven-69370-firebase-adminsdk-jg9sk-9ecead5f49.json');
const app = fs.initializeApp({
  credential: fs.credential.cert(serviceAccount)
});

// Get the database
const db = fs.firestore();
// Get the "Posts" Collection (In SQL Terms, Table)
const postsColl = db.collection('Posts2');

var posts;

async function getPosts() {
    posts = await postsColl.get();
    return posts.docs;
}

async function addReaction(id, reaction) {
    reaction = reaction.toLowerCase();``
    var docRef = postsColl.doc(id + "");

    return docRef.get().then((doc) => {
        if (doc.exists) {
            
            var reactions = doc.get('reactions');
            reactions[reaction] = reactions[reaction] + 1;

            console.log(reactions);

            docRef.update({
                'reactions': reactions
            })
            .then(() => {
                console.log("Document successfully updated!");
                return reactions;
            })
            .catch((error) => {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
            });

        } else {
            console.log("No such document!");
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
}

async function removeReaction(id, reaction) {
    reaction = reaction.toLowerCase();``
    var docRef = postsColl.doc(id + "");

    return docRef.get().then((doc) => {
        if (doc.exists) {
            
            var reactions = doc.get('reactions');
            reactions[reaction] = reactions[reaction] - 1;

            console.log(reactions);

            docRef.update({
                'reactions': reactions
            })
            .then(() => {
                console.log("Document successfully updated!");
                return reactions;
            })
            .catch((error) => {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
            });

        } else {
            console.log("No such document!");
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
}

async function updateReaction(id, oldReact, newReact) {
    newReact = newReact.toLowerCase();
    oldReact = oldReact.toLowerCase();
    var docRef = postsColl.doc(id + "");

    return docRef.get().then((doc) => {
        if (doc.exists) {
            
            var reactions = doc.get('reactions');
            reactions[oldReact] = reactions[oldReact] - 1;
            reactions[newReact] = reactions[newReact] + 1;

            console.log(reactions);

            docRef.update({
                'reactions': reactions
            })
            .then(() => {
                console.log("Document successfully updated!");
                return reactions;
            })
            .catch((error) => {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
            });

        } else {
            console.log("No such document!");
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
}

function getReactions(id) {

    var docRef = postsColl.doc(id + "");

    return docRef.get();
}

function getDocument(id) {
    return postsColl.doc(id + '').get();
}

module.exports = {
    getPosts: getPosts,
    addReaction: addReaction,
    removeReaction: removeReaction,
    updateReaction: updateReaction,
    getReactions: getReactions,
    getDocument: getDocument
}