import FileUpload from '@/components/FileUpload';
import PageTItle from '@/components/PageTItle';
import { Col, Row } from 'react-bootstrap';
import AddCategory from './components/AddCategory';
import CategoryEditCard from './components/CategoryEditCard';
import QuotationForm from './components/QuotationForm';
export const metadata = {
  title: 'Category Edit'
};
const CategoryEditPage = () => {
  return <>
      <PageTItle title="QUOTATION EDIT" />
        <QuotationForm />
      {/* </Row> */}
    </>;
};
export default CategoryEditPage;