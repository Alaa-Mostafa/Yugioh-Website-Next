import React from 'react';
import useSWR from 'swr';

import Image from 'next/image';
import Link from 'next/link';

const data_fetcher = async () => {
    const my_response = await fetch("http://localhost:3200/cards");
    const data = await my_response.json();
    return data;
}

const cards_swr = () => {

    const card_div_style = "m-auto border border-2 border-secondary rounded-3 mx-4 my-3 px-2";
    // const card_title_style = "fw-semibold text-light py-2 w-75 rounded-3";
    const card_image_style = "rounded-2 border border-2 border-secondary my-2";
    const preview_button_style = "btn text-light mt-1 py-1 px-2 rounded-3 border-0";

    const {data, error} = useSWR('cards', data_fetcher);

    const myLoader = ({ src }) => {
        return `${src}`
    }

    if (error)
        return "Error in fetching data..";

    if (!data)
        return "Loading..";

    return (
        <div className="w-75 py-3 mx-auto d-flex flex-wrap justify-content-center"> 
            { data.map((card) => {
                return (
                    <div className={card_div_style} style={{backgroundColor:'wheat', height: '415px', width: '320px', boxShadow:'3px 3px 15px white'}}  key={card.card_name}>

                        {/* <div className="d-flex justify-content-between mt-4"> */}
                            {/* <router-link :to="`/edit/${card.id}`" class="bi bi-pencil-square fs-4 mb-1 fw-semibold" :style="{color:'indigo'}"></router-link> */}
                            {/* <h6 className={card_title_style} style={{backgroundColor:'saddlebrown'}}> {card.card_name} </h6> */}
                            {/* <button class="bi bi-trash fs-4 mb-1 fw-semibold px-0" :style="{color:'indigo', border:'none', backgroundColor:'wheat'}" @click="delete_card(card.id)"></button> */}
                        {/* </div> */}

                        <Image loader={myLoader} src={card.card_image} className={card_image_style} width="250" height="350"/>

                        <Link href={`/cards/${card.id}`} className={preview_button_style} style={{backgroundColor:'darkviolet'}}>Preview Card</Link>
                    </div>
                )
              })
            }
            
        </div>
    );
};

export default cards_swr;