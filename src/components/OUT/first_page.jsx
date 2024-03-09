import React from 'react'
import logo from '../../assets/WebQ Media Logo.svg'
import callender from '../../assets/callender.svg'
import man from '../../assets/man.svg'

function first_page() {
  return (
    <div className='p-20 max-w-[1400px] m-auto rounded-md over mb-64'
    style={{
        background: 'linear-gradient(135deg, #2572FF 3.54%, #002E81 104.67%)'
      }}
      >
      <div className='flex justify-between items-center bg-white rounded-3xl ps-10 pe-10 pt-5 pb-5'>
        <img src={logo} className='w-[266px] h-[52px]' alt="" />
        <div>
            <div className='flex items-center justify-start gap-2 font-medium'>
                <img className='pt-1 w-[40px]' src={man} alt="" />
                <p className='text-lg'><span className='font-semibold'>Client </span>: <span contentEditable={true}  >upCarrera</span></p>
            </div>
            <div className='flex items-center justify-start gap-2 font-medium'>
                <img className='pt-1 w-[40px]' src={callender} alt="" />
                <p className='text-lg'><span className='font-semibold'>Date</span> : <span contentEditable={true}>Jan-03-2024</span></p>
            </div>
        </div>
      </div>
      <div className='flex flex-col justify-center items-center mt-8'>
      <h1 className='text-center text-[65px] text-white font-bold'>Monthly Report</h1>
      <span className='bg-[#0d151f55] p-3 ps-4 pe-4 rounded-full text-[27px] text-white font-medium mt-5 mb-8' style={{ letterSpacing: '0.05em' }}  contentEditable={true}>December 01-31-2023</span>
     
      <div className='w-[435px] flex flex-col items- rounded-3xl p-6 border-solid border-[2px] border-[#ffffff71] text-white'>
        <h4 className='text-[27px] text-center font-bold mb-3'>Table Of Contents</h4>
        <div className='flex items-center justify-start gap-3 mt-2 mb-2 ps-20'>
            <span className='w-[41px] h-[41px] rounded-full border-solid border-[1px] text-center text-[24px] font-semibold'>1</span>
            <p className='text-[18px] font-semibold' style={{ letterSpacing: '0.02em' }}>Monthly Summary</p>
        </div>
        <div className='flex items-center justify-start gap-3 mt-2 mb-2 ps-20'>
            <span className='w-[41px] h-[41px] rounded-full border-solid border-[1px] text-center text-[24px] font-semibold'>2</span>
            <p className='text-[18px] font-semibold' style={{ letterSpacing: '0.02em' }}>Total Campaign Insights</p>
        </div>
        <div className='flex items-center justify-start gap-3 mt-2 ps-20'>
            <span className='w-[41px] h-[41px] rounded-full border-solid border-[1px] text-center text-[24px] font-semibold'>3</span>
            <p className='text-[18px] font-semibold' style={{ letterSpacing: '0.02em' }}>Total Campaign Reports</p>
        </div>
      </div>
      </div>
    </div>
  )
}

export default first_page
