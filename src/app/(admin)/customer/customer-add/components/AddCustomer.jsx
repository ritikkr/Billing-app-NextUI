"use client";
import FileUpload from '@/components/FileUpload';
import ChoicesFormInput from '@/components/form/ChoicesFormInput';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import Link from 'next/link';
import React, { useState } from 'react';
import { Alert, Card, CardBody, CardHeader, CardTitle, Col, Row, Toast, ToastBody, ToastHeader } from 'react-bootstrap';
import AxiosInstance from '@/utils/axiosInstance';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const toastify = ({
  props,
  message
}) => {
  toast(message, {
    ...props,
    hideProgressBar: true,
    theme: 'colored',
    icon: false
  });
};
const AddCustomer = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    email: '',
    contact: '',
    taxId: '',
    gstPreferences: '',
    address: '',
  });


  // Handle input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id === 'company-name' ? 'companyName' :
        id === 'company-email' ? 'email' :
        id === 'contact' ? 'contact' :
        id === 'gst' ? 'taxId' :
        id === 'gst-preferences' ? 'gstPreferences' :
        id === 'address' ? 'address' : id]: value
    }));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Example API call
      const res = await AxiosInstance.post('/customers', formData, {
        headers: { 'Content-Type': 'application/json' },
      });
      // Check if the response is ok
      if (res.status === 201) {
        // Handle success (e.g., show message, redirect)
       
        // Reset form after successful submission
        // handleCancel();
         toastify({
        message: 'Customer Added Successfully',
        props: {
          type: 'success',
          position: 'top-right'
        }
      })
      } else {
        // Handle error
        toastify({
          message: 'Failed to add customer',
          props: {
            type: 'error',
            position: 'top-right'
          }
        });
      }
    } catch (err) {
       toastify({
          message: 'Failed to add customer',
          props: {
            type: 'error',
            position: 'top-right'
          }
        });
    }
  };

  // Reset form
  const handleCancel = () => {
    setFormData({
      companyName: '',
      email: '',
      contact: '',
      gst: '',
      gstPreference: '',
      address: '',
    });
  };

  return (
    <Col xl={12} lg={12}>
      {/* <FileUpload title="Add Product Photo" /> */}
      <Card>
        <CardHeader>
          <CardTitle as={'h4'}>Customer Information</CardTitle>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit}>
            <Row>
              <Col lg={6}>
                <div className="mb-3">
                  <label htmlFor="company-name" className="form-label">
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="company-name"
                    className="form-control"
                    placeholder="Company Name"
                    value={formData.companyName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </Col>
              <Col lg={6}>
                <label htmlFor="company-email" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  id="company-email"
                  className="form-control"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Col>
            </Row>
            <Row>
              <Col lg={4}>
                <div className="mb-3">
                  <label htmlFor="contact" className="form-label">
                    Contact
                  </label>
                  <input
                    type="text"
                    id="contact"
                    className="form-control"
                    placeholder="Contact Number"
                    value={formData.contact}
                    onChange={handleChange}
                    required
                  />
                </div>
              </Col>
              <Col lg={4}>
                <div className="mb-3">
                  <label htmlFor="gst" className="form-label">
                    GSTIN/UIN
                  </label>
                  <input
                    type="text"
                    id="gst"
                    className="form-control"
                    placeholder=""
                    value={formData.gst}
                    onChange={handleChange}
                  />
                </div>
              </Col>
              <Col lg={4}>
                <label htmlFor="gst-preferences" className="form-label">
                  GST Preferences
                </label>
                <select
                  className="form-control"
                  id="gst-preferences"
                  data-choices
                  data-choices-groups
                  data-placeholder="Select Tax"
                  value={formData.gstPreferences}
                  onChange={handleChange}
                  required
                >
                  <option value="">Choose a preference</option>
                  <option value="registered">Registered</option>
                  <option value="unregistered">Unregistered</option>
                </select>
              </Col>
            </Row>
            <Row>
              <Col lg={12}>
                <div className="mb-3">
                  <label htmlFor="address" className="form-label">
                    Address
                  </label>
                  <textarea
                    className="form-control bg-light-subtle"
                    id="address"
                    rows={4}
                    placeholder="Address"
                    value={formData.address}
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
                  <button type="button" className="btn btn-primary w-100" onClick={handleCancel}>
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

export default AddCustomer;