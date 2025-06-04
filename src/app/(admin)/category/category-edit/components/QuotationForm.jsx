'use client';

import React, { useRef } from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import TextFormInput from '@/components/form/TextFormInput';
import TextAreaFormInput from '@/components/form/TextAreaFormInput';
import { useReactToPrint } from 'react-to-print';
import html2pdf from 'html2pdf.js';
import product1 from '@/assets/images/spc.png';

const EditableOrDisplay = ({ isEditing, control, name, label, type = 'text', placeholder, rows }) => {
    const value = control._formValues[name];
    if (isEditing) {
        if (type === 'textarea') {
            return (
                <div className="mb-2">
                    <TextAreaFormInput control={control} name={name} label={label} placeholder={placeholder} rows={rows} />
                </div>
            );
        }
        return (
            <div className="mb-2">
                <TextFormInput control={control} name={name} label={label} placeholder={placeholder} type={type} />
            </div>
        );
    }
    return (
        <p className="mb-2">
            <strong>{label}:</strong> {value}
        </p>
    );
};

const QuotationForm = () => {
    const componentRef = useRef();
    const [isEditing, setIsEditing] = React.useState(true);

    const options = {
        filename: 'my-document.pdf',
        margin: [0.2, 0.2, 0.2, 0.2],
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 1.5 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    };

    const quotationSchema = yup.object({
        companyName: yup.string().required('Company name is required'),
        contact1: yup.string().required('Contact number is required'),
        contact2: yup.string(),
        address: yup.string().required('Address is required'),
        refNo: yup.string().required('Reference No. is required'),
        dated: yup.string().required('Date is required'),
        estimateFor: yup.string().required('Estimate details are required'),
        monthlyCharges: yup.number().typeError('Charges must be a number').required('Monthly charges are required').positive('Charges must be positive'),
        gstInfo: yup.string().required('GST information is required'),
        serviceAddress: yup.string().required('Service address is required'),
        bankName: yup.string().required('Bank name is required'),
        accountHolderName: yup.string().required('Account holder name is required'),
        accountNo: yup.string().required('Account number is required'),
        ifscCode: yup.string().required('IFSC code is required'),
    });

    const {
        control,
        handleSubmit,
        reset,
        watch,
    } = useForm({
        resolver: yupResolver(quotationSchema),
        defaultValues: {
            companyName: 'SUDHAKAR PEST CONTROL',
            contact1: '9911721660',
            contact2: '9650783958',
            address: '639, Gali No. 28, Chandan Vihar, West Sant Nagar, Burari, Delhi-110084',
            refNo: 'SPD/2025/001',
            dated: new Date().toISOString().slice(0, 10),
            estimateFor: 'Pest Control for Cockroach, Lizard Housefly, etc.',
            monthlyCharges: 8000,
            gstInfo: 'GST extra as applicable for four services per month',
            serviceAddress: 'Lazypear IIP, Khasra no.620 Zero number road, CBR chowk, Ghitorni, New Delhi - 110030',
            bankName: 'IDBI Bank',
            accountHolderName: 'Sudhakar Pest Control',
            accountNo: '1347102000005692',
            ifscCode: 'IBKL000134',
        },
    });

    const onSubmit = (data) => {
        console.log("Form Data:", data);
        setIsEditing(false);
    };

    const convertToPdf = () => {
        const content = componentRef.current;
        html2pdf().set(options).from(content).save();
    };

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: `Quotation_${watch('companyName')}_${watch('refNo')}`,
        pageStyle: `
            @page {
                size: A4;
                margin: 20mm;
            }
            body {
                font-family: Arial, sans-serif;
                font-size: 10pt;
            }
            .no-print {
                display: none;
            }
            img {
                max-width: 100%;
                height: auto;
                display: block;
            }
        `,
        onBeforeGetContent: async () => {
            await new Promise((resolve) => setTimeout(resolve, 500));
            return Promise.resolve();
        },
        onAfterPrint: () => {
            console.log("Printing finished or cancelled.");
        }
    });

    const formValues = watch();

    return (
        <div className="container mt-4">
            <div className="mb-3 no-print">
                <Button onClick={() => setIsEditing(!isEditing)} className="me-2">
                    {isEditing ? 'View Mode' : 'Edit Mode'}
                </Button>
                <Button onClick={convertToPdf}>Download as PDF</Button>
            </div>

            <div ref={componentRef}>
                <form onSubmit={handleSubmit(onSubmit)} className="mb-4">
                    <Card className="p-4">
                        {/* Header Section */}
                        <div className="mb-4">
                            <Row className="align-items-center">
                                <Col md={3} className="text-center">
                                    <img src={product1.src} alt="Company Logo" style={{ maxWidth: '100%', height: 'auto', objectFit: 'contain' }} />
                                </Col>
                                <Col md={9}>
                                    <div style={{ textAlign: isEditing ?'center': 'right' }}>
                                        <h2 className="mb-0">
                                            {isEditing ? <TextFormInput control={control} name="companyName" label="Company Name" placeholder="Enter Company Name" /> : formValues.companyName}
                                        </h2>
                                        <h4 className="mb-1">PEST CONTROL</h4>
                                        <p className="mb-1">
                                            {isEditing ? <TextFormInput control={control} name="contact1" label="Contact 1" placeholder="Enter Contact No." /> : formValues.contact1}
                                            {formValues.contact2 && (
                                                <>
                                                    {' / '}
                                                    {isEditing ? <TextFormInput control={control} name="contact2" label="Contact 2" placeholder="Enter Contact No." /> : formValues.contact2}
                                                </>
                                            )}
                                        </p>
                                        <p className="mb-1">Deals In: All Type of Pest Control Like-</p>
                                        <p className="mb-3">Cockroach, Termite, Mosquitoes, Lizard, Housefly etc.</p>
                                        <p className="mb-0">
                                            {isEditing ? <TextAreaFormInput control={control} name="address" label="Address" placeholder="Enter Address" rows={2} /> : formValues.address}
                                        </p>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                        <hr />

                        {/* Main Content Section */}
                        <Row className="mb-3">
                            <Col md={6}>
                                <EditableOrDisplay isEditing={isEditing} control={control} name="refNo" label="Ref. No" />
                            </Col>
                            <Col md={6} className="text-md-end">
                                <EditableOrDisplay isEditing={isEditing} control={control} name="dated" label="Dated" type="date" />
                            </Col>
                        </Row>

                        <h4 className="mb-3">Estimate</h4>
                        <div className="mb-3">
                            <EditableOrDisplay isEditing={isEditing} control={control} name="estimateFor" label="Estimate For" type="textarea" rows={2} />
                        </div>

                        <Row className="mb-3 align-items-center">
                            <Col md={6}>
                                <EditableOrDisplay isEditing={isEditing} control={control} name="monthlyCharges" label="Charges (Monthly)" type="number" />
                            </Col>
                            <Col md={6}>
                                <EditableOrDisplay isEditing={isEditing} control={control} name="gstInfo" label="GST" />
                            </Col>
                        </Row>

                        <div className="mb-4">
                            <EditableOrDisplay isEditing={isEditing} control={control} name="serviceAddress" label="Service Address" type="textarea" rows={2} />
                        </div>
                        <hr />

                        {/* Bank Details Section */}
                        <h5 className="mb-3">Bank Details:</h5>
                        <Row>
                            <Col md={6}>
                                <EditableOrDisplay isEditing={isEditing} control={control} name="bankName" label="Bank Name" />
                            </Col>
                            <Col md={6}>
                                <EditableOrDisplay isEditing={isEditing} control={control} name="accountHolderName" label="Account Holder Name" />
                            </Col>
                            <Col md={6}>
                                <EditableOrDisplay isEditing={isEditing} control={control} name="accountNo" label="Account No" />
                            </Col>
                            <Col md={6}>
                                <EditableOrDisplay isEditing={isEditing} control={control} name="ifscCode" label="IFSC Code" />
                            </Col>
                        </Row>
                    </Card>

                    {/* Save and Reset Buttons */}
                    {isEditing && (
                        <div className="p-3 bg-light mt-3 rounded no-print">
                            <Row className="justify-content-end g-2">
                                <Col lg={2}>
                                    <Button variant="primary" type="submit" className="w-100">
                                        Save Quotation
                                    </Button>
                                </Col>
                                <Col lg={2}>
                                    <Button variant="outline-secondary" onClick={() => reset()} className="w-100">
                                        Reset
                                    </Button>
                                </Col>
                            </Row>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default QuotationForm;
