window.addEventListener('DOMContentLoaded', async function() {
    const response = await fetch('/users');
    const users = await response.json();
  
    const userList = document.getElementById('user-list');
    userList.innerHTML = '';
  
    const adminUsers = users.filter(user => user.role === 'admin');
    const normalUsers = users.filter(user => user.role !== 'admin');
  
    adminUsers.forEach(user => {
      addUserToList(user);
    });
  
    normalUsers.forEach(user => {
      addUserToList(user);
    });
  });
  
  document.getElementById('user-form').addEventListener('submit', async function(event) {
    event.preventDefault();
  
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const phone = document.getElementById('phone').value;
  
    // Kullanıcı adının benzersiz olduğunu kontrol et
    const response = await fetch(`/users/check/${name}`);
    const result = await response.json();
    if (!result.available) {
      alert('Username already exists! Please choose a different username.');
      return;
    }
  
    const saveResponse = await fetch('/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, password, phone })
    });
  
    const user = await saveResponse.json();
  
    // Yeni kullanıcı admin ise en üste ekleyelim, değilse normal sıraya ekleyelim
    if (user.role === 'admin') {
      const userList = document.getElementById('user-list');
      const newLi = document.createElement('li');
      newLi.innerHTML = `<span id="name-${user._id}" class="${user.role === 'admin' ? 'admin' : ''}">${user.name}</span>, 
        Email: ${user.email}, Phone: ${user.phone}, Password: <span id="password-${user._id}">******</span>
        <button onclick="showEditBox('${user._id}')">Edit</button>
        <div id="edit-box-${user._id}" class="edit-box" style="margin-top: 10px;">
          <input type="text" id="edit-name-${user._id}" value="${user.name}">
          <input type="email" id="edit-email-${user._id}" value="${user.email}">
          <input type="password" id="edit-password-${user._id}" value="${user.password}">
          <input type="tel" id="edit-phone-${user._id}" value="${user.phone}">
          <button onclick="saveEdit('${user._id}')">Save</button>
          <button onclick="cancelEdit('${user._id}')">Cancel</button>
        </div>
        <button onclick="deleteUser('${user._id}')">Delete</button>`;
      userList.insertBefore(newLi, userList.firstChild);
    } else {
      addUserToList(user);
    }
  
    document.getElementById('user-form').reset();
  });
  
  function addUserToList(user) {
    const userList = document.getElementById('user-list');
    const li = document.createElement('li');
    li.innerHTML = `<span id="name-${user._id}" class="${user.role === 'admin' ? 'admin' : ''}">${user.name}</span>, 
      Email: ${user.email}, Phone: ${user.phone}, Password: <span id="password-${user._id}">******</span>
      <button onclick="showEditBox('${user._id}')">Edit</button>
      <div id="edit-box-${user._id}" class="edit-box" style="margin-top: 10px;">
        <input type="text" id="edit-name-${user._id}" value="${user.name}">
        <input type="email" id="edit-email-${user._id}" value="${user.email}">
        <input type="password" id="edit-password-${user._id}" value="${user.password}">
        <input type="tel" id="edit-phone-${user._id}" value="${user.phone}">
        <button onclick="saveEdit('${user._id}')">Save</button>
        <button onclick="cancelEdit('${user._id}')">Cancel</button>
      </div>
      <button onclick="deleteUser('${user._id}')">Delete</button>`;
    userList.appendChild(li);
  }
  
  function showEditBox(id) {
    const editBox = document.getElementById(`edit-box-${id}`);
    editBox.style.display = 'block';
  }
  
  async function saveEdit(id) {
    const newName = document.getElementById(`edit-name-${id}`).value;
    const newEmail = document.getElementById(`edit-email-${id}`).value;
    const newPassword = document.getElementById(`edit-password-${id}`).value;
    const newPhone = document.getElementById(`edit-phone-${id}`).value;
  
    const response = await fetch(`/users/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: newName, email: newEmail, password: newPassword, phone: newPhone })
    });
  
    const user = await response.json();
    window.location.reload(); // Sayfayı yenile
  }
  
  function cancelEdit(id) {
    const editBox = document.getElementById(`edit-box-${id}`);
    editBox.style.display = 'none';
  }
  
  async function deleteUser(id) {
    const response = await fetch(`/users/${id}`, {
      method: 'DELETE'
    });
  
    const result = await response.json();
    if (result.success) {
      window.location.reload(); // Sayfayı yenile
    } else {
      console.error('Failed to delete user');
    }
  }
  