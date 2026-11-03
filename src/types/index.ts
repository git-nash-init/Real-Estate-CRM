export type ProjectId = 'ALL' | 'proj-1' | 'proj-2' | 'proj-3' | string;
export type ModuleId = 'dashboard' | 'projects' | 'leads' | 'channel-partners' | 'inventory' | 'bookings' | 'employees' | 'construction' | 'materials' | 'vendors' | 'accounts' | 'reports' | 'settings';
export type LeadStatus = 'New' | 'Contacted' | 'Qualified' | 'Site Visit' | 'Negotiation' | 'Booked' | 'Lost';
export type UnitStatus = 'Available' | 'Hold' | 'Booked' | 'Registered';
export type UserRole = 'Company Admin' | 'Project Manager' | 'Sales Manager' | 'Sales Executive' | 'Accounts' | 'Site Engineer' | 'Storekeeper';

export interface MilestoneItem {
  stage: 'Foundation' | 'Plinth' | 'Structure' | 'Brickwork' | 'MEP' | 'Finishing';
  progress: number;
  status: 'Completed' | 'In Progress' | 'Upcoming';
  updatedAt: string;
}

export interface ProjectRecord {
  id: string;
  name: string;
  location: string;
  city: string;
  type: 'Residential' | 'Commercial';
  configuration: string;
  reraNumber: string;
  totalUnits: number;
  soldUnits: number;
  holdUnits: number;
  availableUnits: number;
  activeLeadsCount: number;
  cpCount: number;
  monthlyBookings: number;
  monthlySalesCr: number;
  totalSalesCr: number;
  progress: number;
  towers: string[];
  floors: number;
  launchDate: string;
  completionDate: string;
  projectManager: string;
  siteEngineer: string;
  salesManager: string;
  budgetCr: number;
  actualSpendCr: number;
  workforceCount: number;
  milestones: MilestoneItem[];
  amenities: string[];
}

export interface LeadNote {
  id: string;
  timestamp: string;
  author: string;
  type: 'Call' | 'Note' | 'Site Visit' | 'Status Change';
  text: string;
}

export interface LeadRecord {
  id: string;
  name: string;
  phone: string;
  email: string;
  projectId: string;
  projectName: string;
  source: 'Channel Partner' | 'Digital Ads' | 'Walk-in' | 'Property Portal' | 'Referral';
  cpAgency?: string;
  assignedTo: string;
  status: LeadStatus;
  followUpDate: string;
  budget: string;
  configurationInterest: string;
  createdAt: string;
  notes: LeadNote[];
}

export interface ChannelPartnerRecord {
  id: string;
  name: string;
  agencyName: string;
  reraId: string;
  phone: string;
  email: string;
  city: string;
  assignedProjects: string[];
  kycStatus: 'Verified' | 'Pending KYC' | 'Under Review';
  leadsCount: number;
  siteVisitsCount: number;
  bookingsCount: number;
  commissionSlab: string;
  totalCommissionLakhs: number;
  paidCommissionLakhs: number;
  pendingCommissionLakhs: number;
  payoutStatus: 'Paid' | 'Approved' | 'Processing' | 'Pending Verification';
}

export interface CommissionLedgerEntry {
  id: string;
  cpId: string;
  cpAgency: string;
  bookingId: string;
  customerName: string;
  projectId: string;
  projectName: string;
  unitNumber: string;
  agreementValueLakhs: number;
  brokeragePercent: number;
  grossCommissionLakhs: number;
  tdsLakhs: number;
  netPayableLakhs: number;
  status: 'Paid' | 'Approved' | 'Processing' | 'Pending Verification';
  invoiceDate: string;
}

export interface InventoryUnit {
  id: string;
  unitNumber: string;
  projectId: string;
  projectName: string;
  tower: string;
  floor: number;
  bhk: '1 BHK' | '2 BHK' | '3 BHK' | '4 BHK' | 'Retail' | 'Office';
  carpetArea: number;
  salableArea: number;
  facing: 'East' | 'West' | 'North' | 'North-East';
  basePriceLakhs: number;
  allInclusiveLakhs: number;
  status: UnitStatus;
  customerName?: string;
  bookingId?: string;
  bookingDate?: string;
  assignedSalesExec?: string;
}

export interface PaymentScheduleMilestone {
  id: string;
  milestoneName: string;
  percentage: number;
  amountLakhs: number;
  dueDate: string;
  status: 'Paid' | 'Due' | 'Upcoming';
  paidDate?: string;
  receiptNo?: string;
  paymentMode?: string;
}

export interface BookingRecord {
  id: string;
  customerName: string;
  coApplicant: string;
  phone: string;
  email: string;
  panMasked: string;
  aadhaarMasked: string;
  projectId: string;
  projectName: string;
  tower: string;
  unitNumber: string;
  bhk: string;
  carpetArea: number;
  bookingDate: string;
  agreementValueLakhs: number;
  paidAmountLakhs: number;
  balanceLakhs: number;
  status: 'Token Received' | 'Agreement Drafted' | 'Registered' | 'Possession Ready';
  bankLoanProvider: string;
  salesExecutive: string;
  channelPartner?: string;
  paymentSchedule: PaymentScheduleMilestone[];
}

