"use client";
import FileUpload from '@/components/FileUpload';
import ChoicesFormInput from '@/components/form/ChoicesFormInput';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import AxiosInstance from '@/utils/axiosInstance';
import Link from 'next/link';
import React, { useState } from 'react';
import { Card, CardBody, CardHeader, CardTitle, Col, Row } from 'react-bootstrap';
// HSN codes are meant only specifically for goods and services, and SAC codes specify for services only
const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: '',
    type: 'service', // Default to service
    price: '',
    unit: '',
    hsn: '',
    sac:'',
    tax: '',
    description: '',
  });

  // Handle input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id === 'product-name' ? 'name' :
        id === 'item-types' ? 'type' :
        id === 'selling-price' ? 'price' :
        id === 'unit-types' ? 'unit' :
        id === 'hsn-code' ? 'hsn' :
        id === 'sac-code' ? 'sac' :
        id === 'tax-preferences' ? 'tax' :
        id === 'description' ? 'description' : id]: value
    }));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    const dataForSent = {
      name: formData.name,
      type: formData.type,
      unitPrice: parseFloat(formData.price),
      unitOfMeasure: formData.unit,
      hsnSacCode: formData.type === 'goods' ? formData.hsn : formData.sac,
      taxable: true, // Assuming all items are taxable by default
      description: formData.description,
    }
    try {
      const data = await AxiosInstance.post('/items', dataForSent);
     
        console.log('Item added successfully:', data.data);
        // Reset form after successful submission
        setFormData({
          name: '',
          type: 'service',
          price: '',
          unit: '',
          hsn: '',
          sac:'',
          tax: '',
          description: '',
        });
      
    } catch (err) {
      console.log('Error: ' + err.message);
    }
  };

  return (
    <Col xl={12} lg={12}>
      {/* <FileUpload title="Add Product Photo" /> */}
      <Card>
        <CardHeader>
          <CardTitle as={'h4'}>Item Information</CardTitle>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit}>
            <Row>
              <Col lg={4}>
                <div className="mb-3">
                  <label htmlFor="product-name" className="form-label">
                    Item Name
                  </label>
                  <input
                    type="text"
                    id="product-name"
                    className="form-control"
                    placeholder="Item Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
              </Col>
              <Col lg={4}>
                <label htmlFor="item-types" className="form-label">
                  Item Type
                </label>
                <select
                  className="form-control"
                  id="item-types"
                  data-choices
                  data-choices-groups
                  data-placeholder="Select Type"
                  name="choices-single-groups"
                  value={formData.type}
                  onChange={handleChange}
                  required
                >
                  <option value="">Choose a type</option>
                  <option value="goods">Goods</option>
                  <option value="service">Service</option>
                </select>
              </Col>
              <Col lg={4}>
                <div className="mb-3">
                  <label htmlFor="selling-price" className="form-label">
                    Selling Price
                  </label>
                  <input
                    type="number"
                    id="selling-price"
                    className="form-control"
                    placeholder=""
                    value={formData.price}
                    onChange={handleChange}
                    required
                  />
                </div>
              </Col>
            </Row>
            <Row>
              <Col lg={4}>
                <div className="mb-3">
                  <label htmlFor="unit-types" className="form-label">
                    Unit
                  </label>
                  <select
                    className="form-control"
                    id="unit-types"
                    data-choices
                    data-choices-groups
                    data-placeholder="Select Unit"
                    name="choices-single-groups"
                    value={formData.unit}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Choose Unit</option>
                    <option value="kg">KG</option>
                    <option value="ltr">Ltr</option>
                  </select>
                </div>
              </Col>
              <Col lg={4}>
                {formData.type === "goods" && <div className="mb-3">
                  <label htmlFor="hsn-code" className="form-label">
                    HSN Code
                  </label>
                  <input
                    type="text"
                    id="hsn-code"
                    className="form-control"
                    placeholder=""
                    value={formData.hsn}
                    onChange={handleChange}
                  />
                </div>}
                 {formData.type === "service" && <div className="mb-3">
                  <label htmlFor="sac-code" className="form-label">
                    SAC Code
                  </label>
                  <input
                    type="text"
                    id="sac-code"
                    className="form-control"
                    placeholder=""
                    value={formData.sac}
                    onChange={handleChange}
                  />
                </div>}
              </Col>
              <Col lg={4}>
                <label htmlFor="tax-preferences" className="form-label">
                  Tax Preferences
                </label>
                <select
                  className="form-control"
                  id="tax-preferences"
                  data-choices
                  data-choices-groups
                  data-placeholder="Select Tax"
                  value={formData.tax}
                  onChange={handleChange}
                  required
                >
                  <option value="">Choose Tax</option>
                  <option value="taxable">Taxable</option>
                  <option value="non-taxable">Non-Taxable</option>
                  <option value="out-of-scope">Out Of Scope</option>
                </select>
              </Col>
            </Row>
            <Row>
              <Col lg={12}>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <textarea
                    className="form-control bg-light-subtle"
                    id="description"
                    rows={4}
                    placeholder="Short description about the product"
                    value={formData.description}
                    onChange={handleChange}
                  />
                </div>
              </Col>
            </Row>
            <div className="p-3 bg-light mb-3 rounded">
              <Row className="justify-content-end g-2">
                <Col lg={2}>
                  <button type="submit" className="btn btn-outline-secondary w-100">
                    Save
                  </button>
                </Col>
                <Col lg={2}>
                  <button type="button" className="btn btn-primary w-100" onClick={() => setFormData({
                    name: '',
                    type: '',
                    price: '',
                    unit: '',
                    hsn: '',
                    tax: '',
                    description: '',
                  })}>
                    Cancel
                  </button>
                </Col>
              </Row>
            </div>
          </form>
        </CardBody>
      </Card>
    </Col>
  );
};

export default AddProduct;