import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './auth/login';
import Register from './auth/register';
import Adminlayout from './pages/admin/Adminlayout';
import './App.css';
import CustomerLayout from './pages/customer/CustomerLayout';
import AdminDashboardProduct from './pages/admin/AdminDashboardProduct';
import AdminOrders from './pages/admin/AdminOrders';
import AdminAdd from './pages/admin/AdminAdd';
import AdminEdit from './pages/admin/AdminEdit';
import AdminManageUsers from './pages/admin/AdminManageUsers';
import CustomerOrders from './pages/customer/CustomerOrders';
import CustomerStatus from './pages/customer/CustomerStatus';
import StaffLayout from './pages/staff/StaffLayout';
import StaffDashboardProduct from './pages/staff/StaffDashboardProduct';
import CustomerDashboardProduct from './pages/customer/CustomerDashboardProduct';
import AdminStockHistory from './pages/admin/AdminStockHistory';
import StaffOrders from './pages/staff/StaffOrders';
import StaffStatus from './pages/staff/StaffStatus';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/staff" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<Adminlayout />}>
            <Route index element={<AdminDashboardProduct />} />
            <Route path="addmindashboard" element={<AdminDashboardProduct />} />
            <Route path="addminorders" element={<AdminOrders />} />
            <Route path="add" element={<AdminAdd />} />
            <Route path="edit" element={<AdminEdit />} />
            <Route path="manageusers" element={<AdminManageUsers />} />
            <Route path="stockhistory" element={<AdminStockHistory />} />
          </Route>
          <Route path="/customer" element={<CustomerLayout />}>
            <Route index element={<CustomerDashboardProduct />} />
            <Route path="customeerdashboard" element={<CustomerDashboardProduct/>} />
            <Route path="customerorders" element={<CustomerOrders/>} />
            <Route path="customerstatus" element={<CustomerStatus/>} />
          </Route>
          <Route path="/staff" element={<StaffLayout />}>
            <Route index element={<StaffDashboardProduct />} />
            <Route path="staffdashboard" element={<StaffDashboardProduct/>} />
            <Route path="stafforders" element={<StaffOrders/>} />
            <Route path="staffstatus" element={<StaffStatus/>} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;