"use client"

import { useState } from 'react'

function Hero() {
  const [copied, setCopied] = useState(false);
  const textToCopy = "EQBaCgUwOoc6gHCNln_oJzb0mVs79YG7wYoavh-o1ItaneLA"

  const handleCopy = () => {
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
      <div id="about" className='bg-gradient-to-b from-[#017DD8] to-[var(--light-blue)] py-12 pb-24'>
        <div className='flex items-center justify-center lg:justify-between lg:max-w-7xl mx-auto px-6 py-12 gap-8'>
          <div className='flex flex-col items-center lg:items-start lg:flex-1'>
            <div className='relative inline-block w-full lg:max-w-md mt-24'>
              <h1 
                aria-hidden="true"
                className='absolute top-[6px] left-[6px] w-full text-center lg:text-start text-7xl font-uniform text-black tracking-tighter'
              >
                OWN THE FUTURE OF <span>UTYA</span>
              </h1>
              <h1
                className='relative w-full text-center lg:text-start text-7xl text-white font-uniform tracking-tighter'
                style={{ WebkitTextStroke: '4px black', paintOrder: 'stroke fill' }}
              >
                OWN THE FUTURE OF <span className='text-[#F8C82E]'>UTYA</span>
              </h1>
            </div>
            <h2 className='text-center lg:text-start text-xl text-[#041736] font-uniform my-10'>
              <span className="font-sans font-bold">$</span>UTYA is the iconic Telegram duck on TON.<br />
              A community<span className="font-sans font-bold">-</span>powered memecoin built for memes,<br />
              good vibes, and everyone who loves the flock.<br />
              Join us and help shape the future of UTYA.<br />
            </h2>
            <div className='flex bg-white rounded-full border-2 border-b-4 border-[#041736] pl-6 items-center gap-2 p-2 max-w-xs lg:max-w-full'>
              <span className='text-[#041736] font-bold truncate text-xs sm:text-sm truncate'>{textToCopy}</span>
              <button 
                onClick={handleCopy} 
                className='bg-[#F8C82E] border border-[#041736] px-4 rounded-full font-bold text-[#041736] cursor-pointer self-stretch p-2 flex items-center gap-2'>
                <svg width="16" height="16" viewBox="0 0 600 434" fill="none" xmlns="http://www.w3.org/2000/svg" className={copied ? '' : 'hidden'}>
                  <path d="M33.3334 237.037L197.436 400L566.667 33.3333" stroke="#041736" strokeWidth="66.6667" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <svg width="16" height="16" viewBox="0 0 650 650" fill="none" xmlns="http://www.w3.org/2000/svg" className={copied ? 'hidden' : ''}>
                  <path d="M141.667 391.667H91.6667C54.8467 391.667 25 361.82 25 325V91.6667C25 54.8477 54.8477 25 91.6667 25H325C361.82 25 391.667 54.8477 391.667 91.6667V141.667M558.333 258.333H325C288.18 258.333 258.333 288.18 258.333 325V558.333C258.333 595.153 288.18 625 325 625H558.333C595.152 625 625 595.153 625 558.333V325C625 288.18 595.152 258.333 558.333 258.333Z" stroke="#041736" strokeWidth="65" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="grid">
                  <span className={`col-start-1 row-start-1 ${copied ? 'invisible' : ''}`}>COPY</span>
                  <span className={`col-start-1 row-start-1 ${copied ? '' : 'invisible'}`}>COPIED</span>
                </span>
              </button>
            </div>
          </div>
          <div className='relative hidden lg:flex justify-end items-center flex-1 max-w-2xl'>
            <img 
              src="duck.png"
              alt="duck"
              className='relative z-10 w-full max-w-xl xl:max-w-2xl h-auto object-contain'            
            />
            <img 
              src="plane.png"
              alt="plane"
              className='absolute z-20 top-0 left-0 w-32 xl:w-40 h-auto object-contain  -translate-y-4'
            />
            <img 
              src="cloud.png"
              alt="cloud"
              className='absolute z-20 top-0 right-0 w-24 xl:w-32 h-auto object-contain  -translate-y-4'
            />
            <img 
              src="cloud.png"
              alt="cloud"
              className='absolute z-20 bottom-0 left-0 w-18 xl:w-28 h-auto object-contain  -translate-y-4'
            />
            <img 
              src="coin.png"
              alt="coin"
              className='absolute z-20 bottom-0 right-0 w-10 xl:w-16 h-auto object-contain  -translate-y-4'
            />
          </div>
        </div>
      </div>
  )
}

export default Hero
