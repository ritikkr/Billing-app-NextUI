import FileUpload from '@/components/FileUpload';
import ChoicesFormInput from '@/components/form/ChoicesFormInput';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import Link from 'next/link';
import React from 'react';
import { Card, CardBody, CardHeader, CardTitle, Col, Row } from 'react-bootstrap';
const AddProduct = () => {
  return <Col xl={9} lg={8}>
      {/* <FileUpload title="Add Product Photo" /> */}
      <Card>
        <CardHeader>
          <CardTitle as={'h4'}>Item Information</CardTitle>
        </CardHeader>
        <CardBody>
          <Row>
            <Col lg={4}>
              <form>
                <div className="mb-3">
                  <label htmlFor="product-name" className="form-label">
                    Item Name
                  </label>
                  <input type="text" id="product-name" className="form-control" placeholder="Item Name" />
                </div>
              </form>
            </Col>
            <Col lg={4}>
              <form>
                <label htmlFor="item-types" className="form-label">
                  Item Type
                </label>
                <select className="form-control" id="item-types" data-choices data-choices-groups data-placeholder="Select Type" name="choices-single-groups">
                  <option>Choose a type</option>
                  <option value="goods">Goods</option>
                  <option value="service">Service</option>
                </select>
              </form>
            </Col>
            <Col lg={4}>
              <form>
                <div className="mb-3">
                  <label htmlFor="selling-price" className="form-label">
                    Selling Price
                  </label>
                  <input type="number" id="selling-price" className="form-control" placeholder="" />
                </div>
              </form>
            </Col>
          </Row>
          <Row>
            <Col lg={4}>
              <form>
                <div className="mb-3">
                  <label htmlFor="unit-types" className="form-label">
                    Unit
                  </label>
                  <select className="form-control" id="unit-types" data-choices data-choices-groups data-placeholder="Select Unit" name="choices-single-groups">
                  <option>Choose Unit</option>
                  <option value="kg">KG</option>
                  <option value="ltr">Ltr</option>
                </select>
                </div>
              </form>
            </Col>
            <Col lg={4}>
              <form>
                <div className="mb-3">
                  <label htmlFor="product-weight" className="form-label">
                    HSN Code
                  </label>
                  <input type="text" id="product-weight" className="form-control" placeholder="" />
                </div>
              </form>
            </Col>
            <Col lg={4}>
              <form>
                <label htmlFor="tax-preferences" className="form-label">
                  Tax Preferences
                </label>
                <select className="form-control" id="tax-preferences" data-choices data-choices-groups data-placeholder="Select Tax">
                  <option>Choose Tax</option>
                  <option value="taxable">Taxable</option>
                  <option value="non-taxable">Non-Taxable</option>
                  <option value="out-of-scope">Out Of Scope</option>

                </select>
              </form>
            </Col>
          </Row>
         
         
         
          <Row>
            <Col lg={12}>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Description
                </label>
                <textarea className="form-control bg-light-subtle" id="description" rows={4} placeholder="Short description about the product" defaultValue={''} />
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
export default AddProduct;