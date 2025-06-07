"use client";

import { useState } from "react";
import { Card, CardBody, Col, Row, Button, Form, Table } from "react-bootstrap";
import PageTItle from "@/components/PageTItle";
import moment from "moment";

const InvoiceAddPage = () => {
  const [invoiceDate, setInvoiceDate] = useState(moment().format("YYYY-MM-DD"));
  const [dueDate, setDueDate] = useState(moment().add(7, "days").format("YYYY-MM-DD"));
  const [invoiceItems, setInvoiceItems] = useState([
    { description: "", quantity: 1, rate: 0, tax: 0, hsn: "" },
  ]);
  const [discount, setDiscount] = useState(0);
  const GST_RATE = 18;

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...invoiceItems];
    updatedItems[index][field] = field === "quantity" || field === "rate" || field === "tax" ? parseFloat(value) : value;
    setInvoiceItems(updatedItems);
  };

  const handleAddRow = () => {
  setInvoiceItems([...invoiceItems, { description: "", hsn: "", quantity: 1, rate: 0, tax: 0 }]);
};

  const handleRemoveRow = (index) => {
    setInvoiceItems(invoiceItems.filter((_, i) => i !== index));
  };

  const calculateAmount = (item) => item.quantity * item.rate;
  const subTotal = invoiceItems.reduce((sum, item) => sum + calculateAmount(item), 0);
  const discountAmount = (subTotal * discount) / 100;
  const taxableAmount = subTotal - discountAmount;
  const gstAmount = (taxableAmount * GST_RATE) / 100;
  const totalAmount = taxableAmount + gstAmount;

  const amountInWords = (num) => {
    const formatter = new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
    });
    return formatter.format(num);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      invoiceDate,
      dueDate,
      items: invoiceItems,
      discount,
      gstRate: GST_RATE,
      totalAmount,
    };
    console.log("Submitting", payload);
  };

  return (
    <>
      <PageTItle title="Create Invoice" />
      <Row className="justify-content-center">
        <Col lg={10}>
          <Card>
            <CardBody>
              <Form onSubmit={handleSubmit}>
                <Row className="mb-4">
                  <Col lg={6}>
                    <Form.Group>
                      <Form.Label>Customer Name*</Form.Label>
                      <Form.Control as="select">
                        <option>Select or add a customer</option>
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col lg={3}>
                    <Form.Group>
                      <Form.Label>Invoice#*</Form.Label>
                      <Form.Control type="text" placeholder="SPC-25/26-000003" />
                    </Form.Group>
                  </Col>
                  <Col lg={3}>
                    <Form.Group>
                      <Form.Label>Invoice Date*</Form.Label>
                      <Form.Control type="date" value={invoiceDate} onChange={(e) => setInvoiceDate(e.target.value)} />
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-4">
                  <Col lg={6}>
                    <Form.Group>
                      <Form.Label>Terms</Form.Label>
                      <Form.Control as="select">
                        <option>Due on Receipt</option>
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col lg={6}>
                    <Form.Group>
                      <Form.Label>Due Date</Form.Label>
                      <Form.Control type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
                    </Form.Group>
                  </Col>
                </Row>

                <h5 className="mb-3">Item Table</h5>
                <Table bordered responsive>
                  <thead>
  <tr>
    <th>Item Details</th>
    <th>HSN/SAC</th>
    <th>Quantity</th>
    <th>Rate</th>
    <th>Amount</th>
    <th></th>
  </tr>
</thead>
                  <tbody>
  {invoiceItems.map((item, index) => (
    <tr key={index}>
      <td>
        <Form.Control
          type="text"
          value={item.description}
          onChange={(e) => handleItemChange(index, "description", e.target.value)}
        />
      </td>
      <td>
        <Form.Control
          type="text"
          value={item.hsn}
          onChange={(e) => handleItemChange(index, "hsn", e.target.value)}
        />
      </td>
      <td>
        <Form.Control
          type="number"
          value={item.quantity}
          onChange={(e) => handleItemChange(index, "quantity", e.target.value)}
        />
      </td>
      <td>
        <Form.Control
          type="number"
          value={item.rate}
          onChange={(e) => handleItemChange(index, "rate", e.target.value)}
        />
      </td>
     
      <td>{calculateAmount(item).toFixed(2)}</td>
      <td>
        <Button variant="danger" size="sm" onClick={() => handleRemoveRow(index)}>
          &times;
        </Button>
      </td>
    </tr>
  ))}
</tbody>
                </Table>

                <div className="d-flex gap-3 mb-4">
                  <Button variant="outline-primary" onClick={handleAddRow}>
                    + Add New Row
                  </Button>
                  <Button variant="outline-secondary">📦 Add Items in Bulk</Button>
                </div>

                <Row className="mb-3">
                  <Col>
                    <Form.Group>
                      <Form.Label>Customer Notes</Form.Label>
                      <Form.Control as="textarea" rows={3} defaultValue="Thanks for your business." />
                    </Form.Group>
                  </Col>
                  <Col lg={4}>
                    <div className="text-end">
                      <p><strong>Sub Total:</strong> ₹{subTotal.toFixed(2)}</p>
                      <p><strong>Discount:</strong> 
                        <Form.Control
                          type="number"
                          value={discount}
                          onChange={(e) => setDiscount(parseFloat(e.target.value))}
                          style={{ display: 'inline-block', width: 80, marginLeft: 10 }}
                        />%
                      </p>
                      <p><strong>GST ({GST_RATE}%):</strong> ₹{gstAmount.toFixed(2)}</p>
                      <p><strong>Total (₹):</strong> ₹{totalAmount.toFixed(2)}</p>
                      <p><small>{amountInWords(totalAmount)}</small></p>
                    </div>
                  </Col>
                </Row>

                <div className="text-end mt-4">
                  <Button variant="outline-secondary" className="me-2">
                    Cancel
                  </Button>
                  <Button variant="secondary" className="me-2">
                    Save as Draft
                  </Button>
                  <Button variant="primary" type="submit">
                    Save and Send
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default InvoiceAddPage;
