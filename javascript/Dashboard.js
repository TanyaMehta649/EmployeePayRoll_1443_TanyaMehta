$(document).ready(function () {
    const Dashboard = $("#Dashboard");
    const searchInput = $(".search input");
    const employeeData = JSON.parse(localStorage.getItem("employeeData")) || [];

    function renderTable(data) {
        Dashboard.empty();

        if (data.length > 0) {
            $.each(data, function (index, employee) {
                const row = $("<tr>");

                const profileImageCell = $("<td>");
                if (employee.profileImage) {
                    const profileImage = $("<img>")
                        .attr("src", `../assests/${employee.profileImage}.jpg`)
                        .addClass("profile-image");
                    profileImageCell.append(profileImage);
                } else {
                    profileImageCell.text("No image");
                }
                row.append(profileImageCell);

                const nameCell = $("<td>").text(employee.name);
                row.append(nameCell);

                const genderCell = $("<td>").text(employee.gender);
                row.append(genderCell);

                const departmentCell = $("<td>").text(employee.departments.join(", "));
                row.append(departmentCell);

                const salaryCell = $("<td>").text(`₹ ${employee.salary}`); // Adding ₹ symbol
                row.append(salaryCell);

                const startDateCell = $("<td>").text(`${employee.startDate.day}/${employee.startDate.month}/${employee.startDate.year}`);
                row.append(startDateCell);

                const actionsCell = $("<td>").html(`
                    <button class="edit-btn" data-index="${index}">Edit</button> 
                    <button class="delete-btn" data-index="${index}">Delete</button>
                `);
                row.append(actionsCell);

                Dashboard.append(row);
            });
        } else {
            Dashboard.html("<tr><td colspan='7'>No employee data found.</td></tr>");
        }
    }

    renderTable(employeeData);

    searchInput.on("input", function () {
        const query = searchInput.val().toLowerCase();
        const filteredData = $.grep(employeeData, function (employee) {
            return (
                employee.name.toLowerCase().includes(query) ||
                employee.gender.toLowerCase().includes(query) ||
                employee.departments.some(dept => dept.toLowerCase().includes(query)) ||
                employee.salary.toString().includes(query) || 
                `${employee.startDate.day}/${employee.startDate.month}/${employee.startDate.year}`.includes(query)
            );
        });

        renderTable(filteredData);
    });

    $(document).on("click", ".edit-btn", function () {
        const index = $(this).data("index");
        const employee = employeeData[index];
        localStorage.setItem("editEmployeeIndex", index);
        localStorage.setItem("editEmployeeData", JSON.stringify(employee));

        window.location.href = "Registration.html";
    });

    $(document).on("click", ".delete-btn", function () {
        const index = $(this).data("index");
        if (confirm("Are you sure you want to delete this employee?")) {
            employeeData.splice(index, 1);
            localStorage.setItem("employeeData", JSON.stringify(employeeData));
            renderTable(employeeData);
            alert("Employee deleted successfully!");
        }
    });
});
