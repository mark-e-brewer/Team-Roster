import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const getMembersByUid = (uid) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/team.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

const getTeams = () => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/teams.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

const getMembersOfTeam = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/teams/${firebaseKey}.json`, {
    method: 'GET',
    header: {
      'Content-Type': 'application/json',
    },
  })
    .then((respone) => respone.json())
    .then((data) => console.warn(resolve(Object.values(data))))
    .catch(reject);
});

const createMember = (payload) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/team.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const deleteSingleMember = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/team/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getSingleMember = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/team/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data)) // will resolve a single object
    .catch(reject);
});

const updateMember = (payload) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/team/${payload.firebaseKey}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

export {
  getMembersByUid,
  getTeams,
  getMembersOfTeam,
  createMember,
  deleteSingleMember,
  getSingleMember,
  updateMember,
};
