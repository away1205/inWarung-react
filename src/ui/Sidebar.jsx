import { useState } from 'react';
import './sidebar.css';

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen((cur) => !cur);
  };

  return (
    <div className={`sidebar h-100 ${!isOpen && 'close'}`}>
      <div id='dismiss' className='mt-3' style={{ fontSize: '30px' }}>
        <span className='' onClick={toggleOpen}>
          X
        </span>
      </div>

      <ul className='nav-links'>
        <li className='item'>
          <div className=' iocn-link'>
            <a href='transaksi.html'>
              <img src='assets/stok-out.png' />
              <span className='link_name'>Transaksi Warung</span>
            </a>
          </div>
        </li>
        <li className='item'>
          <div className='iocn-link'>
            <a href='home.html'>
              <img src='assets/dashboard.png' />
              <span className='link_name'>Laporan Warung</span>
            </a>
          </div>
        </li>
        <li className='item'>
          <div className='iocn-link'>
            <a href='daftar-inventaris.html'>
              <img src='assets/shipping.png' />
              <span className='link_name'>Daftar Inventaris</span>
            </a>
          </div>
        </li>
        <li className='item'>
          <div className=' iocn-link'>
            <a href='rekomendasi.html'>
              <img src='assets/restock.png' />
              <span className='link_name'>Rekomendasi Restok</span>
            </a>
          </div>
        </li>
        <li className='item'>
          <div className=' iocn-link'>
            <a href='profil.html'>
              <img src='assets/profile.png' />
              <span className='link_name'>Profil Saya</span>
            </a>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
