// 학생 질문 리스트 조회
async function searchChatList(page, pageSize) {
    await $.ajax({
        url: config.chatServer + `/api/prof/list?page=${page}&pageSize=${pageSize}`,
        type: "GET",
        headers: {
            Authorization: "Bearer " + getCookie("accessToken")
        },

        success: function (res) {
            const listContainer = $(".aside-chat-lists");
            const mobileListContainer = $(".mobile-chat-list");
            const today = new Date(Date.now());

            listContainer.html("");
            mobileListContainer.html("");

            res.chatRoomDaoList.forEach((chat) => {
                let state;
                let isToday = false
                const chatDate = new Date(chat.created_at);

                if (
                    today.getFullYear() === chatDate.getFullYear() &&
                    today.getMonth() === chatDate.getMonth() &&
                    today.getDate() === chatDate.getDate()
                ) {
                    isToday = true;
                }

                let date = `
                    ${chatDate.getHours() > 12 ?
                    `오후 ${String(chatDate.getHours() - 12).padStart(2, "0")}` :
                    `오전 ${String(chatDate.getHours()).padStart(2, "0")}`
                    }:${String(chatDate.getMinutes()).padStart(2, "0")}
                `;

                switch (chat.state) {
                    case "WAITING":
                        state = "읽지 않음";
                        break;
                    case "CONFIRMATION":
                        state = "답변 대기";
                        break;
                    case "COMPLETE":
                        state = null;
                        break;
                }

                listContainer.append(`
                    <li ${isToday ? "class='today'" : "" } data-name ="${chat.name}" data-studentid="${chat.student_id}">
                        <div class="list-inner">
                          <div class="header">
                            <span class="chat-time">${date}</span>
                            ${
                                state === "읽지 않음" ?
                                    `<span class="badge unread">${state}</span>` : ""    
                            }
                            ${
                                state === "답변 대기" ?
                                    `<span class="badge no-reply">${state}</span>` : ""
                            }
                          </div>
                          <div>
                            <h5 class="user">${chat.name}(${chat.student_id})</h5>
                            <p class="content">
                              ${chat.comment}
                            </p>
                          </div>
                        </div>
                      </li>
                `)

                mobileListContainer.append(`
                    <li ${isToday ? "class='today'" : "" } data-name ="${chat.name}" data-studentid="${chat.student_id}">
                        <div class="list-inner">
                            <div class="header">
                                <h5 class="user">${chat.name}(${chat.student_id})</h5>
                                <span class="chat-time">${date}</span>
                                ${
                                    state === "읽지 않음" ? 
                                        `<span class="badge unread">${state}</span>` : ""
                                }
                                ${
                                    state === "답변 대기" ?
                                        `<span class="badge no-reply">${state}</span>` : ""
                                }
                            </div>
                            <div>
                                <p class="content">
                                    ${chat.comment}
                                </p>
                            </div>
                        </div>
                      </li>
                `)
            })
        },
        error: function (err) {
            alert('서버 오류입니다. 잠시 후 다시 시도해주세요.');
        }
    })
}
