"use client";

import { useEffect, useRef, useState } from "react";
import { Card, CardBody, Col, Row, Button, Form, Table } from "react-bootstrap";
import PageTItle from "@/components/PageTItle";
import moment from "moment";
import AxiosInstance from '@/utils/axiosInstance';
const mockItems = [
  { "id": "1", "name": "Product A", "price": 500, "hsn": "1234" },
  { "id": "2", "name": "Product B", "price": 750, "hsn": "5678" }
]
const InvoiceAddPage = () => {
  const [customers, setCustomers] = useState([]);
  const [itemList, setItemList] = useState([]);
  const customerRef = useRef(null);
const invoiceNumberRef = useRef(null);
const notesRef = useRef(null);
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

  const handleItemSelect = (index, selectedItemId) => {
const selectedItem = itemList.find(item => item.id === parseInt(selectedItemId));
  console.log("Selected Item:", selectedItem);
  const updatedItems = [...invoiceItems];
  if (selectedItem) {
    updatedItems[index] = {
      id: selectedItem.id,
      description: selectedItem.name,
      hsn: selectedItem.hsnSacCode,
      rate: selectedItem.unitPrice,
      quantity: 1,
      tax: 0,
    };
    setInvoiceItems(updatedItems);
  }
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
    customerId: parseInt(customerRef.current.value),
    issueDate: invoiceDate,
    dueDate: dueDate,
    notes: notesRef.current.value,
    currency: "INR", // optional
    lineItems: invoiceItems.map((item) => ({
      itemId: item.id,
      quantity: item.quantity,
      unitPriceAtTimeOfBilling: item.rate,
    })),
  };

  console.log("Payload:", payload);

  try {
    const res = await AxiosInstance.post("bills",  payload);
    console.log("Response:", res);
    
  } catch (error) {
    console.error("Error submitting invoice:", error);
  }
};


  useEffect(() => {
  const fetchData = async () => {
    try {
      const [customersRes, itemsRes
        ] = await Promise.all([
        AxiosInstance.get("/customers"),
        AxiosInstance.get("/items"),
      ]);
      setCustomers(customersRes.data);
      setItemList(itemsRes.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  fetchData();
}, []);

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
                      <Form.Control as="select" ref={customerRef} required>
                        <option value="">Select or add a customer</option>
                        {customers.map((cust) => (
                          <option key={cust.id} value={cust.id}>
                            {cust.companyName}
                          </option>
                        ))}
                    </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col lg={3}>
                    <Form.Group>
                      <Form.Label>Invoice#*</Form.Label>
                      <Form.Control type="text" placeholder="SPC-25/26-000003" ref={invoiceNumberRef} required />
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
        <Form.Select
          value={item.id}
          onChange={(e) => handleItemSelect(index, e.target.value)}
        >
          <option value="">Select item</option>
          {itemList.map((it) => (
            <option key={it.id} value={it.id}>
              {it.name}
            </option>
          ))}
        </Form.Select>
      </td>
      <td>
        <Form.Control type="text" value={item.hsn} disabled />
      </td>
      <td>
        <Form.Control type="number" value={item.quantity}  onChange={(e) => handleItemChange(index, "quantity", e.target.value)}/>
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
                      <Form.Control as="textarea" rows={3} defaultValue="Thanks for your business." ref={notesRef} />
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
