import React from 'react'
import './style.scss'
import homeurl from '../../img/home.jpg'
import { Button } from '@material-ui/core'

export default function Home() {
    return (
       <div className = "main">
         <div className = "main__box">
        
         <Button href= "/signin" variant="contained" color="secondary">
        Sign in
      </Button>
      <Button href= "/signup" variant="contained" color="primary">
          Sign up
         </Button>
         </div>
         <div className= "main__div">
          <img className = "main__img" src = {homeurl}/>
        </div>
       </div>

    )
}
