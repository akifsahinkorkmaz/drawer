import React, { LegacyRef, MouseEventHandler } from 'react';
import { useState, useEffect, useRef } from 'react';
import { DataConnection, Peer } from "peerjs"; 
import {Link} from 'react-router-dom';

// Component imports
import DrawConnect from '../Components/DrawConnect';

interface ConHandleInterface {
  self? : Peer,
  con?  :  DataConnection,
}



function DrawInit() {
  const [Connected, setConnected] = useState(false);
  const [ConHandle, setConHandle] = useState<ConHandleInterface>({})
  let table = React.createRef<HTMLDivElement>();


  useEffect(() => {
    function MousePos(e: any) {
      e.preventDefault();

      var dw: number = 300;
      var dh: number = 200;
      var w = document.documentElement.clientWidth;
      var h = document.documentElement.clientHeight;
      var x = e.offsetX;
      var y = e.offsetY;
  
      x = Math.ceil((x * dw) / w)
      y = Math.ceil((y * dh) / h)
  
      ConHandle.con?.send(x + "/" + y + "/" + "#f59e0b")
    }

    let drawer = table.current;

    drawer?.addEventListener("pointerdown", function(e){
      this.addEventListener("pointermove", MousePos);
    });
    
    drawer?.addEventListener("pointerup", function(e){
      this.removeEventListener("pointermove", MousePos);
    });

  }, [Connected]);

  
  

  // There is no connection
  if (!Connected) {
    return (
      <DrawConnect isConnected={setConnected} Handle={ConHandle} setHandle={setConHandle}></DrawConnect>
    );
  }else {
    return (
      <div className='w-screen h-screen bg-gray-900'>
        <div className='w-screen h-screen' ref={table}></div>  
      </div>
    )
  }
  
}

export default DrawInit;
