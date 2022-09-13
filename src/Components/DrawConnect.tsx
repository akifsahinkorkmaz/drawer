import React from 'react';
import { useState, useEffect } from 'react';
import { DataConnection, Peer } from "peerjs"; 
import {Link} from 'react-router-dom';

interface ConHandleInterface {
  self? : Peer,
  con?  :  DataConnection,
}

interface DrawConnectProps {
  isConnected : React.Dispatch<React.SetStateAction<boolean>>,
  Handle : ConHandleInterface, 
  setHandle: React.Dispatch<React.SetStateAction<ConHandleInterface>>

}

function DrawConnect(props:DrawConnectProps) {
  const [ConId, setConId] = useState("");

  function ConIdInpValidate(e: { target: { value: any; }; }): void {
    // Validate and Add "-" for [8,13,18,23]
    if (e.target.value.length > 8 && e.target.value[8] !== "-") e.target.value = e.target.value.slice(0, 8) + "-" + e.target.value.slice(8)
    if (e.target.value.length > 13 && e.target.value[13] !== "-") e.target.value = e.target.value.slice(0, 13) + "-" + e.target.value.slice(13)
    if (e.target.value.length > 18 && e.target.value[18] !== "-") e.target.value = e.target.value.slice(0, 18) + "-" + e.target.value.slice(18)
    if (e.target.value.length > 23 && e.target.value[23] !== "-") e.target.value = e.target.value.slice(0, 23) + "-" + e.target.value.slice(23)
    if (e.target.value.length === 36) {
      // If Valid Set Target ID
      setConId(e.target.value);
    }
  }

  function ConnectClick() : void {
    // Create Peer
    var peer: Peer = new Peer();
    peer.on("open", (id:string) : void => {
      var ch : ConHandleInterface = props.Handle;
      ch.self = peer;
      props.setHandle(ch);
    })
    if (ConId && props.Handle.self) {
      console.log(ConId)
      // Start Connection
      try {
        var conn = props.Handle.self.connect(ConId);
        if (conn) {
          var cn: ConHandleInterface = props.Handle;
          cn.con = conn;
          props.setHandle(cn);
        }
        props.isConnected(true);
      } catch (er) {
        // There is no backend and no way of tracking bugs 
        console.log("During RTC hand-shake the error(s) below occured:")
        console.log(er) 
      }
    }
    // Else do nothing
  }

    return (
      <div className='w-screen h-screen bg-gray-900 text-teal-50 p-4 lg:p-8 lg:flex lg:items-center lg:justify-between'>
        <div className='flex items-center justify-center flex-wrap'>
          <h1 className='text-xl md:text-2xl m-4'>Connection Id:</h1>
          <div className='py-4 px-8 m-4 bg-teal-700 rounded max-w-full'>
            <label htmlFor="cid" className='m-2'>36 character ID:</label>
            <input onChange={ConIdInpValidate} maxLength={36} name="cid" className='text-l h-12 outline-none border-none bg-teal-50 text-gray-900 py-2 px-4 rounded' type="text"/>
            <button onClick={ConnectClick} className='text-l m-4  py-2 px-4 bg-amber-500 rounded'> Connect </button>
          </div>
        </div>
        <div className='text-xl md:text-2xl text-left mt-4 mb-12 p-4 rounded bg-gray-600'>
          <h2 className='text-2xl md:text-3xl text-center text-amber-500'> How To Connect? </h2>
          <p className='m-4'><strong className='text-amber-500'> 1.</strong> Visit <a className='text-amber-500' href="localhost:3000">localhost:3000</a> on a device that has a nice screen</p>
          <p className='m-4'><strong className='text-amber-500'> 2.</strong> Select DISPLAY on that device </p>
          <p className='m-4'><strong className='text-amber-500'> 3.</strong> Enter connection id from DISPLAY device to DRAWER device </p>
          <p className='m-4'><strong className='text-amber-500'> 4.</strong> Start Drawing </p>
        </div>
      </div>
    );
  
}

export default DrawConnect;
