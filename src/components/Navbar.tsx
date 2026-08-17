"use client"

import React, { useState, useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"

gsap.registerPlugin(ScrollToPlugin)

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef(null)
  const tl = useRef<gsap.core.Timeline | null>(null);

  useGSAP(() => {
    tl.current = gsap.timeline({ paused: true })
      .fromTo(menuRef.current,
      { height: 0, opacity: 0},
      { height: "auto", opacity: 1, duration: 0.2, ease: "power2.out" }
    )
  })

  const closeMenu = () => {
    if(isOpen && tl.current) {
      tl.current.reverse()
      setIsOpen(false)
    }
  }

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    handleScroll(e,id)
    closeMenu()
  }

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    gsap.to(window, { 
      duration: 1,
      scrollTo: { y: id, offsetY: 80},
      ease: "power2.out"
    })
  }

  return (
      <div className='fixed top-0 right-0 left-0 bg-[var(--color-cream)] z-50'>
        <div className='flex items-center justify-between lg:max-w-7xl mx-auto px-6 py-4'>
          <a href='/' className='flex items-center gap-2'>
            <img src='/logoduck.jpg' alt='logo' className='w-12 h-12 rounded-full '/>
            <span className='text-4xl text-[#041736] font-uniform font-'><span className="font-sans font-bold">$</span>UTYA</span>
          </a>
          <div className='hidden lg:flex items-center gap-10  '>
            <ul className='flex gap-10 font-bold'>
              <li><a href='#about' className='text-[#041736] hover:text-[#F8C82E] transition-colors duration-150' onClick={(e) => handleScroll(e, "#about")}>ABOUT</a></li>
              <li><a href='#how-to-buy' className='text-[#041736] hover:text-[#F8C82E] transition-colors duration-150' onClick={(e) => handleScroll(e, "#how-to-buy")}>HOW TO BUY</a></li>
              <li><a href='#tokenomics' className='text-[#041736] hover:text-[#F8C82E] transition-colors duration-150' onClick={(e) => handleScroll(e, "#tokenomics")}>TOKENOMICS</a></li>
              <li><a href='#community' className='text-[#041736] hover:text-[#F8C82E] transition-colors duration-150' onClick={(e) => handleScroll(e, "#community")}>COMMUNITY</a></li>
            </ul>
          </div>
          <a 
            className='hidden cursor-pointer px-6 py-2 border-2 shadow-[0_2px_0_0_#000] hover:shadow-[0_0px_0_0_#000] hover:translate-y-[2px] border-black rounded-full bg-[#F8C82E] font-bold lg:flex gap-2 items-center transition-all duration-150 ease-out' 
            href='https://t.me/UtyaDuck'>
              LEARN MORE
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M2.51239 10.8488C8.41795 8.27585 12.3559 6.57959 14.3263 5.76003C19.9521 3.42005 21.1211 3.01357 21.883 3.00014C22.0506 2.99719 22.4253 3.03872 22.668 3.23567C22.873 3.40197 22.9294 3.62661 22.9563 3.78428C22.9833 3.94195 23.0169 4.30112 22.9902 4.58177C22.6854 7.78504 21.3662 15.5585 20.6951 19.1462C20.4111 20.6643 19.852 21.1733 19.3107 21.2231C18.1343 21.3314 17.2409 20.4457 16.1015 19.6988C14.3186 18.53 13.3113 17.8025 11.5807 16.662C9.58058 15.3439 10.8772 14.6195 12.017 13.4356C12.3153 13.1258 17.4986 8.41117 17.5989 7.98348C17.6115 7.92999 17.6231 7.7306 17.5046 7.62532C17.3862 7.52004 17.2114 7.55604 17.0852 7.58467C16.9064 7.62526 14.0581 9.50789 8.54035 13.2326C7.73187 13.7877 6.99958 14.0582 6.34347 14.044C5.62016 14.0284 4.2288 13.6351 3.19447 13.2988C1.92583 12.8865 0.91753 12.6684 1.00533 11.9681C1.05106 11.6033 1.55341 11.2302 2.51239 10.8488Z" fill="black"/>
            </svg>
          </a>
          <button 
            onClick={() => {
              if (!tl.current) return
              if(isOpen) {
                tl.current.reverse()
                setIsOpen(false)
              } else {
                tl.current.play()
                setIsOpen(true)
              }
            }}
            className="lg:hidden flex flex-col gap-1.5 w-6 h-6 justify-center cursor-pointer"
            >
            <div className={`w-6 h-0.5 bg-black transition-transform duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
            <div className={`w-6 h-0.5 bg-black transition-opacity duration-300 ${isOpen ? 'opacity-0' : ''}`}></div>
            <div className={`w-6 h-0.5 bg-black transition-transform duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></div>
          </button>
          
          <div 
            ref={menuRef} 
            className="overflow-hidden lg:hidden absolute top-full left-0 w-full bg-[var(--color-cream)] border-t border-black/10 px-6 py-4 flex flex-col gap-4 z-50">
              <ul className='flex flex-col gap-4 font-bold text-center'>
                <li><a href='#about' className='text-[#041736]' onClick={(e) => handleLinkClick(e, "#about")}>ABOUT</a></li>
                <li><a href='#how-to-buy' className='text-[#041736]' onClick={(e) => handleLinkClick(e, "#how-to-buy")}>HOW TO BUY</a></li>
                <li><a href='#tokenomics' className='text-[#041736]' onClick={(e) => handleLinkClick(e, "#tokenomics")}>TOKENOMICS</a></li>
                <li><a href='#community' className='text-[#041736]' onClick={(e) => handleLinkClick(e, "#community")}>COMMUNITY</a></li>
            </ul>
            <a 
              className='cursor-pointer py-2 border-2 border-b-4 border-black rounded-full bg-[#F8C82E] font-bold flex gap-2 items-center justify-center' 
              href='https://t.me/UtyaDuck'>
                LEARN MORE
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M2.51239 10.8488C8.41795 8.27585 12.3559 6.57959 14.3263 5.76003C19.9521 3.42005 21.1211 3.01357 21.883 3.00014C22.0506 2.99719 22.4253 3.03872 22.668 3.23567C22.873 3.40197 22.9294 3.62661 22.9563 3.78428C22.9833 3.94195 23.0169 4.30112 22.9902 4.58177C22.6854 7.78504 21.3662 15.5585 20.6951 19.1462C20.4111 20.6643 19.852 21.1733 19.3107 21.2231C18.1343 21.3314 17.2409 20.4457 16.1015 19.6988C14.3186 18.53 13.3113 17.8025 11.5807 16.662C9.58058 15.3439 10.8772 14.6195 12.017 13.4356C12.3153 13.1258 17.4986 8.41117 17.5989 7.98348C17.6115 7.92999 17.6231 7.7306 17.5046 7.62532C17.3862 7.52004 17.2114 7.55604 17.0852 7.58467C16.9064 7.62526 14.0581 9.50789 8.54035 13.2326C7.73187 13.7877 6.99958 14.0582 6.34347 14.044C5.62016 14.0284 4.2288 13.6351 3.19447 13.2988C1.92583 12.8865 0.91753 12.6684 1.00533 11.9681C1.05106 11.6033 1.55341 11.2302 2.51239 10.8488Z" fill="black"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
  )
}

export default Navbar
