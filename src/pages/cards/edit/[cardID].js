import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {getSession, signIn} from 'next-auth/react';

const edit_card = () => {

    const router = useRouter();
    const {cardID} = router.query;

    const [card, set_card] = useState({});
    const [img_src, set_img] = useState("");

    const img_style = "my-auto border border-2 border-secondary rounded-3";
    const form_style = "w-50 my-auto border border-2 border-secondary rounded-3";
    const div_style = "w-100 mx-auto my-3 d-flex flex-column justify-content-between px-5 py-2";
    const label_style = "fw-semibold text-start mb-1";
    const button_style = "btn border px-3 py-2 fw-semibold text-light mb-3";

    const fetch_card = async () => {
        const res = await fetch(`/api/cards/${cardID}`);
        const data = await res.json();
        set_card(data);
        set_img(data.card_image);
    };

    useEffect(() => {
        const lock_page = async() => {
            const session = await getSession();
            if (!session)
                signIn();
            else
                fetch_card();
        }
        
        lock_page();
    }, [])

    const submit_data = async (e) => {
        e.preventDefault();

        const response = await fetch(`/api/cards/${cardID}`, {
            method: 'POST',
            body: JSON.stringify({card}),
            headers: {
                "Content-Type": "application/json"
            }
        })

        const data = await response.json();
        console.log(data);

        alert("Card Edited Successfully!");
    }

    return (

        <div className="w-75 py-4 mx-auto my-4 border border-2 border-secondary rounded-3 d-flex justify-content-evenly" style={{ height: '480px', backgroundColor:'wheat', boxShadow:'3px 3px 15px white' }}>

            <img src={img_src} className={img_style} width='280' height='420'/>

            <form onSubmit={submit_data} className={form_style}>

                <div className={div_style} style={{marginTop: '2%'}}>
                    <label className={label_style}> Name </label>
                    <input type="text" value={card.card_name} onChange={(e)=>set_card({...card, 'card_name':e.target.value})}/>
                </div>

                <div className={div_style}>
                    <label className={label_style}> Image Link </label>
                    <input type="text" value={card.card_image} onInput={(e)=> {set_card({...card, 'card_image':e.target.value}); set_img(e.target.value);}}/>
                </div>

                <div className={div_style} style={{marginTop: '2%'}}>
                    <label className={label_style}> Description </label>
                    <textarea value={card.description} rows="3" onChange={(e)=>set_card({...card, 'description':e.target.value})}></textarea>
                </div>

                <div>
                    <button className={button_style} style={{backgroundColor:'saddlebrown'}} type="submit"> Submit </button>
                </div>
            </form>
        </div>
    );
};

export default edit_card;