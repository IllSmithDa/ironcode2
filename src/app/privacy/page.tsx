'use client';
import React, { useEffect, useState } from 'react'
import './Privacy.scss';
import { useTheme } from '@/themes/ThemeContext';

export default function Privacy() {
  const [darkMode, setDarkMode] = useState<boolean>();
  const {isDark} = useTheme();

  useEffect(() => {
    if (isDark !== null) {
      setDarkMode(isDark);
    }
  }, [isDark])

  return (
    <section className={`privacy-container ${darkMode ? 'dark': ''}`} >
      <h3>Iron Code Man - Privacy Policy</h3>
      <p>This Privacy Policy governs the manner in which Iron Code Man collects, uses, maintains, and discloses information collected from users (each, a &ldquo;User&ldquo;) of the Iron Code Man website (&ldquo;the Website&ldquo;).</p>

      <h4>1. Personal Identification Information:</h4>
      <p>We may collect personal identification information from Users in various ways, including but not limited to when Users visit our site, register on the site, subscribe to the newsletter, and in connection with other activities, services, features, or resources we make available on our Website.</p>

      <h4>2. Non-personal Identification Information:</h4>
      <p>We may collect non-personal identification information about Users whenever they interact with our Website. Non-personal identification information may include the browser name, the type of computer, and technical information about Users&apos; means of connection to our Website, such as the operating system and the Internet service providers utilized.</p>

      <h4>3. Web Browser Cookies:</h4>
      <p>Our Website may use &ldquo;cookies&ldquo; to enhance User experience. Users may choose to set their web browser to refuse cookies or to alert you when cookies are being sent. If they do so, note that some parts of the Website may not function properly.</p>

      <h4>4. Changes to this Privacy Policy:</h4>
      <p>Iron Code Man has the discretion to update this privacy policy at any time. When we do, we will revise the updated date at the bottom of this page. We encourage Users to frequently check this page for any changes to stay informed about how we are helping to protect the personal information we collect.</p>

      <p>By using the Iron Code Man website, you signify your acceptance of this policy. If you do not agree to this policy, please do not use our Website.</p>

      <p>If you have any questions about this Privacy Policy, the practices of this site, or your dealings with this site, please contact us at <a href="mailto:contact@ironcodeman.com">contact@ironcodeman.com</a>.</p>
    </section>
  )
}
