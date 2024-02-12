async function addCategory(category) {
  await $.ajax({
    url: config.fileServer + "/api/auth/category?category=" + category,
    type: "POST",
    headers: {
      Authorization: "Bearer " + getCookie("accessToken")
    },
    succcess: function (res) {
      categoryAllSearch()
      console.log("Post category success");
    }
  })
}