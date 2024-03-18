// get week by ID
const weeks_id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
];

// update week
const updateWeekFormHandler = async (event) => {
    event.preventDefault(); // prevent reload
    const id = document.querySelector("#id-update-week") // value from updated id input
    const name = document.querySelector("#name-update-week").value.trim(); // value from updated name input
    if (id && name) {
        const response = await fetch(`/api/routesWeeks/${weeks_id}`, {
            method: "PUT", // PUT request
            body: JSON.stringify({ id, name }),
            headers: { "Content-Type": "application/json" },
        });
        if (response.ok) {
            document.location.replace("/dashboard"); // load dashboard once submitted
        } else {
            alert("Error"); // error
        }
    }
};

// delete week
const deleteWeekFormHandler = async (event) => {
    event.preventDefault(); // prevent reload
    const response = await fetch(`/api/routesWeeks/${weeks_id}`, {
        method: "DELETE", // delete
    });
    if (response.ok) {
        document.location.replace("/dashboard"); // load dashboard once deleted
    } else {
        alert("Error"); // error
    }
};

// event listeners on buttons
const updateWeekButton = document.querySelector("#update-week"); // save button
if (updateWeekButton) {
    updateWeekButton.addEventListener("click", updateWeekFormHandler);
}
const deleteWeekButton = document.querySelector("#delete-week"); // delete button
if (deleteWeekButton) {
    deleteWeekButton.addEventListener("click", deleteWeekFormHandler);
}
