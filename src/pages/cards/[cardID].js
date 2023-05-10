import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Head from 'next/head';

const card_details = ({card}) => {

    const router = useRouter();
    const {cardID} = router.query;

    const card_div_style = "m-auto border border-2 border-secondary rounded-3 mx-4 px-2";
    const card_title_style = "fw-semibold text-light py-2 w-100 rounded-3 mt-3";
    const card_image_style = "rounded-2 border border-2 border-secondary my-2";
    const back_button_style = "btn text-light mt-3 py-1 px-2 rounded-3 border-0 w-50";

    // const [card, set_card] = useState({});

    const myLoader = ({ src }) => {
        return `${src}`
    }

    // const fetch_card = async () => {
    //     const res = await fetch(`/api/cards/${cardID}`);
    //     const data = await res.json();
    //     set_card(data);
    // };

    // useEffect (() => {
    //     fetch_card();
    // }, [])

    const return_to_cards = () => {
        router.push("/cards");
    }

    return (
    <>
     <Head>
        <title>{card.card_name}</title>
    </Head>

    <div className="w-75 py-3 mx-auto my-4">
        <div className={card_div_style} style={{backgroundColor:'wheat', height: '500px', boxShadow:'3px 3px 15px white'}}>
    
            <h5 className={card_title_style} style={{backgroundColor:'saddlebrown'}}> {card.card_name} </h5>

            <div className="d-flex justify-content-evenly">
                <Image loader={myLoader} src={card.card_image} className={card_image_style} width="250" height="350"/>
                <h5 className="mt-3 w-50 lh-base">{card.description}</h5>
            </div>

            <button className={back_button_style} style={{backgroundColor:'saddlebrown'}} onClick={return_to_cards}>Back</button>
        </div>
    </div>
    </>
       
    );
};

export default card_details;

export async function getStaticPaths() {
    return {

        paths: [
            {params: {cardID:'1'}},
            {params: {cardID:'2'}},
            {params: {cardID:'3'}}
        ],

        fallback: 'blocking'
    }
}

export async function getStaticProps(context) {

    const {params} = context;
    const my_response = await fetch(`/api/cards/${params.cardID}`);
    const data = await my_response.json();

    return {
        props: {
            card: data
        }
    }
}