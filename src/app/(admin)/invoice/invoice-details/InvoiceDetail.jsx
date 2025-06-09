"use client";
import Image from 'next/image';
import logoDark from '@/assets/images/logo-dark.png';
import checkImg from '@/assets/images/check-2.png';
import { getProductData } from '@/helpers/data';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { Alert, Card, CardBody, CardTitle, Col, Row } from 'react-bootstrap';
import PageTItle from '@/components/PageTItle';
import Link from 'next/link';
import product1 from '@/assets/images/spc.png';
import React from 'react';
import AxiosInstance from '@/utils/axiosInstance';

const ProductData = async ({productData, currency}) => {
  
  return <Row>
      <Col xs={12}>
        <div className="table-responsive table-borderless text-nowrap table-centered">
          <table className="table mb-0">
            <thead className="bg-light bg-opacity-50">
              <tr>
                <th className="border-0 py-2">Item Name</th>
                <th className="border-0 py-2">Quantity</th>
                <th className="border-0 py-2">Price</th>
                <th className="border-0 py-2">HCN/SAC Code</th>
                <th className="text-end border-0 py-2">Total</th>
              </tr>
            </thead>
            <tbody>
              {productData?.map((item, idx) => <tr key={idx}>
                  <td>
                    <div className="d-flex align-items-center gap-3">
                      {/* <div className="rounded bg-light avatar d-flex align-items-center justify-content-center">
                        <Image src={item.image} alt="product-Image" className="avatar" />
                      </div> */}
                      <div>
                        <Link href="" className="text-dark fw-medium fs-15">
                          {item.itemName}
                        </Link>
                        {/* <p className="text-muted mb-0 mt-1 fs-13">
                          <span>Size : </span>
                          {item.size}
                        </p> */}
                      </div>
                    </div>
                  </td>
                  <td>{item?.quantity}</td>
                  <td>{currency}{item?.unitPriceAtTimeOfBilling}.00</td>
                  <td>{item?.hsnSacCode}</td>
                  <td className="text-end">{currency}{item?.lineTotal}.00</td>
                </tr>)}
            </tbody>
          </table>
        </div>
      </Col>
    </Row>;
};
export const InvoiceDetail = () => {
  const [invoiceData, setInvoiceData] = React.useState();
  const [customerData, setCustomerData] = React.useState();
  const currency = '₹';
  React.useEffect(() => {
    const fetchData = async () => {
      const {data} = await AxiosInstance.get("/bills/1");
      console.log("Invoice Data:", data);
      setInvoiceData(data);
      const customerResponse = await AxiosInstance.get(`/customers/${data.customerId}`);
      console.log("Customer Data:", customerResponse.data);
      setCustomerData(customerResponse.data);
    };
    fetchData();
  }, []);

  const options = {
        filename: 'my-document.pdf',
        margin: [0.2, 0.2, 0.2, 0.2],
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 3 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    };
  return <>
      <PageTItle title="INVOICE DETAILS" />
      <Row className="justify-content-center">
        <Col lg={8}>
          <Card>
            <CardBody>
              <div className="clearfix pb-3  p-lg-3 p-2 m-n2 rounded position-relative">
                <div className="float-sm-start">
                  {/* <div className="auth-logo">
                    <Image className="logo-dark me-1" src={logoDark} alt="logo-dark" height={24} />
                  </div> */}
                  <div className="p-0 pe-5 py-1">
                    <h4>Sudhakar Pest Control</h4>
                    <address className="mt-3 mb-0">
                     639, Gali No. 28, Chandan Vihar, West Sant Nagar
                      <br />
                      Burari, Delhi-110084 <br />
                      <abbr title="Phone">Phone:</abbr> 9650783985
                    </address>
                  </div>
                </div>
                <div className="float-sm-end">
                  <div className="table-responsive">
                    <table className="table table-borderless mb-0">
                      <tbody>
                        <tr>
                          <td className="p-0 pe-5 py-1">
                            <p className="mb-0 text-dark fw-semibold"> Invoice : </p>
                          </td>
                          <td className="text-end text-dark fw-semibold px-0 py-1">{invoiceData?.invoiceNumber}</td>
                        </tr>
                        <tr>
                          <td className="p-0 pe-5 py-1">
                            <p className="mb-0">Issue Date: </p>
                          </td>
                          <td className="text-end text-dark fw-medium px-0 py-1">{invoiceData?.issueDate}</td>
                        </tr>
                        <tr>
                          <td className="p-0 pe-5 py-1">
                            <p className="mb-0">Due Date : </p>
                          </td>
                          <td className="text-end text-dark fw-medium px-0 py-1">{invoiceData?.dueDate}</td>
                        </tr>
                        <tr>
                          <td className="p-0 pe-5 py-1">
                            <p className="mb-0">Amount : </p>
                          </td>
                          <td className="text-end text-dark fw-medium px-0 py-1">{currency}{invoiceData?.totalAmount}</td>
                        </tr>
                        <tr>
                          <td className="p-0 pe-5 py-1">
                            <p className="mb-0">Status : </p>
                          </td>
                          <td className="text-end px-0 py-1">
                            <span className="badge bg-success text-white  px-2 py-1 fs-13">{invoiceData?.status}</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                {/* <div className="position-absolute top-100 start-50 translate-middle">
                  <Image src={checkImg} alt="check-2" className="img-fluid" />
                </div> */}
              </div>
              <div className="clearfix pb-3 mt-4">
                <div className="float-sm-start">
                  <div>
                    <CardTitle as={'h4'}>Issue From :</CardTitle>
                    <div className="mt-3">
                      <h4>Sudhakar Pest Control</h4>
                      <p className="mb-2">639, Gali No. 28, Chandan Vihar, West Sant Nagar <br />
                      Burari, Delhi-110084</p>
                      <p className="mb-2">
                        <span className="text-decoration-underline">Phone :</span> 9650783958
                      </p>
                      <p className="mb-2">
                        <span className="text-decoration-underline">Email :</span> sudhakarpestcontrol@gmail.com
                      </p>
                    </div>
                  </div>
                </div>
                <div className="float-sm-end">
                  <div>
                    <CardTitle as={'h4'}>Issue For :</CardTitle>
                    <div className="mt-3">
                      <h4>{customerData?.companyName}</h4>
                      <p className="mb-2">{customerData?.address}</p>
                      <p className="mb-2">
                        <span className="text-decoration-underline">Phone :</span> {customerData?.contact}
                      </p>
                      <p className="mb-2">
                        <span className="text-decoration-underline">Email :</span> {customerData?.email}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <ProductData productData={invoiceData?.lineItems || []} currency={currency}/>
              <Row className="justify-content-end">
                <Col lg={5} xs={6}>
                  <div className="table-responsive">
                    <table className="table table-borderless mb-0">
                      <tbody>
                        <tr>
                          <td className="text-end p-0 pe-5 py-2">
                            <p className="mb-0"> Sub Total : </p>
                          </td>
                          <td className="text-end text-dark fw-medium  py-2">{currency}{invoiceData?.subtotal}</td>
                        </tr>
                        {/* <tr>
                          <td className="text-end p-0 pe-5 py-2">
                            <p className="mb-0">Discount : </p>
                          </td>
                          <td className="text-end text-dark fw-medium  py-2">-{currency}60.00</td>
                        </tr> */}
                        <tr>
                          <td className="text-end p-0 pe-5 py-2">
                            <p className="mb-0">Estimated Tax (18%) : </p>
                          </td>
                          <td className="text-end text-dark fw-medium  py-2">{currency}{invoiceData?.taxAmount}</td>
                        </tr>
                        <tr className="border-top">
                          <td className="text-end p-0 pe-5 py-2">
                            <p className="mb-0 text-dark fw-semibold">Total Amount : </p>
                          </td>
                          <td className="text-end text-dark fw-semibold  py-2">{currency}{invoiceData?.totalAmount}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </Col>
              </Row>
              <Row className="mt-3">
                <Col lg={12}>
                  <Alert className="alert-danger alert-icon p-2" role="alert">
                    <div className="d-flex align-items-center">
                      <div className="avatar-sm rounded bg-danger d-flex justify-content-center align-items-center fs-18 me-2 flex-shrink-0">
                        <IconifyIcon icon="bx:info-circle" className="text-white" />
                      </div>
                      <div className="flex-grow-1">
                        All accounts are to be paid within 7 days from receipt of invoice. To be paid by cheque or credit card or direct payment
                        online. If account is not paid within 7 days the credits details supplied as confirmation of work undertaken will be charged
                        the agreed quoted fee noted above.
                      </div>
                    </div>
                  </Alert>
                </Col>
              </Row>
              <div className="mt-3 mb-1">
                <div className="text-end d-print-none">
                  <a href="javascript:window.print()" className="btn btn-info width-xl">
                    Print
                  </a>
                  &nbsp;
                  <a href="" className="btn btn-outline-primary width-xl">
                    Submit
                  </a>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>;
};
