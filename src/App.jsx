import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CsrLogin from './pages/CsrLogin'
import WarehouseLogin from './pages/WarehouseLogin'
import Warehouse from './pages/Warehouse'
import Csr from './pages/Csr';
import Headder from './components/Headder';
import "./App.css";
import WarrehouseSSetting from './components/WarrehouseSSetting';
import CsrSetting from './components/CsrSetting';
import Dashboard from './pages/Dashboard';
import WarehouseRegistration from './pages/WarehouseRegistration';
import CsrRegistration from './pages/CsrRegistration';
import UploadProducts from './pages/UploadProducts';
import UpcTable from './components/UpcTable';

function App() {



  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<WarehouseLogin />}/>
        <Route path='/csrlogin' element={<CsrLogin />}/>
        <Route path='/warehouseregistration' element={<WarehouseRegistration />}/>
        <Route path='/csrregistration' element={<CsrRegistration />}/>
        <Route path='/dashboard' element={<Dashboard />}>
          <Route element={<Headder />}/>
          <Route path='/dashboard' element={<UpcTable  />}/>
          <Route path='/dashboard/warehousesetting' element={<WarrehouseSSetting />}/>
          <Route path='/dashboard/csrsetting' element={<CsrSetting />}/>
          <Route path='/dashboard/upload' element={<UploadProducts />}/>
          <Route path='/dashboard/csr' element={<Csr />}/>
          <Route path='/dashboard/warehouse' element={<Warehouse />}/>
          <Route path='/dashboard/packages' element={<UpcTable />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
