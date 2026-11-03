import {
  ProjectRecord, LeadRecord, ChannelPartnerRecord, CommissionLedgerEntry,
  InventoryUnit, BookingRecord, EmployeeRecord, DPRRecord, SiteTaskRecord,
  MaterialRecord, MaterialMovementRecord, VendorRecord, PurchaseOrderRecord,
  BillExpenseRecord, ApprovalItem, ActivityItem, BrandSettings,
} from '../types';

export const INITIAL_BRAND_SETTINGS: BrandSettings = {
  companyName: 'NEXORA DEVELOPERS',
  tagline: 'Landmark Residential & Commercial Spaces Across MMR',
  logoText: 'NX',
  primaryNavy: '#14263D',
  accentBlue: '#2864A6',
  domain: 'crm.nexoradevelopers.in',
  supportEmail: 'desk@nexoradevelopers.demo',
  corporateAddress: 'Level 9, Nexora Corporate Tower, Kalyan-Shil Road, MMR, Maharashtra 421204',
  reraMasterId: 'CORP-RERA-MH-2026-DEMO',
  planName: 'Enterprise White-Label Multi-Project Suite',
  notifications: { whatsappLeads: true, dailyDprDigest: true, lowStockSms: true, poApprovalAlerts: true, bookingEmails: true },
};

export const INITIAL_PROJECTS: ProjectRecord[] = [
  {
    id: 'proj-1', name: 'Nexora Heights', location: 'Dombivli East, Palava-Kalyan Road', city: 'Dombivli East',
    type: 'Residential', configuration: '2 BHK & 3 BHK Smart Homes', reraNumber: 'P51700099101 (DEMO)',
    totalUnits: 96, soldUnits: 64, holdUnits: 6, availableUnits: 26, activeLeadsCount: 54, cpCount: 18,
    monthlyBookings: 8, monthlySalesCr: 5.4, totalSalesCr: 46.8, progress: 72, towers: ['Tower A', 'Tower B'],
    floors: 12, launchDate: '2025-02-15', completionDate: '2027-06-30', projectManager: 'Vikramaditya Deshmukh',
    siteEngineer: 'Rohan Kulkarni', salesManager: 'Priya Nair', budgetCr: 62.0, actualSpendCr: 44.2, workforceCount: 142,
    milestones: [
      { stage: 'Foundation', progress: 100, status: 'Completed', updatedAt: '2025-06-10' },
      { stage: 'Plinth', progress: 100, status: 'Completed', updatedAt: '2025-09-22' },
      { stage: 'Structure', progress: 95, status: 'In Progress', updatedAt: '2026-10-18' },
      { stage: 'Brickwork', progress: 80, status: 'In Progress', updatedAt: '2026-10-28' },
      { stage: 'MEP', progress: 45, status: 'In Progress', updatedAt: '2026-10-30' },
      { stage: 'Finishing', progress: 15, status: 'In Progress', updatedAt: '2026-10-31' },
    ],
    amenities: ['Rooftop Sky Lounge', 'Clubhouse & Gym', 'EV Charging Bays', '24x7 CCTV & Smart Access', 'Children Play Zone'],
  },
  {
    id: 'proj-2', name: 'Nexora Skyview', location: 'Thane West, Ghodbunder Highway', city: 'Thane',
    type: 'Residential', configuration: '2 BHK, 3 BHK & 4 BHK Deck Residences', reraNumber: 'P51700099202 (DEMO)',
    totalUnits: 88, soldUnits: 52, holdUnits: 5, availableUnits: 31, activeLeadsCount: 44, cpCount: 14,
    monthlyBookings: 6, monthlySalesCr: 4.3, totalSalesCr: 68.4, progress: 48, towers: ['Wing A', 'Wing B'],
    floors: 11, launchDate: '2025-08-01', completionDate: '2028-03-31', projectManager: 'Sandeep Sawant',
    siteEngineer: 'Aniket Jadhav', salesManager: 'Karan Malhotra', budgetCr: 85.0, actualSpendCr: 39.5, workforceCount: 118,
    milestones: [
      { stage: 'Foundation', progress: 100, status: 'Completed', updatedAt: '2025-12-14' },
      { stage: 'Plinth', progress: 100, status: 'Completed', updatedAt: '2026-03-20' },
      { stage: 'Structure', progress: 65, status: 'In Progress', updatedAt: '2026-10-29' },
      { stage: 'Brickwork', progress: 25, status: 'In Progress', updatedAt: '2026-10-30' },
      { stage: 'MEP', progress: 0, status: 'Upcoming', updatedAt: '2026-10-01' },
      { stage: 'Finishing', progress: 0, status: 'Upcoming', updatedAt: '2026-10-01' },
    ],
    amenities: ['Infinity Lap Pool', 'Co-Working Lounge', 'Jogging Track', 'Mini Theatre', 'Biometric Lobby'],
  },
  {
    id: 'proj-3', name: 'Nexora Business Park', location: 'Kalyan West, Khadakpada Commercial Hub', city: 'Kalyan',
    type: 'Commercial', configuration: 'High-Street Retail & Grade-A Smart Offices', reraNumber: 'P51700099303 (DEMO)',
    totalUnits: 64, soldUnits: 38, holdUnits: 4, availableUnits: 22, activeLeadsCount: 28, cpCount: 10,
    monthlyBookings: 4, monthlySalesCr: 2.8, totalSalesCr: 34.2, progress: 85, towers: ['Commercial Plaza'],
    floors: 8, launchDate: '2024-11-10', completionDate: '2027-01-15', projectManager: 'Vikramaditya Deshmukh',
    siteEngineer: 'Siddharth Patil', salesManager: 'Neha Joshi', budgetCr: 48.0, actualSpendCr: 38.8, workforceCount: 86,
    milestones: [
      { stage: 'Foundation', progress: 100, status: 'Completed', updatedAt: '2025-02-18' },
      { stage: 'Plinth', progress: 100, status: 'Completed', updatedAt: '2025-05-12' },
      { stage: 'Structure', progress: 100, status: 'Completed', updatedAt: '2026-01-25' },
      { stage: 'Brickwork', progress: 100, status: 'Completed', updatedAt: '2026-05-19' },
      { stage: 'MEP', progress: 78, status: 'In Progress', updatedAt: '2026-10-27' },
      { stage: 'Finishing', progress: 42, status: 'In Progress', updatedAt: '2026-10-31' },
    ],
    amenities: ['Double-Height Glass Atrium', 'High-Speed Elevators (6)', '100% DG Power Backup', 'Multi-Level Stack Parking', 'Conference Pods'],
  },
];

export const MONTHLY_SALES_CHART_DATA = [
  { month: 'May', heights: 3.8, skyview: 2.9, businessPark: 1.8, total: 8.5, target: 9.0 },
  { month: 'Jun', heights: 4.1, skyview: 3.4, businessPark: 2.1, total: 9.6, target: 9.5 },
  { month: 'Jul', heights: 4.5, skyview: 3.6, businessPark: 2.0, total: 10.1, target: 10.0 },
  { month: 'Aug', heights: 4.8, skyview: 3.9, businessPark: 2.3, total: 11.0, target: 10.5 },
  { month: 'Sep', heights: 5.0, skyview: 4.1, businessPark: 2.5, total: 11.6, target: 11.5 },
  { month: 'Oct', heights: 5.4, skyview: 4.3, businessPark: 2.8, total: 12.5, target: 12.0 },
];

export const LEAD_SOURCE_CHART_DATA = [
  { name: 'Channel Partners', value: 48, percentage: 38, color: '#2864A6' },
  { name: 'Digital Campaigns', value: 34, percentage: 27, color: '#14263D' },
  { name: 'Direct Walk-ins', value: 20, percentage: 16, color: '#0EA5E9' },
  { name: 'Property Portals', value: 15, percentage: 12, color: '#6366F1' },
  { name: 'Customer Referrals', value: 9, percentage: 7, color: '#10B981' },
];

