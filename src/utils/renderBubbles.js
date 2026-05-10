export default function renderBubbles(content, bubbleType = "ai") {
    try {
        const bubble = document.createElement('div')
        bubble.classList.add(`${bubbleType}-bubble`, 'chatbubble')
        bubble.innerHTML = content

        document.getElementById('chat-area-inner').append(bubble)
        console.log('Bubbles created')
    } catch (error) {
        console.error(error)
    }
}