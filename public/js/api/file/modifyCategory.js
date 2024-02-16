async function modifyCategory(old_category, new_category) {
  await $.ajax({
    url: config.fileServer + "/api/auth/category?oldCategory=" + old_category + "&newCategory=" + new_category,
    type: "PATCH",
    headers: {
      Authorization: "Bearer " + getCookie("accessToken")
    },
    success: function (res) {
      categoryAllSearch()
    }
  })
}