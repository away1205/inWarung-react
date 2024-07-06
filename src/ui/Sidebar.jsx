import { useState } from 'react';
import './sidebar.css';
import { Link } from 'react-router-dom';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

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
            <OverlayTrigger
              placement='right'
              // delay={{ show: 250, hide: 250 }}
              overlay={
                <Tooltip id='button-tooltip-2'>Transaksi Warung</Tooltip>
              }
            >
              <Link to={'/transaksi'}>
                <img src='assets/stok-out.png' />
                <span className='link_name'>Transaksi Warung</span>
              </Link>
            </OverlayTrigger>
          </div>
        </li>
        <li className='item'>
          <div className='iocn-link'>
            <OverlayTrigger
              placement='right'
              // delay={{ show: 250, hide: 250 }}
              overlay={<Tooltip id='button-tooltip-2'>Laporan Warung</Tooltip>}
            >
              <Link to={'/dashboard'}>
                <img src='assets/dashboard.png' />
                <span className='link_name'>Laporan Warung</span>
              </Link>
            </OverlayTrigger>
          </div>
        </li>
        <li className='item'>
          <div className='iocn-link'>
            <OverlayTrigger
              placement='right'
              // delay={{ show: 250, hide: 250 }}
              overlay={
                <Tooltip id='button-tooltip-2'>Daftar Inventaris</Tooltip>
              }
            >
              <Link to={'/inventaris'}>
                <img src='assets/shipping.png' />
                <span className='link_name'>Daftar Inventaris</span>
              </Link>
            </OverlayTrigger>
          </div>
        </li>
        <li className='item'>
          <div className=' iocn-link'>
            <OverlayTrigger
              placement='right'
              // delay={{ show: 250, hide: 250 }}
              overlay={
                <Tooltip id='button-tooltip-2'>Rekomendasi Stok</Tooltip>
              }
            >
              <Link to={'/rekomendasi'}>
                <img src='assets/restock.png' />
                <span className='link_name'>Rekomendasi Stok</span>
              </Link>
            </OverlayTrigger>
          </div>
        </li>
        <li className='item'>
          <div className=' iocn-link'>
            <OverlayTrigger
              placement='right'
              // delay={{ show: 250, hide: 250 }}
              overlay={<Tooltip id='button-tooltip-2'>Profil Saya</Tooltip>}
            >
              <Link to={'/profil'}>
                <img src='assets/profile.png' />
                <span className='link_name'>Profil Saya</span>
              </Link>
            </OverlayTrigger>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
