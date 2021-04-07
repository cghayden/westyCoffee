import React from 'react';

export default function CoffeeSvg({ w = '20', h = '20' }) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='32'
      height='32'
      viewBox='0 0 28 28'
      fill='none'
      stroke='currentColor'
      stroke-width='2'
      stroke-linecap='round'
      stroke-linejoin='round'
    >
      <path d='M22 10h1a4 4 0 0 1 0 8h-1'></path>
      <path d='M2 8h20v15a4 10 0 0 1-4 4H6a4 10 0 0 1-4-4V8z'></path>
      <line x1='8' y1='1' x2='8' y2='4'></line>
      <line x1='12' y1='1' x2='12' y2='4'></line>
      <line x1='16' y1='1' x2='16' y2='4'></line>
    </svg>
  );
}
