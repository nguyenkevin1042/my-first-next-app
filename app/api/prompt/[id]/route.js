import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

//1. Get prompt by id
export const GET = async (req, { params }) => {
    try {
        await connectToDB();

        const prompt = await Prompt.findById(params.id).populate('creator')

        if (!prompt) {
            return new Response("Prompt is not existed",
                { status: 404 })
        }

        return new Response(JSON.stringify(prompt),
            { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch prompts",
            { status: 500 })
    }
}

//2. Update prompt
export const PATCH = async (req, { params }) => {
    try {
        const { prompt, tag } = await req.json()

        await connectToDB();

        const existedPrompt = await Prompt.findById(params.id)

        if (!existedPrompt) {
            return new Response("Prompt is not existed",
                { status: 404 })
        }

        existedPrompt.prompt = prompt
        existedPrompt.tag = tag
        await existedPrompt.save()

        return new Response(JSON.stringify(existedPrompt),
            { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch prompts",
            { status: 500 })
    }
}

//3. Delete prompt
export const DELETE = async (req, { params }) => {
    try {
        await connectToDB();

        await Prompt.findByIdAndRemove(params.id)

        return new Response("Delete prompt successful",
            { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch prompts",
            { status: 500 })
    }
}