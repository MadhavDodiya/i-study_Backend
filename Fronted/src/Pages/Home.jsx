import React from 'react'

function Home() {
  return (
    <>
      <div className="container-fluid">
        <div className="container pt-5 pb-5">
          <div className="row">
            <div className="col-lg-6">
              <p className='text-[#07A169]'>WELCOME TO STUDY</p>
              <p className='text-5xl font-bold'>Discover <span className='text-[#ffb800]'>2700+</span></p>
              <p className='text-5xl font-bold'>Online Courses</p>
              <p className='text-5xl font-bold'>available in the</p>
              <p className='text-5xl font-bold'>world</p>
              <p className='text-gray-500 pt-3'>They are not liable for any offense caused by those who fail to carry out their duties, unless it is due to negligence.</p>
              <button className='bg-[#07A169] text-white px-5 py-3 rounded mt-3'>Find Courses</button>
              <button className='inline-flex items-center gap-2 text-[#ffb800] hover:text-gray-100 hover:text-white transition duration-300 px-5 py-2 mt-3'><i className="bi bi-play-circle text-4xl"></i> Watch Video</button>
            </div>
            <div className="col-lg-6"></div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home