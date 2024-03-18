// get category by ID
const categories_id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
];

// update category
const updateCategoryFormHandler = async (event) => {
    event.preventDefault(); // prevent reload
    const name = document.querySelector("#name-update-category").value.trim(); // value from updated name input
    if (name) {
        const response = await fetch(`/api/routesCategories/${categories_id}`, {
            method: "PUT", // PUT request
            body: JSON.stringify({ name }), // don't need to json stringify?
            headers: { "Content-Type": "application/json" },
        });
        if (response.ok) {
            document.location.replace("/dashboard"); // load dashboard once submitted
        } else {
            alert("Error"); // error
        }
    }
};

// delete category
const deleteCategoryFormHandler = async (event) => {
    event.preventDefault(); // prevent reload
    const response = await fetch(`/api/routesCategories/${categories_id}`, {
        method: "DELETE", // delete
    });
    if (response.ok) {
        document.location.replace("/dashboard"); // load dashboard once deleted
    } else {
        alert("Error"); // error
    }
};

// event listeners on buttons
const updateCategorytButton = document.querySelector("#update-category"); // save button
if (updateCategorytButton) {
    updateCategorytButton.addEventListener("click", updateCategoryFormHandler);
}
const deleteCategorytButton = document.querySelector("#delete-category"); // delete button
if (deleteCategorytButton) {
    deleteCategorytButton.addEventListener("click", deleteCategoryFormHandler);
}
