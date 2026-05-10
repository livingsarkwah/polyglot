export default function renderBubbles(content, bubbleType = "ai") {
    try {
        const bubble = document.createElement('div')
        bubble.classList.add(`${bubbleType}-bubble`, 'chatbubble')
        bubble.innerHTML = content

        document.getElementById('chat-area-inner').append(bubble)
    } catch (error) {
        console.error(error)
    }
}