export interface EmployeeRecord {
  id: string;
  name: string;
  designation: string;
  department: 'Executive Management' | 'Project & Engineering' | 'Sales & CRM' | 'Finance & Accounts' | 'Procurement & Stores';
  role: UserRole;
  projectId: string;
  projectName: string;
  phone: string;
  email: string;
  joiningDate: string;
  reportsTo: string;
  status: 'Active' | 'On Site' | 'On Leave';
  kpiSummary: string;
}

export interface DPRRecord {
  id: string;
  date: string;
  projectId: string;
  projectName: string;
  towerZone: string;
  milestoneStage: string;
  workforceCount: number;
  weather: 'Clear & Sunny' | 'Partly Cloudy' | 'Light Showers';
  workSummary: string;
  submittedBy: string;
  photoCaption: string;
  status: 'Verified' | 'Submitted';
}

export interface SiteTaskRecord {
  id: string;
  title: string;
  projectId: string;
  projectName: string;
  milestoneStage: 'Foundation' | 'Plinth' | 'Structure' | 'Brickwork' | 'MEP' | 'Finishing';
  owner: string;
  dueDate: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Completed' | 'In Progress' | 'Pending' | 'Delayed';
}

export interface MaterialRecord {
  id: string;
  name: string;
  category: 'Cement' | 'Steel' | 'Sand' | 'Blocks' | 'Electrical' | 'Plumbing';
  specification: string;
  projectId: string;
  projectName: string;
  availableStock: number;
  minStock: number;
  unit: string;
  unitRateInr: number;
  lastUpdated: string;
}

export interface MaterialMovementRecord {
  id: string;
  date: string;
  materialId: string;
  materialName: string;
  category: string;
  type: 'Stock In (GRN)' | 'Stock Out (Site Issue)' | 'Inter-Site Transfer' | 'Material Indent';
  quantity: number;
  unit: string;
  projectId: string;
  projectName: string;
  referenceNo: string;
  handledBy: string;
  status: 'Completed' | 'Approved' | 'Pending Approval';
}

export interface VendorRecord {
  id: string;
  name: string;
  category: 'Cement & RMC' | 'TMT Steel' | 'AAC Blocks & Sand' | 'Electrical & Cables' | 'Plumbing & Sanitary' | 'Elevators & MEP';
  contactPerson: string;
  phone: string;
  email: string;
  city: string;
  gstinDemo: string;
  rating: number;
  activePOs: number;
  totalBusinessLakhs: number;
  status: 'Empaneled' | 'Preferred' | 'Under Review';
}

export interface PurchaseOrderRecord {
  id: string;
  poNumber: string;
  vendorId: string;
  vendorName: string;
  category: string;
  projectId: string;
  projectName: string;
  itemsSummary: string;
  amountLakhs: number;
  issueDate: string;
  deliveryDate: string;
  approvalStatus: 'Approved' | 'Pending Approval' | 'Delivered' | 'GRN Completed';
  grnStatus: 'Pending Delivery' | 'QC Passed & Stored' | 'Partial GRN';
}

export interface BillExpenseRecord {
  id: string;
  invoiceNumber: string;
  vendorName: string;
  category: 'Material Supply' | 'Civil Contractor' | 'MEP Subcontract' | 'Marketing & CP' | 'Site Overheads';
  projectId: string;
  projectName: string;
  billDate: string;
  dueDate: string;
  amountLakhs: number;
  tdsLakhs: number;
  netPayableLakhs: number;
  paymentStatus: 'Paid' | 'Approved' | 'Pending Approval' | 'Overdue';
}

export interface ApprovalItem {
  id: string;
  type: 'Purchase Order' | 'Vendor Bill' | 'Material Indent' | 'Booking Discount';
  referenceNo: string;
  title: string;
  projectId: string;
  projectName: string;
  requestedBy: string;
  amountOrQty: string;
  date: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}

export interface ActivityItem {
  id: string;
  timestamp: string;
  module: string;
  projectId: string;
  projectName: string;
  actor: string;
  description: string;
  badgeColor: 'blue' | 'emerald' | 'amber' | 'purple';
}

export interface BrandSettings {
  companyName: string;
  tagline: string;
  logoText: string;
  primaryNavy: string;
  accentBlue: string;
  domain: string;
  supportEmail: string;
  corporateAddress: string;
  reraMasterId: string;
  planName: string;
  notifications: {
    whatsappLeads: boolean;
    dailyDprDigest: boolean;
    lowStockSms: boolean;
    poApprovalAlerts: boolean;
    bookingEmails: boolean;
  };
}
