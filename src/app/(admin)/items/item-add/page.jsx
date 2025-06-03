import React from 'react';
import { Row } from 'react-bootstrap';
import AddProduct from './components/AddProduct';
import PageTItle from '@/components/PageTItle';
export const metadata = {
  title: 'Product Add'
};
const ProductAddPage = () => {
  return <>
      <PageTItle title="CREATE ITEM" />
      <Row>
        <AddProduct />
      </Row>
    </>;
};
export default ProductAddPage;