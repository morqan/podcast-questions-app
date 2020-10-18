import {isValid, createModal} from "./utils";
import {Question} from "./question";
import {authWithEmailPassword, getAuthForm} from './auth'
import './styles.css'

const modalBtn = document.getElementById('modalBtn')
const form = document.getElementById('form')
const input = form.querySelector('#question-input')
const submitBtn = form.querySelector('#submit')


window.addEventListener('load',Question.renderList)
form.addEventListener('submit',submitFormHandler)
input.addEventListener('input',()=>{
    submitBtn.disabled = !isValid(input.value)
})
modalBtn.addEventListener('click', openModal)

function submitFormHandler(event) {
    event.preventDefault()
    console.log(isValid(input.value))
    if (isValid(input.value)){
        const question = {
            text: input.value.trim(),
            date: new Date().toJSON()
        }
        submitBtn.disabled = true
        //async request to server
        Question.create(question)
        console.log('question:',question)
        input.value = ''
        input.className = ''
        submitBtn.disabled = false
    }

}

function openModal() {
    createModal('Authorization',getAuthForm())
    document.getElementById('auth-form')
            .addEventListener('submit', authFormHandler, {once:true})
}

function authFormHandler(event) {
    event.preventDefault()
    const modalBtn = event.target.querySelector('button')
    const email = event.target.querySelector('#email').value
    const password = event.target.querySelector('#password').value
    console.log(email,password)
    modalBtn.disabled = true
    authWithEmailPassword(email,password)
        .then(Question.fetch)
        .then(renderModalAfterAuth)
        .then(() => modalBtn.disabled = false )
}

function renderModalAfterAuth(content) {
    if (typeof content === 'string'){
        createModal('Error', content)
    } else {
        createModal('List of questions:', Question.listToHtml(content))
    }
}
