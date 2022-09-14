import React from 'react';
import {Link} from 'react-router-dom';


function Menu() {
  return (
    <div className='w-screen h-screen bg-gray-900 flex items-center justify-evenly flex-wrap'>
      <Link to="/display"><div className=' w-52 h-52 m-4 p-4 rounded-lg bg-teal-700'>
        <svg className='w-full h-3/4 mb-2 fill-amber-500' xmlns="http://www.w3.org/2000/svg" width="36px" height="36px" viewBox="0 0 36 36" version="1.1">
          <path d="M25,4H11A2,2,0,0,0,9,6V30a2,2,0,0,0,2,2H25a2,2,0,0,0,2-2V6A2,2,0,0,0,25,4ZM19,30H17V28h2Zm-8-4V6H25V26Z"/>
        </svg>
        <span className='text-teal-50 text-2xl'>DISPLAY</span>
      </div></Link>
      <Link to="/drawer"><div className=' w-52 h-52 m-4 rounded-lg bg-teal-700'>
        <svg className='w-full h-3/4 mb-2 fill-amber-500' xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 268.987 268.987"><g>
          <path d="m243.683,12.444h-218.378c-13.953,0-25.305,11.351-25.305,25.305v147.829c0,13.953 11.352,25.305 25.305,25.305h83.135l-4.472,31.661h-20.974c-3.866,0-7,3.134-7,7s3.134,7 7,7h27.055 48.891 27.055c3.866,0 7-3.134 7-7s-3.134-7-7-7h-20.975l-4.472-31.661h83.135c13.953,0 25.305-11.352 25.305-25.305v-147.829c-0.001-13.954-11.352-25.305-25.305-25.305zm-218.378,14h218.378c6.233,0 11.305,5.071 11.305,11.305v129.386h-240.988v-129.386c0-6.234 5.071-11.305 11.305-11.305zm125.576,216.099h-32.774l4.472-31.661h23.831l4.471,31.661zm92.802-45.661h-218.378c-6.233,0-11.305-5.071-11.305-11.305v-4.443h240.987v4.443c0,6.234-5.071,11.305-11.304,11.305z"/>
        </g></svg>
        <span className='text-teal-50 text-2xl'>INPUT</span>
      </div></Link>

      <div className='w-full mb-8 text-teal-50 px-4 text-sm'>
        <p> * Select display on any device.</p>
        <p> * Select input on preferably desktop.</p>

      </div>
    </div>
  );
}

export default Menu;
