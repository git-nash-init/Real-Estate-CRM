'use client';

import React, { useState } from 'react';
import {
  LayoutDashboard, Building2, Users, Briefcase, Home, FileCheck, UserCheck,
  HardHat, Package, Truck, IndianRupee, BarChart3, Settings, ChevronLeft,
  ChevronRight, Search, Bell, Sparkles, CheckCircle2, Menu, X, Play,
} from 'lucide-react';
import {
  ModuleId, ProjectRecord, LeadRecord, LeadStatus, ChannelPartnerRecord,
  CommissionLedgerEntry, InventoryUnit, UnitStatus, BookingRecord, EmployeeRecord,
  UserRole, DPRRecord, SiteTaskRecord, MaterialRecord, MaterialMovementRecord,
  VendorRecord, PurchaseOrderRecord, BillExpenseRecord, ApprovalItem, ActivityItem, BrandSettings,
} from '../types';
import {
  INITIAL_BRAND_SETTINGS, INITIAL_PROJECTS, INITIAL_LEADS, INITIAL_CHANNEL_PARTNERS,
  INITIAL_COMMISSION_LEDGER, INITIAL_INVENTORY_UNITS, INITIAL_BOOKINGS, INITIAL_EMPLOYEES,
  INITIAL_DPRS, INITIAL_SITE_TASKS, INITIAL_MATERIALS, INITIAL_MATERIAL_MOVEMENTS,
  INITIAL_VENDORS, INITIAL_PURCHASE_ORDERS, INITIAL_BILLS_EXPENSES, INITIAL_APPROVALS,
  INITIAL_ACTIVITIES, DEMO_TOUR_STEPS,
} from '../data/mockData';
import { DashboardView, ProjectsModule, LeadsModule } from '../components/ModulesPart1';
import { ChannelPartnersModule, InventoryModule, BookingsModule, EmployeesModule } from '../components/ModulesPart2';
import { ConstructionModule, MaterialsModule, VendorsModule, AccountsModule } from '../components/ModulesPart3';
import { ReportsModule, SettingsModule } from '../components/ModulesPart4';

const NAV_ITEMS: { id: ModuleId; label: string; shortLabel: string; icon: React.ElementType; badge?: string }[] = [
  { id: 'dashboard', label: 'Executive Dashboard', shortLabel: 'Dashboard', icon: LayoutDashboard },
  { id: 'projects', label: '1. Project Management', shortLabel: 'Projects', icon: Building2, badge: '3' },
  { id: 'leads', label: '2. Lead Management CRM', shortLabel: 'Leads CRM', icon: Users, badge: '126' },
  { id: 'channel-partners', label: '3. Channel Partners', shortLabel: 'Partners (CP)', icon: Briefcase, badge: '42' },
  { id: 'inventory', label: '4. Flat Inventory Grid', shortLabel: 'Inventory', icon: Home, badge: '248' },
  { id: 'bookings', label: '5. Bookings & Customers', shortLabel: 'Bookings', icon: FileCheck, badge: '18' },
  { id: 'employees', label: '6. Employees & Roles', shortLabel: 'Team & RBAC', icon: UserCheck },
  { id: 'construction', label: '7. Site Construction', shortLabel: 'Construction', icon: HardHat },
  { id: 'materials', label: '8. Material & Stores', shortLabel: 'Material Store', icon: Package },
  { id: 'vendors', label: '9. Vendors & Purchase', shortLabel: 'Procurement', icon: Truck },
  { id: 'accounts', label: '10. Accounts & Bills', shortLabel: 'Accounts', icon: IndianRupee },
  { id: 'reports', label: '11. Reports & Analytics', shortLabel: 'Analytics', icon: BarChart3 },
  { id: 'settings', label: '12. White-Label Settings', shortLabel: 'Branding', icon: Settings },
];

