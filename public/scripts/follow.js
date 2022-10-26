/* eslint-disable @typescript-eslint/restrict-template-expressions */

/**
 * Fields is an object mapping the names of the form inputs to the values typed in
 * e.g. for createUser, fields has properites 'username' and 'password'
 */

function viewAllFollows(fields) {
  fetch('/api/follows')
    .then(showResponse)
    .catch(showResponse);
}

function viewFollowsByUser(fields) {
  fetch(`/api/follows?userId=${fields.user}`)
    .then(showResponse)
    .catch(showResponse);
}

function createFollow(fields) {
  fetch('/api/follows', {method: 'POST', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}})
    .then(showResponse)
    .catch(showResponse);
}

function addFollower(fields) {
  fetch('/api/follows', {method: 'PUT', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}})
    .then(showResponse)
    .catch(showResponse);
}

function removeFollower(fields) {
  fetch('/api/follows', {method: 'PUT', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}})
    .then(showResponse)
    .catch(showResponse);
}

function deleteFollow(fields) {
  fetch(`/api/follows/userId=${fields.userId}`, {method: 'DELETE'})
    .then(showResponse)
    .catch(showResponse);
}
