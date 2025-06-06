import FileUpload from '@/components/FileUpload';
import ChoicesFormInput from '@/components/form/ChoicesFormInput';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import Link from 'next/link';
import React from 'react';
import { Card, CardBody, CardHeader, CardTitle, Col, Row } from 'react-bootstrap';
const AddCustomer = () => {
  return <Col xl={12} lg={12}>
      {/* <FileUpload title="Add Product Photo" /> */}
      <Card>
        <CardHeader>
          <CardTitle as={'h4'}>Customer Information</CardTitle>
        </CardHeader>
        <CardBody>
          <Row>
            <Col lg={6}>
              <form>
                <div className="mb-3">
                  <label htmlFor="company-name" className="form-label">
                    Company Name
                  </label>
                  <input type="text" id="company-name" className="form-control" placeholder="Company Name" />
                </div>
              </form>
            </Col>
            <Col lg={6}>
              <form>
                <label htmlFor="company-email" className="form-label">
                  Email address
                </label>
                <input type="email" id="company-email" className="form-control" placeholder="Email address" />
                
              </form>
            </Col>
          </Row>
          <Row>
            <Col lg={4}>
              <form>
                <div className="mb-3">
                  <label htmlFor="contact" className="form-label">
                    Contact
                  </label>
                  <input type="text" id="contact" className="form-control" placeholder="Contact Number" />
                </div>
              </form>
            </Col>
            <Col lg={4}>
              <form>
                <div className="mb-3">
                  <label htmlFor="gst" className="form-label">
                    GSTIN/UIN
                  </label>
                  <input type="text" id="gst" className="form-control" placeholder="" />
                </div>
              </form>
            </Col>
            <Col lg={4}>
              <form>
                <label htmlFor="gst-preferences" className="form-label">
                  GST Preferences
                </label>
                <select className="form-control" id="gst-preferences" data-choices data-choices-groups data-placeholder="Select Tax">
                  <option>Choose a preference</option>
                  <option value="registered">Registered</option>
                  <option value="unregistered">Unregistered</option>

                </select>
              </form>
            </Col>
          </Row>
         

          <Row>
            <Col lg={12}>
              <div className="mb-3">
                <label htmlFor="address" className="form-label">
                  Address
                </label>
                <textarea className="form-control bg-light-subtle" id="address" rows={4} placeholder="Address" defaultValue={''} />
              </div>
            </Col>
          </Row>
        </CardBody>
      </Card>
     
      <div className="p-3 bg-light mb-3 rounded">
        <Row className="justify-content-end g-2">
          <Col lg={2}>
            <Link href="" className="btn btn-outline-secondary w-100">
              Save
            </Link>
          </Col>
          <Col lg={2}>
            <Link href="" className="btn btn-primary w-100">
              Cancel
            </Link>
          </Col>
        </Row>
      </div>
    </Col>;
};
export default AddCustomer;