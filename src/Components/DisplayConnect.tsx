import React from 'react';
import { useState, useEffect } from 'react';
import { Peer } from "peerjs"; 
import {Link} from 'react-router-dom';

interface DisplayConnect {
  PeerId: string,
}

function DisplayConnect(props: DisplayConnect) {

  return (
    <div className='w-screen h-screen bg-gray-900 text-teal-50 p-4 lg:p-8 lg:flex lg:items-center lg:justify-between'>
      <div className='flex items-center justify-center flex-wrap'>
        <h1 className='text-xl md:text-2xl m-4'>Connection Id:</h1>
        <div className='py-4 px-8 m-4 bg-teal-700 rounded max-w-full'>
          <p className='text-xl md:text-2xl text-teal-50'>{props.PeerId}</p>
        </div>
      </div>
      <div className='text-xl md:text-2xl text-left mt-4 mb-12 p-4 rounded bg-gray-600'>
        <h2 className='text-2xl md:text-3xl text-center text-amber-500'> How To Connect? </h2>
        <p className='m-4'><strong className='text-amber-500'> 1.</strong> Visit <a className='text-amber-500' href="https://akifsahinkorkmaz.github.io/drawer/">https://akifsahinkorkmaz.github.io/drawer/</a> on a device that is preferably desktop</p>
        <p className='m-4'><strong className='text-amber-500'> 2.</strong> Select DRAWER on that device </p>
        <p className='m-4'><strong className='text-amber-500'> 3.</strong> Enter connection id from DISPLAY device to DRAWER device </p>
        <p className='m-4'><strong className='text-amber-500'> 4.</strong> Start Drawing </p>
      </div>
    </div>
  );
}

export default DisplayConnect;
