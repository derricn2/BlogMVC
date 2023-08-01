// function to handle form submission for creating a new blog post
document.getElementById("createPostForm").addEventListener("submit", (event) => {
  event.preventDefault();

  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;

  // perform AJAX request to create a new blog post example using fetch API
  fetch("/dashboard/create-post", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, content }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('You must be logged in to create a post.');
      }
      return response.json();
    })
    .then((data) => {
      // handle success or error messages and update the UI accordingly
      window.location.href = "/dashboard"; // Redirect to the dashboard after successful post creation
    })
    .catch((error) => {
      // Show the error message on the create-post page
      const errorMessageElement = document.getElementById("error-message");
      errorMessageElement.textContent = error.message;
      errorMessageElement.style.display = "block";
      console.error("Error creating blog post:", error);
    });
});