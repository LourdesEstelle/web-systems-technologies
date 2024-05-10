document.addEventListener("DOMContentLoaded", function () {
    const registrationForm = document.getElementById("registrationForm");
    const registrationBody = document.getElementById("registrationBody");
    let userId = 1;
    let editMode = false;
    let editRow;

    function validateForm() {
        const firstName = document.getElementById("firstName").value.trim();
        const lastName = document.getElementById("lastName").value.trim();
        const role = document.getElementById("roles").value;

        if (firstName === "") {
            alert("Please enter a first name.");
            return false;
        }

        if (lastName === "") {
            alert("Please enter a last name.");
            return false;
        }

        if (role === "") {
            alert("Please select a role.");
            return false;
        }

        return true;
    }

    function appendValues() {
        const firstName = document.getElementById("firstName").value;
        const lastName = document.getElementById("lastName").value;
        let role = document.getElementById("roles").value;

        if (role === "Admin") {
            role = "Admin";
        } else {
            role = "User";
        }

        const appendNewRow = document.createElement("tr");
        appendNewRow.innerHTML =
            "<td>" +
            userId +
            "</td>" +
            "<td>" +
            firstName +
            "</td>" +
            "<td>" +
            lastName +
            "</td>" +
            "<td>" +
            role +
            "</td>" +
            "<td> <button class='editMe'><i class='bx bx-edit' style='color: blue;'></i></button> <button class='removeMe'><i class='bx bx-trash' style='color: red;'></i></button> </td>";

        registrationBody.appendChild(appendNewRow);
        userId++;
    }

    registrationForm.addEventListener("submit", function (event) {
        event.preventDefault(); 

        if (editMode) {
            editRow.cells[1].textContent = document.getElementById("firstName").value;
            editRow.cells[2].textContent = document.getElementById("lastName").value;
            let role = document.getElementById("roles").value;

            if (role === "Admin") {
                role = "Admin";
            } else {
                role = "User";
            }
            editRow.cells[3].textContent = role;
            editMode = false;
        } else {
            if (validateForm()) { 
                appendValues(); 
                clearForm(); 
            }
        }
    });

    registrationBody.addEventListener("click", function (event) {
        if (event.target.classList.contains("bx-trash")) {
            const currentRow = event.target.closest("tr");
            currentRow.remove();
            if (registrationBody.childElementCount === 0) {
                userId = 1; 
            }
        } else if (event.target.classList.contains("bx-edit")) {
            editMode = true;
            editRow = event.target.closest("tr");
 
            document.getElementById("firstName").value = editRow.cells[1].textContent;
            document.getElementById("lastName").value = editRow.cells[2].textContent;
            let role = editRow.cells[3].textContent;

            document.getElementById("roles").value = role === "Admin" ? "Admin" : "User";
        }
    });

 
    function clearForm() {
        document.getElementById("firstName").value = "";
        document.getElementById("lastName").value = "";
        document.getElementById("roles").value = "Admin"; 
    }
});
