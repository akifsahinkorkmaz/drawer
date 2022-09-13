import React, { useCallback } from 'react';
import { useState, useEffect, useRef } from 'react';
import { DataConnection, Peer } from "peerjs"; 
import {Link} from 'react-router-dom';

import DisplayConnect from '../Components/DisplayConnect';


function DisplayInit() {
  // RTC vars
  const [PeerId, setPeerId] = useState("");
  const [Connected, setConnected] = useState(false); // Change to false
  const [Conn, setConn] = useState<DataConnection>();
  
  // Canvas vars
  const w = 301;
  const h = 201;
  const [Dmam, setDmam] = useState<Uint8ClampedArray>(new Uint8ClampedArray(w*h*4));
  const [Cnv, setCnv] = useState<HTMLCanvasElement>();
  // Set Canvas When Connected
  const canref = useCallback((node: HTMLCanvasElement)=> {
    if (node) {
      setCnv(node)
    }
  }, [Connected])


  // Update once Mounted
  useEffect(() => {
    // Set RTC
    var peer: Peer = new Peer();
    peer.on("open", (id:string) : void => {
      setPeerId(id);
    })
    peer.on("connection", (dt: DataConnection) => {
      setConnected(true);
      setConn(dt);
    })

    // Close connection once Unmounted
    return () => {
      Conn?.close();
      setConnected(false);
    }
  }, []);


  // Update once Connected
  useEffect(()=> {
    // Set Dmam
    var dm = Dmam
    for (let i: number = 0; i < w*h; i++) {
      // rgb 17 24 39 [gray900]
      dm[i*4] = 17;
      dm[i*4+1] = 24;
      dm[i*4+2] = 39;
      dm[i*4+3] = 255;
    }
    setDmam(dm);

    // Set RTC Listener
    if (Conn) {
      Conn.on("data", (data: any) => {
        // write
        var parsed = data.toString();
        parsed = parsed.split("/")
        var x = parseInt(parsed[0]);
        var y = parseInt(parsed[1]);
        var co = parsed[3]; // Change color dynamics later
        
        co = [245, 158, 11];

        var inds = [
          ((y) * w + (x)) * 4, // c
          ((y) * w + (x)) * 4 - 4, // l
          ((y) * w + (x)) * 4 + 4, // r
          ((y+1) * w + (x)) * 4, // t
          ((y-1) * w + (x)) * 4, // b
        ]
        var dm = Dmam;
        inds.forEach(ind => {
          dm[ind] =  co[0];
          dm[(ind+1)] =  co[1];
          dm[(ind+2)] =  co[2];
        });
        setDmam(dm) 
      })
    }


    // Set Canvas + Init Drawer function
    let drawerframe: NodeJS.Timer;
    if (Cnv) {
      Cnv.width = w;
      Cnv.height = h;

      drawerframe = setInterval(()=> {
        var ctx = Cnv.getContext("2d");
        if (ctx) {
          ctx.clearRect(0, 0, w, h);
          ctx.beginPath();
          var dmamdata = new ImageData(Dmam, w, h)
          ctx.putImageData(dmamdata, 0, 0)
          ctx.closePath(); 
        }
      }, (1000/8))
    }

    return () => {
      clearInterval(drawerframe)
    }
  }, [Connected, Conn, Cnv])

  

  if (!Connected) {
    return (
      <DisplayConnect PeerId={PeerId}></DisplayConnect>
    );
  }else {
    return (
      <div className='h-screen w-screen bg-teal-500 overflow-hidden'>
        <canvas className='h-screen w-screen' ref={canref}></canvas>
      </div>
    );
  }

}

export default DisplayInit;
