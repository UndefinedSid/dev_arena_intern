import React from 'react'
import NavbarBelt from './NavbarBelt/navbarBelt'
import NavbarBanner from './NavbarBanner/navbarBanner'

const Navbar = () => {
  return (
    <div className='navbar'>
      {/* please watch the video for code */}
        <NavbarBelt/>
        <NavbarBanner/>
    </div>
  )
}

export default Navbar