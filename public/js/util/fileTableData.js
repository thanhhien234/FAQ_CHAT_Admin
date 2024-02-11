function renderFileTableData(res){
    /* large screen */
    $("#fileTable tbody").empty();
    res.forEach(function (file, index) {
        const formattedDate = new Date(file.created_at).toLocaleDateString("ko-KR", {
            year: "numeric",
            month: "long",
            day: "numeric",
            weekday: "long"
        });

        $("#fileTable tbody").append(`
            <tr>
                <td>
                    <input type="checkbox" onclick="handleCheckbox(this, '${file.name}')" id="${file.id}">
                    <label for="${file.id}"></label>
                </td>
                <td>${index + 1 + pageSize * currentPage}</td>
                <td>
                    <span class="category-name" style="background-color: ${categoryColorMap[file.category]}">${file.category}</span>
                </td>
                <td>${file.name}</td>
                <td>${formattedDate}</td>
            </tr>
        `);
    });


    /* mobile screen */
    $("#mobile-fileTable tbody").empty();
    res.forEach(function (file, index) {
        const formattedDate = new Date(file.created_at).toLocaleDateString("ko-KR", {
            year: "numeric",
            month: "long",
            day: "numeric",
            weekday: "long"
        });
        $("#mobile-fileTable tbody").append(`
            <tr>
                <td>
                    <input type="checkbox" onclick="handleCheckbox(this, '${file.name}')" id="${file.id}">
                    <label for="${file.id}"></label>
                </td>
                <td>${index + 1 + pageSize * currentPage}</td>
                <td>
                    <div class="file-info">
                        <div>
                            <span class="category-name" style="background-color: ${categoryColorMap[file.category]}">${file.category}</span>
                        </div>
                        <div>${file.name}</div>
                        <div>${formattedDate}</div>
                    </div>
                </td>
            </tr>
        `);
    });

    let emptyRow = pageSize - res.length;
    for (let i = 0; i < emptyRow; i++) {
        $("#fileTable tbody").append(`<tr><td></td><td></td><td></td><td></td><td></td></tr>`);
        $("#mobile-fileTable tbody").append(`<tr><td></td><td></td><td></td><td></td></tr>`);
    }
}
