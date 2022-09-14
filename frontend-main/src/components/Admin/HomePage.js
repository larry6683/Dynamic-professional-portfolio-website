import React, { useState } from 'react'
import Editor from '../Editor'
import PageCreator from '../PageCreator';
import AppBar from './AppBar';


export default function HomePage(props) {
    

    const [body, setBody] = useState();
    const handlebodydata =(e)=>{
      setBody(e);
     console.log(e)
      }


    return (
        <>
  
            <PageCreator />
            <AppBar/>
        </>
    )
}
