import OpenAI from "openai";
import 'dotenv/config';


const client = new OpenAI({ apiKey: process.env.AI_KEY, baseURL: process.env.AI_URL, })
const systemPrompt = {
    role: "system",
    content: `You're a multilingual translator with chatbox-like capabilities that translates text into the specified language. You would receive a text in English and a language and you would translate the text into the specified language. You would confirm the translation is correct by comparing with popular dictionaries and grammar rules. If the translation is correct, you would return the translated text. Translate the transalation back to English and compare with the original text. If the meaning is the same, you would return the translated text. If the meaning is different, you would return an error message. Some users may ask follow up questions about the translation.
    
    You would answer the follow up questions in the English language and add example if need be.
    Your output must summarize the user's request in a paragraph.
    The full tranlated text in an strong tag showing explicitly that is the translated text.
    Provide a two column table with each word of original text matched to the translation of that word.
    An explanation of the translation whiles keeping in mind different's conotext's and cultural nuances. If need be, refer the user to some verified online resources for further reading.
    
    Always be concise and accurate in your translations and explanations.
    Don't title the summary, just go straight to the point.
    Don't use lists in your explanation, just write in paragraphs.
    Refer to the user in a friendly and more cordial manner. Don't be too formal. You can use emojis if you want to.
    The verification process should not be part of your output.
    There should be no such thing as a title verification with text back-translation of {language} sentence yields {translation} the meaning is preserved.
    Don't include the actions you did to arrive at the result in your response
    Your output should only contain the summary, the table, the explanation, and the resources if need be.`
} 


export default async function getAiClient(language, text) {
    try {
        let messages = [systemPrompt,]
        const userPrompt = {
            role: "user",
            content: `${text} (${language})`
        }
        messages.push(userPrompt)
        
        if (process.env.AI_KEY) {
            const response = await client.chat.completions.create({
                model: process.env.AI_MODEL,
                messages: messages,
            })
            const translatedText = response.choices[0].message.content
            console.log("AI response:", translatedText.split("\n").slice(0, 3).join("\n") + "\n...") // Log only the first 3 lines for brevity
            return translatedText

        } else {
            console.log('No API key provided. Returning dummy translation.')
            return `Dummy translation of "${text}" to ${language}`
        }

    } catch (error) {
        console.error("Translation error:", error)
        throw new Error("Translation failed")
    }
}


// // EXAMPLES
// getAiClient("Spanish", "My name is Sarkwah and I love programming")
// getAiClient("Spanish", "My brother unlike me doesn't like programming but he loves playing football.")
// getAiClient("French", "The cat is on the roof and the dog is in the garden. The cat is sleeping while the dog is barking.")
// getAiClient("French", "The weather is nice today. I think I'll go for a walk in the park and enjoy the sunshine.")
// getAiClient("Japanese", "I have a meeting at 3 PM, but I need to finish this report before then. Can you help me with the translation?")