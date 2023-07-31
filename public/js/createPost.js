// function to handle form submission for creating a new blog post
document.getElementById("createPostForm").addEventListener("submit", (event) => {
    event.preventDefault();
  
    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;
  
    // perform AJAX request to create a new blog post
    // example using fetch API
    fetch("/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, content }),
    })
      .then((response) => response.json())
      .then((data) => {
        // handle success or error messages and update the UI accordingly
      })
      .catch((error) => {
        console.error("Error creating blog post:", error);
      });
  });
  