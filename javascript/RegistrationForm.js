document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const nameInput = document.querySelector("input[type='text']");
    const genderInputs = document.querySelectorAll("input[name='gender']");
    const departmentInputs = document.querySelectorAll("input[type='checkbox']");
    const salarySelect = document.querySelector("select");
    const startDateSelect = {
        day: document.querySelector(".startDate select"),
        month: document.querySelector(".startMonth select"),
        year: document.querySelector(".startYear select"),
    };
    const notesTextarea = document.querySelector("textarea");

    const resetButton = document.querySelector(".regResetButton button");
    const submitButton = document.querySelector(".regSubmitButton button");

    let editIndex = localStorage.getItem("editEmployeeIndex");
    let editEmployeeData = localStorage.getItem("editEmployeeData");

    if (editEmployeeData) {
        editEmployeeData = JSON.parse(editEmployeeData);

        nameInput.value = editEmployeeData.name;
        salarySelect.value = editEmployeeData.salary;
        notesTextarea.value = editEmployeeData.notes || "";

        genderInputs.forEach(input => {
            if (input.value === editEmployeeData.gender) {
                input.checked = true;
            }
        });

        departmentInputs.forEach(input => {
            if (editEmployeeData.departments.includes(input.nextSibling.textContent.trim())) {
                input.checked = true;
            }
        });

        const profileImageInput = document.querySelector(`input[name="profileImage"][value="${editEmployeeData.profileImage}"]`);
        if (profileImageInput) {
            profileImageInput.checked = true;
        }

        startDateSelect.day.value = editEmployeeData.startDate.day;
        startDateSelect.month.value = editEmployeeData.startDate.month;
        startDateSelect.year.value = editEmployeeData.startDate.year;
    }

    function validateForm() {
        let valid = true;

        if (nameInput.value.trim() === "") {
            alert("Name is required.");
            valid = false;
        }

        if (![...genderInputs].some(input => input.checked)) {
            alert("Gender selection is required.");
            valid = false;
        }

        if (![...departmentInputs].some(input => input.checked)) {
            alert("At least one department must be selected.");
            valid = false;
        }
        

        if (salarySelect.value === "Select Salary") {
            alert("Salary selection is required.");
            valid = false;
        }

        if (!startDateSelect.day.value || !startDateSelect.month.value || !startDateSelect.year.value) {
            alert("Start Date is incomplete.");
            valid = false;
        }

        return valid;
    }

    if (resetButton) {
        resetButton.addEventListener("click", function () {
            form.reset();
        });
    }
    if (submitButton) {
        submitButton.addEventListener("click", function (event) {
            event.preventDefault();

            if (validateForm()) {
                
                const formData = {
                    name: nameInput.value,
                    profileImage: document.querySelector("input[name='profileImage']:checked")?.value,
                    gender: document.querySelector("input[name='gender']:checked")?.value,
                    departments: [...departmentInputs].filter(input => input.checked).map(input => input.nextSibling.textContent.trim()),
                    salary: salarySelect.value,
                    startDate: {
                        day: startDateSelect.day.value,
                        month: startDateSelect.month.value,
                        year: startDateSelect.year.value,
                    },
                    notes: notesTextarea.value
                };

                let existingData = localStorage.getItem("employeeData");
                existingData = existingData ? JSON.parse(existingData) : [];

                if (!Array.isArray(existingData)) {
                    existingData = [];
                }

                if (editIndex !== null) {
                    existingData[editIndex] = formData;
                } else {
                    existingData.push(formData);
                }
                localStorage.setItem("employeeData", JSON.stringify(existingData));

                localStorage.removeItem("editEmployeeIndex");
                localStorage.removeItem("editEmployeeData");

                alert("Employee data saved successfully!");
                window.location.href = "Dashboard.html";
            } else {
                alert("Please fill all the fields correctly before submitting.");
            }
        });
    }
});








