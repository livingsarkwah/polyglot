export function showNotice(message) {
    const notice = document.getElementById("notice")
    notice.textContent = message
    notice.classList.add("visible")

    setTimeout(() => {
        notice.classList.remove("visible")
    }, 3000)
}