export default function App() {
  const [activeModule, setActiveModule] = useState<ModuleId>('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<string>('ALL');
  const [activeRole, setActiveRole] = useState<UserRole>('Company Admin');

  const [showDemoTour, setShowDemoTour] = useState(true);
  const [tourStepIndex, setTourStepIndex] = useState(0);

  const [globalSearch, setGlobalSearch] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(
    'Welcome to RealEstateOS Demo Prototype (NEXORA DEVELOPERS)'
  );

  const [brand, setBrand] = useState<BrandSettings>(INITIAL_BRAND_SETTINGS);
  const [projects, setProjects] = useState<ProjectRecord[]>(INITIAL_PROJECTS);
  const [leads, setLeads] = useState<LeadRecord[]>(INITIAL_LEADS);
  const [inspectedLead, setInspectedLead] = useState<LeadRecord | null>(null);
  const [cps, setCps] = useState<ChannelPartnerRecord[]>(INITIAL_CHANNEL_PARTNERS);
  const [commissionLedger, setCommissionLedger] = useState<CommissionLedgerEntry[]>(INITIAL_COMMISSION_LEDGER);
  const [units, setUnits] = useState<InventoryUnit[]>(INITIAL_INVENTORY_UNITS);
  const [bookings, setBookings] = useState<BookingRecord[]>(INITIAL_BOOKINGS);
  const [employees, setEmployees] = useState<EmployeeRecord[]>(INITIAL_EMPLOYEES);
  const [dprs, setDprs] = useState<DPRRecord[]>(INITIAL_DPRS);
  const [siteTasks, setSiteTasks] = useState<SiteTaskRecord[]>(INITIAL_SITE_TASKS);
  const [materials, setMaterials] = useState<MaterialRecord[]>(INITIAL_MATERIALS);
  const [movements, setMovements] = useState<MaterialMovementRecord[]>(INITIAL_MATERIAL_MOVEMENTS);
  const [vendors, setVendors] = useState<VendorRecord[]>(INITIAL_VENDORS);
  const [pos, setPos] = useState<PurchaseOrderRecord[]>(INITIAL_PURCHASE_ORDERS);
  const [bills, setBills] = useState<BillExpenseRecord[]>(INITIAL_BILLS_EXPENSES);
  const [approvals, setApprovals] = useState<ApprovalItem[]>(INITIAL_APPROVALS);
  const [activities, setActivities] = useState<ActivityItem[]>(INITIAL_ACTIVITIES);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
  };

  const logActivity = (
    moduleName: string,
    projectId: string,
    projectName: string,
    description: string,
    badgeColor: ActivityItem['badgeColor'] = 'blue'
  ) => {
    const item: ActivityItem = {
      id: `ACT-${Date.now()}`,
      timestamp: 'Just now',
      module: moduleName,
      projectId,
      projectName,
      actor: `${activeRole} (Demo)`,
      description,
      badgeColor,
    };
    setActivities((prev) => [item, ...prev]);
  };

  const handleSelectTourStep = (idx: number) => {
    const stepObj = DEMO_TOUR_STEPS[idx];
    if (!stepObj) return;
    setTourStepIndex(idx);
    setActiveModule(stepObj.module);
    setSelectedProjectId(stepObj.projectFilter);
    triggerToast(`Presentation Step ${stepObj.step}: ${stepObj.title}`);
  };

  const handleApprovalDecision = (id: string, decision: 'Approved' | 'Rejected') => {
    const target = approvals.find((a) => a.id === id);
    setApprovals((prev) => prev.map((a) => (a.id === id ? { ...a, status: decision } : a)));
    if (target) {
      logActivity('Executive Approval', target.projectId, target.projectName, `${decision} ${target.type} (${target.referenceNo}) — ${target.title}`, decision === 'Approved' ? 'emerald' : 'amber');
      triggerToast(`${target.type} ${target.referenceNo} marked as ${decision}`);
    }
  };

  const handleAddProject = (newProj: ProjectRecord) => {
    setProjects((prev) => [...prev, newProj]);
    logActivity('Projects', newProj.id, newProj.name, `Launched new project ${newProj.name} (${newProj.totalUnits} units)`, 'emerald');
    triggerToast(`Added new project "${newProj.name}" to portfolio`);
  };

  const handleUpdateLeadStatus = (leadId: string, newStatus: LeadStatus) => {
    const target = leads.find((l) => l.id === leadId);
    setLeads((prev) =>
      prev.map((l) =>
        l.id === leadId
          ? {
              ...l,
              status: newStatus,
              notes: [{ id: `n-${Date.now()}`, timestamp: 'Just now', author: activeRole, type: 'Status Change', text: `Pipeline stage updated from ${l.status} to ${newStatus}.` }, ...l.notes],
            }
          : l
      )
    );
    if (target) {
      logActivity('CRM Leads', target.projectId, target.projectName, `Updated lead ${target.name} status to ${newStatus}`, 'blue');
      triggerToast(`Lead "${target.name}" moved to ${newStatus} stage`);
    }
  };

  const handleAddLead = (newLead: LeadRecord) => {
    setLeads((prev) => [newLead, ...prev]);
    setProjects((prev) => prev.map((p) => (p.id === newLead.projectId ? { ...p, activeLeadsCount: p.activeLeadsCount + 1 } : p)));
    logActivity('CRM Leads', newLead.projectId, newLead.projectName, `Registered new prospect ${newLead.name} (${newLead.source})`, 'blue');
    triggerToast(`Registered new lead "${newLead.name}" in CRM`);
  };

  const handleAddLeadNote = (leadId: string, type: 'Call' | 'Note' | 'Site Visit', text: string, followUpDate?: string) => {
    setLeads((prev) =>
      prev.map((l) =>
        l.id === leadId
          ? { ...l, followUpDate: followUpDate || l.followUpDate, notes: [{ id: `n-${Date.now()}`, timestamp: 'Just now', author: activeRole, type, text }, ...l.notes] }
          : l
      )
    );
    triggerToast(`Logged ${type} note on lead ${leadId}`);
  };

  const handleAddCP = (cp: ChannelPartnerRecord) => {
    setCps((prev) => [cp, ...prev]);
    triggerToast(`Empaneled Channel Partner "${cp.agencyName}"`);
  };

  const handleUpdateCPKyc = (cpId: string, status: ChannelPartnerRecord['kycStatus']) => {
    setCps((prev) => prev.map((c) => (c.id === cpId ? { ...c, kycStatus: status } : c)));
    triggerToast(`Updated Channel Partner ${cpId} KYC status to ${status}`);
  };

  const handleUpdateCommissionStatus = (ledgerId: string, status: CommissionLedgerEntry['status']) => {
    setCommissionLedger((prev) => prev.map((item) => (item.id === ledgerId ? { ...item, status } : item)));
    triggerToast(`Brokerage entry ${ledgerId} marked as ${status}`);
  };

  const handleRegisterPortalLead = (leadName: string, phone: string, projectId: string, config: string, cpAgency: string) => {
    const proj = projects.find((p) => p.id === projectId) || projects[0];
    const newLead: LeadRecord = {
      id: `LD-${1015 + leads.length}`,
      name: leadName,
      phone,
      email: 'cp.walkin@example.demo',
      projectId: proj.id,
      projectName: proj.name,
      source: 'Channel Partner',
      cpAgency,
      assignedTo: 'Rahul Sharma',
      status: 'Site Visit',
      followUpDate: '2026-11-04',
      budget: '₹75 L - ₹85 L',
      configurationInterest: config,
      createdAt: '2026-11-01',
      notes: [{ id: `n-${Date.now()}`, timestamp: 'Just now', author: cpAgency, type: 'Site Visit', text: `Registered via CP Portal with 48-Hour Lead Protection Pass.` }],
    };
    handleAddLead(newLead);
    triggerToast(`CP Portal Lead "${leadName}" registered with 48-Hr Protection!`);
  };

  const handleUpdateUnitStatus = (unitId: string, status: UnitStatus, customerName?: string) => {
    const target = units.find((u) => u.id === unitId);
    setUnits((prev) => prev.map((u) => (u.id === unitId ? { ...u, status, customerName } : u)));
    if (target) {
      logActivity('Inventory', target.projectId, target.projectName, `Unit ${target.unitNumber} status changed to ${status}`, 'emerald');
      triggerToast(`Unit ${target.unitNumber} status updated to ${status}`);
    }
  };

  const handleAddBooking = (newBk: BookingRecord, unitId?: string) => {
    setBookings((prev) => [newBk, ...prev]);
    if (unitId) {
      setUnits((prev) => prev.map((u) => (u.id === unitId ? { ...u, status: 'Booked', customerName: newBk.customerName, bookingId: newBk.id, bookingDate: newBk.bookingDate } : u)));
    }
    setProjects((prev) =>
      prev.map((p) =>
        p.id === newBk.projectId
          ? { ...p, soldUnits: p.soldUnits + 1, availableUnits: Math.max(0, p.availableUnits - 1), monthlyBookings: p.monthlyBookings + 1, monthlySalesCr: Number((p.monthlySalesCr + newBk.agreementValueLakhs / 100).toFixed(2)) }
          : p
      )
    );
    logActivity('Bookings', newBk.projectId, newBk.projectName, `Confirmed Booking ${newBk.id} for Unit ${newBk.unitNumber} (${newBk.customerName})`, 'emerald');
    triggerToast(`Confirmed Booking ${newBk.id} for Unit ${newBk.unitNumber}!`);
  };

  const handleQuickCreateBookingFromUnit = (unit: InventoryUnit, customerName: string, phone: string) => {
    const val = unit.basePriceLakhs;
    const token = Number((val * 0.1).toFixed(2));
    const newBk: BookingRecord = {
      id: `BK-NX-${1045 + bookings.length}`,
      customerName,
      coApplicant: 'Co-Applicant Verified',
      phone,
      email: 'buyer@example.demo',
      panMasked: 'ABCDE4455K (DEMO)',
      aadhaarMasked: 'XXXX-XXXX-3319 (DEMO)',
      projectId: unit.projectId,
      projectName: unit.projectName,
      tower: unit.tower,
      unitNumber: unit.unitNumber,
      bhk: unit.bhk,
      carpetArea: unit.carpetArea,
      bookingDate: '2026-11-01',
      agreementValueLakhs: val,
      paidAmountLakhs: token,
      balanceLakhs: Number((val - token).toFixed(2)),
      status: 'Token Received',
      bankLoanProvider: 'HDFC Home Loans',
      salesExecutive: 'Rahul Sharma',
      paymentSchedule: [
        { id: `ps-q1-${Date.now()}`, milestoneName: 'Booking Token (10%)', percentage: 10, amountLakhs: token, dueDate: '2026-11-01', status: 'Paid', paidDate: '2026-11-01', receiptNo: `RCPT-${9070 + bookings.length}`, paymentMode: 'NEFT' },
        { id: `ps-q2-${Date.now()}`, milestoneName: 'Agreement Execution (20%)', percentage: 20, amountLakhs: Number((val * 0.2).toFixed(2)), dueDate: '2026-11-20', status: 'Due' },
        { id: `ps-q3-${Date.now()}`, milestoneName: 'Slab & Possession Milestones (70%)', percentage: 70, amountLakhs: Number((val * 0.7).toFixed(2)), dueDate: '2027-04-01', status: 'Upcoming' },
      ],
    };
    handleAddBooking(newBk, unit.id);
  };

  const handleRecordMilestonePayment = (bookingId: string, milestoneId: string) => {
    setBookings((prev) =>
      prev.map((bk) => {
        if (bk.id !== bookingId) return bk;
        let addedAmt = 0;
        const updatedSchedule = bk.paymentSchedule.map((ms) => {
          if (ms.id === milestoneId && ms.status !== 'Paid') {
            addedAmt = ms.amountLakhs;
            return { ...ms, status: 'Paid' as const, paidDate: '2026-11-01', receiptNo: `RCPT-${Math.floor(9100 + Math.random() * 800)}`, paymentMode: 'RTGS' };
          }
          return ms;
        });
        return {
          ...bk,
          paidAmountLakhs: Number((bk.paidAmountLakhs + addedAmt).toFixed(2)),
          balanceLakhs: Number(Math.max(0, bk.balanceLakhs - addedAmt).toFixed(2)),
          paymentSchedule: updatedSchedule,
        };
      })
    );
    triggerToast(`Payment receipt recorded and ledger balance updated for ${bookingId}`);
  };

  const handleAddDPR = (dpr: DPRRecord) => {
    setDprs((prev) => [dpr, ...prev]);
    logActivity('Construction', dpr.projectId, dpr.projectName, `Logged DPR ${dpr.id} for ${dpr.towerZone} (${dpr.workforceCount} workers)`, 'emerald');
    triggerToast(`Daily Progress Report ${dpr.id} logged`);
  };

  const handleAddSiteTask = (task: SiteTaskRecord) => {
    setSiteTasks((prev) => [task, ...prev]);
    triggerToast(`Assigned site task "${task.title}" to ${task.owner}`);
  };

  const handleUpdateTaskStatus = (taskId: string, status: SiteTaskRecord['status']) => {
    setSiteTasks((prev) => prev.map((t) => (t.id === taskId ? { ...t, status } : t)));
    triggerToast(`Site task ${taskId} updated to ${status}`);
  };

  const handleBumpMilestoneProgress = (projectId: string, stage: string) => {
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id !== projectId) return p;
        const updatedMs = p.milestones.map((m) => {
          if (m.stage !== stage) return m;
          const nextProg = Math.min(100, m.progress + 5);
          return { ...m, progress: nextProg, status: nextProg === 100 ? ('Completed' as const) : ('In Progress' as const) };
        });
        const avgProgress = Math.round(updatedMs.reduce((a, b) => a + b.progress, 0) / updatedMs.length);
        return { ...p, milestones: updatedMs, progress: avgProgress };
      })
    );
    triggerToast(`Updated ${stage} milestone progress (+5%)`);
  };

  const handleRaiseIndent = (materialId: string, qty: number, projectId: string, requestedBy: string) => {
    const mat = materials.find((m) => m.id === materialId) || materials[0];
    const proj = projects.find((p) => p.id === projectId) || projects[0];
    const refNo = `IND-NX-0${320 + movements.length}`;
    const newMv: MaterialMovementRecord = {
      id: `MM-${Date.now()}`,
      date: '2026-11-01',
      materialId: mat.id,
      materialName: mat.name,
      category: mat.category,
      type: 'Material Indent',
      quantity: qty,
      unit: mat.unit,
      projectId: proj.id,
      projectName: proj.name,
      referenceNo: refNo,
      handledBy: requestedBy,
      status: 'Pending Approval',
    };
    setMovements((prev) => [newMv, ...prev]);
    setApprovals((prev) => [
      { id: `APR-${Date.now()}`, type: 'Material Indent', referenceNo: refNo, title: `${qty} ${mat.unit} ${mat.name} for ${proj.name}`, projectId: proj.id, projectName: proj.name, requestedBy, amountOrQty: `${qty} ${mat.unit}`, date: '2026-11-01', status: 'Pending' },
      ...prev,
    ]);
    logActivity('Materials', proj.id, proj.name, `Raised Material Indent ${refNo} for ${qty} ${mat.unit} of ${mat.name}`, 'amber');
    triggerToast(`Material Indent ${refNo} submitted & added to Pending Approvals!`);
  };

  const handleRecordStockMovement = (materialId: string, type: 'Stock In (GRN)' | 'Stock Out (Site Issue)' | 'Inter-Site Transfer', qty: number) => {
    const mat = materials.find((m) => m.id === materialId) || materials[0];
    setMaterials((prev) =>
      prev.map((m) => {
        if (m.id !== materialId) return m;
        const delta = type === 'Stock In (GRN)' ? qty : -qty;
        return { ...m, availableStock: Math.max(0, Number((m.availableStock + delta).toFixed(1))), lastUpdated: '2026-11-01' };
      })
    );
    const newMv: MaterialMovementRecord = {
      id: `MM-${Date.now()}`,
      date: '2026-11-01',
      materialId: mat.id,
      materialName: mat.name,
      category: mat.category,
      type,
      quantity: qty,
      unit: mat.unit,
      projectId: mat.projectId,
      projectName: mat.projectName,
      referenceNo: `STR-${Math.floor(1100 + Math.random() * 800)}`,
      handledBy: 'Mahesh Gawde (Storekeeper)',
      status: 'Completed',
    };
    setMovements((prev) => [newMv, ...prev]);
    triggerToast(`${type}: ${qty} ${mat.unit} of ${mat.name} updated in Store Inventory`);
  };

  const handleAddPO = (po: PurchaseOrderRecord) => {
    setPos((prev) => [po, ...prev]);
    logActivity('Procurement', po.projectId, po.projectName, `Created Purchase Order ${po.poNumber} (₹${po.amountLakhs} L) for ${po.vendorName}`, 'blue');
    triggerToast(`Created Purchase Order ${po.poNumber}`);
  };

  const handleApprovePO = (poId: string) => {
    setPos((prev) => prev.map((p) => (p.id === poId ? { ...p, approvalStatus: 'Approved' } : p)));
    triggerToast(`Purchase Order approved for vendor dispatch`);
  };

  const handleRecordGRN = (poId: string) => {
    setPos((prev) => prev.map((p) => (p.id === poId ? { ...p, approvalStatus: 'GRN Completed', grnStatus: 'QC Passed & Stored' } : p)));
    triggerToast(`Goods Received Note (GRN) verified & logged in store`);
  };

  const handleUpdateBillStatus = (billId: string, status: BillExpenseRecord['paymentStatus']) => {
    const target = bills.find((b) => b.id === billId);
    setBills((prev) => prev.map((b) => (b.id === billId ? { ...b, paymentStatus: status } : b)));
    if (target) {
      logActivity('Accounts', target.projectId, target.projectName, `Vendor Invoice ${target.invoiceNumber} (${target.vendorName}) marked as ${status}`, 'purple');
      triggerToast(`Invoice ${target.invoiceNumber} status updated to ${status}`);
    }
  };

  const handleResetAllDemoData = () => {
    setBrand(INITIAL_BRAND_SETTINGS);
    setProjects(INITIAL_PROJECTS);
    setLeads(INITIAL_LEADS);
    setCps(INITIAL_CHANNEL_PARTNERS);
    setCommissionLedger(INITIAL_COMMISSION_LEDGER);
    setUnits(INITIAL_INVENTORY_UNITS);
    setBookings(INITIAL_BOOKINGS);
    setEmployees(INITIAL_EMPLOYEES);
    setDprs(INITIAL_DPRS);
    setSiteTasks(INITIAL_SITE_TASKS);
    setMaterials(INITIAL_MATERIALS);
    setMovements(INITIAL_MATERIAL_MOVEMENTS);
    setVendors(INITIAL_VENDORS);
    setPos(INITIAL_PURCHASE_ORDERS);
    setBills(INITIAL_BILLS_EXPENSES);
    setApprovals(INITIAL_APPROVALS);
    setActivities(INITIAL_ACTIVITIES);
    setSelectedProjectId('ALL');
    setActiveRole('Company Admin');
    triggerToast('Reset all demo data & NEXORA DEVELOPERS branding to initial state');
  };

  const currentNavObj = NAV_ITEMS.find((n) => n.id === activeModule) || NAV_ITEMS[0];
  const selectedProjName = selectedProjectId === 'ALL' ? 'All 3 MMR Projects' : projects.find((p) => p.id === selectedProjectId)?.name || 'Selected Project';

  const searchResults =
    globalSearch.trim().length > 1
      ? [
          ...leads.filter((l) => l.name.toLowerCase().includes(globalSearch.toLowerCase())).map((l) => ({ label: `Lead: ${l.name} (${l.projectName})`, module: 'leads' as ModuleId })),
          ...units.filter((u) => u.unitNumber.toLowerCase().includes(globalSearch.toLowerCase())).map((u) => ({ label: `Unit ${u.unitNumber} - ${u.bhk} (${u.status})`, module: 'inventory' as ModuleId })),
          ...bookings.filter((b) => b.customerName.toLowerCase().includes(globalSearch.toLowerCase()) || b.id.toLowerCase().includes(globalSearch.toLowerCase())).map((b) => ({ label: `Booking ${b.id}: ${b.customerName}`, module: 'bookings' as ModuleId })),
          ...vendors.filter((v) => v.name.toLowerCase().includes(globalSearch.toLowerCase())).map((v) => ({ label: `Vendor: ${v.name}`, module: 'vendors' as ModuleId })),
        ].slice(0, 6)
      : [];

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex flex-col md:flex-row font-sans">
      <aside
        className={`${sidebarCollapsed ? 'md:w-20' : 'md:w-64'} fixed md:static inset-y-0 left-0 z-40 w-64 text-white transition-all duration-200 flex flex-col justify-between shrink-0 shadow-xl ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
        style={{ backgroundColor: brand.primaryNavy }}
      >
        <div>
          <div className="p-4 border-b border-white/10 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center font-extrabold text-sm text-white shrink-0 shadow-sm border border-white/20" style={{ backgroundColor: brand.accentBlue }}>
                {brand.logoText}
              </div>
              {!sidebarCollapsed && (
                <div className="truncate">
                  <div className="flex items-center gap-1.5">
                    <span className="font-extrabold text-sm tracking-tight text-white truncate">RealEstateOS</span>
                    <span className="px-1.5 py-0.2 rounded text-[9px] font-black uppercase bg-amber-400 text-slate-950">DEMO</span>
                  </div>
                  <div className="text-[10px] text-blue-200 truncate font-semibold">{brand.companyName}</div>
                </div>
              )}
            </div>
            <button type="button" onClick={() => setSidebarCollapsed(!sidebarCollapsed)} className="hidden md:flex p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10" title="Toggle Sidebar">
              {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>
            <button type="button" onClick={() => setMobileMenuOpen(false)} className="md:hidden p-1.5 rounded-lg text-slate-300 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="p-2.5 space-y-1 overflow-y-auto max-h-[calc(100vh-140px)]">
            {NAV_ITEMS.map((item) => {
              const IconComp = item.icon;
              const isActive = activeModule === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => { setActiveModule(item.id); setMobileMenuOpen(false); }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition ${isActive ? 'text-white shadow-xs' : 'text-slate-300 hover:text-white hover:bg-white/10'}`}
                  style={isActive ? { backgroundColor: brand.accentBlue } : undefined}
                  title={item.label}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <IconComp className="w-4 h-4 shrink-0" />
                    {!sidebarCollapsed && <span className="truncate">{item.label}</span>}
                  </div>
                  {!sidebarCollapsed && item.badge && (
                    <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${isActive ? 'bg-white/20 text-white' : 'bg-white/10 text-slate-300'}`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {!sidebarCollapsed && (
          <div className="p-3 m-2.5 rounded-xl bg-black/25 border border-white/10 text-[11px] space-y-1">
            <div className="flex items-center justify-between text-amber-300 font-bold">
              <span>SIMULATED ROLE</span>
              <span className="px-1.5 py-0.2 bg-amber-400/20 rounded text-[9px]">LOCAL STATE</span>
            </div>
            <div className="font-bold text-white truncate">{activeRole}</div>
            <button type="button" onClick={() => setActiveModule('employees')} className="text-[10px] text-blue-300 hover:underline block">
              Switch Persona Role →
            </button>
          </div>
        )}
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-slate-200 sticky top-0 z-30 px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3 shadow-2xs">
          <div className="flex items-center gap-3 flex-1 min-w-[240px]">
            <button type="button" onClick={() => setMobileMenuOpen(true)} className="md:hidden p-2 rounded-xl border border-slate-200 text-slate-700">
              <Menu className="w-4 h-4" />
            </button>

            <div className="relative flex-1 max-w-xs">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input type="text" placeholder="Search leads, units (A-501), bookings..." value={globalSearch} onChange={(e) => setGlobalSearch(e.target.value)} className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white text-xs focus:outline-none focus:border-blue-600" />
              {searchResults.length > 0 && (
                <div className="absolute left-0 right-0 top-full mt-1 bg-white rounded-xl shadow-xl border border-slate-200 p-1.5 z-50">
                  {searchResults.map((res, i) => (
                    <button key={i} type="button" onClick={() => { setActiveModule(res.module); setGlobalSearch(''); }} className="w-full text-left px-3 py-2 rounded-lg hover:bg-blue-50 text-xs font-semibold text-slate-800 flex items-center justify-between">
                      <span className="truncate">{res.label}</span>
                      <span className="text-[10px] text-blue-600 uppercase font-bold">{res.module}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="hidden sm:flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">
              <Building2 className="w-3.5 h-3.5 text-blue-700 shrink-0" />
              <span className="text-[11px] font-bold text-slate-500">Project:</span>
              <select
                value={selectedProjectId}
                onChange={(e) => {
                  setSelectedProjectId(e.target.value);
                  triggerToast(e.target.value === 'ALL' ? 'Showing All 3 NEXORA Projects' : `Filtered to ${projects.find((p) => p.id === e.target.value)?.name}`);
                }}
                className="bg-transparent text-xs font-extrabold text-slate-900 focus:outline-none cursor-pointer"
              >
                <option value="ALL">All Projects ({projects.length})</option>
                {projects.map((p) => (<option key={p.id} value={p.id}>{p.name} ({p.city})</option>))}
              </select>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden xl:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-100 text-amber-900 border border-amber-300">
              <Sparkles className="w-3 h-3 text-amber-600" /> DEMO PROTOTYPE
            </span>

            <button type="button" onClick={() => setShowDemoTour(!showDemoTour)} className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 border transition ${showDemoTour ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'}`}>
              <Play className="w-3 h-3" /><span>11-Step Demo Flow</span>
            </button>

            <div className="relative">
              <button type="button" onClick={() => { setShowNotifications(!showNotifications); setShowProfileMenu(false); }} className="p-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 relative" title="Notifications">
                <Bell className="w-4 h-4" />
                <span className="w-2 h-2 rounded-full bg-rose-500 absolute top-1.5 right-1.5" />
              </button>
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-200 p-4 z-50 space-y-3 text-xs">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <span className="font-bold text-slate-900">Recent Alerts ({activities.length})</span>
                    <button type="button" onClick={() => setShowNotifications(false)} className="text-[11px] text-blue-600 font-semibold">Close</button>
                  </div>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {activities.slice(0, 4).map((a) => (
                      <div key={a.id} className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                        <div className="font-bold text-slate-800">{a.module} • {a.projectName}</div>
                        <p className="text-slate-600 text-[11px] mt-0.5">{a.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="relative">
              <button type="button" onClick={() => { setShowProfileMenu(!showProfileMenu); setShowNotifications(false); }} className="flex items-center gap-2 pl-2 pr-3 py-1 rounded-xl border border-slate-200 bg-white hover:bg-slate-50">
                <div className="w-7 h-7 rounded-lg text-white font-bold text-xs flex items-center justify-center" style={{ backgroundColor: brand.primaryNavy }}>RS</div>
                <div className="hidden lg:block text-left">
                  <div className="text-xs font-bold text-slate-900 leading-none">R. Singhania</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">{activeRole}</div>
                </div>
              </button>
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-60 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 z-50 text-xs space-y-1">
                  <div className="px-3 py-2 border-b border-slate-100">
                    <div className="font-bold text-slate-900">{brand.companyName}</div>
                    <div className="text-[11px] text-slate-500">Role: {activeRole} (Simulated)</div>
                  </div>
                  <button type="button" onClick={() => { setActiveModule('settings'); setShowProfileMenu(false); }} className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-100 font-semibold text-slate-700">White-Label Branding Settings</button>
                  <button type="button" onClick={() => { setActiveModule('employees'); setShowProfileMenu(false); }} className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-100 font-semibold text-slate-700">Switch Demo Role Persona</button>
                  <button type="button" onClick={() => { handleResetAllDemoData(); setShowProfileMenu(false); }} className="w-full text-left px-3 py-2 rounded-lg hover:bg-rose-50 font-semibold text-rose-700">Reset Demo Data to Default</button>
                </div>
              )}
            </div>
          </div>
        </header>

        {showDemoTour && (
          <div className="bg-slate-900 text-white px-4 sm:px-6 py-3 border-b border-slate-800">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-2 mb-2.5">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-amber-400 text-slate-950 text-[10px] font-extrabold uppercase">Client Presentation Flow ({tourStepIndex + 1}/11)</span>
                <span className="text-xs font-bold text-amber-300">{DEMO_TOUR_STEPS[tourStepIndex]?.title}:</span>
                <span className="text-xs text-slate-300">{DEMO_TOUR_STEPS[tourStepIndex]?.instruction}</span>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <button type="button" onClick={() => handleSelectTourStep(Math.max(0, tourStepIndex - 1))} className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold">← Prev Step</button>
                <button type="button" onClick={() => handleSelectTourStep(Math.min(DEMO_TOUR_STEPS.length - 1, tourStepIndex + 1))} className="px-3 py-1 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-extrabold">Next Demo Step →</button>
              </div>
            </div>
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
              {DEMO_TOUR_STEPS.map((st, idx) => (
                <button key={st.step} type="button" onClick={() => handleSelectTourStep(idx)} className={`px-2.5 py-1 rounded-lg text-[11px] font-bold whitespace-nowrap transition ${tourStepIndex === idx ? 'bg-blue-600 text-white shadow-2xs' : 'bg-slate-800/90 text-slate-400 hover:text-white'}`}>
                  {st.title}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="px-4 sm:px-6 pt-5 pb-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
              <span>{brand.companyName}</span><span>/</span><span className="text-blue-700 font-semibold">{selectedProjName}</span><span>/</span><span className="text-slate-800 font-bold">{currentNavObj.shortLabel}</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-0.5">{currentNavObj.label}</h1>
          </div>
          <div className="flex sm:hidden items-center gap-2">
            <select value={selectedProjectId} onChange={(e) => setSelectedProjectId(e.target.value)} className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-xs font-bold">
              <option value="ALL">All Projects ({projects.length})</option>
              {projects.map((p) => (<option key={p.id} value={p.id}>{p.name} ({p.city})</option>))}
            </select>
          </div>
        </div>

        <main className="p-4 sm:p-6 flex-1">
          {activeModule === 'dashboard' && (
            <DashboardView
              projects={projects} leads={leads} approvals={approvals} activities={activities} selectedProjectId={selectedProjectId} brand={brand}
              onSelectProject={(id) => { setSelectedProjectId(id); triggerToast(id === 'ALL' ? 'Showing All Projects' : 'Filtered to Nexora Heights'); }}
              onNavigate={(mod) => setActiveModule(mod)} onHandleApproval={handleApprovalDecision} onInspectLead={(l) => setInspectedLead(l)}
            />
          )}
          {activeModule === 'projects' && (
            <ProjectsModule
              projects={projects} employees={employees} units={units} dprs={dprs} selectedProjectId={selectedProjectId} brand={brand}
              onAddProject={handleAddProject}
              onSelectProjectFilter={(id) => { setSelectedProjectId(id); triggerToast(`Global project filter set to ${projects.find((p) => p.id === id)?.name || 'All'}`); }}
              onNavigate={(m) => setActiveModule(m)}
            />
          )}
          {activeModule === 'leads' && (
            <LeadsModule
              leads={leads} projects={projects} selectedProjectId={selectedProjectId} inspectedLead={inspectedLead} brand={brand}
              onUpdateLeadStatus={handleUpdateLeadStatus} onAddLead={handleAddLead} onAddLeadNote={handleAddLeadNote} onSelectInspectLead={(l) => setInspectedLead(l)}
            />
          )}
          {activeModule === 'channel-partners' && (
            <ChannelPartnersModule
              cps={cps} ledger={commissionLedger} leads={leads} units={units} projects={projects} selectedProjectId={selectedProjectId} brand={brand}
              onAddCP={handleAddCP} onUpdateCPKyc={handleUpdateCPKyc} onUpdateCommissionStatus={handleUpdateCommissionStatus} onRegisterPortalLead={handleRegisterPortalLead}
            />
          )}
          {activeModule === 'inventory' && (
            <InventoryModule
              units={units} projects={projects} selectedProjectId={selectedProjectId} brand={brand}
              onUpdateUnitStatus={handleUpdateUnitStatus} onQuickCreateBookingFromUnit={handleQuickCreateBookingFromUnit}
            />
          )}
          {activeModule === 'bookings' && (
            <BookingsModule
              bookings={bookings} projects={projects} units={units} selectedProjectId={selectedProjectId} brand={brand}
              onRecordMilestonePayment={handleRecordMilestonePayment} onAddBooking={handleAddBooking}
            />
          )}
          {activeModule === 'employees' && (
            <EmployeesModule
              employees={employees} projects={projects} activeRole={activeRole} selectedProjectId={selectedProjectId} brand={brand}
              onSwitchRole={(r) => { setActiveRole(r); triggerToast(`Switched simulated persona to "${r}"`); }}
              onAddEmployee={(emp) => { setEmployees((prev) => [emp, ...prev]); triggerToast(`Added ${emp.name} (${emp.role}) to Employee Directory`); }}
            />
          )}
          {activeModule === 'construction' && (
            <ConstructionModule
              projects={projects} dprs={dprs} tasks={siteTasks} selectedProjectId={selectedProjectId} brand={brand}
              onAddDPR={handleAddDPR} onAddSiteTask={handleAddSiteTask} onUpdateTaskStatus={handleUpdateTaskStatus} onBumpMilestoneProgress={handleBumpMilestoneProgress}
            />
          )}
          {activeModule === 'materials' && (
            <MaterialsModule
              materials={materials} movements={movements} projects={projects} selectedProjectId={selectedProjectId} brand={brand}
              onRaiseIndent={handleRaiseIndent} onRecordStockMovement={handleRecordStockMovement}
            />
          )}
          {activeModule === 'vendors' && (
            <VendorsModule
              vendors={vendors} pos={pos} projects={projects} selectedProjectId={selectedProjectId} brand={brand}
              onAddPO={handleAddPO} onApprovePO={handleApprovePO} onRecordGRN={handleRecordGRN}
              onAddVendor={(v) => { setVendors((prev) => [v, ...prev]); triggerToast(`Empaneled vendor "${v.name}"`); }}
            />
          )}
          {activeModule === 'accounts' && (
            <AccountsModule
              bills={bills} projects={projects} selectedProjectId={selectedProjectId} brand={brand}
              onUpdateBillStatus={handleUpdateBillStatus}
              onAddBill={(b) => { setBills((prev) => [b, ...prev]); triggerToast(`Logged vendor invoice ${b.invoiceNumber} for approval`); }}
            />
          )}
          {activeModule === 'reports' && (
            <ReportsModule
              projects={projects} leads={leads} cps={cps} units={units} materials={materials} bills={bills}
              selectedProjectId={selectedProjectId} brand={brand} onTriggerToast={triggerToast}
            />
          )}
          {activeModule === 'settings' && (
            <SettingsModule
              brand={brand}
              onUpdateBrand={(updated) => { setBrand(updated); triggerToast(`Applied White-Label Theme for "${updated.companyName}"`); }}
              onResetDemoData={handleResetAllDemoData}
            />
          )}
        </main>

        <footer className="px-6 py-3 bg-white border-t border-slate-200 text-[11px] text-slate-500 flex flex-wrap items-center justify-between gap-2">
          <div><strong>RealEstateOS</strong> White-Label Developer CRM + ERP • Client Demo Prototype for <strong>{brand.companyName}</strong></div>
          <div>Interactive Browser State Mode (No external DB writes • Modular Next.js + TypeScript + Supabase RLS Ready)</div>
        </footer>
      </div>

      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 max-w-sm bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-3">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="text-xs font-semibold leading-snug">{toastMessage}</span>
          <button type="button" onClick={() => setToastMessage(null)} className="p-1 rounded-lg text-slate-400 hover:text-white ml-1"><X className="w-3.5 h-3.5" /></button>
        </div>
      )}
    </div>
  );
}
