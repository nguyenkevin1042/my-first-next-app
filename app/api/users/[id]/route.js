import { connectToDB } from "@utils/database";
import User from "@models/prompt";

export const GET = async (req, { params }) => {
    try {
        await connectToDB();

        const user = await User.find({
            id: params.creatorId
        })

        return new Response(user,
            { status: 200 })

    } catch (error) {
        return new Response("Failed to fetch prompts",
            { status: 500 })
    }
}