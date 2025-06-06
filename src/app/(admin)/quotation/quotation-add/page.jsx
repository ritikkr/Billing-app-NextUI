import React from 'react';
import { Col, Row } from 'react-bootstrap';
import CategoryEditCard from './components/CategoryEditCard';
import FileUpload from '@/components/FileUpload';
import AddCategory from './components/AddCategory';
import PageTItle from '@/components/PageTItle';
import QuotationForm from './components/QuotationForm';
export const metadata = {
  title: 'Category Add'
};
const CategoryAddPage = () => {
  return <>
      <PageTItle title="CREATE CATEGORY" />
      <QuotationForm />
    </>;
};
export default CategoryAddPage;