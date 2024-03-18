// get spends by ID
const spends_id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];

  // update spend
const updateSpendFormHandler = async (event) => {
    event.preventDefault(); // prevent reload
    const title = document.querySelector("#title-update-spend").value.trim(); // value from updated title input
    const amount = document.querySelector("#title-update-spend").value.trim(); // value from updated amount input
    const categories_id = document.querySelector("#title-update-spend") // value from updated categories_id input
    const weeks_id = document.querySelector("#title-update-spend") // value from updated weeks_id input
    if (title && amount && categories_id && weeks_id) {
        const response = await fetch(`/api/spends/${spends_id}`, {
            method: "PUT", // PUT request
            body: JSON.stringify({ title, amount, categories_id, weeks_id }),
            headers: { "Content-Type": "application/json" },
        });
        if (response.ok) {
            document.location.replace("/dashboard"); // load dashboard once submitted
        } else {
            alert("Error"); // error
        }
    }
};

// delete spend
const deleteSpendFormHandler = async (event) => {
    event.preventDefault(); // prevent reload
    const response = await fetch(`/api/spends/${spends_id}`, {
        method: "DELETE", // delete
    });
    if (response.ok) {
        document.location.replace("/dashboard"); // load dashboard once deleted
    } else {
        alert("Error"); // error
    }
};

// event listeners on buttons
const updateSpendButton = document.querySelector("#update-spend"); // save button
if (updateSpendButton) {
    updateSpendButton.addEventListener("click", updateSpendFormHandler);
}
const deleteSpendButton = document.querySelector("#delete-spend"); // delete button
if (deleteSpendButton) {
    deleteSpendButton.addEventListener("click", deleteSpendFormHandler);
}
