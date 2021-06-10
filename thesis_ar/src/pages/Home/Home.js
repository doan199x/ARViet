import React from 'react'
import './style.scss'
import homeurl from '../../img/home.jpg'
import { Button } from '@material-ui/core'
import { useHistory } from 'react-router';

export default function Home() {
  const history = useHistory();
  const token = localStorage.getItem('token');
  if (token) history.push('/lecture');
    return (
       <div className = "main">
         <div className = "main__box">
        
         <Button href= "/signin" 
         variant="contained" 
         color="secondary">
       Đăng nhập
      </Button>
      <Button href= "/signup" variant="contained" color="primary">
          Đăng  ký 
         </Button>
         </div>
         <div className= "main__div">
          <img className = "main__img" src = {homeurl}/>
        </div>
       </div>

    )
}