export const INITIAL_LEADS: LeadRecord[] = [
  {
    id: 'LD-1001', name: 'Aarav Mehta', phone: '+91 98201 44510', email: 'aarav.mehta@example.demo',
    projectId: 'proj-1', projectName: 'Nexora Heights', source: 'Channel Partner', cpAgency: 'PropVista Realty Advisory',
    assignedTo: 'Rahul Sharma', status: 'Site Visit', followUpDate: '2026-11-03', budget: '₹72 L - ₹78 L',
    configurationInterest: '2 BHK (745 sq.ft)', createdAt: '2026-10-24',
    notes: [
      { id: 'n1', timestamp: '2026-10-28 11:30 AM', author: 'Rahul Sharma', type: 'Site Visit', text: 'Visited sample flat with family. Liked East-facing A-802 unit on 8th floor.' },
      { id: 'n2', timestamp: '2026-10-30 04:15 PM', author: 'Priya Nair', type: 'Call', text: 'Shared all-inclusive cost sheet and HDFC pre-approved project loan brochure.' },
    ],
  },
  {
    id: 'LD-1002', name: 'Sneha & Kunal Deshpande', phone: '+91 98194 77823', email: 'sneha.deshpande@example.demo',
    projectId: 'proj-1', projectName: 'Nexora Heights', source: 'Digital Ads', assignedTo: 'Rahul Sharma',
    status: 'Negotiation', followUpDate: '2026-11-02', budget: '₹92 L - ₹98 L', configurationInterest: '3 BHK (980 sq.ft)', createdAt: '2026-10-20',
    notes: [{ id: 'n3', timestamp: '2026-10-29 03:00 PM', author: 'Rahul Sharma', type: 'Note', text: 'Client ready with ₹5L booking token. Requested floor-rise waiver on Tower B 10th floor.' }],
  },
  {
    id: 'LD-1003', name: 'Dr. Rajeshwar Iyer', phone: '+91 98212 33901', email: 'dr.iyer@clinic.demo',
    projectId: 'proj-2', projectName: 'Nexora Skyview', source: 'Channel Partner', cpAgency: 'Thane Homes Network',
    assignedTo: 'Aditi Verma', status: 'Qualified', followUpDate: '2026-11-04', budget: '₹1.45 Cr - ₹1.60 Cr',
    configurationInterest: '3 BHK Deck (1180 sq.ft)', createdAt: '2026-10-26',
    notes: [{ id: 'n4', timestamp: '2026-10-27 05:20 PM', author: 'Aditi Verma', type: 'Call', text: 'Scheduled weekend site visit at Ghodbunder experience center.' }],
  },
  {
    id: 'LD-1004', name: 'Manish Patel (Patel Enterprises)', phone: '+91 98670 11298', email: 'manish@patelent.demo',
    projectId: 'proj-3', projectName: 'Nexora Business Park', source: 'Walk-in', assignedTo: 'Neha Joshi',
    status: 'Negotiation', followUpDate: '2026-11-02', budget: '₹85 L - ₹95 L', configurationInterest: 'Office Suite (680 sq.ft)', createdAt: '2026-10-19',
    notes: [{ id: 'n5', timestamp: '2026-10-30 12:10 PM', author: 'Neha Joshi', type: 'Site Visit', text: 'Inspected Unit C-402 & C-403 for combined CA/Consultancy office setup.' }],
  },
  {
    id: 'LD-1005', name: 'Pooja & Saurabh Gokhale', phone: '+91 99204 55612', email: 'saurabh.g@example.demo',
    projectId: 'proj-1', projectName: 'Nexora Heights', source: 'Referral', assignedTo: 'Rahul Sharma',
    status: 'Booked', followUpDate: '2026-11-10', budget: '₹68.5 L', configurationInterest: '2 BHK (745 sq.ft)', createdAt: '2026-10-10',
    notes: [{ id: 'n6', timestamp: '2026-10-25 06:00 PM', author: 'Priya Nair', type: 'Status Change', text: 'Booked Unit A-501. Token NEFT received ₹2,00,000.' }],
  },
  {
    id: 'LD-1006', name: 'Vikramjit Singhania', phone: '+91 98331 90872', email: 'vikramjit.s@example.demo',
    projectId: 'proj-2', projectName: 'Nexora Skyview', source: 'Property Portal', assignedTo: 'Aditi Verma',
    status: 'New', followUpDate: '2026-11-02', budget: '₹1.85 Cr+', configurationInterest: '4 BHK Sky Villa (1540 sq.ft)', createdAt: '2026-10-31',
    notes: [{ id: 'n7', timestamp: '2026-10-31 10:00 AM', author: 'System', type: 'Note', text: 'High-intent portal enquiry received for Wing A upper-floor deck apartment.' }],
  },
  {
    id: 'LD-1007', name: 'Farhan Shaikh', phone: '+91 97692 84110', email: 'farhan.shaikh@example.demo',
    projectId: 'proj-3', projectName: 'Nexora Business Park', source: 'Channel Partner', cpAgency: 'Kalyan Commercial Brokers',
    assignedTo: 'Neha Joshi', status: 'Contacted', followUpDate: '2026-11-05', budget: '₹1.20 Cr', configurationInterest: 'Ground Retail Showroom (520 sq.ft)', createdAt: '2026-10-29',
    notes: [{ id: 'n8', timestamp: '2026-10-29 02:30 PM', author: 'Neha Joshi', type: 'Call', text: 'Sent retail frontage visibility plan and rental yield projection.' }],
  },
  {
    id: 'LD-1008', name: 'Meenal & Pradeep Chavan', phone: '+91 98208 61239', email: 'pradeep.chavan@example.demo',
    projectId: 'proj-1', projectName: 'Nexora Heights', source: 'Walk-in', assignedTo: 'Rahul Sharma',
    status: 'Qualified', followUpDate: '2026-11-03', budget: '₹70 L', configurationInterest: '2 BHK (745 sq.ft)', createdAt: '2026-10-27',
    notes: [{ id: 'n9', timestamp: '2026-10-28 04:00 PM', author: 'Rahul Sharma', type: 'Call', text: 'Looking for Vastu-compliant East entry unit in Tower A.' }],
  },
  {
    id: 'LD-1009', name: 'Nikhil Bhanushali', phone: '+91 98190 42105', email: 'nikhil.b@example.demo',
    projectId: 'proj-2', projectName: 'Nexora Skyview', source: 'Digital Ads', assignedTo: 'Aditi Verma',
    status: 'Site Visit', followUpDate: '2026-11-02', budget: '₹1.15 Cr', configurationInterest: '2 BHK Luxe (860 sq.ft)', createdAt: '2026-10-22',
    notes: [{ id: 'n10', timestamp: '2026-10-29 11:45 AM', author: 'Aditi Verma', type: 'Site Visit', text: 'First visit completed. Returning with parents on Sunday.' }],
  },
  {
    id: 'LD-1010', name: 'Rituja & Mandar Joshi', phone: '+91 98701 32944', email: 'mandar.joshi@example.demo',
    projectId: 'proj-1', projectName: 'Nexora Heights', source: 'Property Portal', assignedTo: 'Rahul Sharma',
    status: 'Lost', followUpDate: '2026-11-15', budget: '₹55 L', configurationInterest: '2 BHK', createdAt: '2026-10-12',
    notes: [{ id: 'n11', timestamp: '2026-10-21 05:00 PM', author: 'Rahul Sharma', type: 'Status Change', text: 'Required immediate ready-to-move possession; opted for resale unit.' }],
  },
];

