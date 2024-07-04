import { useState } from 'react';
import './sidebar.css';
import { Link } from 'react-router-dom';

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
            <Link to={'/transaksi'}>
              <img src='assets/stok-out.png' />
              <span className='link_name'>Transaksi Warung</span>
            </Link>
          </div>
        </li>
        <li className='item'>
          <div className='iocn-link'>
            <Link to={'/'}>
              <img src='assets/dashboard.png' />
              <span className='link_name'>Laporan Warung</span>
            </Link>
          </div>
        </li>
        <li className='item'>
          <div className='iocn-link'>
            <Link to={'/inventaris'}>
              <img src='assets/shipping.png' />
              <span className='link_name'>Daftar Inventaris</span>
            </Link>
          </div>
        </li>
        <li className='item'>
          <div className=' iocn-link'>
            <a href='rekomendasi.html'>
              <Link to={'/rekomendasi'}>
                <img src='assets/restock.png' />
                <span className='link_name'>Rekomendasi Restok</span>
              </Link>
            </a>
          </div>
        </li>
        <li className='item'>
          <div className=' iocn-link'>
            <Link to={'/profil'}>
              <img src='assets/profile.png' />
              <span className='link_name'>Profil Saya</span>
            </Link>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
