class Chat{
    constructor(){
        this.chatList = [];
        this.chatContent = [];
    }
    async renderChatList(page, pageSize) {
        await $.ajax({
            url: config.chatServer + `/api/prof/list?page=${page}&pageSize=${pageSize}`,
            type: "GET",
            headers: {
                Authorization: "Bearer " + getCookie("accessToken")
            },
    
            success: function (res) {
                this.chatList = res.chatRoomDaoList;
                const listContainer = $(".aside-chat-lists");
                const mobileListContainer = $(".mobile-chat-list");
                const today = new Date(Date.now());
    
                listContainer.html("");
                mobileListContainer.html("");
    
                this.chatList.forEach((chat) => {
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
                        <li ${isToday ? "class='today'" : "" } data-studentid="${chat.student_id}">
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
                                <div class="user-wrapper">
                                    <img src="/public/assets/icon/polygon_white.png" alt="">
                                    <h5 class="user">${chat.student_id}</h5>
                                </div>
                                <p class="content">
                                  ${chat.comment}
                                </p>
                              </div>
                            </div>
                          </li>
                    `)
    
                    mobileListContainer.append(`
                        <li ${isToday ? "class='today'" : "" } data-studentid="${chat.student_id}">
                            <div class="list-inner">
                                <div class="header">
                                    <img src="/public/assets/icon/polygon_black.png" alt="">
                                    <h5 class="user">${chat.student_id}</h5>
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
    async renderChatContent(studentId) {
        await $.ajax({
            url: config.chatServer + `/api/prof?studentId=${studentId}`,
            type: 'GET',
            headers: {
                Authorization: "Bearer " + getCookie("accessToken")
            },
            success: function (res) {
                this.chatContent = res.profStdGetElementResList;
                const container = $('.instructor-wrapper');
                container.empty()
                let lastDate = null;
                let latestQuestionTime = null;
                let latestAnswerTime = null;
    
                this.chatContent.forEach((element, index, array) => {
                    const formattedDate = new Date(element.time).toLocaleDateString("ko-KR", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        weekday: "long"
                    });
    
                    const hours = new Date(element.time).getHours();
                    const minutes = new Date(element.time).getMinutes();
                    const period = hours >= 12 ? "오후" : "오전";
                    const formattedTime = period + " " + (hours % 12 || 12) + ":" + (minutes < 10 ? "0" : "") + minutes;
    
                    // If the current date is different from the last date, show only the last date once
                    if (formattedDate !== lastDate) {
                        const dateElement = $('<div>').addClass('date').text(formattedDate);
                        container.append(dateElement);
                        lastDate = formattedDate;
                        latestQuestionTime = null;
                        latestAnswerTime = null;
                    }
    
                    if (element.isQuestion) {
                        const questionContainer = $('<div>').addClass('question-wrapper');
                        const questionElement = $('<div>').addClass('question').text(element.comment);
                        container.append(questionContainer.append(questionElement));
    
                        // if the next element is an answer, add question-time-wrapper
                        const nextElement = array[index + 1];
                        if (nextElement && !nextElement.isQuestion) {
                            const questionTimeContainer = $('<div>').addClass('question-time-wrapper');
                            const questionTimeElement = $('<div>').addClass('time').text(formattedTime);
                            container.append(questionTimeContainer.append(questionTimeElement));
                        }
                        latestQuestionTime = formattedTime; 
                    } else {
                        const answerContainer = $('<div>').addClass('answer-wrapper');
                        const answerElement = $('<div>').addClass('answer').text(element.comment);
                        container.append(answerContainer.append(answerElement));
    
                        // if the next element is a question, add answer-time-wrapper
                        const nextElement = array[index + 1];
                        if (nextElement && nextElement.isQuestion) {
                            const answerTimeContainer = $('<div>').addClass('answer-time-wrapper');
                            const answerTimeElement = $('<div>').addClass('time').text(formattedTime);
                            container.append(answerTimeContainer.append(answerTimeElement));
                        }
                        latestAnswerTime = formattedTime;
                    }
                });
    
                // Always show time for last element
                if (res.profStdGetElementResList.length > 0 && res.profStdGetElementResList[res.profStdGetElementResList.length - 1].isQuestion) {
                    const lastQuestionTimeContainer = $('<div>').addClass('question-time-wrapper');
                    const lastQuestionTimeElement = $('<div>').addClass('time').text(latestQuestionTime);
                    container.append(lastQuestionTimeContainer.append(lastQuestionTimeElement));
                }
                if (res.profStdGetElementResList.length > 0 && !res.profStdGetElementResList[res.profStdGetElementResList.length - 1].isQuestion) {
                    const lastAnswerTimeContainer = $('<div>').addClass('answer-time-wrapper');
                    const lastAnswerTimeElement = $('<div>').addClass('time').text(latestAnswerTime);
                    container.append(lastAnswerTimeContainer.append(lastAnswerTimeElement));
                }
                container.scrollTop(container[0].scrollHeight); //scroll to bottom
            },
            error: function (err) {
                alert('서버 오류입니다. 잠시 후 다시 시도해주세요.');
            }
        });
    }

    sendMessage(studentId) {
        var message = $("#messageInput").val();
    
        if (message.trim() !== "") {
            $("#messageInput").prop("disabled", true);
            $("#submit").prop("disabled", true);
            $.ajax({
                url: config.chatServer + "/api/prof",
                type: "POST",
                contentType: 'application/json; charset=utf-8',
                headers: {
                    Authorization: "Bearer " + getCookie("accessToken")
                },
                data: JSON.stringify({
                    "studentId": studentId,
                    "comment": message
                }),
        
                success: (res) => {
                    this.renderChatContent(studentId);
                },
                error: function (err) {
                    alert('서버 오류입니다. 잠시 후 다시 시도해주세요.');
                },
                complete: function() {
                    $("#messageInput").prop("disabled", false);
                    $("#messageInput").focus();
                    $("#submit").prop("disabled", false);
                }
            })
        }
    }
}