export const INITIAL_CHANNEL_PARTNERS: ChannelPartnerRecord[] = [
  {
    id: 'CP-01', name: 'Sameer Malhotra', agencyName: 'PropVista Realty Advisory', reraId: 'A51700011201 (DEMO)',
    phone: '+91 98203 11455', email: 'sameer@propvista.demo', city: 'Dombivli East',
    assignedProjects: ['Nexora Heights', 'Nexora Business Park'], kycStatus: 'Verified', leadsCount: 38,
    siteVisitsCount: 19, bookingsCount: 7, commissionSlab: '3.0% Platinum Tier', totalCommissionLakhs: 14.85,
    paidCommissionLakhs: 10.2, pendingCommissionLakhs: 4.65, payoutStatus: 'Approved',
  },
  {
    id: 'CP-02', name: 'Harshad Oak', agencyName: 'Thane Homes Network', reraId: 'A51700022894 (DEMO)',
    phone: '+91 98196 88321', email: 'harshad@thanehomes.demo', city: 'Thane West',
    assignedProjects: ['Nexora Skyview', 'Nexora Heights'], kycStatus: 'Verified', leadsCount: 32,
    siteVisitsCount: 15, bookingsCount: 5, commissionSlab: '2.75% Gold Tier', totalCommissionLakhs: 16.4,
    paidCommissionLakhs: 12.0, pendingCommissionLakhs: 4.4, payoutStatus: 'Paid',
  },
  {
    id: 'CP-03', name: 'Deepak Bhoir', agencyName: 'Kalyan Commercial Brokers', reraId: 'A51700033910 (DEMO)',
    phone: '+91 98672 54109', email: 'deepak@kalyanbrokers.demo', city: 'Kalyan West',
    assignedProjects: ['Nexora Business Park', 'Nexora Heights'], kycStatus: 'Verified', leadsCount: 24,
    siteVisitsCount: 11, bookingsCount: 4, commissionSlab: '2.5% Silver Tier', totalCommissionLakhs: 8.9,
    paidCommissionLakhs: 5.5, pendingCommissionLakhs: 3.4, payoutStatus: 'Processing',
  },
  {
    id: 'CP-04', name: 'Kavita Nambiar', agencyName: 'MMR Prime Estates', reraId: 'A51700044512 (DEMO)',
    phone: '+91 99201 76543', email: 'kavita@mmrprime.demo', city: 'Mulund / Thane',
    assignedProjects: ['Nexora Skyview'], kycStatus: 'Under Review', leadsCount: 18,
    siteVisitsCount: 7, bookingsCount: 2, commissionSlab: '2.5% Silver Tier', totalCommissionLakhs: 5.8,
    paidCommissionLakhs: 2.9, pendingCommissionLakhs: 2.9, payoutStatus: 'Pending Verification',
  },
  {
    id: 'CP-05', name: 'Prashant Shinde', agencyName: 'Palava Crown Realty', reraId: 'A51700055109 (DEMO)',
    phone: '+91 97681 22300', email: 'prashant@palavacrown.demo', city: 'Dombivli East',
    assignedProjects: ['Nexora Heights'], kycStatus: 'Pending KYC', leadsCount: 14,
    siteVisitsCount: 5, bookingsCount: 0, commissionSlab: '2.0% Base Tier', totalCommissionLakhs: 0,
    paidCommissionLakhs: 0, pendingCommissionLakhs: 0, payoutStatus: 'Pending Verification',
  },
];

export const INITIAL_COMMISSION_LEDGER: CommissionLedgerEntry[] = [
  {
    id: 'COM-301', cpId: 'CP-01', cpAgency: 'PropVista Realty Advisory', bookingId: 'BK-NX-1041',
    customerName: 'Pooja & Saurabh Gokhale', projectId: 'proj-1', projectName: 'Nexora Heights',
    unitNumber: 'A-501', agreementValueLakhs: 68.5, brokeragePercent: 3.0, grossCommissionLakhs: 2.06,
    tdsLakhs: 0.1, netPayableLakhs: 1.96, status: 'Approved', invoiceDate: '2026-10-26',
  },
  {
    id: 'COM-302', cpId: 'CP-02', cpAgency: 'Thane Homes Network', bookingId: 'BK-NX-1042',
    customerName: 'Aniruddha & Swati Joshi', projectId: 'proj-2', projectName: 'Nexora Skyview',
    unitNumber: 'WA-702', agreementValueLakhs: 148.0, brokeragePercent: 2.75, grossCommissionLakhs: 4.07,
    tdsLakhs: 0.2, netPayableLakhs: 3.87, status: 'Paid', invoiceDate: '2026-10-18',
  },
  {
    id: 'COM-303', cpId: 'CP-03', cpAgency: 'Kalyan Commercial Brokers', bookingId: 'BK-NX-1043',
    customerName: 'Apex Diagnostics Pvt Ltd', projectId: 'proj-3', projectName: 'Nexora Business Park',
    unitNumber: 'C-201', agreementValueLakhs: 92.0, brokeragePercent: 2.5, grossCommissionLakhs: 2.3,
    tdsLakhs: 0.12, netPayableLakhs: 2.18, status: 'Processing', invoiceDate: '2026-10-28',
  },
  {
    id: 'COM-304', cpId: 'CP-01', cpAgency: 'PropVista Realty Advisory', bookingId: 'BK-NX-1044',
    customerName: 'Milind & Rashmi Kulkarni', projectId: 'proj-1', projectName: 'Nexora Heights',
    unitNumber: 'B-603', agreementValueLakhs: 89.5, brokeragePercent: 3.0, grossCommissionLakhs: 2.69,
    tdsLakhs: 0.13, netPayableLakhs: 2.56, status: 'Paid', invoiceDate: '2026-10-12',
  },
];

