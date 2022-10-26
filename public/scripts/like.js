/* eslint-disable @typescript-eslint/restrict-template-expressions */

/**
 * Fields is an object mapping the names of the form inputs to the values typed in
 * e.g. for createUser, fields has properites 'username' and 'password'
 */

function viewAllLikes(fields) {
  fetch('/api/likes')
    .then(showResponse)
    .catch(showResponse);
}

function viewLikesByFreet(fields) {
  fetch(`/api/likes?freetId=${fields.freetId}`)
    .then(showResponse)
    .catch(showResponse);
}

function viewLikesByUser(fields) {
  fetch(`/api/likes?userId=${fields.userId}`)
    .then(showResponse)
    .catch(showResponse);
}

function createLike(fields) {
  fetch('/api/likes', {method: 'POST', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}})
    .then(showResponse)
    .catch(showResponse);
}

function addLike(fields) {
  fetch('/api/likes/add', {method: 'PUT', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}})
    .then(showResponse)
    .catch(showResponse);
}

function removeLike(fields) {
  fetch('/api/likes/remove', {method: 'PUT', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}})
    .then(showResponse)
    .catch(showResponse);
}

function deleteLike(fields) {
  fetch(`/api/likes/${fields.freetId}`, {method: 'DELETE'})
    .then(showResponse)
    .catch(showResponse);
}
