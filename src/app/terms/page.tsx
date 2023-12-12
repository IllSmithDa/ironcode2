'use client';
import React, { useEffect, useState } from 'react';
import './Terms.scss';
import { useTheme } from '@/themes/ThemeContext';
export default function Terms() {
  const [darkMode, setDarkMode] = useState<boolean>();
  const {isDark} = useTheme();

  useEffect(() => {
    if (isDark !== null) {
      setDarkMode(isDark);
    }
  }, [isDark])
  return (
    <section className={`terms-container ${darkMode ? 'dark': ''}`}>
      <h3>Iron Code Man - Terms and Conditions</h3>
      <p>These Terms and Conditions (&ldquo;Terms&ldquo;) govern your use of the Iron Code Man website (&ldquo;the Website&ldquo;). By accessing or using the Website, you agree to be bound by these Terms. If you do not agree with any part of these Terms, you may not use the Website.</p>

      <h3>Intellectual Property:</h3>
      <p>All content on the Website, including but not limited to text, graphics, logos, images, and software, is the property of Iron Code Man or its content suppliers and is protected by international copyright laws.
      </p>

      <h3>Use of Content:</h3>
      <p>You may access and use the content on the Website for personal, non-commercial purposes only. Any other use, including reproduction, modification, distribution, or republication, without the prior written consent of Iron Code Man, is strictly prohibited.</p>

      <h3>User Conduct:</h3>
      <p>You agree not to engage in any conduct that may disrupt the functionality of the Website or interfere with other users&apos; access to the content. This includes but is not limited to unauthorized access, data scraping, or any other activity that violates these Terms.</p>

      <h3>Third-Party Links:</h3>
      <p>The Website may contain links to third-party websites. Iron Code Man is not responsible for the content, accuracy, or reliability of these third-party sites. The inclusion of any link does not imply endorsement by Iron Code Man.</p>

      <h3>Privacy Policy:</h3>
      <p>Your use of the Website is also governed by our Privacy Policy, which can be found here. By using the Website, you consent to the terms of our Privacy Policy.</p>

      <h3>Disclaimer of Warranties:</h3>
      <p>The content on the Website is provided &ldquo;as is&ldquo; and without warranties of any kind, either expressed or implied. Iron Code Man disclaims all warranties, including but not limited to the accuracy, completeness, or reliability of the content.</p>

      <h3>Limitation of Liability:</h3>
      <p>Iron Code Man, its affiliates, or contributors shall not be liable for any direct, indirect, incidental, special, or consequential damages arising out of the use or inability to use the Website.</p>

      <h3>Modification of Terms:</h3>
      <p>Iron Code Man reserves the right to modify these Terms at any time. Your continued use of the Website after any changes indicates your acceptance of the modified Terms.</p>

      <h3>Termination:</h3>
      <p>Iron Code Man reserves the right to terminate or suspend your access to the Website without prior notice for any violation of these Terms or for any other reason.</p>

      <h3>Governing Law:</h3>
      <p>These Terms are governed by and construed in accordance with the laws of the United States, and any disputes shall be subject to the exclusive jurisdiction of the courts in the United States.
      By using the Iron Code Man website, you agree to abide by these Terms and Conditions. If you have any questions or concerns, please contact us at <a href="mailto:contact@ironcodeman.com">contact@ironcodeman.com</a>.</p>
    </section>
  )
}