export const INITIAL_INVENTORY_UNITS: InventoryUnit[] = [
  { id: 'u-1', unitNumber: 'A-501', projectId: 'proj-1', projectName: 'Nexora Heights', tower: 'Tower A', floor: 5, bhk: '2 BHK', carpetArea: 745, salableArea: 1020, facing: 'East', basePriceLakhs: 68.5, allInclusiveLakhs: 74.8, status: 'Booked', customerName: 'Pooja & Saurabh Gokhale', bookingId: 'BK-NX-1041', bookingDate: '2026-10-25', assignedSalesExec: 'Rahul Sharma' },
  { id: 'u-2', unitNumber: 'A-502', projectId: 'proj-1', projectName: 'Nexora Heights', tower: 'Tower A', floor: 5, bhk: '2 BHK', carpetArea: 745, salableArea: 1020, facing: 'West', basePriceLakhs: 67.8, allInclusiveLakhs: 74.0, status: 'Available' },
  { id: 'u-3', unitNumber: 'A-503', projectId: 'proj-1', projectName: 'Nexora Heights', tower: 'Tower A', floor: 5, bhk: '3 BHK', carpetArea: 980, salableArea: 1340, facing: 'East', basePriceLakhs: 88.0, allInclusiveLakhs: 95.8, status: 'Registered', customerName: 'Suresh & Vandana Rane', bookingId: 'BK-NX-1035', bookingDate: '2026-09-14', assignedSalesExec: 'Priya Nair' },
  { id: 'u-4', unitNumber: 'A-504', projectId: 'proj-1', projectName: 'Nexora Heights', tower: 'Tower A', floor: 5, bhk: '3 BHK', carpetArea: 980, salableArea: 1340, facing: 'North-East', basePriceLakhs: 89.2, allInclusiveLakhs: 97.1, status: 'Available' },
  { id: 'u-5', unitNumber: 'A-601', projectId: 'proj-1', projectName: 'Nexora Heights', tower: 'Tower A', floor: 6, bhk: '2 BHK', carpetArea: 745, salableArea: 1020, facing: 'East', basePriceLakhs: 69.2, allInclusiveLakhs: 75.5, status: 'Available' },
  { id: 'u-6', unitNumber: 'A-602', projectId: 'proj-1', projectName: 'Nexora Heights', tower: 'Tower A', floor: 6, bhk: '2 BHK', carpetArea: 745, salableArea: 1020, facing: 'West', basePriceLakhs: 68.5, allInclusiveLakhs: 74.8, status: 'Hold', customerName: 'Meenal & Pradeep Chavan (Hold)', assignedSalesExec: 'Rahul Sharma' },
  { id: 'u-7', unitNumber: 'A-603', projectId: 'proj-1', projectName: 'Nexora Heights', tower: 'Tower A', floor: 6, bhk: '3 BHK', carpetArea: 980, salableArea: 1340, facing: 'East', basePriceLakhs: 89.5, allInclusiveLakhs: 97.4, status: 'Booked', customerName: 'Vivek & Chinmayi Nadkarni', bookingId: 'BK-NX-1039', bookingDate: '2026-10-08', assignedSalesExec: 'Rahul Sharma' },
  { id: 'u-8', unitNumber: 'A-604', projectId: 'proj-1', projectName: 'Nexora Heights', tower: 'Tower A', floor: 6, bhk: '3 BHK', carpetArea: 980, salableArea: 1340, facing: 'North-East', basePriceLakhs: 90.0, allInclusiveLakhs: 98.0, status: 'Available' },
  { id: 'u-9', unitNumber: 'A-801', projectId: 'proj-1', projectName: 'Nexora Heights', tower: 'Tower A', floor: 8, bhk: '2 BHK', carpetArea: 745, salableArea: 1020, facing: 'East', basePriceLakhs: 71.0, allInclusiveLakhs: 77.4, status: 'Registered', customerName: 'Rameshwar & Sunita Tiwari', bookingId: 'BK-NX-1029', bookingDate: '2026-08-19', assignedSalesExec: 'Priya Nair' },
  { id: 'u-10', unitNumber: 'A-802', projectId: 'proj-1', projectName: 'Nexora Heights', tower: 'Tower A', floor: 8, bhk: '2 BHK', carpetArea: 745, salableArea: 1020, facing: 'East', basePriceLakhs: 71.5, allInclusiveLakhs: 78.0, status: 'Available' },
  { id: 'u-11', unitNumber: 'B-603', projectId: 'proj-1', projectName: 'Nexora Heights', tower: 'Tower B', floor: 6, bhk: '3 BHK', carpetArea: 980, salableArea: 1340, facing: 'East', basePriceLakhs: 89.5, allInclusiveLakhs: 97.4, status: 'Registered', customerName: 'Milind & Rashmi Kulkarni', bookingId: 'BK-NX-1044', bookingDate: '2026-10-11', assignedSalesExec: 'Priya Nair' },
  { id: 'u-12', unitNumber: 'B-1001', projectId: 'proj-1', projectName: 'Nexora Heights', tower: 'Tower B', floor: 10, bhk: '3 BHK', carpetArea: 980, salableArea: 1340, facing: 'North-East', basePriceLakhs: 94.0, allInclusiveLakhs: 102.3, status: 'Hold', customerName: 'Sneha & Kunal Deshpande (Hold)', assignedSalesExec: 'Rahul Sharma' },
  { id: 'u-13', unitNumber: 'WA-701', projectId: 'proj-2', projectName: 'Nexora Skyview', tower: 'Wing A', floor: 7, bhk: '2 BHK', carpetArea: 860, salableArea: 1180, facing: 'East', basePriceLakhs: 112.0, allInclusiveLakhs: 121.8, status: 'Available' },
  { id: 'u-14', unitNumber: 'WA-702', projectId: 'proj-2', projectName: 'Nexora Skyview', tower: 'Wing A', floor: 7, bhk: '3 BHK', carpetArea: 1180, salableArea: 1620, facing: 'North-East', basePriceLakhs: 148.0, allInclusiveLakhs: 160.9, status: 'Registered', customerName: 'Aniruddha & Swati Joshi', bookingId: 'BK-NX-1042', bookingDate: '2026-10-16', assignedSalesExec: 'Aditi Verma' },
  { id: 'u-15', unitNumber: 'WA-901', projectId: 'proj-2', projectName: 'Nexora Skyview', tower: 'Wing A', floor: 9, bhk: '3 BHK', carpetArea: 1180, salableArea: 1620, facing: 'East', basePriceLakhs: 152.0, allInclusiveLakhs: 165.2, status: 'Available' },
  { id: 'u-16', unitNumber: 'WA-1101', projectId: 'proj-2', projectName: 'Nexora Skyview', tower: 'Wing A', floor: 11, bhk: '4 BHK', carpetArea: 1540, salableArea: 2120, facing: 'North-East', basePriceLakhs: 196.0, allInclusiveLakhs: 213.0, status: 'Hold', customerName: 'Vikramjit Singhania (Hold)', assignedSalesExec: 'Aditi Verma' },
  { id: 'u-17', unitNumber: 'WB-502', projectId: 'proj-2', projectName: 'Nexora Skyview', tower: 'Wing B', floor: 5, bhk: '2 BHK', carpetArea: 860, salableArea: 1180, facing: 'West', basePriceLakhs: 109.5, allInclusiveLakhs: 119.1, status: 'Booked', customerName: 'Gaurav & Tanvi Menon', bookingId: 'BK-NX-1045', bookingDate: '2026-10-22', assignedSalesExec: 'Karan Malhotra' },
  { id: 'u-18', unitNumber: 'WB-804', projectId: 'proj-2', projectName: 'Nexora Skyview', tower: 'Wing B', floor: 8, bhk: '3 BHK', carpetArea: 1180, salableArea: 1620, facing: 'East', basePriceLakhs: 150.0, allInclusiveLakhs: 163.0, status: 'Available' },
  { id: 'u-19', unitNumber: 'G-101', projectId: 'proj-3', projectName: 'Nexora Business Park', tower: 'Commercial Plaza', floor: 1, bhk: 'Retail', carpetArea: 520, salableArea: 740, facing: 'East', basePriceLakhs: 118.0, allInclusiveLakhs: 129.8, status: 'Available' },
  { id: 'u-20', unitNumber: 'C-201', projectId: 'proj-3', projectName: 'Nexora Business Park', tower: 'Commercial Plaza', floor: 2, bhk: 'Office', carpetArea: 680, salableArea: 950, facing: 'North', basePriceLakhs: 92.0, allInclusiveLakhs: 101.2, status: 'Booked', customerName: 'Apex Diagnostics Pvt Ltd', bookingId: 'BK-NX-1043', bookingDate: '2026-10-27', assignedSalesExec: 'Neha Joshi' },
  { id: 'u-21', unitNumber: 'C-402', projectId: 'proj-3', projectName: 'Nexora Business Park', tower: 'Commercial Plaza', floor: 4, bhk: 'Office', carpetArea: 680, salableArea: 950, facing: 'East', basePriceLakhs: 88.5, allInclusiveLakhs: 97.4, status: 'Hold', customerName: 'Manish Patel (Patel Enterprises)', assignedSalesExec: 'Neha Joshi' },
  { id: 'u-22', unitNumber: 'C-403', projectId: 'proj-3', projectName: 'Nexora Business Park', tower: 'Commercial Plaza', floor: 4, bhk: 'Office', carpetArea: 680, salableArea: 950, facing: 'East', basePriceLakhs: 88.5, allInclusiveLakhs: 97.4, status: 'Available' },
  { id: 'u-23', unitNumber: 'C-601', projectId: 'proj-3', projectName: 'Nexora Business Park', tower: 'Commercial Plaza', floor: 6, bhk: 'Office', carpetArea: 1120, salableArea: 1560, facing: 'North-East', basePriceLakhs: 142.0, allInclusiveLakhs: 156.2, status: 'Registered', customerName: 'Zenith FinTech Solutions LLP', bookingId: 'BK-NX-1038', bookingDate: '2026-09-29', assignedSalesExec: 'Neha Joshi' },
];

