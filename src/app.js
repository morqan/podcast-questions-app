import {isValid, createModal} from "./utils";
import {Question} from "./question";
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
    createModal('Authorization',`<h1>test modal</h1>`)
}
