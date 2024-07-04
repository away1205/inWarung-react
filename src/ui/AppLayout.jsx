import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

function AppLayout() {
  return (
    <div>
      <Sidebar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
