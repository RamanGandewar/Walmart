-- Insert sample vendors
INSERT INTO vendors (id, name, email, phone, address, payment_terms) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'Procter & Gamble', 'ap@pg.com', '+1-513-983-1100', '1 Procter & Gamble Plaza, Cincinnati, OH 45202', 30),
('550e8400-e29b-41d4-a716-446655440002', 'Unilever', 'invoices@unilever.com', '+44-20-7822-5252', 'Unilever House, 100 Victoria Embankment, London EC4Y 0DY', 45),
('550e8400-e29b-41d4-a716-446655440003', 'Coca-Cola Company', 'ap@coca-cola.com', '+1-404-676-2121', '1 Coca Cola Plaza, Atlanta, GA 30313', 30),
('550e8400-e29b-41d4-a716-446655440004', 'PepsiCo', 'vendor.payments@pepsico.com', '+1-914-253-2000', '700 Anderson Hill Rd, Purchase, NY 10577', 30),
('550e8400-e29b-41d4-a716-446655440005', 'Nestlé', 'ap@nestle.com', '+41-21-924-2111', 'Avenue Nestlé 55, 1800 Vevey, Switzerland', 60);

-- Insert sample invoices
INSERT INTO invoices (id, invoice_number, vendor_id, amount, invoice_date, due_date, po_number, status) VALUES
('660e8400-e29b-41d4-a716-446655440001', 'INV-PG-2024-001234', '550e8400-e29b-41d4-a716-446655440001', 45230.50, '2024-01-15', '2024-02-14', 'PO-789456', 'processed'),
('660e8400-e29b-41d4-a716-446655440002', 'INV-UL-2024-005678', '550e8400-e29b-41d4-a716-446655440002', 12450.00, '2024-01-16', '2024-03-01', 'PO-789457', 'matched'),
('660e8400-e29b-41d4-a716-446655440003', 'INV-CC-2024-009012', '550e8400-e29b-41d4-a716-446655440003', 8920.25, '2024-01-17', '2024-02-16', 'PO-789458', 'pending'),
('660e8400-e29b-41d4-a716-446655440004', 'INV-PC-2024-003456', '550e8400-e29b-41d4-a716-446655440004', 15670.80, '2024-01-18', '2024-02-17', 'PO-789459', 'exception'),
('660e8400-e29b-41d4-a716-446655440005', 'INV-NE-2024-007890', '550e8400-e29b-41d4-a716-446655440005', 22340.15, '2024-01-19', '2024-03-19', 'PO-789460', 'processing');

-- Insert sample invoice items
INSERT INTO invoice_items (invoice_id, description, quantity, unit_price, total_amount) VALUES
('660e8400-e29b-41d4-a716-446655440001', 'Tide Laundry Detergent - 64 loads', 500.00, 12.99, 6495.00),
('660e8400-e29b-41d4-a716-446655440001', 'Pampers Baby Diapers - Size 3', 200.00, 24.99, 4998.00),
('660e8400-e29b-41d4-a716-446655440001', 'Crest Toothpaste - 4.6oz', 1000.00, 3.49, 3490.00),
('660e8400-e29b-41d4-a716-446655440002', 'Dove Beauty Bar Soap - 4 pack', 300.00, 5.99, 1797.00),
('660e8400-e29b-41d4-a716-446655440002', 'Hellmanns Mayonnaise - 30oz', 150.00, 4.49, 673.50);

-- Insert sample processing logs
INSERT INTO processing_logs (invoice_id, step, status, message) VALUES
('660e8400-e29b-41d4-a716-446655440001', 'OCR_EXTRACTION', 'completed', 'Text extraction completed with 98% confidence'),
('660e8400-e29b-41d4-a716-446655440001', 'DATA_VALIDATION', 'completed', 'All required fields validated successfully'),
('660e8400-e29b-41d4-a716-446655440001', 'PO_MATCHING', 'completed', 'Matched to PO-789456'),
('660e8400-e29b-41d4-a716-446655440002', 'OCR_EXTRACTION', 'completed', 'Text extraction completed with 95% confidence'),
('660e8400-e29b-41d4-a716-446655440002', 'DATA_VALIDATION', 'completed', 'All required fields validated successfully');

-- Insert sample vendor communications
INSERT INTO vendor_communications (vendor_id, invoice_id, type, subject, message, sentiment_score) VALUES
('550e8400-e29b-41d4-a716-446655440001', '660e8400-e29b-41d4-a716-446655440001', 'payment_inquiry', 'Payment Status Update', 'Thank you for processing our invoice promptly. We appreciate the efficient handling.', 0.85),
('550e8400-e29b-41d4-a716-446655440002', '660e8400-e29b-41d4-a716-446655440002', 'dispute', 'Invoice Discrepancy', 'We noticed a discrepancy in the quantity billed. Please review and adjust accordingly.', -0.25),
('550e8400-e29b-41d4-a716-446655440003', '660e8400-e29b-41d4-a716-446655440003', 'general', 'Invoice Submission', 'Please find attached our latest invoice for your review and processing.', 0.15),
('550e8400-e29b-41d4-a716-446655440004', '660e8400-e29b-41d4-a716-446655440004', 'urgent', 'Urgent Payment Request', 'This invoice is past due. Please expedite payment to avoid service interruption.', -0.45),
('550e8400-e29b-41d4-a716-446655440005', '660e8400-e29b-41d4-a716-446655440005', 'acknowledgment', 'Invoice Received', 'We confirm receipt of your payment. Thank you for your continued partnership.', 0.75);
