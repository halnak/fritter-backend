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

function createCircle(fields) {
  fetch('/api/circles', {method: 'POST', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}})
    .then(showResponse)
    .catch(showResponse);
}

// function editCircle(fields) {
//   fetch('/api/circles', {method: 'PUT', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}})
//     .then(showResponse)
//     .catch(showResponse);
// }

function deleteCircle(fields) {
  fetch(`/api/circles/${fields.id}`, {method: 'DELETE'})
    .then(showResponse)
    .catch(showResponse);
}