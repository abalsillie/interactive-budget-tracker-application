// category update
const updateCategoryFormHandler = async (event) => {
    event.preventDefault(); // prevent reload
    const name = document.querySelector("#name-update-category").value.trim(); // value from updated title input
    if (name) {
        const response = await fetch(`/api/categories/${categories_id}`, {
            method: "PUT", // PUT request

            body: JSON.stringify({ name: name }), // don't need to json stringify?
            headers: { "Content-Type": "application/json" },
        });
        //updates the page after receiving update/query
        if (response.ok) {
            document.location.replace("/dashboard"); // load dashboard once submitted
        } else {
            alert(response.message); // error
            
        }
    }
};

// event listener on category submit button
// const updateCategoryForm = document.querySelector('.update-category-form');
// if (updateCategoryForm) {
//    updateCategoryForm.addEventListener('update', updateCategoryFormHandler);
// }


//removeuppercases from url