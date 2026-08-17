"use client"

const community = [
  {
    photo: 'telegram.png',
    link: 'https://t.me/UtyaDuck',
    text: 'TELEGRAM'
  },
  {
    photo: 'twitter.png',
    link: 'https://x.com/TonUtyacoin',
    text: 'TWITTER'
  },
  {
    photo: 'chart.png',
    link: 'https://www.geckoterminal.com/ton/pools/EQCO9NDT4Il25_4ZpHIOgMAUbRJvpsI9pLzqhD8X7eTVB7X_',
    text: 'CHART'
  },
  {
    photo: 'coingecko.png',
    link: 'https://www.coingecko.com/en/coins/utya',
    text: 'COINGECKO'
  },
  {
    photo: 'coinmarketcap.png',
    link: 'https://coinmarketcap.com/currencies/utya/',
    text: 'COINMARKETCAP'
  },
]

function Community() {
  return (
    <div id="community" className='bg-gradient-to-b from-[var(--light-blue)] to-[#017DD8]'>
      <div className="flex flex-col items-center justify-center max-w-7xl mx-auto px-6 py-12 pt-24 gap-8">
        <div className="relative inline-block w-full lg:w-auto">
          <h2
            aria-hidden="true"
            className='absolute top-[4px] left-[4px] w-full text-center lg:text-start text-5xl lg:text-6xl font-uniform text-black tracking-tighter lg:whitespace-nowrap'
          >
            JOIN THE FLOCK
          </h2>
          <h2
            className='relative w-full text-center lg:text-start text-5xl lg:text-6xl text-white font-uniform tracking-tighter lg:whitespace-nowrap'
            style={{ WebkitTextStroke: '4px black', paintOrder: 'stroke fill' }}
          >
            JOIN THE FLOCK
          </h2>
        </div>
        <span className="text-lg font-bold pb-12 text-white text-center">Be part of the most quacked-up community on TON</span>
        <div className="flex flex-wrap justify-center gap-8 sm:gap-12 lg:gap-16 xl:gap-24 w-full">
          {community.map((item) => (
            <a
              key={item.text}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-2 shrink-0"
            >
              <img
                src={item.photo}
                alt={item.text}
                className="w-20 h-20 lg:w-38 lg:h-38 object-contain"
              />
              <span className="font-semibold text-white text-xs sm:text-sm">{item.text}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Community