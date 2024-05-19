import React from 'react'
import { NavLink } from 'react-router-dom'
import style from  "../CSS/navbar.module.css"

const SideNavbar = () => {
  return (
    <div className={style.navbar}>
        <NavLink to="/" className={style.options}>Home</NavLink>
        <NavLink to="/addscenerio" className={style.options}>Add Scenario</NavLink>
        <NavLink to="/allscenerios" className={style.options}>All Scenario</NavLink>
        <NavLink to="/addvehicle" className={style.options}>Add Vehicle</NavLink>
    </div>
  )
}

export default SideNavbar