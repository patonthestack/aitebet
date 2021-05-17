import firebase from './firebase';
const firestore = firebase.firestore();

export function createUser(uid, data) {
  return firestore
    .collection('users')
    .doc(uid)
    .set(
      { uid, createdAt: new Date().toISOString(), ...data },
      { merge: true },
    );
}

export function updateUser(uid, data) {
  return firestore
    .collection('users')
    .doc(uid)
    .set({ uid, ...data }, { merge: true });
}

export function createFriendship(data) {
  const friendship = firestore.collection('friendships').doc();
  friendship.set(data);

  return friendship;
}

export function deleteDocument(id) {
  return firestore
    .collection('documents')
    .doc(id)
    .delete();
}

export async function updateDocument(id, newValues) {
  return firestore
    .collection('documents')
    .doc(id)
    .update(newValues);
}

export async function uploadUserProfilePhoto(file, uid) {
  return await firebase
    .storage()
    .ref(`users/${uid}/avatar/${file.avatar[0].name}`)
    .put(file.avatar[0])
    .then((snapshot) => {
      console.log('uploaded file');
      snapshot.ref.getDownloadURL().then((url) => {
        console.log('Download URL worked, adding to array...');
        console.log('avatar url', url);
        if (url) {
          updateUser(uid, {
            photoUrl: url,
          });
        }
      });
    })
    .catch((error) => {
      console.log(error.message);
    });
}
