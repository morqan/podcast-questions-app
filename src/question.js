export class Question {
    static create(question) {
        fetch('https://podcast-frontend-questions-app.firebaseio.com/questions.json',{
            method: 'POST',
            body: JSON.stringify(question),
            headers: {
                'Content-type': 'applications/json'
            }
        }).then(response => response.json())
          .then(response => {
              question.id = response.name
              return question
                console.log(response)
          })
          .then(addToStorage)
            .then(Question.renderList)
    }

    static fetch(token){
        if (!token){
            return Promise.resolve(`<p class="error">You have not token</p>`)
        }
        return  fetch(`https://podcast-frontend-questions-app.firebaseio.com/questions.json?auth=${token}`)
                .then(response => response.json())
                .then( response => {
                    if (response.error){
                        return `<p class="error">${response.error}</p>`
                    }
                    return response ? Object.keys(response).map(key => ({
                        ...response[key],
                        id:key
                    })) : []
                })
    }

    static renderList(){
        const questions = getQuestionsFromStorage()
        const html = questions.length ? questions.map(toCard).join('')
                    : `<div class="mui--text-headline"> You have not a questions...</div>`
        const list = document.getElementById('list')
        list.innerHTML = html
    }
}
function addToStorage(question) {
    const allQuestions = getQuestionsFromStorage()
    allQuestions.push(question)
    localStorage.setItem('questions', JSON.stringify(allQuestions))
}

function getQuestionsFromStorage() {
    return JSON.parse(localStorage.getItem('questions') || '[]')
}

function toCard(question) {
    return `
        <div class="mui--text-black-54">
            ${new Date(question.date).toLocaleDateString()}
            ${new Date(question.date).toLocaleTimeString()}
        </div>
        <div>${question.text} </div>
        <br>
    `
}
