import React from 'react';
import { Row } from 'react-bootstrap';
import PageTItle from '@/components/PageTItle';
import AddCustomer from './components/AddCustomer';
import { ToastContainer } from 'react-toastify';
export const metadata = {
  title: 'Customer Add'
};
const CustomerAddPage = () => {
  return <>
      <PageTItle title="CREATE CUSTOMER" />
      <ToastContainer />
        <AddCustomer />

    </>;
};
export default CustomerAddPage;