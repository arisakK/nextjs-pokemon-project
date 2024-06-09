import Image from 'next/image';
import React from 'react';



const Navbar = () => {
    return (
        <div className='py-5'>
            <div className='max-x[1500px] w-[95%] mx-auto flex justify-center'>
                <Image src={'/logo.svg'}  width={300} height={150} alt='pokedex' />
            </div>
        </div>
    );
};

export default Navbar;