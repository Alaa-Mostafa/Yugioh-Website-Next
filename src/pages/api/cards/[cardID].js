import { cards } from "../../../../data/cards";

export default function handler (request, response) {
    const {cardID} = request.query;
    const card = cards.find((c) => c.id == cardID);
    const index = cards.findIndex((c) => c.id == cardID);

    if (request.method === 'GET') {
        response.status(200).json(card);
    }

    else if (request.method === 'POST') {
        const edited_card = request.body.card;

        cards[index].card_image = edited_card.card_image;
        cards[index].card_name = edited_card.card_name;
        cards[index].description = edited_card.description;

        response.status(200).json(cards[index]);
    }

    else if (request.method === 'DELETE') {
        cards.splice(index, 1);
        response.status(200).json(card);
    }
}