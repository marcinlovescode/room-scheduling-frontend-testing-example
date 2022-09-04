import { BrowserRouter, Route, Routes } from 'react-router-dom';
import StaticPage  from './pages/static'
import AppLayout from './components/appLayout';
import "./App.css"
import { NavItem } from './components/appLayout/sidebar/sidebar';
import RoomsPage from './pages/rooms';

const sidebarNavItems : NavItem[] = [
  {
      display: 'Static',
      to: '/',
      section: ''
  },
  {
      display: 'Rooms',
      to: '/rooms',
      section: 'rooms'
  }
]

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<AppLayout navItems={sidebarNavItems} />}>
            <Route index element={<StaticPage />} />
            <Route path='/rooms/*' element={<RoomsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App
