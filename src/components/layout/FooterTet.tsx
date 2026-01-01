import React from 'react';

function FooterTet() {
  return (
    <footer>
      <img
        className="hidden md:block"
        src="/images/footer-pc.png"
        alt="Footer"
      />
      <img className="md:hidden" src="/images/footer-mb.png" alt="Footer" />
    </footer>
  );
}

export default FooterTet;