export const INITIAL_BOOKINGS: BookingRecord[] = [
  {
    id: 'BK-NX-1041', customerName: 'Pooja & Saurabh Gokhale', coApplicant: 'Saurabh Gokhale',
    phone: '+91 99204 55612', email: 'saurabh.g@example.demo', panMasked: 'ABCDE1234F (DEMO)', aadhaarMasked: 'XXXX-XXXX-8821 (DEMO)',
    projectId: 'proj-1', projectName: 'Nexora Heights', tower: 'Tower A', unitNumber: 'A-501', bhk: '2 BHK', carpetArea: 745,
    bookingDate: '2026-10-25', agreementValueLakhs: 68.5, paidAmountLakhs: 17.13, balanceLakhs: 51.37,
    status: 'Agreement Drafted', bankLoanProvider: 'HDFC Home Loans (Sanctioned)', salesExecutive: 'Rahul Sharma', channelPartner: 'PropVista Realty Advisory',
    paymentSchedule: [
      { id: 'ps-1', milestoneName: 'Booking Token (10%)', percentage: 10, amountLakhs: 6.85, dueDate: '2026-10-25', status: 'Paid', paidDate: '2026-10-25', receiptNo: 'RCPT-9012', paymentMode: 'NEFT' },
      { id: 'ps-2', milestoneName: 'On Agreement Execution (15%)', percentage: 15, amountLakhs: 10.28, dueDate: '2026-10-30', status: 'Paid', paidDate: '2026-10-30', receiptNo: 'RCPT-9045', paymentMode: 'RTGS' },
      { id: 'ps-3', milestoneName: 'Plinth & Podium Completion (20%)', percentage: 20, amountLakhs: 13.7, dueDate: '2026-11-15', status: 'Due' },
      { id: 'ps-4', milestoneName: 'Top Slab Structure Completion (25%)', percentage: 25, amountLakhs: 17.12, dueDate: '2026-12-20', status: 'Upcoming' },
      { id: 'ps-5', milestoneName: 'Brickwork & Internal Plaster (15%)', percentage: 15, amountLakhs: 10.28, dueDate: '2027-02-15', status: 'Upcoming' },
      { id: 'ps-6', milestoneName: 'MEP, Lifts & Possession Fitout (15%)', percentage: 15, amountLakhs: 10.27, dueDate: '2027-06-01', status: 'Upcoming' },
    ],
  },
  {
    id: 'BK-NX-1042', customerName: 'Aniruddha & Swati Joshi', coApplicant: 'Swati Joshi',
    phone: '+91 98207 65120', email: 'aniruddha.j@example.demo', panMasked: 'FGHIJ5678K (DEMO)', aadhaarMasked: 'XXXX-XXXX-4410 (DEMO)',
    projectId: 'proj-2', projectName: 'Nexora Skyview', tower: 'Wing A', unitNumber: 'WA-702', bhk: '3 BHK', carpetArea: 1180,
    bookingDate: '2026-10-16', agreementValueLakhs: 148.0, paidAmountLakhs: 66.6, balanceLakhs: 81.4,
    status: 'Registered', bankLoanProvider: 'SBI Realty Prime Loan', salesExecutive: 'Aditi Verma', channelPartner: 'Thane Homes Network',
    paymentSchedule: [
      { id: 'ps-7', milestoneName: 'Booking Token (10%)', percentage: 10, amountLakhs: 14.8, dueDate: '2026-10-16', status: 'Paid', paidDate: '2026-10-16', receiptNo: 'RCPT-8940', paymentMode: 'RTGS' },
      { id: 'ps-8', milestoneName: 'Agreement Registration (15%)', percentage: 15, amountLakhs: 22.2, dueDate: '2026-10-22', status: 'Paid', paidDate: '2026-10-21', receiptNo: 'RCPT-8988', paymentMode: 'RTGS' },
      { id: 'ps-9', milestoneName: 'Plinth Completion Demand (20%)', percentage: 20, amountLakhs: 29.6, dueDate: '2026-10-28', status: 'Paid', paidDate: '2026-10-28', receiptNo: 'RCPT-9031', paymentMode: 'Bank Disbursement' },
      { id: 'ps-10', milestoneName: '7th Floor Slab Casting (25%)', percentage: 25, amountLakhs: 37.0, dueDate: '2026-11-25', status: 'Due' },
      { id: 'ps-11', milestoneName: 'Brickwork & MEP Stage (20%)', percentage: 20, amountLakhs: 29.6, dueDate: '2027-04-10', status: 'Upcoming' },
      { id: 'ps-12', milestoneName: 'Possession Handover (10%)', percentage: 10, amountLakhs: 14.8, dueDate: '2028-03-01', status: 'Upcoming' },
    ],
  },
  {
    id: 'BK-NX-1043', customerName: 'Apex Diagnostics Pvt Ltd', coApplicant: 'Dr. Naveen Shetty (Director)',
    phone: '+91 98193 20944', email: 'finance@apexdiag.demo', panMasked: 'AAACA9988L (DEMO)', aadhaarMasked: 'XXXX-XXXX-7190 (DEMO)',
    projectId: 'proj-3', projectName: 'Nexora Business Park', tower: 'Commercial Plaza', unitNumber: 'C-201', bhk: 'Office', carpetArea: 680,
    bookingDate: '2026-10-27', agreementValueLakhs: 92.0, paidAmountLakhs: 23.0, balanceLakhs: 69.0,
    status: 'Token Received', bankLoanProvider: 'ICICI Commercial Property Finance', salesExecutive: 'Neha Joshi', channelPartner: 'Kalyan Commercial Brokers',
    paymentSchedule: [
      { id: 'ps-13', milestoneName: 'Booking Token (10%)', percentage: 10, amountLakhs: 9.2, dueDate: '2026-10-27', status: 'Paid', paidDate: '2026-10-27', receiptNo: 'RCPT-9022', paymentMode: 'NEFT' },
      { id: 'ps-14', milestoneName: 'Allotment Letter Stage (15%)', percentage: 15, amountLakhs: 13.8, dueDate: '2026-10-31', status: 'Paid', paidDate: '2026-10-31', receiptNo: 'RCPT-9051', paymentMode: 'RTGS' },
      { id: 'ps-15', milestoneName: 'Structure & Brickwork Stage (45%)', percentage: 45, amountLakhs: 41.4, dueDate: '2026-11-12', status: 'Due' },
      { id: 'ps-16', milestoneName: 'MEP & Glass Facade Completion (20%)', percentage: 20, amountLakhs: 18.4, dueDate: '2026-12-15', status: 'Upcoming' },
      { id: 'ps-17', milestoneName: 'OC & Fitout Possession (10%)', percentage: 10, amountLakhs: 9.2, dueDate: '2027-01-15', status: 'Upcoming' },
    ],
  },
  {
    id: 'BK-NX-1044', customerName: 'Milind & Rashmi Kulkarni', coApplicant: 'Rashmi Kulkarni',
    phone: '+91 98214 33890', email: 'milind.kulkarni@example.demo', panMasked: 'KLMNO4321P (DEMO)', aadhaarMasked: 'XXXX-XXXX-5532 (DEMO)',
    projectId: 'proj-1', projectName: 'Nexora Heights', tower: 'Tower B', unitNumber: 'B-603', bhk: '3 BHK', carpetArea: 980,
    bookingDate: '2026-10-11', agreementValueLakhs: 89.5, paidAmountLakhs: 62.65, balanceLakhs: 26.85,
    status: 'Registered', bankLoanProvider: 'Axis Bank Home Loans', salesExecutive: 'Priya Nair', channelPartner: 'PropVista Realty Advisory',
    paymentSchedule: [
      { id: 'ps-18', milestoneName: 'Booking + Registration + Plinth (45%)', percentage: 45, amountLakhs: 40.28, dueDate: '2026-10-15', status: 'Paid', paidDate: '2026-10-14', receiptNo: 'RCPT-8911', paymentMode: 'RTGS' },
      { id: 'ps-19', milestoneName: 'Structure Slab Demand (25%)', percentage: 25, amountLakhs: 22.37, dueDate: '2026-10-25', status: 'Paid', paidDate: '2026-10-24', receiptNo: 'RCPT-9004', paymentMode: 'Bank Disbursement' },
      { id: 'ps-20', milestoneName: 'Brickwork & MEP Stage (20%)', percentage: 20, amountLakhs: 17.9, dueDate: '2026-12-01', status: 'Due' },
      { id: 'ps-21', milestoneName: 'Finishing & Possession (10%)', percentage: 10, amountLakhs: 8.95, dueDate: '2027-06-15', status: 'Upcoming' },
    ],
  },
];

