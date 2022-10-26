/**
 * Fields is an object mapping the names of the form inputs to the values typed in
 */

 function viewAllCircles(fields) {
  fetch('/api/circles')
    .then(showResponse)
    .catch(showResponse);
}

function viewcirclesByOwner(fields) {
  fetch(`/api/circles?owner=${fields.owner}`)
    .then(showResponse)
    .catch(showResponse);
}

function viewcirclesByMember(fields) {
  fetch(`/api/circles?member=${fields.member}`)
    .then(showResponse)
    .catch(showResponse);
}

function createCircle(fields) {
  fetch('/api/circles', {method: 'POST', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}})
    .then(showResponse)
    .catch(showResponse);
}

function addMember(fields) {
  fetch('/api/circles/addMember', {method: 'PUT', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}})
    .then(showResponse)
    .catch(showResponse);
}

function removeMember(fields) {
  fetch('/api/circles/removeMember', {method: 'PUT', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}})
    .then(showResponse)
    .catch(showResponse);
}

function addFreet(fields) {
  fetch('/api/circles/addFreet', {method: 'PUT', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}})
    .then(showResponse)
    .catch(showResponse);
}

function removeFreet(fields) {
  fetch('/api/circles/removeFreet', {method: 'PUT', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}})
    .then(showResponse)
    .catch(showResponse);
}

function deleteCircle(fields) {
  fetch(`/api/circles/${fields.id}`, {method: 'DELETE'})
    .then(showResponse)
    .catch(showResponse);
}