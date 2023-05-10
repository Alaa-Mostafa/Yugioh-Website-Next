import React, { useEffect, useState } from 'react';
import {getSession, signIn} from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';

const cards = () => {

    const card_div_style = "m-auto border border-2 border-secondary rounded-3 mx-4 my-3 px-2";
    const card_image_style = "rounded-2 border border-2 border-secondary my-2";
    const preview_button_style = "btn text-light mt-1 py-1 px-2 rounded-3 border-0";

    const [data, set_data] = useState([]);

    const myLoader = ({ src }) => {
        return `${src}`
    }

    const fetch_cards = async () => {
        const res = await fetch("/api/cards");
        const data = await res.json();
        set_data(data);
    };

    const lock_page = async(card_id) => {
        const session = await getSession();
        if (!session)
            signIn();
        else {
            const response = await fetch(`/api/cards/${card_id}`, {
                method: 'DELETE'
            })
    
            const data = await response.json();
            console.log(data);
            fetch_cards();
        }
    }
    
    useEffect (() => {
        fetch_cards();
    }, [])

    const delete_card = async (card_id) => {
        lock_page(card_id);
    }

    return (
        <>
        <Head>
            <title>Cards</title>
        </Head>

        <div className="w-75 py-3 mx-auto d-flex flex-wrap justify-content-center"> 
            { data.map((card) => {
                return (
                    <div className={card_div_style} style={{backgroundColor:'wheat', height: '440px', width: '320px', boxShadow:'3px 3px 15px white'}}  key={card.card_name}>

                        <div className="d-flex justify-content-between" style={{height: '20px'}}>
                            <Link href={`/cards/edit/${card.id}`} className="bi bi-pencil-square fs-4 mb-1 fw-semibold" style={{color:'indigo'}}></Link>
                            <button className="bi bi-trash fs-4 mb-1 fw-semibold px-0" style={{color:'indigo', border:'none', backgroundColor:'wheat'}} onClick={()=>delete_card(card.id)}></button>
                        </div>

                        <Image loader={myLoader} src={card.card_image} className={card_image_style} width="250" height="350"/>

                        <Link href={`/cards/${card.id}`} className={preview_button_style} style={{backgroundColor:'saddlebrown'}}>Preview Card</Link>
                    </div>
                )
              })
            }
        </div>
        </>
    );
};

export default cards;