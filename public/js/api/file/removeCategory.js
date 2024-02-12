async function removeCategory(category) {
  await $.ajax({
    url: config.fileServer + "/api/auth/category?category=" + category,
    type: "DELETE",
    headers: {
      Authorization: "Bearer " + getCookie("accessToken")
    },
    success: function (res) {
      categoryAllSearch()
      console.log("delete category success");
    }
  })
}