export const INITIAL_EMPLOYEES: EmployeeRecord[] = [
  { id: 'EMP-01', name: 'Rajvardhan Singhania', designation: 'Managing Director & Promoter', department: 'Executive Management', role: 'Company Admin', projectId: 'ALL', projectName: 'All Projects (Corporate HQ)', phone: '+91 98200 11001', email: 'md@nexoradevelopers.demo', joiningDate: '2018-04-01', reportsTo: 'Board of Directors', status: 'Active', kpiSummary: 'Portfolio Oversight: 3 Projects • ₹195 Cr Budget • 248 Units' },
  { id: 'EMP-02', name: 'Vikramaditya Deshmukh', designation: 'VP - Projects & Construction', department: 'Project & Engineering', role: 'Project Manager', projectId: 'proj-1', projectName: 'Nexora Heights & Business Park', phone: '+91 98204 55201', email: 'vikram.d@nexoradevelopers.demo', joiningDate: '2020-07-15', reportsTo: 'Rajvardhan Singhania', status: 'On Site', kpiSummary: '72% Completion at Heights • 85% at Business Park • Zero Safety Incidents' },
  { id: 'EMP-03', name: 'Priya Nair', designation: 'AGM - Sales & Channel Relations', department: 'Sales & CRM', role: 'Sales Manager', projectId: 'proj-1', projectName: 'Nexora Heights', phone: '+91 98192 66402', email: 'priya.nair@nexoradevelopers.demo', joiningDate: '2021-11-01', reportsTo: 'Rajvardhan Singhania', status: 'Active', kpiSummary: '₹5.4 Cr Monthly Sales • 18 Active CP Agencies • 24% Visit-to-Book Ratio' },
  { id: 'EMP-04', name: 'Rahul Sharma', designation: 'Senior Sales Executive', department: 'Sales & CRM', role: 'Sales Executive', projectId: 'proj-1', projectName: 'Nexora Heights', phone: '+91 98215 77812', email: 'rahul.sharma@nexoradevelopers.demo', joiningDate: '2023-03-10', reportsTo: 'Priya Nair', status: 'Active', kpiSummary: '32 Assigned Leads • 14 Site Visits This Month • 5 Closed Bookings' },
  { id: 'EMP-05', name: 'CA Shripad Joshi', designation: 'Head of Accounts & Finance', department: 'Finance & Accounts', role: 'Accounts', projectId: 'ALL', projectName: 'All Projects (Corporate HQ)', phone: '+91 98209 33188', email: 'accounts@nexoradevelopers.demo', joiningDate: '2019-09-01', reportsTo: 'Rajvardhan Singhania', status: 'Active', kpiSummary: '94% Collection Efficiency • RERA 70% Escrow Compliance Maintained' },
  { id: 'EMP-06', name: 'Rohan Kulkarni', designation: 'Senior Site Civil Engineer', department: 'Project & Engineering', role: 'Site Engineer', projectId: 'proj-1', projectName: 'Nexora Heights', phone: '+91 97694 88120', email: 'rohan.k@nexoradevelopers.demo', joiningDate: '2022-06-20', reportsTo: 'Vikramaditya Deshmukh', status: 'On Site', kpiSummary: 'Tower A 12th Slab QC Passed • Daily DPR Streak: 45 Days' },
  { id: 'EMP-07', name: 'Mahesh Gawde', designation: 'Chief Site Storekeeper', department: 'Procurement & Stores', role: 'Storekeeper', projectId: 'proj-1', projectName: 'Nexora Heights', phone: '+91 98675 44901', email: 'stores.heights@nexoradevelopers.demo', joiningDate: '2023-01-12', reportsTo: 'Vikramaditya Deshmukh', status: 'On Site', kpiSummary: '100% GRN Weighbridge Verification • Zero Material Pilferage' },
  { id: 'EMP-08', name: 'Sandeep Sawant', designation: 'Project Manager - Thane Cluster', department: 'Project & Engineering', role: 'Project Manager', projectId: 'proj-2', projectName: 'Nexora Skyview', phone: '+91 98206 99412', email: 'sandeep.s@nexoradevelopers.demo', joiningDate: '2021-05-18', reportsTo: 'Rajvardhan Singhania', status: 'On Site', kpiSummary: 'Wing A & B Podium + 7th Slab On Schedule • 118 Workforce Active' },
];

export const INITIAL_DPRS: DPRRecord[] = [
  { id: 'DPR-501', date: '2026-11-01', projectId: 'proj-1', projectName: 'Nexora Heights', towerZone: 'Tower A - 11th & 12th Floor', milestoneStage: 'Structure & Brickwork', workforceCount: 142, weather: 'Clear & Sunny', workSummary: 'Tower A 12th floor column reinforcement completed. AAC block masonry on 9th floor (East wing) 85% done. Internal electrical conduiting in progress on 7th floor.', submittedBy: 'Rohan Kulkarni (Site Engineer)', photoCaption: 'Tower A 12th Floor Rebar & Formwork Inspection - Geo-Tag: 19.2183° N, 73.0868° E', status: 'Verified' },
  { id: 'DPR-502', date: '2026-11-01', projectId: 'proj-2', projectName: 'Nexora Skyview', towerZone: 'Wing A - 8th Slab & Wing B - 6th Slab', milestoneStage: 'Structure', workforceCount: 118, weather: 'Clear & Sunny', workSummary: 'M40 grade RMC pouring completed for Wing A 8th floor slab (185 Cu.M). Cube samples taken for 7-day & 28-day compressive strength testing.', submittedBy: 'Aniket Jadhav (Site Engineer)', photoCaption: 'Wing A 8th Slab Concrete Pour & Vibrator Compaction - Geo-Tag: 19.2591° N, 72.9695° E', status: 'Verified' },
  { id: 'DPR-503', date: '2026-10-31', projectId: 'proj-3', projectName: 'Nexora Business Park', towerZone: 'Commercial Plaza - Facade & 5th Floor MEP', milestoneStage: 'MEP & Finishing', workforceCount: 86, weather: 'Partly Cloudy', workSummary: 'Double-glazed unit (DGU) structural glazing panels installed on North facade (Floors 4-6). Fire sprinkler hydro-testing completed on 3rd floor.', submittedBy: 'Siddharth Patil (Site Engineer)', photoCaption: 'North Elevation DGU Curtain Wall & Fire Line Pressure Test - Geo-Tag: 19.2403° N, 73.1305° E', status: 'Submitted' },
];

export const INITIAL_SITE_TASKS: SiteTaskRecord[] = [
  { id: 'TSK-201', title: 'Complete pre-pour checklist & structural consultant sign-off for Tower A 12th Slab', projectId: 'proj-1', projectName: 'Nexora Heights', milestoneStage: 'Structure', owner: 'Rohan Kulkarni', dueDate: '2026-11-04', priority: 'High', status: 'In Progress' },
  { id: 'TSK-202', title: 'Concealed CPVC plumbing pressure test for Tower B Floors 5 to 8', projectId: 'proj-1', projectName: 'Nexora Heights', milestoneStage: 'MEP', owner: 'Rohan Kulkarni', dueDate: '2026-11-06', priority: 'Medium', status: 'Pending' },
  { id: 'TSK-203', title: 'Wing B 7th Floor shuttering & beam reinforcement inspection', projectId: 'proj-2', projectName: 'Nexora Skyview', milestoneStage: 'Structure', owner: 'Aniket Jadhav', dueDate: '2026-11-03', priority: 'High', status: 'In Progress' },
  { id: 'TSK-204', title: 'Elevator shaft guide rail alignment & machine room handover (Lifts 1-4)', projectId: 'proj-3', projectName: 'Nexora Business Park', milestoneStage: 'MEP', owner: 'Siddharth Patil', dueDate: '2026-11-05', priority: 'High', status: 'Completed' },
  { id: 'TSK-205', title: 'Lobby Italian marble flooring layout & atrium false ceiling framing', projectId: 'proj-3', projectName: 'Nexora Business Park', milestoneStage: 'Finishing', owner: 'Siddharth Patil', dueDate: '2026-11-08', priority: 'Medium', status: 'In Progress' },
];

export const INITIAL_MATERIALS: MaterialRecord[] = [
  { id: 'MAT-01', name: 'OPC 53 Grade Cement (UltraTech)', category: 'Cement', specification: 'IS 12269 Certified - 50 Kg HDPE Bags', projectId: 'proj-1', projectName: 'Nexora Heights', availableStock: 420, minStock: 600, unit: 'Bags', unitRateInr: 395, lastUpdated: '2026-11-01' },
  { id: 'MAT-02', name: 'Fe 550D TMT Steel Bars (JSW Neosteel)', category: 'Steel', specification: '12mm, 16mm & 20mm CRS Ribbed Bars', projectId: 'proj-1', projectName: 'Nexora Heights', availableStock: 38.5, minStock: 25.0, unit: 'MT', unitRateInr: 64500, lastUpdated: '2026-10-31' },
  { id: 'MAT-03', name: 'Washed Crushed River Sand (M-Sand)', category: 'Sand', specification: 'Zone-II Plaster & Concreting Grade', projectId: 'proj-2', projectName: 'Nexora Skyview', availableStock: 18, minStock: 30, unit: 'Brass', unitRateInr: 6800, lastUpdated: '2026-10-31' },
  { id: 'MAT-04', name: 'Autoclaved Aerated Concrete (AAC) Blocks', category: 'Blocks', specification: '600x200x150mm Lightweight Masonry Blocks', projectId: 'proj-1', projectName: 'Nexora Heights', availableStock: 4850, minStock: 3000, unit: 'Nos', unitRateInr: 58, lastUpdated: '2026-10-30' },
  { id: 'MAT-05', name: 'FRLS Copper Wiring Coils (Polycab)', category: 'Electrical', specification: '1.5 sq.mm & 2.5 sq.mm Flame Retardant', projectId: 'proj-3', projectName: 'Nexora Business Park', availableStock: 28, minStock: 40, unit: 'Coils', unitRateInr: 2450, lastUpdated: '2026-11-01' },
  { id: 'MAT-06', name: 'CPVC SDR-11 Hot & Cold Plumbing Pipes (Astral)', category: 'Plumbing', specification: '25mm & 32mm Heavy Duty Potable Water Pipes', projectId: 'proj-3', projectName: 'Nexora Business Park', availableStock: 640, minStock: 400, unit: 'Meters', unitRateInr: 185, lastUpdated: '2026-10-29' },
  { id: 'MAT-07', name: 'OPC 53 Grade Cement (ACC Bulk)', category: 'Cement', specification: '50 Kg Bags - Podium & Slab Grade', projectId: 'proj-2', projectName: 'Nexora Skyview', availableStock: 890, minStock: 500, unit: 'Bags', unitRateInr: 390, lastUpdated: '2026-11-01' },
];

