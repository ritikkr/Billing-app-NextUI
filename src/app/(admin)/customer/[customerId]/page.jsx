"use client";
import userProfile from '@/assets/images/user-profile.png';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import Image from 'next/image';
import { Card, CardBody, CardFooter, CardHeader, CardTitle, Col, Dropdown, DropdownMenu, DropdownToggle, Row } from 'react-bootstrap';
import CustomerDetailsCard from './components/CustomerDetailsCard';
import PageTItle from '@/components/PageTItle';
import Link from 'next/link';
import React from 'react';
import AxiosInstance from '@/utils/axiosInstance';
import { useParams } from 'next/navigation';
const ProfileCard = ({customer}) => {
  return <Card className="overflow-hidden">
      <CardBody>
        <div className="bg-primary profile-bg rounded-top p-5 position-relative mx-n3 mt-n3">
          <Image src={userProfile} alt="avatar" className="avatar-lg border border-light border-3 rounded-circle position-absolute top-100 start-0 translate-middle ms-5" />
        </div>
        <div className="mt-4 pt-3">
          <h4 className="mb-1">
            {' '}
            {customer?.companyName}
            <IconifyIcon icon="bxs:badge-check" className="text-success align-middle" />
          </h4>
          <div className="mt-2">
            {/* <Link href="" className="link-primary fs-15">
              @michael_cus_2024
            </Link> */}
            <p className="fs-15 mb-1 mt-1">
              <span className="text-dark fw-semibold">Email : </span> {customer?.email}
            </p>
            <p className="fs-15 mb-0 mt-1">
              <span className="text-dark fw-semibold">Phone : </span> {customer?.contact}
            </p>
            <p className="fs-15 mb-0 mt-1">
              <span className="text-dark fw-semibold">Tax Id : </span> {customer?.taxId}
            </p>
            <p className="fs-15 mb-0 mt-1">
              <span className="text-dark fw-semibold">Address : </span> {customer?.address}
            </p>
          </div>
        </div>
      </CardBody>
      <CardFooter className="border-top gap-1 hstack">
        {/* <Link href="" className="btn btn-primary w-100">
          Send Message
        </Link>
        <Link href="" className="btn btn-light w-100">
          Analytics
        </Link> */}
        <Link href="" className="btn btn-soft-dark d-inline-flex align-items-center justify-content-center rounded avatar-sm">
          {' '}
          <span>
            <IconifyIcon width={18} height={18} icon="bx:edit-alt" className="fs-18" />
          </span>
        </Link>
      </CardFooter>
    </Card>;
};
const CustomerDetails = () => {
  return <Card>
      <CardHeader className="d-flex align-items-center justify-content-between">
        <div>
          <CardTitle as={'h4'}>Customer Details</CardTitle>
        </div>
        <div>
          <span className="badge bg-success-subtle text-success px-2 py-1">Active User</span>
        </div>
      </CardHeader>
      <CardBody className=" py-2">
        <div className="table-responsive">
          <table className="table mb-0">
            <tbody>
              <tr>
                <td className="px-0">
                  <p className="d-flex mb-0 align-items-center gap-1 fw-semibold text-dark">Account ID : </p>
                </td>
                <td className="text-dark fw-medium px-0">#AC-278699</td>
              </tr>
              <tr>
                <td className="px-0">
                  <p className="d-flex mb-0 align-items-center gap-1 fw-semibold text-dark"> Invoice Email : </p>
                </td>
                <td className="text-dark fw-medium px-0">michaelaminer@dayrep.com</td>
              </tr>
              <tr>
                <td className="px-0">
                  <p className="d-flex mb-0 align-items-center gap-1 fw-semibold text-dark"> Delivery Address : </p>
                </td>
                <td className="text-dark fw-medium px-0">62, rue des Nations Unies 22000 SAINT-BRIEUC</td>
              </tr>
              <tr>
                <td className="px-0">
                  <p className="d-flex mb-0 align-items-center gap-1 fw-semibold text-dark"> Language : </p>
                </td>
                <td className="text-dark fw-medium px-0">English</td>
              </tr>
              <tr>
                <td className="px-0">
                  <p className="d-flex mb-0 align-items-center gap-1 fw-semibold text-dark"> Latest Invoice Id : </p>
                </td>
                <td className="text-dark fw-medium px-0">#INV2540</td>
              </tr>
            </tbody>
          </table>
        </div>
      </CardBody>
    </Card>;
};
const LatestInvoiceCard = ({
  title,
  date
}) => {
  return <div className="d-flex p-2 rounded align-items-center gap-2 bg-light-subtle">
      <div className="avatar bg-primary-subtle d-flex align-items-center justify-content-center rounded-circle">
        <IconifyIcon icon="solar:file-download-bold" className="text-primary fs-3" />
      </div>
      <div className="d-block">
        <Link href="" className="text-dark fw-medium">
          {title}
        </Link>
        <p className="text-muted mb-0 fs-13">{date.toLocaleString('en-us', {
          day: 'numeric',
          month: 'short',
          year: 'numeric'
        })}</p>
      </div>
      <div className="ms-auto text-end">
        <Dropdown>
          <DropdownToggle as={'a'} className="dropdown-toggle arrow-none card-drop p-0" data-bs-toggle="dropdown" aria-expanded="false">
            <IconifyIcon icon="bx:dots-vertical-rounded" />
          </DropdownToggle>
          <DropdownMenu className="dropdown-menu-end">
            <Link href="" className="dropdown-item">
              Download
            </Link>
            <Link href="" className="dropdown-item">
              Share
            </Link>
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>;
};

const CustomerDetailPage =  () => {
  const transactionHistoryData = []
  const latestInvoice = []
   const params = useParams();
  const customerId = params?.customerId;
  const [customerData, setCustomerData] = React.useState(null);
  React.useEffect(() => {
    if (!customerId) return;
    const fetchData = async () => {
      try {
        const { data } = await AxiosInstance.get(`/customers/${customerId}`);
        setCustomerData(data);
      } catch (error) {
        console.error('Error fetching customer data:', error);
      }
    };
    fetchData();
  }, [customerId]);
  return <>
      <PageTItle title="CUSTOMER DETAILS" />
      <Row>
        <Col lg={4}>
          <ProfileCard customer={customerData}/>
        
        </Col>
        <Col lg={8}>
          <Row>
            <CustomerDetailsCard />
          </Row>
  <Card>
            <CardHeader className="border-bottom border-dashed">
              <div className="d-flex align-items-center gap-2">
                <div className="d-block">
                  <CardTitle as={'h4'} className="card-title mb-1">
                    Latest Invoice
                  </CardTitle>
                  <p className="mb-0 text-muted">Total 234 file, 2.5GB space used</p>
                </div>
                <div className="ms-auto">
                  <Link href="" className="btn btn-primary btn-sm">
                    View All
                  </Link>
                </div>
              </div>
            </CardHeader>
            <CardBody>
              {latestInvoice.map((item, idx) => <LatestInvoiceCard key={idx} {...item} />)}
            </CardBody>
          </Card>
          
         
        </Col>
      </Row>
    </>;
};
export default CustomerDetailPage;