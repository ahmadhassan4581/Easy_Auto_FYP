
import React from 'react';
import { Button } from './ui/button';
import { Link, useNavigate } from 'react-router-dom';
const Header = () => {
  const navigate = useNavigate();
  const user = localStorage.getItem('user');

  const handleLogout = () => {
    localStorage.clear();
    navigate('/sign-in');
  };

   return (
     <div className='flex justify-between items-center shadow-sm p-5'>
       <img src="/easyauto.png" width={180} height={120} alt="EasyAuto Logo" />

       <ul className='hidden md:flex gap-16'>
         <li className='font-medium hover:scale-105 transition-all cursor-pointer hover:text'><Link to="/"> Home </Link></li>
         <li className='font-medium hover:scale-105 transition-all cursor-pointer hover:text'><Link to="/comparison"> Comparison </Link></li>
         <li className='font-medium hover:scale-105 transition-all cursor-pointer hover:text'><Link to="/newcars"> New </Link></li>
         <li className='font-medium hover:scale-105 transition-all cursor-pointer hover:text'><Link to="/contact"> Contact Us </Link></li>
       </ul>

      <div className='flex items-center gap-5'>
{user ? (
        <>

<Button> <Link to="/profile">Profile</Link></Button>
<Button> <Link to="/cart">Cart</Link></Button>
          <button onClick={handleLogout}>Logout</button>
          
        </>
      ) : (
        <>
         <Button> <Link to="/sign-in">Sign In</Link></Button>
         <Button> <Link to="/sign-up">Sign Up</Link></Button>
        </>
      )}
       </div>
     </div>
   );
 };

 export default Header;
