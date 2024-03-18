// get goals by ID
const goals_id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];

  // update goal
const updateGoalFormHandler = async (event) => {
    event.preventDefault(); // prevent reload
    const name = document.querySelector("#name-update-goal").value.trim(); // value from updated name input
    const category_id = document.querySelector("#spend-category"); // value from updated category_id input
    if (name && category_id) {
        const response = await fetch(`/api/goals/${goals_id}`, {
            method: "PUT", // PUT request
            body: JSON.stringify({ name, category_id }),
            headers: { "Content-Type": "application/json" },
        });
        if (response.ok) {
            document.location.replace("/dashboard"); // load dashboard once submitted
        } else {
            alert("Error"); // error
        }
    }
};

// delete goal
const deleteGoalFormHandler = async (event) => {
    event.preventDefault(); // prevent reload
    const response = await fetch(`/api/goals/${goals_id}`, {
        method: "DELETE", // delete
    });
    if (response.ok) {
        document.location.replace("/dashboard"); // load dashboard once deleted
    } else {
        alert("Error"); // error
    }
};

// event listeners on buttons
const updateGoalButton = document.querySelector("#update-goal"); // save button
if (updateGoalButton) {
    updateGoalButton.addEventListener("click", updateGoalFormHandler);
}
const deleteGoalButton = document.querySelector("#delete-goal"); // delete button
if (deleteGoalButton) {
    deleteGoalButton.addEventListener("click", deleteGoalFormHandler);
}