export const INITIAL_MATERIAL_MOVEMENTS: MaterialMovementRecord[] = [
  { id: 'MM-701', date: '2026-11-01', materialId: 'MAT-01', materialName: 'OPC 53 Grade Cement (UltraTech)', category: 'Cement', type: 'Stock Out (Site Issue)', quantity: 180, unit: 'Bags', projectId: 'proj-1', projectName: 'Nexora Heights', referenceNo: 'ISS-NH-1092', handledBy: 'Mahesh Gawde (Storekeeper)', status: 'Completed' },
  { id: 'MM-702', date: '2026-10-31', materialId: 'MAT-02', materialName: 'Fe 550D TMT Steel Bars (JSW Neosteel)', category: 'Steel', type: 'Stock In (GRN)', quantity: 20, unit: 'MT', projectId: 'proj-1', projectName: 'Nexora Heights', referenceNo: 'GRN-NH-0441', handledBy: 'Mahesh Gawde (Storekeeper)', status: 'Completed' },
  { id: 'MM-703', date: '2026-10-31', materialId: 'MAT-05', materialName: 'FRLS Copper Wiring Coils (Polycab)', category: 'Electrical', type: 'Material Indent', quantity: 50, unit: 'Coils', projectId: 'proj-3', projectName: 'Nexora Business Park', referenceNo: 'IND-NBP-0318', handledBy: 'Siddharth Patil (Site Engineer)', status: 'Pending Approval' },
  { id: 'MM-704', date: '2026-10-29', materialId: 'MAT-04', materialName: 'Autoclaved Aerated Concrete (AAC) Blocks', category: 'Blocks', type: 'Inter-Site Transfer', quantity: 600, unit: 'Nos', projectId: 'proj-2', projectName: 'Nexora Skyview (From Heights)', referenceNo: 'TRF-NX-0089', handledBy: 'Mahesh Gawde (Storekeeper)', status: 'Approved' },
];

export const INITIAL_VENDORS: VendorRecord[] = [
  { id: 'VND-01', name: 'Shree Infra Cement & RMC Suppliers', category: 'Cement & RMC', contactPerson: 'Nitin Agarwal', phone: '+91 98201 90123', email: 'orders@shreeinfracement.demo', city: 'Thane / Bhiwandi', gstinDemo: '27AAACS1234A1Z5 (DEMO)', rating: 4.8, activePOs: 3, totalBusinessLakhs: 184.5, status: 'Preferred' },
  { id: 'VND-02', name: 'Kamdhenu Ispat & TMT Distributors', category: 'TMT Steel', contactPerson: 'Suresh Jindal', phone: '+91 98190 45670', email: 'sales@kamdhenuispat.demo', city: 'Kalamboli Steel Market', gstinDemo: '27AAACK5678B1Z2 (DEMO)', rating: 4.9, activePOs: 2, totalBusinessLakhs: 246.0, status: 'Preferred' },
  { id: 'VND-03', name: 'Konkan EcoBlocks & Aggregates LLP', category: 'AAC Blocks & Sand', contactPerson: 'Mangesh Tawde', phone: '+91 98673 11890', email: 'dispatch@konkanecoblocks.demo', city: 'Kalyan-Murbad Road', gstinDemo: '27AAACK9012C1Z9 (DEMO)', rating: 4.5, activePOs: 2, totalBusinessLakhs: 64.2, status: 'Empaneled' },
  { id: 'VND-04', name: 'VoltEdge Electricals & Switchgear', category: 'Electrical & Cables', contactPerson: 'Hitesh Shah', phone: '+91 98211 77432', email: 'hitesh@voltedge.demo', city: 'Dombivli MIDC', gstinDemo: '27AAACV3456D1Z1 (DEMO)', rating: 4.7, activePOs: 1, totalBusinessLakhs: 52.8, status: 'Empaneled' },
  { id: 'VND-05', name: 'AquaFlow MEP & Sanitary Systems', category: 'Plumbing & Sanitary', contactPerson: 'Rakesh Parekh', phone: '+91 99205 66109', email: 'quotes@aquaflowmep.demo', city: 'Thane West', gstinDemo: '27AAACA7890E1Z8 (DEMO)', rating: 4.6, activePOs: 1, totalBusinessLakhs: 48.0, status: 'Empaneled' },
];

export const INITIAL_PURCHASE_ORDERS: PurchaseOrderRecord[] = [
  { id: 'PO-01', poNumber: 'PO-NX-2026-089', vendorId: 'VND-01', vendorName: 'Shree Infra Cement & RMC Suppliers', category: 'Cement & RMC', projectId: 'proj-1', projectName: 'Nexora Heights', itemsSummary: '1,000 Bags OPC 53 Grade UltraTech Cement @ ₹395/Bag', amountLakhs: 3.95, issueDate: '2026-10-30', deliveryDate: '2026-11-03', approvalStatus: 'Pending Approval', grnStatus: 'Pending Delivery' },
  { id: 'PO-02', poNumber: 'PO-NX-2026-088', vendorId: 'VND-02', vendorName: 'Kamdhenu Ispat & TMT Distributors', category: 'TMT Steel', projectId: 'proj-2', projectName: 'Nexora Skyview', itemsSummary: '30 MT Fe 550D JSW TMT Bars (16mm & 20mm) @ ₹64,500/MT', amountLakhs: 19.35, issueDate: '2026-10-27', deliveryDate: '2026-11-02', approvalStatus: 'Approved', grnStatus: 'Partial GRN' },
  { id: 'PO-03', poNumber: 'PO-NX-2026-085', vendorId: 'VND-04', vendorName: 'VoltEdge Electricals & Switchgear', category: 'Electrical & Cables', projectId: 'proj-3', projectName: 'Nexora Business Park', itemsSummary: '80 Coils Polycab FRLS Wiring + 3-Phase Distribution Boards', amountLakhs: 4.85, issueDate: '2026-10-22', deliveryDate: '2026-10-28', approvalStatus: 'GRN Completed', grnStatus: 'QC Passed & Stored' },
  { id: 'PO-04', poNumber: 'PO-NX-2026-083', vendorId: 'VND-03', vendorName: 'Konkan EcoBlocks & Aggregates LLP', category: 'AAC Blocks & Sand', projectId: 'proj-1', projectName: 'Nexora Heights', itemsSummary: '5,000 Nos AAC Blocks (150mm) + 25 Brass Washed M-Sand', amountLakhs: 4.6, issueDate: '2026-10-18', deliveryDate: '2026-10-24', approvalStatus: 'GRN Completed', grnStatus: 'QC Passed & Stored' },
];

