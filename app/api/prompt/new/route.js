import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

const createNewPromptAPI = async (req) => {
    try {
        const { userId, prompt, tag } = await req.json()
        await connectToDB();

        const newPrompt = new Prompt({
            creator: userId,
            prompt,
            tag
        })

        await newPrompt.save();
        return new Response(newPrompt,
            { status: 200 })
    } catch (error) {
        return new Response("Failed to create a new prompt",
            { status: 500 })
    }
}

export { createNewPromptAPI as POST };

