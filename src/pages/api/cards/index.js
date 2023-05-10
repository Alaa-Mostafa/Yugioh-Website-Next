import { cards } from "../../../../data/cards";
import { v4 as uuid } from "uuid";

export default function handler (request, response) {

    if (request.method === 'GET'){
        response.status(200).json(cards);
    }

    else if (request.method === 'POST') {
        const card = request.body.card;
        const new_card = {
            id: uuid(),
            card_name: card.card_name,
            card_image: card.card_image,
            description: card.description
        }

        cards.push(new_card);
        response.status(200).json(new_card);
    }

}