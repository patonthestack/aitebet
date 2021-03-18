import firebase from './firebase';
const firestore = firebase.firestore();

export function createUser(uid, data) {
  return firestore
    .collection('users')
    .doc(uid)
    .set({ uid, ...data }, { merge: true });
}

export function updateUser(uid, data) {
  return firestore
    .collection('users')
    .doc(uid)
    .set({ uid, ...data }, { merge: true });
}

export function createUserRole(uid, data) {
  return firestore
    .collection('roles')
    .doc(uid)
    .set({ uid, ...data }, { merge: true });
}

export function updateOrg(organizationId, uid, data) {
  return firestore
    .collection('organizations')
    .doc(organizationId)
    .update({ organizationId, ...data }, { merge: true });
}

export function deleteOrganizationTeamMember(id, status) {
  return firestore
    .collection('users')
    .doc(id)
    .update({ _isActive: status });
}

export function deleteExhibitorTeamMember(id, status) {
  return firestore
    .collection('users')
    .doc(id)
    .update({ _isActive: status });
}

export function createExhibitor(data) {
  const exhibitor = firestore.collection('exhibitors').doc();
  exhibitor.set(data);

  return exhibitor;
}

export function updateExhibitor(exhibitorId, data) {
  return firestore
    .collection('exhibitors')
    .doc(exhibitorId)
    .update({ exhibitorId, ...data }, { merge: true });
}

export function deleteExhibitor(id) {
  return firestore
    .collection('exhibitors')
    .doc(id)
    .delete();
}

export function createCompany(data) {
  const company = firestore.collection('organizations').doc();
  company.set(data);

  return company;
}

export function updateCompany(uid, data) {
  return firestore
    .collection('organizations')
    .doc(uid)
    .update(data);
}

export function createEducation(data) {
  const education = firestore.collection('educations').doc();
  education.set(data);

  return education;
}

export function updateEducation(id, data) {
  return firestore
    .collection('educations')
    .doc(id)
    .update(data);
}

export function deleteEducation(id) {
  return firestore
    .collection('educations')
    .doc(id)
    .delete();
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

export function createWorkExperience(data) {
  const workExperience = firestore.collection('careers').doc();
  workExperience.set(data);

  return workExperience;
}

export function applyToJob(data) {
  const jobApplicant = firestore.collection('applicants').doc();
  jobApplicant.set(data);

  return jobApplicant;
}

export function updateWorkExperience(id, data) {
  return firestore
    .collection('careers')
    .doc(id)
    .update(data);
}

export function deleteWorkExperience(id) {
  return firestore
    .collection('careers')
    .doc(id)
    .delete();
}

export function createJob(data) {
  const job = firestore.collection('jobs').doc();
  job.set(data);

  return job;
}

export function deleteJob(id) {
  return firestore
    .collection('jobs')
    .doc(id)
    .delete();
}

export function createEvent(data) {
  const event = firestore.collection('events').doc();
  event.set(data);

  return event;
}

export function updateEvent(id, data) {
  return firestore
    .collection('events')
    .doc(id)
    .update(data);
}

export function deleteEvent(id) {
  return firestore
    .collection('events')
    .doc(id)
    .delete();
}

export function createBooth(data) {
  const booth = firestore.collection('booths').doc();
  booth.set(data);

  return booth;
}

export function updateBooth(id, data) {
  return firestore
    .collection('booths')
    .doc(id)
    .update(data);
}

export function deleteBooth(id) {
  return firestore
    .collection('booths')
    .doc(id)
    .delete();
}

export function deleteBoothDocument(boothId, document) {
  return firestore
    .collection('booths')
    .doc(boothId)
    .update({ documents: firebase.firestore.FieldValue.arrayRemove(document) })
    .then(() => {
      console.log(document + '  is deleted');
    })
    .catch((error) => {
      console.error('Error removing document: ', error);
    });
}

export async function updateJob(id, newValues) {
  return firestore
    .collection('jobs')
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

export async function uploadUserOrganizationLogo(file, uid, organizationId) {
  return await firebase
    .storage()
    .ref(
      `organizations/user/${uid}/org/${organizationId}/logo/${file.logo[0].name}`,
    )
    .put(file.logo[0])
    .then((snapshot) => {
      console.log('uploaded logo file');
      snapshot.ref.getDownloadURL().then((url) => {
        console.log('Download URL worked, adding to array...');
        console.log('org logo url', url);
        if (url) {
          updateOrg(organizationId, uid, {
            logo: url,
          });
        }
      });
    })
    .catch((error) => {
      console.log(error.message);
    });
}

export async function uploadUserExhibitorLogo(file, uid, exhibitorId) {
  return await firebase
    .storage()
    .ref(
      `exhibitors/user/${uid}/exhibitor/${exhibitorId}/logo/${file.logo[0].name}`,
    )
    .put(file.logo[0])
    .then((snapshot) => {
      console.log('uploaded exhibitor logo file');
      snapshot.ref.getDownloadURL().then((url) => {
        console.log('Download URL worked, adding to array...');
        console.log('exhibitor logo url', url);
        if (url) {
          updateExhibitor(exhibitorId, {
            logo: url,
            userId: uid,
          });
        }
      });
    })
    .catch((error) => {
      console.log(error.message);
    });
}

export async function uploadUserSingleDocument(formData) {
  return await firebase
    .storage()
    .ref(`users/${formData.userId}/documents/${formData.document[0].name}`)
    .put(formData.document[0])
    .then((snapshot) => {
      console.log('uploaded document');
      snapshot.ref.getDownloadURL().then((url) => {
        console.log('Download URL worked, adding to array...');
        console.log('document url', url);
        if (url) {
          /// upload here
          let data = {
            title: formData.title,
            documentPath: url,
            userId: formData.userId,
            modifiedAt: new Date().toISOString(),
          };
          const document = firestore.collection('documents').doc();
          document.set(data);
        }
      });
    })
    .catch((error) => {
      console.log(error.message);
    });
}

export async function uploadBoothSingleDocument(document, userId, boothId) {
  const documentDb = firestore.collection('booths').doc(boothId);
  const documentsArr = [];
  return await Array.from(document).map((file: any) =>
    firebase
      .storage()
      .ref(`booths/${boothId}/documents/${file.name}`)
      .put(file)
      .then((snapshot) => {
        console.log('uploaded document');
        snapshot.ref.getDownloadURL().then((url) => {
          console.log('Download URL worked, adding to array...');
          console.log('document url', url);

          if (url) {
            // Upload to Firestore
            documentsArr.push(url);
            documentDb.update({ documents: documentsArr });
          }
        });
      })
      .catch((error) => {
        console.log(error.message);
      }),
  );
}