export const INITIAL_BILLS_EXPENSES: BillExpenseRecord[] = [
  { id: 'BILL-901', invoiceNumber: 'INV/SIC/26-27/1104', vendorName: 'Shree Infra Cement & RMC Suppliers', category: 'Material Supply', projectId: 'proj-2', projectName: 'Nexora Skyview', billDate: '2026-10-28', dueDate: '2026-11-08', amountLakhs: 14.2, tdsLakhs: 0.28, netPayableLakhs: 13.92, paymentStatus: 'Pending Approval' },
  { id: 'BILL-902', invoiceNumber: 'INV/KIT/26-27/0482', vendorName: 'Kamdhenu Ispat & TMT Distributors', category: 'Material Supply', projectId: 'proj-1', projectName: 'Nexora Heights', billDate: '2026-10-24', dueDate: '2026-11-05', amountLakhs: 19.35, tdsLakhs: 0.39, netPayableLakhs: 18.96, paymentStatus: 'Approved' },
  { id: 'BILL-903', invoiceNumber: 'RA-BILL/2026/14', vendorName: 'Vishwakarma Civil Contractors Pvt Ltd', category: 'Civil Contractor', projectId: 'proj-1', projectName: 'Nexora Heights', billDate: '2026-10-20', dueDate: '2026-10-30', amountLakhs: 28.5, tdsLakhs: 0.57, netPayableLakhs: 27.93, paymentStatus: 'Paid' },
  { id: 'BILL-904', invoiceNumber: 'INV/VE/26-27/0299', vendorName: 'VoltEdge Electricals & Switchgear', category: 'MEP Subcontract', projectId: 'proj-3', projectName: 'Nexora Business Park', billDate: '2026-10-25', dueDate: '2026-11-04', amountLakhs: 4.85, tdsLakhs: 0.1, netPayableLakhs: 4.75, paymentStatus: 'Pending Approval' },
  { id: 'BILL-905', invoiceNumber: 'INV/MMRDIG/109', vendorName: 'AdVantage Realty Performance Media', category: 'Marketing & CP', projectId: 'proj-2', projectName: 'Nexora Skyview', billDate: '2026-10-15', dueDate: '2026-10-29', amountLakhs: 6.4, tdsLakhs: 0.13, netPayableLakhs: 6.27, paymentStatus: 'Overdue' },
];

export const INITIAL_APPROVALS: ApprovalItem[] = [
  { id: 'APR-01', type: 'Purchase Order', referenceNo: 'PO-NX-2026-089', title: '1,000 Bags OPC 53 Cement - Shree Infra Suppliers', projectId: 'proj-1', projectName: 'Nexora Heights', requestedBy: 'Mahesh Gawde (Storekeeper)', amountOrQty: '₹3.95 Lakhs', date: '2026-10-30', status: 'Pending' },
  { id: 'APR-02', type: 'Vendor Bill', referenceNo: 'INV/SIC/26-27/1104', title: 'M40 Ready-Mix Concrete Batch Supply (Wing A 8th Slab)', projectId: 'proj-2', projectName: 'Nexora Skyview', requestedBy: 'CA Shripad Joshi (Accounts)', amountOrQty: '₹13.92 Lakhs (Net)', date: '2026-10-29', status: 'Pending' },
  { id: 'APR-03', type: 'Material Indent', referenceNo: 'IND-NBP-0318', title: '50 Coils Polycab FRLS Copper Wiring (Floors 5 & 6)', projectId: 'proj-3', projectName: 'Nexora Business Park', requestedBy: 'Siddharth Patil (Site Engineer)', amountOrQty: '50 Coils (~₹1.22 L)', date: '2026-10-31', status: 'Pending' },
  { id: 'APR-04', type: 'Booking Discount', referenceNo: 'DSC-NH-B1001', title: 'Floor-Rise Waiver Request for Sneha & Kunal Deshpande (Unit B-1001)', projectId: 'proj-1', projectName: 'Nexora Heights', requestedBy: 'Priya Nair (Sales Manager)', amountOrQty: '₹1.25 Lakhs Waiver', date: '2026-10-31', status: 'Pending' },
];

export const INITIAL_ACTIVITIES: ActivityItem[] = [
  { id: 'ACT-1', timestamp: '18 mins ago', module: 'Construction', projectId: 'proj-1', projectName: 'Nexora Heights', actor: 'Rohan Kulkarni', description: 'Submitted Daily Progress Report (DPR-501) for Tower A 12th Floor slab reinforcement (142 workers).', badgeColor: 'emerald' },
  { id: 'ACT-2', timestamp: '1 hour ago', module: 'CRM Leads', projectId: 'proj-1', projectName: 'Nexora Heights', actor: 'Rahul Sharma', description: 'Moved lead Sneha & Kunal Deshpande (3 BHK) to Negotiation stage after cost-sheet discussion.', badgeColor: 'blue' },
  { id: 'ACT-3', timestamp: '3 hours ago', module: 'Bookings & Accounts', projectId: 'proj-3', projectName: 'Nexora Business Park', actor: 'CA Shripad Joshi', description: 'Verified RTGS receipt RCPT-9051 of ₹13.80 Lakhs for Unit C-201 (Apex Diagnostics Pvt Ltd).', badgeColor: 'purple' },
  { id: 'ACT-4', timestamp: '5 hours ago', module: 'Materials & Stores', projectId: 'proj-1', projectName: 'Nexora Heights', actor: 'Mahesh Gawde', description: 'Low-stock alert triggered for OPC 53 Cement (420 Bags available vs 600 Bags minimum level).', badgeColor: 'amber' },
  { id: 'ACT-5', timestamp: 'Yesterday, 6:15 PM', module: 'Channel Partners', projectId: 'proj-1', projectName: 'Nexora Heights', actor: 'Priya Nair', description: 'Approved ₹1.96 Lakhs net brokerage payout for PropVista Realty Advisory (Unit A-501).', badgeColor: 'emerald' },
];

export const DEMO_TOUR_STEPS = [
  { step: 1, title: '1. Executive Dashboard', module: 'dashboard' as const, projectFilter: 'ALL', instruction: 'Review NEXORA DEVELOPERS portfolio KPIs (3 Projects, 248 Units, ₹12.5 Cr Sales), charts & pending approvals.' },
  { step: 2, title: '2. Filter by Nexora Heights', module: 'projects' as const, projectFilter: 'proj-1', instruction: 'Project filter is now locked to Nexora Heights (Dombivli East - 96 Units). Inspect project specs, team & RERA details.' },
  { step: 3, title: '3. Lead CRM & Pipeline', module: 'leads' as const, projectFilter: 'proj-1', instruction: 'View Nexora Heights leads in Table or Kanban view, change a lead status, or open the Lead Detail Drawer.' },
  { step: 4, title: '4. Channel Partner Commission', module: 'channel-partners' as const, projectFilter: 'ALL', instruction: 'Inspect PropVista Realty profile, verify KYC badges, commission ledger, and preview the White-Label CP Portal.' },
  { step: 5, title: '5. Live Flat Inventory Grid', module: 'inventory' as const, projectFilter: 'proj-1', instruction: 'Click any unit (e.g., Available unit A-502 or A-802) to inspect the architectural floor plan, cost sheet & hold/book options.' },
  { step: 6, title: '6. Customer Booking & CLP', module: 'bookings' as const, projectFilter: 'ALL', instruction: 'Open Booking BK-NX-1041 (Pooja & Saurabh Gokhale) to view their Construction-Linked Payment (CLP) schedule & receipts.' },
  { step: 7, title: '7. Construction & DPRs', module: 'construction' as const, projectFilter: 'proj-1', instruction: 'Track 6-stage milestones (Foundation to Finishing), inspect Daily Progress Reports (DPR) with site photos, and add tasks.' },
  { step: 8, title: '8. Material Request (Indent)', module: 'materials' as const, projectFilter: 'ALL', instruction: 'Review Low-Stock alerts (Cement & M-Sand) and click "+ Raise Material Request (Indent)" to submit a new site material request.' },
  { step: 9, title: '9. Vendor Bills & Accounts', module: 'accounts' as const, projectFilter: 'ALL', instruction: 'Compare Budget vs Actual project spend and click "Approve Bill" on a pending vendor invoice.' },
  { step: 10, title: '10. Management Analytics', module: 'reports' as const, projectFilter: 'ALL', instruction: 'Explore all 7 executive reports (Sales, Conversion, CP ROI, Inventory, Construction, Material, Spend) & export CSV.' },
  { step: 11, title: '11. White-Label Theme Engine', module: 'settings' as const, projectFilter: 'ALL', instruction: 'Switch brand color presets or rename NEXORA DEVELOPERS to watch the entire application re-theme instantaneously!' },
];
