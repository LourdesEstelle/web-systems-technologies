document.addEventListener("DOMContentLoaded", function() {
    const registrationForm = document.getElementById("registrationForm");
    const registrationBody = document.getElementById("registrationBody");
    let userId = 1; // Initialize the user ID counter

    registrationForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const firstName = document.getElementById('firstName');
        const lastName = document.getElementById('lastName');
        const role = document.getElementById('roles').value; 

        if(firstName.value === ""){
            alert("Please add first name");
            return;
        }

        if(lastName.value === ""){
            alert("Please add last name");
            return;
        }
        
        if (userId === 1) {
            // If user ID is 1, meaning it's a new entry, then register
            register(userId, firstName.value, lastName.value, role);
            clearForm();
        } else {
            // If user ID is not 1, meaning it's an edit, then update
            const id = userId; // Store the current userId for editing
            update(id, firstName.value, lastName.value, role);
            clearForm();
        }
    });

    registrationBody.addEventListener('click', function(event) {
        if (event.target.classList.contains('removeMe')) {
            const currentRow = event.target.closest('tr');
            const currentUserId = parseInt(currentRow.querySelector('td:first-child').textContent);
            currentRow.remove();
            if (currentUserId === userId) {
                userId--;
            }
            if (registrationBody.childElementCount === 0) {
                // If there are no more records, reset userId to 1
                userId = 1;
            }
        } else if(event.target.classList.contains('editMe')){
            const currentRow = event.target.closest('tr');
            userId = parseInt(currentRow.querySelector('td:first-child').textContent); // Set userId to the ID of the current row
            document.getElementById('firstName').value = currentRow.querySelector('td:nth-child(2)').textContent;
            document.getElementById('lastName').value = currentRow.querySelector('td:nth-child(3)').textContent;
            document.getElementById('roles').value = currentRow.querySelector('td:nth-child(4)').textContent; 
        }
    });

    function register(id, firstName, lastName, role){
        const appendNewRow = document.createElement('tr');
        appendNewRow.innerHTML = '<td>'+ id +'</td>' +
            '<td>'+ firstName +'</td>' +
            '<td>'+ lastName +'</td>'+
            '<td>'+ role +'</td>'+
            '<td> <button class="removeMe">Delete</button><button class="editMe">Edit</button> '+
            '</td>';

        registrationBody.appendChild(appendNewRow);
        userId++; // Increment userId for next entry
    }

    function update(id, firstName, lastName, role) {
        const currentRow = document.querySelector(`#registrationBody tr td:first-child:nth-of-type(${id})`).closest('tr');
        currentRow.querySelector('td:nth-child(2)').textContent = firstName;
        currentRow.querySelector('td:nth-child(3)').textContent = lastName;
        currentRow.querySelector('td:nth-child(4)').textContent = role;
    }

    function clearForm() {
        document.getElementById('firstName').value = '';
        document.getElementById('lastName').value = '';
        document.getElementById('roles').value = 'Admin'; // Reset role to default value
    }
});
