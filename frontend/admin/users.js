document.addEventListener('DOMContentLoaded', function() {
    fetchUsers();

    document.getElementById('create-user-btn').onclick = function() {
        // Redirect to create user page or open modal (not implemented)
        alert('Create user functionality not implemented yet.');
    };

    function fetchUsers() {
        fetch('http://localhost:3000/api/user/users', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then(res => res.json())
        .then(usersList => renderUsersTable(usersList))
        .catch(() => {
            document.getElementById('users-table-body').innerHTML = '<tr><td colspan="6">Failed to load users.</td></tr>';
        });
    }

    function renderUsersTable(usersList) {
        const tbody = document.getElementById('users-table-body');
        tbody.innerHTML = '';
        usersList.forEach(user => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>#${user.id_user}</td>
                <td>${user.username}</td>
                <td>${user.email}</td>
                <td>${user.role || '-'}</td>
                <td>${user.created_at ? user.created_at.substring(0, 10) : '-'}</td>
                <td>
                    <button class="action-btn edit-btn" onclick="editUser(${user.id_user})">Edit</button>
                    <button class="action-btn delete-btn" onclick="deleteUser(${user.id_user})">Delete</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    }

    window.editUser = function(id) {
        alert('Edit user functionality not implemented yet. User ID: ' + id);
    };

    window.deleteUser = function(id) {
        if (confirm('Are you sure you want to delete this user?')) {
            // Implement delete user API call here
            alert('Delete user functionality not implemented yet. User ID: ' + id);
        }
    };

    document.getElementById('logout-link').addEventListener('click', function(e) {
        e.preventDefault();
        localStorage.removeItem('token');
        window.location.href = 'login.html';
    });
}); 