"use client"
import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);


const steps = [
  {
    photo: 'wallet.png',
    header: 'Create a Wallet',
    desc: 'Download Tonkeeper wallet extension for your browser or mobile.',
  },
  {
    photo: 'getton.png',
    header: 'Get Some TON',
    desc: 'Buy TON on Bybit, OKX, or other exchanges and send to your wallet.',
  },
  {
    photo: 'stonfi.png',
    header: 'Go to Ston.fi',
    desc: 'Visit Ston.fi, connect your wallet, and paste the $UTYA token address.',
  },
  {
    photo: 'swap.png',
    header: 'Swap TON to UTYA',
    desc: 'Swap your TON for $UTYA with zero taxes. Adjust slippage if needed during volatility.',
  },
]

function Guide() {
  const containerRef = useRef(null)

  useGSAP(() => {
    const textLines = gsap.utils.toArray('.reveal-line');
    textLines.forEach((line) => {
      gsap.fromTo(line, 
        { 
          opacity: 0, 
          y: 50 
        }, 
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: line,          
            start: 'top 85%',      
            end: 'top 50%',       
            toggleActions: 'play none none reverse', 
          }
        }
      );
    });
  }, { scope: containerRef });


  return (
    <div id="how-to-buy" className='bg-[var(--light-blue)]'>
      <div className="flex flex-col items-center justify-center lg:max-w-7xl mx-auto px-6 py-24 gap-8">
        <div className="relative inline-block w-full lg:w-auto">
          <h2 
            aria-hidden="true"
            className='absolute top-[4px] left-[4px] w-full text-center lg:text-start text-5xl lg:text-6xl font-uniform text-black tracking-tighter lg:whitespace-nowrap'
          >
            HOW TO BUY<br className="lg:hidden"/> <span className="font-sans font-bold">$</span>UTYA
          </h2>
          <h2
            className='relative w-full text-center lg:text-start text-5xl lg:text-6xl text-white font-uniform tracking-tighter lg:whitespace-nowrap'
            style={{ WebkitTextStroke: '4px black', paintOrder: 'stroke fill' }}
          >
            HOW TO BUY<br className="lg:hidden"/> <span className="font-sans font-bold">$</span>UTYA
          </h2>
        </div>
        <div ref={containerRef} className="lg:grid grid-cols-2 lg:gap-24 py-12 flex flex-col gap-12">
          {steps.map((step, index) => (
            <div 
              key={index}
              className="relative reveal-line"
              >
              <div className="absolute -top-4 -left-4 z-10 w-10 h-10 rounded-full bg-[#F8C82E] border-2 border-black flex items-center justify-center font-bold text-lg">
                {index + 1}
              </div>
              <div className="flex justify-between bg-[var(--color-cream)] rounded-xl border-2 border-black p-8 overflow-visible gap-4">
                <div className="flex flex-col gap-2 flex-1 min-w-0">
                  <h3 className="text-lg font-bold">{step.header}</h3>
                  <p className="text-md max-w-md font-medium">{step.desc}</p>
                </div>
                <div className="shrink-0 -my-12 -mr-8">
                  <img 
                    src={step.photo} 
                    alt={step.header}
                    className="w-40 h-40 sm:w-52 sm:h-52 md:w-60 md:h-60 object-contain"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Guide
