import { getSession } from "next-auth/react";

const handler = async(request, response) => {
    const session = await getSession({request});

    if(!session) {
        response.status(401).json({error: 'not authenticated'})
    }

    else {
        response.status(200).json({msg: "success", session})
    }
}

export default handler;