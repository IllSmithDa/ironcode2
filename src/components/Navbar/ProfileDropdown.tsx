import { User } from '@/types';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, {useState, useEffect} from 'react';
import { logout } from '../Auth/UserHandler';
import { useTheme } from '@/themes/ThemeContext';

export default function ProfileDropdown({ userData }: { userData: User}) {
  const [toggleModal, setToggleModal] = useState<boolean>(false);
  const [darkMode, setDarkMode] = useState<boolean>();
  const {isDark, toggleTheme} = useTheme();
  useEffect(() => {
    if (isDark !== null) {
      setDarkMode(isDark);
    }
  }, [isDark])
  return (
    <>
      <li className='app-icons'>
        {
          userData?.username ? 
            <FontAwesomeIcon
            icon={faUser}
            tabIndex={0}
            aria-label='light mode icon'
            onClick={() => setToggleModal(!toggleModal)}
          />:
          <></>
        }
      </li>
      {
        toggleModal ?
        <section className={`profile-nav ${darkMode ? 'dark': ''}`}>
          <button onClick={() => logout()}>Logout</button>
        </section>:
        <></>
      }
      {
        toggleModal? 
        <div className='silent-modal' onClick={() => {
          setToggleModal(false);
        }}></div>:
        <></>
      }
    </>
  )
}
