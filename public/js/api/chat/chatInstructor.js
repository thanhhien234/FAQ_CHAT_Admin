async function searchChat(studentId) {
    const response = await $.ajax({
        url: config.chatServer + `/api/prof?studentId=${studentId}`,
        type: 'GET',
        headers: {
            Authorization: "Bearer " + getCookie("accessToken")
        },
        success: function (res) {
            const container = $('.instructor-message-container');
            let lastDate = null;
            let latestQuestionTime = null;
            let latestAnswerTime = null;

            res.profStdGetElementResList.forEach((element, index, array) => {
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
                    const questionContainer = $('<div>').addClass('question-container');
                    const questionElement = $('<div>').addClass('question').text(element.comment);
                    container.append(questionContainer.append(questionElement));

                    // if the next element is an answer, add question-time-container
                    const nextElement = array[index + 1];
                    if (nextElement && !nextElement.isQuestion) {
                        const questionTimeContainer = $('<div>').addClass('question-time-container');
                        const questionTimeElement = $('<div>').addClass('time').text(formattedTime);
                        container.append(questionTimeContainer.append(questionTimeElement));
                    }
                    latestQuestionTime = formattedTime; 
                } else {
                    const answerContainer = $('<div>').addClass('answer-container');
                    const answerElement = $('<div>').addClass('answer').text(element.comment);
                    container.append(answerContainer.append(answerElement));

                    // if the next element is a question, add answer-time-container
                    const nextElement = array[index + 1];
                    if (nextElement && nextElement.isQuestion) {
                        const answerTimeContainer = $('<div>').addClass('answer-time-container');
                        const answerTimeElement = $('<div>').addClass('time').text(formattedTime);
                        container.append(answerTimeContainer.append(answerTimeElement));
                    }
                    latestAnswerTime = formattedTime;
                }
            });

            // Always show time for last element
            if (res.profStdGetElementResList.length > 0 && res.profStdGetElementResList[res.profStdGetElementResList.length - 1].isQuestion) {
                const lastQuestionTimeContainer = $('<div>').addClass('question-time-container');
                const lastQuestionTimeElement = $('<div>').addClass('time').text(latestQuestionTime);
                container.append(lastQuestionTimeContainer.append(lastQuestionTimeElement));
            }
            if (res.profStdGetElementResList.length > 0 && !res.profStdGetElementResList[res.profStdGetElementResList.length - 1].isQuestion) {
                const lastAnswerTimeContainer = $('<div>').addClass('answer-time-container');
                const lastAnswerTimeElement = $('<div>').addClass('time').text(latestAnswerTime);
                container.append(lastAnswerTimeContainer.append(lastAnswerTimeElement));
            }
        },
        error: function (err) {
            console.error(err);
        }
    });
}


