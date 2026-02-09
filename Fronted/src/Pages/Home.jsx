import React from 'react'
import banner from '../assets/Images/imgi_20_banner-img-1.png'


function Home() {
  return (
    <>
      <div className="container-fluid bg-[#d9f6ee]">
        <div className="container pt-5">
          <div className="row">
            <div className="col-lg-6 mt-5">
              <p className='text-[#07A169]'>WELCOME TO STUDY</p>
              <p className='text-5xl font-bold'>Discover <span className='text-[#ffb800]'>2700+</span></p>
              <p className='text-5xl font-bold'>Online Courses</p>
              <p className='text-5xl font-bold'>available in the</p>
              <p className='text-5xl font-bold'>world</p>
              <p className='text-gray-500 pt-3'>They are not liable for any offense caused by those who fail to carry out their duties, unless it is due to negligence.</p>
              <button className='bg-[#07A169] text-white px-5 py-3 rounded mt-3'>Find Courses</button>
              <button className='inline-flex items-center gap-2 text-[#ffb800] hover:text-[#07A169] hover:text-white transition duration-300 px-5 py-1 rounded mt-3'><i className="bi bi-play-circle text-3xl"></i> Watch Video</button>
            </div>
            <div className="col-lg-6">
              <img src={banner} alt="banner hero img" />
            </div>
          </div>
        </div>
      </div>

      {/* <div className="container-fluid bg-[#07a169] py-5">
        <div className="contaier">
          <div className="row">
            <div className="col-lg-4">
              <button className='rounded'><i className="bi bi-pc-display-horizontal text-white p-4"></i></button>
              <span className='text-[20px] text-white'>Gain Expertise with access tot over 24,000 video courses</span>
            </div>
            <div className="col-lg-4"></div>
            <div className="col-lg-4"></div>
          </div>
        </div>
      </div> */}


      <section class="bg-emerald-600 py-8">
        <div class="max-w-7xl mx-auto px-4">

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-center text-white">

            <div class="flex items-center gap-4">
              <div class="bg-white/90 w-20 h-20 rounded-full flex items-center justify-center">

                <svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-width="2" d="M9 17v-6h13v6M5 17V7a2 2 0 012-2h10" />
                </svg>
              </div>

              <p class="text-lg leading-relaxed">
                Gain expertise with access to over <br />
                <span class="font-semibold">24,000 video courses.</span>
              </p>
            </div>

            <div class="flex items-center gap-4">
              <div class="bg-white/90 w-20 h-20 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z" />
                </svg>
              </div>

              <p class="text-lg leading-relaxed">
                Learn from courses taught by <br />
                <span class="font-semibold">industry experts.</span>
              </p>
            </div>

            <div class="flex items-center gap-4">
              <div class="bg-white/90 w-20 h-20 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-width="2" d="M12 15v2m0-6V7m0 0l-3 3m3-3l3 3" />
                </svg>
              </div>

              <p class="text-lg leading-relaxed">
                Learn anytime, anywhere with <br />
                <span class="font-semibold">unlimited access on any device.</span>
              </p>
            </div>

          </div>

        </div>
      </section>
    </>
  )
}

export default Home