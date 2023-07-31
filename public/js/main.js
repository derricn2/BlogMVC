// function to display a confirmation dialog before deleting a post
const deletePost = (postId) => {
    const confirmDelete = confirm("Are you sure you want to delete this post?");
    if (confirmDelete) {
      // perform AJAX request to delete the post
      // example using fetch API
      fetch(`/api/posts/${postId}`, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then((data) => {
          // handle success or error messages and update the UI accordingly
        })
        .catch((error) => {
          console.error("Error deleting post:", error);
        });
    }
  };
  