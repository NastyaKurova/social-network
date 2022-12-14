import React from 'react'
import styles from './Navbar.module.scss'
import { NavLink } from 'react-router-dom'

export const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <ul>
        <li className={styles.navbarLink}>
          <StyledLink href="/profile" name="Profile" />
        </li>
        <li className={styles.navbarLink}>
          <StyledLink href="/dialogs" name="Dialogs" />
        </li>
        <li className={styles.navbarLink}>
          <StyledLink href="/chat" name="Chat" />
        </li>
        <li className={styles.navbarLink}>
          <StyledLink href="/news" name="News" />
        </li>
        <li className={styles.navbarLink}>
          <StyledLink href="/users" name="Users" />
        </li>
        <li className={styles.navbarLink}>
          <StyledLink href="/settings" name="Settings" />
        </li>
      </ul>
    </nav>
  )
}

function StyledLink({ href, name }: { href: string; name: string }) {
  return (
    <NavLink
      to={href}
      className={({ isActive }) =>
        isActive ? styles.navbarLinkActive : undefined
      }>
      {name}
    </NavLink>
  )
}
