import React from 'react';
import Image from 'next/image';
import error_img from '../../public/error.jpeg'
import Head from 'next/head';

const error = () => {
    return (
        <>
        <Head>
           <title>Error 404!</title>
       </Head>

        <div>
            <Image src={error_img} className='pt-4' width='400' height='600'/>
        </div>
        </>
    );
};

export default error;

error.getLayout = function pageLayout(page) {
    return (
        <>
            {page}
        </>
    )
}