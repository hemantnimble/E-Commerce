'use client'
import React, { useState } from "react";

const ReviewFormPopup = () => {


  return (
    <div className='main-container w-[318px] h-[665px] bg-[rgba(0,0,0,0)] relative overflow-hidden mx-auto my-0'>
      <div className='h-[665px] bg-[rgba(0,0,0,0)] absolute top-0 left-0 right-0'>
        <div className='w-[318px] h-[32px] bg-[rgba(0,0,0,0)] relative z-[38] mt-0 mr-0 mb-0 ml-0'>
          <span className="flex h-[12px] justify-start items-center font-['Inter'] text-[7.900000095367432px] font-semibold leading-[9.561px] text-[#5e7f94] absolute bottom-[9px] right-[271px] text-left whitespace-nowrap z-[41]">
            19:02
          </span>
          <div className='w-[13px] h-[9px] bg-red-600 bg-cover bg-no-repeat absolute bottom-[10px] right-[42px] z-40' />
          <div className='w-[14px] h-[7px] bg-red-400 bg-cover bg-no-repeat absolute bottom-[11px] right-[21px] z-[39]' />
        </div>
        <div className='w-[318px] h-[46px] bg-[rgba(0,0,0,0)] relative z-[36] mt-[14px] mr-0 mb-0 ml-0'>
          <div className='w-[38px] h-[37px] bg-blue-700 bg-cover bg-no-repeat rounded-[18.5px] relative z-[37] mt-[3px] mr-0 mb-0 ml-[29px]' />
        </div>
        <div className='w-[318px] h-[516px] text-[0px] bg-[rgba(0,0,0,0)] relative z-[2] mt-[23px] mr-0 mb-0 ml-0'>
          <span className="block h-[19px] font-['Inter'] text-[18.899999618530273px] font-semibold leading-[19px] text-[#b1c5cf] relative text-left whitespace-nowrap z-[35] mt-0 mr-0 mb-0 ml-[73px]">
            Create an account
          </span>
          <span className="flex w-[219px] h-[33px] justify-center items-center font-['Inter'] text-[11.5px] font-normal leading-[13.918px] text-[#7ca0bc] relative text-center overflow-hidden z-[34] mt-[14px] mr-0 mb-0 ml-[50.667px]">
            Unlock Your Potential, Register Now for
            <br />
            an Empowering Journey!
          </span>
          <div className='w-[318px] h-[79px] text-[0px] bg-[rgba(0,0,0,0)] relative z-[26] mt-[59px] mr-0 mb-0 ml-0'>
            <span className="block h-[12px] font-['Inter'] text-[11px] font-semibold leading-[12px] text-[#5e6567] relative text-left whitespace-nowrap z-[33] mt-[6px] mr-0 mb-0 ml-[21px]">
              Name
            </span>
            <div className='w-[283px] h-[52px] bg-[rgba(0,0,0,0)] relative overflow-hidden z-[27] mt-[6px] mr-0 mb-0 ml-[18px]'>
              <input className='w-[283px] h-[52px] bg-transparent border-none absolute top-0 left-0 z-[32]' />
            </div>
          </div>
          <div className='w-[318px] h-[87px] text-[0px] bg-[rgba(0,0,0,0)] relative z-[19] mt-[10px] mr-0 mb-0 ml-0'>
            <span className="block h-[12px] font-['Inter'] text-[10.699999809265137px] font-semibold leading-[12px] text-[#5c5f63] relative text-left whitespace-nowrap z-[25] mt-[6px] mr-0 mb-0 ml-[21px]">
              Email
            </span>
            <div className='w-[283px] h-[52px] bg-[rgba(0,0,0,0)] relative z-20 mt-[6px] mr-0 mb-0 ml-[18px]'>
              <div className='w-[277px] h-[47px] bg-[#f5f7f9] rounded-[6px] relative overflow-hidden z-[21] mt-[3px] mr-0 mb-0 ml-[4px]'>
                <div className='w-px h-[21px] bg-red-950 bg-cover bg-no-repeat absolute bottom-[14px] right-[226px] z-[23]' />
                <span className="flex h-[15px] justify-start items-center font-['Inter'] text-[9px] font-semibold leading-[10.892px] text-[#9fa4b1] absolute bottom-[17px] right-[102px] text-left whitespace-nowrap z-[22]">
                  Enter Your E-mail...
                </span>
                <div className='w-[14px] h-[14px] bg-blue-900 bg-cover bg-no-repeat absolute bottom-[17px] right-[245px] z-[24]' />
              </div>
            </div>
          </div>
          <span className="block h-[12px] font-['Inter'] text-[9.5px] font-semibold leading-[11.497px] text-[#676b6e] relative text-left whitespace-nowrap z-[18] mt-[8px] mr-0 mb-0 ml-[21px]">
            Password
          </span>
          <div className='w-[284px] h-[51px] bg-[rgba(0,0,0,0)] relative z-[9] mt-[7px] mr-0 mb-0 ml-[16px]'>
            <div className='w-[283px] h-[51px] bg-[rgba(0,0,0,0)] relative overflow-hidden z-10 mt-[-1px] mr-0 mb-0 ml-[2px]'>
              <div className='w-[283px] h-[51px] bg-purple-700 bg-cover bg-no-repeat absolute bottom-0 right-0 z-[12]'>
                <input className='w-[283px] h-[51px] bg-transparent border-none absolute top-0 left-0 z-[17]' />
              </div>
            </div>
          </div>
          <span className="block h-[13px] font-['Inter'] text-[9.5px] font-semibold leading-[11.497px] text-[#d2a093] relative text-left whitespace-nowrap z-[6] mt-[54px] mr-0 mb-0 ml-[116px]">
            An Error Occured!
          </span>
          <button className='w-[280px] h-[44px] bg-[rgba(0,0,0,0)] border-none relative z-[3] pointer mt-[26px] mr-0 mb-0 ml-[19px]'>
            <div className='w-[276px] h-[41px] bg-[#fae379] rounded-[18px] border-solid border border-[#f6e797] relative z-[4] mt-[2px] mr-0 mb-0 ml-[3px]'>
              <span className="flex h-[15px] justify-start items-center font-['Inter'] text-[10.800000190734863px] font-semibold leading-[13.07px] text-[#635d32] absolute bottom-[12px] right-[113px] text-left whitespace-nowrap z-[5]">
                Register
              </span>
            </div>
          </button>
          <div className='w-[18px] h-[18px] bg-purple-900 bg-cover bg-no-repeat rounded-[2.25px] absolute bottom-[108px] right-[279px] z-[8]' />
          <span className="flex h-[14px] justify-start items-center font-['Inter'] text-[9.100000381469727px] font-semibold leading-[11.013px] text-[#d0d2d3] absolute bottom-[111px] right-[86px] text-left whitespace-nowrap z-[7]">
            You accept the terms and conditions?
          </span>
        </div>
      </div>
      <div className='w-[318px] h-[665px] bg-green-600 bg-cover bg-no-repeat absolute bottom-0 right-0 z-[1]' />
    </div>
  );
};

export default ReviewFormPopup;
