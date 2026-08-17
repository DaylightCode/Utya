"use client"

const cards = [
  {
    photo: 'name.png',
    header: 'NAME',
    desc: 'UTYA',
  },
  {
    photo: 'ticker.png',
    header: 'TICKER',
    desc: '$UTYA',
  },
  {
    photo: 'chain.png',
    header: 'CHAIN',
    desc: 'TON',
  },
  {
    photo: 'supply.png',
    header: 'TOTAL SUPPLY',
    desc: '1,000,000,000',  
  },
  {
    photo: 'bns.png',
    header: 'Buy/Sell Tax',
    desc: '0%',  
  },
]

type CloudBorderProps = {
  position?: 'top' | 'bottom'
  fill?: string
  stroke?: string
  className?: string
}

const CLOUD_STROKE_PATH =
  "M0.125732 1.79089C6.42203 0.154725 9.83961 -0.0133476 15.6257 1.79089C21.7399 3.68617 22.6572 6.00049 27.1257 10.2908C37.4867 5.09377 43.7257 4.6788 54.6257 8.79089C64.7657 13.9684 68.2693 18.1137 69.6257 28.2909C79.1965 26.1018 83.0935 27.7247 86.6257 37.2909C95.4618 32.5396 99.567 34.133 106.126 40.7909C110.901 31.3875 115.814 28.6701 129.126 28.2909C141.039 31.6388 145.282 36.0478 148.126 48.7909C154.701 45.5179 158.144 45.8578 163.626 52.2909C163.626 52.2909 166.565 51.4732 167.626 53.2908C171.596 44.9469 175.556 43.0054 185.626 44.2909C187.269 34.0848 190.082 29.6733 200.126 25.2909C209.923 22.0368 215.249 21.9412 224.126 28.2909C227.425 25.146 229.452 24.3856 233.626 26.2909C241.214 10.1673 249.122 6.33246 267.626 5.79089C286.383 8.45341 294.424 12.9843 299.626 32.2909C306.473 26.8408 310.887 26.3449 319.626 29.7909C326.674 33.694 329.454 36.6307 330.626 44.2909C334.265 41.4517 336.356 41.533 340.126 43.2909C343.964 44.1541 345.894 45.0006 347.626 49.2909C350.882 46.4498 352.792 45.5338 356.626 47.2909C356.631 37.7503 358.896 33.7057 366.126 28.2909C374.523 22.6547 379.338 22.1851 388.126 25.2909C390.965 24.2602 392.53 24.0254 395.126 26.2909C401.509 9.92335 410.123 6.56943 429.126 4.79089C449.1 7.2596 455.42 13.7894 461.126 31.2909C467.79 25.1063 472.087 24.754 480.626 28.7909C486.288 32.1686 488.673 34.5908 488.626 41.7909C496.536 38.3462 500.917 38.4923 508.626 42.7909C515.224 46.9144 517.267 49.8858 518.126 56.2909C521.146 54.6788 522.941 54.2035 526.626 55.2909C529.722 56.3394 531.258 57.1588 532.126 60.7909C535.434 57.4686 537.57 56.5403 542.126 57.2909C546.58 58.3683 548.554 59.5503 550.126 63.7909C552.136 61.936 553.324 61.0952 556.126 61.7909C556.943 59.2868 557.913 58.0766 560.626 56.2909C564.065 55.1042 565.721 55.257 568.126 57.2909C572.001 45.7178 576.985 42.788 589.126 39.7909C601.805 40.6438 607.518 42.7992 611.626 53.7909C618.441 51.0988 622.124 51.2312 628.626 52.2909C630.708 46.0008 633.827 44.2306 639.626 41.2909C644.963 38.786 648.023 37.7029 654.626 41.2909C656.57 39.8041 657.68 39.7703 659.626 41.2909C659.452 33.4403 660.232 29.2858 666.626 23.2909C674.596 18.0585 679.128 16.477 687.626 22.2909C695.21 9.28027 701.552 5.93965 715.626 5.29089C733.555 8.99237 739.385 17.4787 740.626 28.7909C749.446 23.8258 752.755 23.1467 756.626 28.7909C760.928 7.96032 768.907 2.14419 794.126 3.29089"

const CLOUD_FILL_PATH = CLOUD_STROKE_PATH + " L 795 65 L 0 65 Z"

function CloudBorder({
  position = 'top',
  fill = '#F9F5E9',
  stroke = '#E7DCC4',
  className = '',
}: CloudBorderProps) {
  const highlightId = `cloud-highlight-clip-${position}`

  return (
    <div
      aria-hidden="true"
      className={`absolute left-0 w-full leading-[0] ${
        position === 'top' ? 'top-0 -translate-y-[99%]' : 'bottom-0 translate-y-[99%] rotate-180'
      } ${className}`}
    >
      <svg
        viewBox="0 0 795 65"
        preserveAspectRatio="none"
        className="w-full h-12 sm:h-16 md:h-20 lg:h-24 block overflow-visible"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <clipPath id={highlightId}>
            <path d={CLOUD_FILL_PATH} />
          </clipPath>
        </defs>

        <path d={CLOUD_FILL_PATH} fill={fill} />

        <path
          d={CLOUD_STROKE_PATH}
          fill="none"
          stroke={stroke}
          strokeWidth="1.5"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />

        <g clipPath={`url(#${highlightId})`}>
          <rect x="0" y="-10" width="795" height="20" fill="white" opacity="0.35" />
        </g>
      </svg>
    </div>
  )
}

function Tokenomics() {

  return (
    <div id="tokenomics" className='relative bg-[var(--color-cream)] z-10'>
      <CloudBorder position="bottom" fill="#F9F5E9" stroke="#E7DCC4" />
      <div className="flex flex-col items-center justify-center lg:max-w-7xl mx-auto px-6 py-12 gap-8">
        <div className="relative inline-block w-full lg:w-auto">
          <h2 
            aria-hidden="true"
            className='absolute top-[6px] left-[6px] w-full text-center lg:text-start text-5xl lg:text-6xl font-uniform text-black tracking-tighter'
          >
            TOKENOMICS
          </h2>
          <h2
            className='relative w-full text-center lg:text-start text-5xl lg:text-6xl text-white font-uniform tracking-tighter'
            style={{ WebkitTextStroke: '4px black', paintOrder: 'stroke fill' }}
          >
            TOKENOMICS
          </h2>
        </div>
        <span className="text-lg font-uniform pb-12">Simple, Fair. No BS</span>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {cards.map((card, index) => (
            <div 
              key={index}
              className={`flex flex-col px-8 py-4 border-2 border-black rounded-xl items-center ${card.header === 'Buy/Sell Tax' ? 'bg-[#F8C82E]' : ''}`}>
              <h3 className="text-lg font-semibold">{card.header}</h3>
              <p className="text-[#041736] text-xl font-bold">{card.desc}</p>
              <img 
                  src={card.photo} 
                  alt={`${card.photo}`}
                  className="w-24 h-24 mt-4"
                />
            </div>
          ))}
        </div>
      </div>
      <CloudBorder position="top" fill="#F9F5E9" stroke="#E7DCC4" />
    </div>
  )
}

export default Tokenomics
