import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js"
// import DOMPurify from 'dompurify'
import renderBubbles from "./utils/renderBubbles.js"
import { showNotice } from "./utils/showNotice.js"

const form = document.getElementById("input-form")
const inputEl = document.getElementById("input-text")
const submitBtn = document.getElementById("submit-btn")
const langOptions = document.querySelectorAll(".lang-option")

let selectedLanguage = null
langOptions.forEach(option => {
    option.addEventListener("click", () => {
        langOptions.forEach(i => i.classList.remove("active"))
        option.classList.add("active")
        console.log(option.className)
        selectedLanguage = option.dataset.lang
        submitBtn.classList.remove("disabled")
        console.log(selectedLanguage)
    })
})

form.addEventListener("submit", async (e) => {
    e.preventDefault() 
     if (!selectedLanguage) {
        showNotice("Please select a language from the ones above.")
        return
    }
    
    const text = inputEl.value.trim()
    const language = selectedLanguage

    inputEl.value = ""
    await main(text, language)
})



async function main(text, language) {
    try {
        const userMsg  = `<p>${text}</p>`
        renderBubbles(userMsg, "user")
        const res = await fetch("http://localhost:3000/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                text: text,
                language: language
            })
        })
        if (!res.ok) {
        const err = await res.json();
        console.error("Server error:", err);
        return;
        }

        const { reply } = await res.json()

        if (!reply ) {
        console.error("Invalid response:", reply);
        return;
        }
        

        renderBubbles(marked.parse(reply))
    } catch (error) {
        console.error(error)
    }
}