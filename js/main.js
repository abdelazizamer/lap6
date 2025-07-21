
var tbody = document.getElementById("tbody");
var fetchUserDataBtn = document.getElementById("btn");
var searchBtn = document.getElementById("searchBtn");
var searchIdInput = document.getElementById("searchId");
const url = "https://jsonplaceholder.typicode.com/users";

function renderTable(users) {
  tbody.innerHTML = "";
  users.forEach(user => {
    var row = document.createElement("tr");

    row.innerHTML = `
      <td>${user.id}</td>
      <td>${user.name}</td>
      <td>${user.username}</td>
      <td>${user.email}</td>
      <td>${user.address.city}</td>
      <td><a href="http://${user.website}" target="_blank">${user.website}</a></td>
      <td>
        <button class="btn btn-info btn-sm me-1" onclick='viewUser(${JSON.stringify(user)})'>View</button>
        <button class="btn btn-danger btn-sm" onclick="this.closest('tr').remove()">Delete</button>
      </td>
    `;

    tbody.appendChild(row);
  });
}

fetchUserDataBtn.addEventListener('click', function(){
  fetch(url)
    .then(res => res.json())
    .then(data => renderTable(data));
});

searchBtn.addEventListener("click", function(){
  const searchId = parseInt(searchIdInput.value);
  if (!searchId) return;
  fetch(url)
    .then(res => res.json())
    .then(data => {
      const user = data.find(u => u.id === searchId);
      if (user) renderTable([user]);
      else tbody.innerHTML = "<tr><td colspan='7'>No user found with that ID</td></tr>";
    });
});

function viewUser(user) {
  localStorage.setItem("user", JSON.stringify(user));
  window.location.href = "card.html";
}
