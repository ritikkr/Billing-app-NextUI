"use client";
import FileUpload from '@/components/FileUpload';
import ChoicesFormInput from '@/components/form/ChoicesFormInput';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import Link from 'next/link';
import React, { useState } from 'react';
import { Card, CardBody, CardHeader, CardTitle, Col, Row } from 'react-bootstrap';

const AddCustomer = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    email: '',
    contact: '',
    gst: '',
    gstPreference: '',
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
        id === 'gst' ? 'gst' :
        id === 'gst-preferences' ? 'gstPreference' :
        id === 'address' ? 'address' : id]: value
    }));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Example API call
      const res = await fetch('/api/customers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        alert('Customer added!');
      } else {
        alert('Failed to add customer');
      }
    } catch (err) {
      alert('Error: ' + err.message);
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
                  value={formData.gstPreference}
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