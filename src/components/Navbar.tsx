import { useState } from "react";

interface NavbarProps {
  setNavbarSelection: (selection: string) => void
}

function Navbar(props: NavbarProps) {
  return (
    <div>
      <button onClick={() => props.setNavbarSelection('Search')}>Search</button>
      <button onClick={() => props.setNavbarSelection('Recent')}>Recent Searches</button>
    </div>
  )
}

export default Navbar;