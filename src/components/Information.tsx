import React from 'react';

interface Props {
    header: string | undefined;
    description: string | undefined
}

const Information = ({header, description}: Props) => {
  return (
    <div className='flex flex-col justify-center items-center md:items-start md:justify-start md:gap-4 gap-2 font-rubik'>
        <h2 className='text-sm leading-4 tracking-[0.115em] text-[#969696] font-bold uppercase'>{header}</h2>
        <h1 className='text-[1.625rem] leading-8 tracking-[-0.005em] font-bold md:font-extrabold text-[#2B2B2B]'>{description}</h1>
    </div>
  )
}

export default Information