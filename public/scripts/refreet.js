/* eslint-disable @typescript-eslint/restrict-template-expressions */

/**
 * Fields is an object mapping the names of the form inputs to the values typed in
 * e.g. for createUser, fields has properites 'username' and 'password'
 */

function viewAllRefreets(fields) {
  fetch('/api/refreets')
    .then(showResponse)
    .catch(showResponse);
}

function viewRefreetsByFreet(fields) {
  fetch(`/api/refreets?freetId=${fields.freetId}`)
    .then(showResponse)
    .catch(showResponse);
}

function viewRefreetsByUser(fields) {
  fetch(`/api/refreets?userId=${fields.userId}`)
    .then(showResponse)
    .catch(showResponse);
}

function createRefreet(fields) {
  fetch('/api/refreets', {method: 'POST', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}})
    .then(showResponse)
    .catch(showResponse);
}

function addRefreet(fields) {
  fetch('/api/refreets/add', {method: 'PUT', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}})
    .then(showResponse)
    .catch(showResponse);
}

function removeRefreet(fields) {
  fetch('/api/refreets/remove', {method: 'PUT', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}})
    .then(showResponse)
    .catch(showResponse);
}

function deleteRefreet(fields) {
  fetch(`/api/refreets/${fields.freetId}`, {method: 'DELETE'})
    .then(showResponse)
    .catch(showResponse);
}
