import React, { useState } from 'react';
import {
  Building2, Home, Users, Briefcase, CheckCircle2, IndianRupee, TrendingUp,
  Plus, Search, Filter, Eye, Phone, Mail, Calendar, MapPin, Clock, Check, X,
  ArrowUpRight, Layers, PhoneCall, ChevronRight, LayoutGrid, List, Kanban,
} from 'lucide-react';
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, PieChart, Pie, Cell,
} from 'recharts';
import {
  ProjectRecord, LeadRecord, LeadStatus, InventoryUnit, EmployeeRecord,
  DPRRecord, ApprovalItem, ActivityItem, ModuleId, BrandSettings,
} from '../types';
import { MONTHLY_SALES_CHART_DATA, LEAD_SOURCE_CHART_DATA } from '../data/mockData';

export const LEAD_STAGES: LeadStatus[] = [
  'New', 'Contacted', 'Qualified', 'Site Visit', 'Negotiation', 'Booked', 'Lost',
];

export function getStatusBadgeStyle(status: string): string {
  switch (status) {
    case 'Available': case 'Verified': case 'Approved': case 'Paid':
    case 'Completed': case 'Booked': case 'Active': case 'Preferred':
    case 'QC Passed & Stored': case 'GRN Completed':
      return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    case 'Hold': case 'Pending Approval': case 'Pending KYC': case 'Under Review':
    case 'Processing': case 'Pending': case 'Due': case 'Site Visit':
    case 'Negotiation': case 'On Site': case 'Partial GRN': case 'Submitted':
      return 'bg-amber-50 text-amber-700 border-amber-200';
    case 'Registered': case 'Qualified': case 'Contacted': case 'In Progress':
    case 'Agreement Drafted': case 'Token Received': case 'Empaneled':
      return 'bg-blue-50 text-blue-700 border-blue-200';
    case 'New': case 'Upcoming':
      return 'bg-indigo-50 text-indigo-700 border-indigo-200';
    case 'Lost': case 'Overdue': case 'Delayed': case 'Rejected': case 'On Leave':
      return 'bg-rose-50 text-rose-700 border-rose-200';
    default:
      return 'bg-slate-100 text-slate-700 border-slate-200';
  }
}

export const ArchitecturalFloorPlanSVG: React.FC<{ bhk: string; unitNumber: string; carpetArea: number; facing: string }> = ({
  bhk, unitNumber, carpetArea, facing,
}) => (
  <div className="bg-slate-900 rounded-xl p-4 text-white border border-slate-700 relative overflow-hidden">
    <div className="flex items-center justify-between mb-2">
      <div>
        <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-400/30 font-semibold">
          CAD Blueprint Preview • Demo Only
        </span>
        <h4 className="text-sm font-bold mt-1 text-white">
          Unit {unitNumber} — {bhk} ({carpetArea} sq.ft RERA Carpet)
        </h4>
      </div>
      <div className="text-right text-xs text-slate-300">
        <div className="font-semibold text-amber-300">Facing: {facing}</div>
        <div>Scale: 1:100</div>
      </div>
    </div>
    <svg viewBox="0 0 420 220" className="w-full h-44 bg-slate-950/80 rounded-lg border border-slate-800 p-2">
      <defs>
        <pattern id="cadGrid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1e293b" strokeWidth="0.7" />
        </pattern>
      </defs>
      <rect width="420" height="220" fill="url(#cadGrid)" />
      <rect x="20" y="16" width="380" height="188" fill="#0f172a" stroke="#38bdf8" strokeWidth="2.5" />
      <rect x="24" y="20" width="165" height="115" fill="#1e293b" stroke="#60a5fa" strokeWidth="1.5" />
      <text x="106" y="72" fill="#e2e8f0" fontSize="11" fontWeight="bold" textAnchor="middle">LIVING &amp; DINING</text>
      <text x="106" y="88" fill="#94a3b8" fontSize="9" textAnchor="middle">16&apos;6&quot; × 11&apos;0&quot;</text>
      <rect x="24" y="135" width="165" height="65" fill="#0f766e" fillOpacity="0.25" stroke="#2dd4bf" strokeWidth="1.5" strokeDasharray="4 2" />
      <text x="106" y="165" fill="#5eead4" fontSize="10" fontWeight="bold" textAnchor="middle">SUNDECK BALCONY (5&apos; Wide)</text>
      <rect x="189" y="125" width="95" height="75" fill="#1e293b" stroke="#60a5fa" strokeWidth="1.5" />
      <text x="236" y="160" fill="#e2e8f0" fontSize="10" fontWeight="bold" textAnchor="middle">KITCHEN</text>
      <text x="236" y="174" fill="#94a3b8" fontSize="8.5" textAnchor="middle">9&apos;6&quot; × 8&apos;0&quot;</text>
      <rect x="189" y="20" width="110" height="105" fill="#1e293b" stroke="#60a5fa" strokeWidth="1.5" />
      <text x="244" y="68" fill="#e2e8f0" fontSize="10" fontWeight="bold" textAnchor="middle">MASTER BEDROOM</text>
      <text x="244" y="82" fill="#94a3b8" fontSize="8.5" textAnchor="middle">12&apos;0&quot; × 11&apos;0&quot;</text>
      <rect x="299" y="20" width="97" height="105" fill="#1e293b" stroke="#60a5fa" strokeWidth="1.5" />
      <text x="347" y="68" fill="#e2e8f0" fontSize="10" fontWeight="bold" textAnchor="middle">
        {bhk === 'Office' || bhk === 'Retail' ? 'DIRECTOR CABIN' : 'BEDROOM 02'}
      </text>
      <text x="347" y="82" fill="#94a3b8" fontSize="8.5" textAnchor="middle">10&apos;6&quot; × 10&apos;0&quot;</text>
      <rect x="284" y="125" width="112" height="75" fill="#1e293b" stroke="#60a5fa" strokeWidth="1.5" />
      <text x="340" y="160" fill="#cbd5e1" fontSize="9.5" fontWeight="bold" textAnchor="middle">BATH 1 &amp; 2 + FOYER</text>
      <text x="340" y="175" fill="#38bdf8" fontSize="8.5" textAnchor="middle">Vastu Compliant Entry</text>
    </svg>
  </div>
);

interface DashboardProps {
  projects: ProjectRecord[];
  leads: LeadRecord[];
  approvals: ApprovalItem[];
  activities: ActivityItem[];
  selectedProjectId: string;
  brand: BrandSettings;
  onSelectProject: (id: string) => void;
  onNavigate: (module: ModuleId) => void;
  onHandleApproval: (id: string, decision: 'Approved' | 'Rejected') => void;
  onInspectLead: (lead: LeadRecord) => void;
}

export const DashboardView: React.FC<DashboardProps> = ({
  projects, leads, approvals, activities, selectedProjectId, brand,
  onSelectProject, onNavigate, onHandleApproval, onInspectLead,
}) => {
  const filteredProjects = selectedProjectId === 'ALL' ? projects : projects.filter((p) => p.id === selectedProjectId);
  const filteredLeads = selectedProjectId === 'ALL' ? leads : leads.filter((l) => l.projectId === selectedProjectId);
  const filteredApprovals = selectedProjectId === 'ALL' ? approvals : approvals.filter((a) => a.projectId === selectedProjectId);
  const filteredActivities = selectedProjectId === 'ALL' ? activities : activities.filter((a) => a.projectId === selectedProjectId);

  const activeProjectsCount = selectedProjectId === 'ALL' ? projects.length : filteredProjects.length;
  const totalUnitsCount = filteredProjects.reduce((acc, p) => acc + p.totalUnits, 0);
  const activeLeadsCount = filteredProjects.reduce((acc, p) => acc + p.activeLeadsCount, 0);
  const channelPartnersCount = selectedProjectId === 'ALL' ? 42 : filteredProjects.reduce((acc, p) => acc + p.cpCount, 0);
  const bookingsCount = filteredProjects.reduce((acc, p) => acc + p.monthlyBookings, 0);
  const salesValueCr = filteredProjects.reduce((acc, p) => acc + p.monthlySalesCr, 0).toFixed(1);

  const kpiCards = [
    { label: 'Active Projects', value: `${activeProjectsCount} Active Projects`, sub: selectedProjectId === 'ALL' ? 'Dombivli • Thane • Kalyan' : filteredProjects[0]?.city || 'Selected', icon: Building2, targetModule: 'projects' as ModuleId, accent: '#2864A6' },
    { label: 'Total Inventory', value: `${totalUnitsCount} Total Units`, sub: `${filteredProjects.reduce((a, p) => a + p.soldUnits, 0)} Sold • ${filteredProjects.reduce((a, p) => a + p.availableUnits, 0)} Available`, icon: Home, targetModule: 'inventory' as ModuleId, accent: '#0284C7' },
    { label: 'Active CRM Leads', value: `${activeLeadsCount} Active Leads`, sub: '38% via Channel Partners', icon: Users, targetModule: 'leads' as ModuleId, accent: '#4F46E5' },
    { label: 'Channel Partners', value: `${channelPartnersCount} Channel Partners`, sub: 'RERA Verified Broker Network', icon: Briefcase, targetModule: 'channel-partners' as ModuleId, accent: '#0D9488' },
    { label: 'Confirmed Bookings', value: `${bookingsCount} Bookings`, sub: 'Current Month Velocity', icon: CheckCircle2, targetModule: 'bookings' as ModuleId, accent: '#16A34A' },
    { label: 'Monthly Sales Value', value: `₹${salesValueCr} Cr Sales Value`, sub: `Portfolio Booked: ₹${filteredProjects.reduce((a, p) => a + p.totalSalesCr, 0).toFixed(1)} Cr`, icon: IndianRupee, targetModule: 'reports' as ModuleId, accent: '#D97706' },
  ];

  return (
    <div className="space-y-6">
      <div
        className="rounded-2xl p-5 text-white shadow-sm flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 border border-white/10"
        style={{ background: `linear-gradient(135deg, ${brand.primaryNavy} 0%, ${brand.accentBlue} 100%)` }}
      >
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider bg-amber-400 text-slate-950 rounded-full">
              Client Demo Prototype
            </span>
            <span className="text-xs text-blue-100 font-medium">
              {brand.companyName} • Multi-Project Developer Command Center
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold mt-1.5">
            {selectedProjectId === 'ALL'
              ? 'Executive Portfolio Overview (All 3 MMR Projects)'
              : `${filteredProjects[0]?.name} — ${filteredProjects[0]?.location}`}
          </h2>
          <p className="text-xs sm:text-sm text-blue-100/90 mt-0.5">
            Unified CRM, Flat Inventory, Channel Partners, Site Construction, Material Stores, Procurement &amp; Accounts.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => onSelectProject(selectedProjectId === 'proj-1' ? 'ALL' : 'proj-1')}
            className="px-3.5 py-2 rounded-xl bg-white/15 hover:bg-white/25 text-xs font-semibold backdrop-blur-sm border border-white/20 transition flex items-center gap-1.5"
          >
            <Filter className="w-3.5 h-3.5" />
            {selectedProjectId === 'proj-1' ? 'Reset to All Projects' : 'Filter: Nexora Heights'}
          </button>
          <button
            type="button"
            onClick={() => onNavigate('inventory')}
            className="px-3.5 py-2 rounded-xl bg-white text-slate-900 hover:bg-blue-50 text-xs font-bold transition shadow-sm flex items-center gap-1.5"
          >
            <Layers className="w-3.5 h-3.5 text-blue-700" />
            Open Flat Availability Grid
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {kpiCards.map((kpi) => {
          const IconComp = kpi.icon;
          return (
            <button
              key={kpi.label}
              type="button"
              onClick={() => onNavigate(kpi.targetModule)}
              className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-sm hover:shadow-md hover:border-blue-300 transition text-left group flex flex-col justify-between"
            >
              <div className="flex items-center justify-between w-full mb-3">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{kpi.label}</span>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition" style={{ backgroundColor: kpi.accent }}>
                  <IconComp className="w-4 h-4" />
                </div>
              </div>
              <div>
                <div className="text-lg font-extrabold text-slate-900 leading-snug">{kpi.value}</div>
                <div className="text-[11px] text-slate-500 mt-1 flex items-center justify-between">
                  <span className="truncate">{kpi.sub}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 shrink-0" />
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">Monthly Sales Velocity (₹ Crores)</h3>
              <p className="text-xs text-slate-500">Project-wise monthly booking value across Residential &amp; Commercial inventory</p>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              <TrendingUp className="w-3.5 h-3.5" /> Oct Peak: ₹12.5 Cr (+7.8% vs Target)
            </div>
          </div>
          <div className="relative h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MONTHLY_SALES_CHART_DATA} margin={{ top: 10, right: 15, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#475569' }} />
                <YAxis tick={{ fontSize: 12, fill: '#475569' }} unit=" Cr" />
                <Tooltip formatter={(value: number) => [`₹${value} Cr`, 'Sales Value']} contentStyle={{ borderRadius: '12px', border: '1px solid #cbd5e1', fontSize: '12px' }} />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Bar dataKey="heights" name="Nexora Heights (Dombivli)" stackId="a" fill="#14263D" />
                <Bar dataKey="skyview" name="Nexora Skyview (Thane)" stackId="a" fill="#2864A6" />
                <Bar dataKey="businessPark" name="Nexora Business Park (Kalyan)" stackId="a" fill="#38BDF8" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">Lead Source Mix (126 Leads)</h3>
            <p className="text-xs text-slate-500">Attribution across Channel Partners, Digital &amp; Walk-ins</p>
          </div>
          <div className="relative h-52 w-full my-2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={LEAD_SOURCE_CHART_DATA} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={48} outerRadius={78} paddingAngle={3}>
                  {LEAD_SOURCE_CHART_DATA.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number, name: string) => [`${value} Leads`, name]} contentStyle={{ borderRadius: '10px', fontSize: '12px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-1.5">
            {LEAD_SOURCE_CHART_DATA.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-slate-700 font-medium">{item.name}</span>
                </div>
                <span className="font-bold text-slate-900">{item.value} ({item.percentage}%)</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">Project-Wise Sales Performance</h3>
              <p className="text-xs text-slate-500">Inventory absorption, bookings &amp; realization</p>
            </div>
            <button type="button" onClick={() => onNavigate('projects')} className="text-xs font-semibold text-blue-700 hover:text-blue-900 flex items-center gap-1">
              View All Projects <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="space-y-4">
            {filteredProjects.map((proj) => {
              const soldPct = Math.round((proj.soldUnits / proj.totalUnits) * 100);
              return (
                <div key={proj.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-slate-900">{proj.name}</span>
                        <span className="text-[11px] px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 font-semibold">{proj.type}</span>
                      </div>
                      <p className="text-xs text-slate-500">{proj.location} • RERA: {proj.reraNumber}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-extrabold text-slate-900">₹{proj.monthlySalesCr} Cr <span className="text-[11px] font-normal text-slate-500">this month</span></div>
                      <div className="text-xs text-emerald-700 font-semibold">{proj.soldUnits}/{proj.totalUnits} Units Sold ({soldPct}%)</div>
                    </div>
                  </div>
                  <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-300" style={{ width: `${soldPct}%`, backgroundColor: brand.accentBlue }} />
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-500 mt-2">
                    <span>Available: {proj.availableUnits} Units</span>
                    <span>On Hold: {proj.holdUnits} Units</span>
                    <span>Total Booked Value: ₹{proj.totalSalesCr} Cr</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">Engineering &amp; Site Progress Summary</h3>
              <p className="text-xs text-slate-500">Physical milestone completion &amp; active site workforce</p>
            </div>
            <button type="button" onClick={() => onNavigate('construction')} className="text-xs font-semibold text-blue-700 hover:text-blue-900 flex items-center gap-1">
              Open Site DPRs <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="space-y-4">
            {filteredProjects.map((proj) => (
              <div key={proj.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <span className="font-bold text-sm text-slate-900">{proj.name}</span>
                    <span className="text-xs text-slate-500 ml-2">({proj.workforceCount} Workforce Active)</span>
                  </div>
                  <span className="text-sm font-extrabold text-emerald-700">{proj.progress}% Complete</span>
                </div>
                <div className="grid grid-cols-6 gap-1.5 mt-2">
                  {proj.milestones.map((ms) => (
                    <div key={ms.stage} className="bg-white p-1.5 rounded-lg border border-slate-200 text-center">
                      <div className="text-[10px] text-slate-500 truncate font-medium">{ms.stage}</div>
                      <div className={`text-xs font-bold mt-0.5 ${ms.progress === 100 ? 'text-emerald-600' : ms.progress > 0 ? 'text-blue-600' : 'text-slate-400'}`}>
                        {ms.progress}%
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-1 bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">Recent Enquiries</h3>
                <p className="text-xs text-slate-500">Latest prospective homebuyer &amp; office leads</p>
              </div>
              <button type="button" onClick={() => onNavigate('leads')} className="text-xs font-semibold text-blue-700 hover:underline">
                All Leads
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase">
                    <th className="pb-2">Client / Project</th>
                    <th className="pb-2">Stage</th>
                    <th className="pb-2 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {filteredLeads.slice(0, 5).map((lead) => (
                    <tr key={lead.id} className="hover:bg-slate-50">
                      <td className="py-2.5 pr-2">
                        <div className="font-bold text-slate-900">{lead.name}</div>
                        <div className="text-[11px] text-slate-500">{lead.projectName} • {lead.configurationInterest}</div>
                      </td>
                      <td className="py-2.5">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${getStatusBadgeStyle(lead.status)}`}>{lead.status}</span>
                      </td>
                      <td className="py-2.5 text-right">
                        <button
                          type="button"
                          onClick={() => {
                            onInspectLead(lead);
                            onNavigate('leads');
                          }}
                          className="px-2 py-1 rounded-lg bg-slate-100 hover:bg-blue-50 text-blue-700 font-semibold text-[11px]"
                        >
                          Inspect
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">Pending Executive Approvals</h3>
              <p className="text-xs text-slate-500">POs, Vendor Bills, Indents &amp; Booking Waivers</p>
            </div>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800">
              {filteredApprovals.filter((a) => a.status === 'Pending').length} Pending
            </span>
          </div>
          <div className="space-y-3">
            {filteredApprovals.map((item) => (
              <div key={item.id} className="p-3 rounded-xl border border-slate-200 bg-slate-50/70">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-slate-200 text-slate-800">{item.type}</span>
                      <span className="text-xs font-mono text-slate-500">{item.referenceNo}</span>
                    </div>
                    <h4 className="text-xs font-bold text-slate-900 mt-1">{item.title}</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">{item.projectName} • By {item.requestedBy}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-xs font-extrabold text-slate-900">{item.amountOrQty}</div>
                    <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-semibold border ${getStatusBadgeStyle(item.status)}`}>{item.status}</span>
                  </div>
                </div>
                {item.status === 'Pending' && (
                  <div className="flex items-center justify-end gap-2 mt-2.5 pt-2 border-t border-slate-200/80">
                    <button
                      type="button"
                      onClick={() => onHandleApproval(item.id, 'Rejected')}
                      className="px-2.5 py-1 rounded-lg border border-rose-200 bg-white hover:bg-rose-50 text-rose-700 text-[11px] font-semibold flex items-center gap-1"
                    >
                      <X className="w-3 h-3" /> Hold / Reject
                    </button>
                    <button
                      type="button"
                      onClick={() => onHandleApproval(item.id, 'Approved')}
                      className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-semibold flex items-center gap-1 shadow-2xs"
                    >
                      <Check className="w-3 h-3" /> Approve Now
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">Live Operations Feed</h3>
              <p className="text-xs text-slate-500">Real-time activity stream across departments</p>
            </div>
            <Clock className="w-4 h-4 text-slate-400" />
          </div>
          <div className="space-y-3.5 relative before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
            {filteredActivities.slice(0, 6).map((act) => (
              <div key={act.id} className="relative pl-7">
                <span className={`absolute left-1 top-1.5 w-3.5 h-3.5 rounded-full border-2 border-white shadow-2xs ${act.badgeColor === 'emerald' ? 'bg-emerald-500' : act.badgeColor === 'amber' ? 'bg-amber-500' : act.badgeColor === 'purple' ? 'bg-purple-500' : 'bg-blue-600'}`} />
                <div className="flex items-center justify-between text-[11px] text-slate-500">
                  <span className="font-semibold text-slate-700">{act.module} • {act.projectName}</span>
                  <span>{act.timestamp}</span>
                </div>
                <p className="text-xs text-slate-800 mt-0.5 leading-relaxed">{act.description}</p>
                <span className="text-[11px] text-slate-400">Logged by {act.actor}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

interface ProjectsModuleProps {
  projects: ProjectRecord[];
  employees: EmployeeRecord[];
  units: InventoryUnit[];
  dprs: DPRRecord[];
  selectedProjectId: string;
  brand: BrandSettings;
  onAddProject: (proj: ProjectRecord) => void;
  onSelectProjectFilter: (id: string) => void;
  onNavigate: (module: ModuleId) => void;
}

export const ProjectsModule: React.FC<ProjectsModuleProps> = ({
  projects, units, selectedProjectId, brand, onAddProject, onSelectProjectFilter, onNavigate,
}) => {
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');
  const [detailProject, setDetailProject] = useState<ProjectRecord | null>(projects[0] || null);
  const [detailTab, setDetailTab] = useState<'overview' | 'team' | 'inventory' | 'progress'>('overview');
  const [showAddModal, setShowAddModal] = useState(false);

  const [newName, setNewName] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newType, setNewType] = useState<'Residential' | 'Commercial'>('Residential');
  const [newConfig, setNewConfig] = useState('2 BHK & 3 BHK Residences');
  const [newRera, setNewRera] = useState('P51700099404 (DEMO)');
  const [newTotalUnits, setNewTotalUnits] = useState(72);
  const [newBudgetCr, setNewBudgetCr] = useState(55);

  const visibleProjects = selectedProjectId === 'ALL' ? projects : projects.filter((p) => p.id === selectedProjectId);

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newLocation.trim()) return;
    const created: ProjectRecord = {
      id: `proj-${Date.now()}`,
      name: newName.trim(),
      location: newLocation.trim(),
      city: newLocation.split(',')[0].trim(),
      type: newType,
      configuration: newConfig,
      reraNumber: newRera.includes('DEMO') ? newRera : `${newRera} (DEMO)`,
      totalUnits: Number(newTotalUnits) || 60,
      soldUnits: 0,
      holdUnits: 0,
      availableUnits: Number(newTotalUnits) || 60,
      activeLeadsCount: 5,
      cpCount: 8,
      monthlyBookings: 0,
      monthlySalesCr: 0,
      totalSalesCr: 0,
      progress: 10,
      towers: ['Tower A'],
      floors: 12,
      launchDate: '2026-11-01',
      completionDate: '2029-03-31',
      projectManager: 'Vikramaditya Deshmukh',
      siteEngineer: 'Rohan Kulkarni',
      salesManager: 'Priya Nair',
      budgetCr: Number(newBudgetCr) || 50,
      actualSpendCr: 4.5,
      workforceCount: 45,
      milestones: [
        { stage: 'Foundation', progress: 60, status: 'In Progress', updatedAt: '2026-11-01' },
        { stage: 'Plinth', progress: 0, status: 'Upcoming', updatedAt: '2026-11-01' },
        { stage: 'Structure', progress: 0, status: 'Upcoming', updatedAt: '2026-11-01' },
        { stage: 'Brickwork', progress: 0, status: 'Upcoming', updatedAt: '2026-11-01' },
        { stage: 'MEP', progress: 0, status: 'Upcoming', updatedAt: '2026-11-01' },
        { stage: 'Finishing', progress: 0, status: 'Upcoming', updatedAt: '2026-11-01' },
      ],
      amenities: ['Clubhouse', 'Landscaped Podium', 'Solar Backup', '24x7 Security'],
    };
    onAddProject(created);
    setDetailProject(created);
    setShowAddModal(false);
    setNewName('');
    setNewLocation('');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <h3 className="text-base font-bold text-slate-900">Developer Project Portfolio ({visibleProjects.length} Active)</h3>
          <p className="text-xs text-slate-500">All RERA numbers shown below are fictional demonstration identifiers.</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="inline-flex rounded-xl bg-slate-100 p-1 border border-slate-200">
            <button type="button" onClick={() => setViewMode('cards')} className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${viewMode === 'cards' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600'}`}>
              <LayoutGrid className="w-3.5 h-3.5" /> Cards
            </button>
            <button type="button" onClick={() => setViewMode('table')} className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${viewMode === 'table' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600'}`}>
              <List className="w-3.5 h-3.5" /> Table
            </button>
          </div>
          <button type="button" onClick={() => setShowAddModal(true)} className="px-4 py-2 rounded-xl text-white text-xs font-bold shadow-xs flex items-center gap-1.5 hover:opacity-95 transition" style={{ backgroundColor: brand.accentBlue }}>
            <Plus className="w-4 h-4" /> Add New Project
          </button>
        </div>
      </div>

      {viewMode === 'cards' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {visibleProjects.map((proj) => {
            const soldPct = Math.round((proj.soldUnits / proj.totalUnits) * 100);
            const isSelected = detailProject?.id === proj.id;
            return (
              <div key={proj.id} className={`bg-white rounded-2xl border transition shadow-xs overflow-hidden flex flex-col justify-between ${isSelected ? 'border-blue-600 ring-2 ring-blue-500/20' : 'border-slate-200 hover:border-slate-300'}`}>
                <div>
                  <div className="p-4 text-white" style={{ background: `linear-gradient(135deg, ${brand.primaryNavy} 0%, ${brand.accentBlue} 100%)` }}>
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-white/20 text-white">{proj.type}</span>
                      <span className="text-[11px] font-mono bg-slate-900/40 px-2 py-0.5 rounded text-amber-300">RERA: {proj.reraNumber}</span>
                    </div>
                    <h4 className="text-lg font-bold mt-2">{proj.name}</h4>
                    <p className="text-xs text-blue-100 flex items-center gap-1 mt-0.5"><MapPin className="w-3.5 h-3.5 shrink-0" /> {proj.location}</p>
                  </div>
                  <div className="p-4 space-y-4">
                    <div className="text-xs text-slate-600 font-medium bg-slate-50 p-2.5 rounded-xl border border-slate-200/70">
                      <span className="font-bold text-slate-800">Config:</span> {proj.configuration} ({proj.towers.join(', ')})
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                        <div className="text-[11px] text-slate-500">Total Units</div>
                        <div className="text-base font-extrabold text-slate-900">{proj.totalUnits}</div>
                      </div>
                      <div className="p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-100">
                        <div className="text-[11px] text-emerald-700">Sold Units</div>
                        <div className="text-base font-extrabold text-emerald-800">{proj.soldUnits}</div>
                      </div>
                      <div className="p-2.5 rounded-xl bg-blue-50/70 border border-blue-100">
                        <div className="text-[11px] text-blue-700">Available</div>
                        <div className="text-base font-extrabold text-blue-800">{proj.availableUnits}</div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="font-semibold text-slate-600">Construction Progress</span>
                        <span className="font-bold text-slate-900">{proj.progress}%</span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-600 rounded-full" style={{ width: `${proj.progress}%` }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="font-semibold text-slate-600">Inventory Sold ({soldPct}%)</span>
                        <span className="font-bold text-blue-700">₹{proj.totalSalesCr} Cr Booked</span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${soldPct}%`, backgroundColor: brand.accentBlue }} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-4 pt-0 flex items-center gap-2">
                  <button type="button" onClick={() => { setDetailProject(proj); setDetailTab('overview'); }} className="flex-1 py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition">
                    <Eye className="w-3.5 h-3.5" /> Inspect Project Details
                  </button>
                  <button type="button" onClick={() => onSelectProjectFilter(proj.id)} className="py-2 px-3 rounded-xl border border-slate-200 hover:bg-slate-100 text-xs font-semibold text-slate-700 transition">
                    Set Global Filter
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase">
                <th className="py-3.5 px-4">Project Name</th>
                <th className="py-3.5 px-4">Location</th>
                <th className="py-3.5 px-4">Configuration</th>
                <th className="py-3.5 px-4">RERA No (Demo)</th>
                <th className="py-3.5 px-4">Total / Sold</th>
                <th className="py-3.5 px-4">Progress</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-xs">
              {visibleProjects.map((proj) => (
                <tr key={proj.id} className="hover:bg-slate-50">
                  <td className="py-3.5 px-4 font-bold text-slate-900">{proj.name}</td>
                  <td className="py-3.5 px-4 text-slate-600">{proj.location}</td>
                  <td className="py-3.5 px-4 text-slate-600">{proj.configuration}</td>
                  <td className="py-3.5 px-4 font-mono text-slate-700">{proj.reraNumber}</td>
                  <td className="py-3.5 px-4 font-semibold">{proj.soldUnits} / {proj.totalUnits} Units</td>
                  <td className="py-3.5 px-4"><span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">{proj.progress}%</span></td>
                  <td className="py-3.5 px-4 text-right">
                    <button type="button" onClick={() => setDetailProject(proj)} className="px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 font-semibold hover:bg-blue-100">Open Details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {detailProject && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-5 bg-slate-50 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded bg-blue-100 text-blue-800">Project Deep-Dive</span>
                <span className="text-xs font-mono text-slate-500">RERA: {detailProject.reraNumber}</span>
              </div>
              <h3 className="text-xl font-extrabold text-slate-900 mt-1">{detailProject.name} — {detailProject.location}</h3>
            </div>
            <div className="flex flex-wrap gap-1.5 bg-slate-200/70 p-1 rounded-xl">
              {(['overview', 'team', 'inventory', 'progress'] as const).map((tab) => (
                <button key={tab} type="button" onClick={() => setDetailTab(tab)} className={`px-3.5 py-1.5 rounded-lg text-xs font-bold capitalize transition ${detailTab === tab ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'}`}>
                  {tab}
                </button>
              ))}
            </div>
          </div>
          <div className="p-5">
            {detailTab === 'overview' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-4">
                  <h4 className="text-sm font-bold text-slate-900">Project Specifications &amp; Financial Snapshot</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200"><div className="text-[11px] text-slate-500">Towers / Wings</div><div className="text-sm font-bold text-slate-900 mt-0.5">{detailProject.towers.join(', ')}</div></div>
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200"><div className="text-[11px] text-slate-500">Elevation Floors</div><div className="text-sm font-bold text-slate-900 mt-0.5">G + {detailProject.floors} Floors</div></div>
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200"><div className="text-[11px] text-slate-500">Target Handover</div><div className="text-sm font-bold text-slate-900 mt-0.5">{detailProject.completionDate}</div></div>
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200"><div className="text-[11px] text-slate-500">Sanctioned Budget</div><div className="text-sm font-bold text-slate-900 mt-0.5">₹{detailProject.budgetCr} Cr</div></div>
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200"><div className="text-[11px] text-slate-500">Actual Spend to Date</div><div className="text-sm font-bold text-blue-700 mt-0.5">₹{detailProject.actualSpendCr} Cr</div></div>
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200"><div className="text-[11px] text-slate-500">Active Leads</div><div className="text-sm font-bold text-emerald-700 mt-0.5">{detailProject.activeLeadsCount} Enquiries</div></div>
                  </div>
                </div>
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                  <h4 className="text-sm font-bold text-slate-900 mb-2.5">Lifestyle &amp; Project Amenities</h4>
                  <ul className="space-y-2 text-xs text-slate-700">
                    {detailProject.amenities.map((am) => (
                      <li key={am} className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /><span>{am}</span></li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
            {detailTab === 'team' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-slate-900">Assigned Key Personnel for {detailProject.name}</h4>
                  <button type="button" onClick={() => onNavigate('employees')} className="text-xs font-semibold text-blue-700 hover:underline">Open Full Employee Directory →</button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200"><span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-blue-100 text-blue-800">Project Manager</span><div className="text-sm font-bold text-slate-900 mt-2">{detailProject.projectManager}</div><div className="text-xs text-slate-500 mt-0.5">Overall Delivery &amp; Contractors</div></div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200"><span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">Site Engineer</span><div className="text-sm font-bold text-slate-900 mt-2">{detailProject.siteEngineer}</div><div className="text-xs text-slate-500 mt-0.5">Daily DPR, Slab QC &amp; Safety</div></div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200"><span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-purple-100 text-purple-800">Sales Manager</span><div className="text-sm font-bold text-slate-900 mt-2">{detailProject.salesManager}</div><div className="text-xs text-slate-500 mt-0.5">Bookings, Pricing &amp; CP Network</div></div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200"><span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-amber-100 text-amber-800">Site Workforce</span><div className="text-sm font-bold text-slate-900 mt-2">{detailProject.workforceCount} Workers</div><div className="text-xs text-slate-500 mt-0.5">Civil, MEP &amp; Finishing Crews</div></div>
                </div>
              </div>
            )}
            {detailTab === 'inventory' && (
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Sample Unit Inventory for {detailProject.name}</h4>
                    <p className="text-xs text-slate-500">Total: {detailProject.totalUnits} Units • Sold: {detailProject.soldUnits} • Hold: {detailProject.holdUnits} • Available: {detailProject.availableUnits}</p>
                  </div>
                  <button type="button" onClick={() => { onSelectProjectFilter(detailProject.id); onNavigate('inventory'); }} className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold">
                    Launch Full Interactive Flat Grid
                  </button>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
                  {units.filter((u) => u.projectId === detailProject.id).map((u) => (
                    <div key={u.id} className="p-3 rounded-xl border border-slate-200 bg-slate-50">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-slate-900">{u.unitNumber}</span>
                        <span className={`px-1.5 py-0.5 rounded text-[10px] font-semibold border ${getStatusBadgeStyle(u.status)}`}>{u.status}</span>
                      </div>
                      <div className="text-[11px] text-slate-600 mt-1">{u.bhk} • {u.carpetArea} sq.ft</div>
                      <div className="text-xs font-bold text-slate-900 mt-0.5">₹{u.basePriceLakhs} L</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {detailTab === 'progress' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-slate-900">6-Stage Construction Milestones — {detailProject.name}</h4>
                  <button type="button" onClick={() => onNavigate('construction')} className="text-xs font-semibold text-blue-700 hover:underline">Go to Construction Module →</button>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                  {detailProject.milestones.map((m) => (
                    <div key={m.stage} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                      <div className="text-xs font-bold text-slate-800">{m.stage}</div>
                      <div className="text-lg font-extrabold text-blue-700 my-1">{m.progress}%</div>
                      <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden"><div className="h-full bg-emerald-600" style={{ width: `${m.progress}%` }} /></div>
                      <div className="text-[10px] text-slate-500 mt-1.5">{m.status}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="text-lg font-bold text-slate-900">Launch New Demo Project</h3>
              <button type="button" onClick={() => setShowAddModal(false)} className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"><X className="w-4 h-4" /></button>
            </div>
            <form onSubmit={handleCreateProject} className="space-y-4 mt-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Project Name *</label>
                <input type="text" required placeholder="e.g., Nexora Greens Phase II" value={newName} onChange={(e) => setNewName(e.target.value)} className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-blue-600" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Location / Micro-Market *</label>
                  <input type="text" required placeholder="e.g., Kalyan East, Metro Station Road" value={newLocation} onChange={(e) => setNewLocation(e.target.value)} className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-blue-600" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Segment Type</label>
                  <select value={newType} onChange={(e) => setNewType(e.target.value as 'Residential' | 'Commercial')} className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white">
                    <option value="Residential">Residential</option>
                    <option value="Commercial">Commercial</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Unit Configurations</label>
                  <input type="text" value={newConfig} onChange={(e) => setNewConfig(e.target.value)} className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Fictional Demo RERA No.</label>
                  <input type="text" value={newRera} onChange={(e) => setNewRera(e.target.value)} className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-mono" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Total Saleable Units</label>
                  <input type="number" min={10} max={500} value={newTotalUnits} onChange={(e) => setNewTotalUnits(Number(e.target.value))} className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Estimated Budget (₹ Cr)</label>
                  <input type="number" min={5} max={500} value={newBudgetCr} onChange={(e) => setNewBudgetCr(Number(e.target.value))} className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs" />
                </div>
              </div>
              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-200">
                <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-100">Cancel</button>
                <button type="submit" className="px-4 py-2 rounded-xl text-white text-xs font-bold shadow-xs" style={{ backgroundColor: brand.accentBlue }}>Create Project in Demo State</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

interface LeadsModuleProps {
  leads: LeadRecord[];
  projects: ProjectRecord[];
  selectedProjectId: string;
  inspectedLead: LeadRecord | null;
  brand: BrandSettings;
  onUpdateLeadStatus: (leadId: string, newStatus: LeadStatus) => void;
  onAddLead: (lead: LeadRecord) => void;
  onAddLeadNote: (leadId: string, type: 'Call' | 'Note' | 'Site Visit', text: string, followUpDate?: string) => void;
  onSelectInspectLead: (lead: LeadRecord | null) => void;
}

export const LeadsModule: React.FC<LeadsModuleProps> = ({
  leads, projects, selectedProjectId, inspectedLead, brand,
  onUpdateLeadStatus, onAddLead, onAddLeadNote, onSelectInspectLead,
}) => {
  const [viewMode, setViewMode] = useState<'table' | 'kanban'>('table');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [sourceFilter, setSourceFilter] = useState<string>('ALL');
  const [showAddModal, setShowAddModal] = useState(false);

  const [leadName, setLeadName] = useState('');
  const [leadPhone, setLeadPhone] = useState('');
  const [leadEmail, setLeadEmail] = useState('');
  const [leadProjId, setLeadProjId] = useState(selectedProjectId === 'ALL' ? 'proj-1' : selectedProjectId);
  const [leadSource, setLeadSource] = useState<LeadRecord['source']>('Channel Partner');
  const [leadAssigned, setLeadAssigned] = useState('Rahul Sharma');
  const [leadBudget, setLeadBudget] = useState('₹72 L - ₹78 L');
  const [leadConfig, setLeadConfig] = useState('2 BHK (745 sq.ft)');
  const [leadFollowUp, setLeadFollowUp] = useState('2026-11-05');

  const [noteType, setNoteType] = useState<'Call' | 'Note' | 'Site Visit'>('Call');
  const [noteText, setNoteText] = useState('');
  const [drawerFollowUp, setDrawerFollowUp] = useState('');

  const filteredLeads = leads.filter((l) => {
    const matchesProj = selectedProjectId === 'ALL' || l.projectId === selectedProjectId;
    const matchesStatus = statusFilter === 'ALL' || l.status === statusFilter;
    const matchesSource = sourceFilter === 'ALL' || l.source === sourceFilter;
    const q = searchQuery.toLowerCase();
    const matchesSearch = !q || l.name.toLowerCase().includes(q) || l.phone.toLowerCase().includes(q) || l.email.toLowerCase().includes(q) || l.projectName.toLowerCase().includes(q);
    return matchesProj && matchesStatus && matchesSource && matchesSearch;
  });

  const activeLead = inspectedLead ? leads.find((l) => l.id === inspectedLead.id) || inspectedLead : null;

  const handleCreateLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadName.trim() || !leadPhone.trim()) return;
    const proj = projects.find((p) => p.id === leadProjId) || projects[0];
    const newLead: LeadRecord = {
      id: `LD-${1011 + leads.length}`,
      name: leadName.trim(),
      phone: leadPhone.trim(),
      email: leadEmail.trim() || 'prospect@example.demo',
      projectId: proj.id,
      projectName: proj.name,
      source: leadSource,
      assignedTo: leadAssigned,
      status: 'New',
      followUpDate: leadFollowUp,
      budget: leadBudget,
      configurationInterest: leadConfig,
      createdAt: '2026-11-01',
      notes: [{ id: `n-${Date.now()}`, timestamp: 'Just now', author: leadAssigned, type: 'Note', text: `New enquiry registered for ${proj.name} (${leadConfig}).` }],
    };
    onAddLead(newLead);
    setShowAddModal(false);
    setLeadName('');
    setLeadPhone('');
    setLeadEmail('');
    onSelectInspectLead(newLead);
  };

  const handleAddActivitySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeLead || !noteText.trim()) return;
    onAddLeadNote(activeLead.id, noteType, noteText.trim(), drawerFollowUp || undefined);
    setNoteText('');
  };

  return (
    <div className="space-y-5">
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2 flex-1">
          <div className="relative flex-1 min-w-[210px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input type="text" placeholder="Search lead name, phone, email, project..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-blue-600" />
          </div>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white font-medium text-slate-700">
            <option value="ALL">All Stages ({filteredLeads.length})</option>
            {LEAD_STAGES.map((st) => (<option key={st} value={st}>Stage: {st}</option>))}
          </select>
          <select value={sourceFilter} onChange={(e) => setSourceFilter(e.target.value)} className="px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white font-medium text-slate-700">
            <option value="ALL">All Sources</option>
            <option value="Channel Partner">Channel Partner</option>
            <option value="Digital Ads">Digital Ads</option>
            <option value="Walk-in">Walk-in</option>
            <option value="Property Portal">Property Portal</option>
            <option value="Referral">Referral</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <div className="inline-flex rounded-xl bg-slate-100 p-1 border border-slate-200">
            <button type="button" onClick={() => setViewMode('table')} className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${viewMode === 'table' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600'}`}>
              <List className="w-3.5 h-3.5" /> Table View
            </button>
            <button type="button" onClick={() => setViewMode('kanban')} className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${viewMode === 'kanban' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600'}`}>
              <Kanban className="w-3.5 h-3.5" /> Kanban Pipeline
            </button>
          </div>
          <button type="button" onClick={() => setShowAddModal(true)} className="px-4 py-2 rounded-xl text-white text-xs font-bold shadow-xs flex items-center gap-1.5" style={{ backgroundColor: brand.accentBlue }}>
            <Plus className="w-4 h-4" /> Add Lead
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
        {LEAD_STAGES.map((stage) => {
          const count = filteredLeads.filter((l) => l.status === stage).length;
          return (
            <button key={stage} type="button" onClick={() => setStatusFilter(statusFilter === stage ? 'ALL' : stage)} className={`p-3 rounded-xl border text-left transition ${statusFilter === stage ? 'border-blue-600 bg-blue-50/60 ring-2 ring-blue-500/20' : 'border-slate-200 bg-white hover:border-slate-300'}`}>
              <div className="text-[11px] font-semibold text-slate-500 uppercase">{stage}</div>
              <div className="text-lg font-extrabold text-slate-900 mt-0.5">{count}</div>
            </button>
          );
        })}
      </div>

      {viewMode === 'table' ? (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase">
                <th className="py-3.5 px-4">Lead Name &amp; Contact</th>
                <th className="py-3.5 px-4">Project &amp; Config</th>
                <th className="py-3.5 px-4">Source</th>
                <th className="py-3.5 px-4">Assigned Sales Exec</th>
                <th className="py-3.5 px-4">Pipeline Stage (Interactive)</th>
                <th className="py-3.5 px-4">Follow-Up Date</th>
                <th className="py-3.5 px-4 text-right">Drawer</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-xs">
              {filteredLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-slate-50/90">
                  <td className="py-3 px-4">
                    <div className="font-bold text-slate-900">{lead.name}</div>
                    <div className="text-[11px] text-slate-500 flex items-center gap-2 mt-0.5"><span>{lead.phone}</span> • <span>{lead.email}</span></div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-semibold text-slate-800">{lead.projectName}</div>
                    <div className="text-[11px] text-slate-500">{lead.configurationInterest} • {lead.budget}</div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-medium text-slate-700">{lead.source}</span>
                    {lead.cpAgency && <div className="text-[10px] text-blue-700 font-semibold">{lead.cpAgency}</div>}
                  </td>
                  <td className="py-3 px-4 font-medium text-slate-700">{lead.assignedTo}</td>
                  <td className="py-3 px-4">
                    <select value={lead.status} onChange={(e) => onUpdateLeadStatus(lead.id, e.target.value as LeadStatus)} className={`px-2.5 py-1 rounded-lg text-xs font-bold border cursor-pointer ${getStatusBadgeStyle(lead.status)}`}>
                      {LEAD_STAGES.map((st) => (<option key={st} value={st} className="bg-white text-slate-900">{st}</option>))}
                    </select>
                  </td>
                  <td className="py-3 px-4 font-medium text-slate-700">
                    <span className="inline-flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-slate-400" /> {lead.followUpDate}</span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button type="button" onClick={() => onSelectInspectLead(lead)} className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs">Open Drawer</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-7 gap-3 overflow-x-auto pb-2">
          {LEAD_STAGES.map((stage) => {
            const stageLeads = filteredLeads.filter((l) => l.status === stage);
            return (
              <div key={stage} className="bg-slate-100/90 rounded-2xl p-3 border border-slate-200 flex flex-col min-w-[220px]">
                <div className="flex items-center justify-between mb-3 px-1">
                  <span className="text-xs font-extrabold text-slate-800 uppercase tracking-wide">{stage}</span>
                  <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-white text-slate-700 border border-slate-200">{stageLeads.length}</span>
                </div>
                <div className="space-y-2.5 flex-1">
                  {stageLeads.map((lead) => (
                    <div key={lead.id} className="bg-white rounded-xl p-3 border border-slate-200 shadow-2xs hover:border-blue-400 transition flex flex-col justify-between gap-2">
                      <div>
                        <div className="flex items-start justify-between gap-1">
                          <span className="font-bold text-xs text-slate-900">{lead.name}</span>
                          <span className="text-[10px] font-mono text-slate-400">{lead.id}</span>
                        </div>
                        <div className="text-[11px] text-blue-700 font-semibold mt-0.5">{lead.projectName}</div>
                        <div className="text-[11px] text-slate-500 mt-0.5">{lead.configurationInterest} • {lead.budget}</div>
                        <div className="text-[10px] text-slate-400 mt-1">Exec: {lead.assignedTo} • Follow-up: {lead.followUpDate}</div>
                      </div>
                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-1">
                        <select value={lead.status} onChange={(e) => onUpdateLeadStatus(lead.id, e.target.value as LeadStatus)} className="text-[11px] font-semibold bg-slate-50 border border-slate-200 rounded-lg px-1.5 py-1 text-slate-700">
                          {LEAD_STAGES.map((st) => (<option key={st} value={st}>Move: {st}</option>))}
                        </select>
                        <button type="button" onClick={() => onSelectInspectLead(lead)} className="text-[11px] font-bold text-blue-700 hover:underline px-1.5 py-1">Details</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {activeLead && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex justify-end">
          <div className="bg-white w-full max-w-xl h-full shadow-2xl border-l border-slate-200 flex flex-col justify-between overflow-y-auto">
            <div className="p-6 space-y-5">
              <div className="flex items-start justify-between border-b border-slate-200 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-bold">{activeLead.id}</span>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${getStatusBadgeStyle(activeLead.status)}`}>{activeLead.status}</span>
                  </div>
                  <h3 className="text-xl font-extrabold text-slate-900 mt-1.5">{activeLead.name}</h3>
                  <p className="text-xs text-slate-500">Interested in <strong className="text-slate-800">{activeLead.projectName}</strong> — {activeLead.configurationInterest} ({activeLead.budget})</p>
                </div>
                <button type="button" onClick={() => onSelectInspectLead(null)} className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600"><X className="w-4 h-4" /></button>
              </div>

              <div className="grid grid-cols-2 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
                <div>
                  <span className="text-slate-400 block">Mobile Number</span>
                  <span className="font-bold text-slate-900 flex items-center gap-1 mt-0.5"><Phone className="w-3.5 h-3.5 text-blue-600" /> {activeLead.phone}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Email ID</span>
                  <span className="font-bold text-slate-900 flex items-center gap-1 mt-0.5"><Mail className="w-3.5 h-3.5 text-blue-600" /> {activeLead.email}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Lead Source</span>
                  <span className="font-bold text-slate-900 mt-0.5 block">{activeLead.source} {activeLead.cpAgency ? `(${activeLead.cpAgency})` : ''}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Next Follow-Up Reminder</span>
                  <span className="font-bold text-amber-700 mt-0.5 block">{activeLead.followUpDate}</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">Update Lead Pipeline Stage (Instant Local State Sync)</label>
                <div className="flex flex-wrap gap-1.5">
                  {LEAD_STAGES.map((st) => (
                    <button key={st} type="button" onClick={() => onUpdateLeadStatus(activeLead.id, st)} className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition ${activeLead.status === st ? 'bg-slate-900 text-white border-slate-900 shadow-2xs' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'}`}>
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              <form onSubmit={handleAddActivitySubmit} className="bg-blue-50/60 p-4 rounded-2xl border border-blue-200/80 space-y-3">
                <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <PhoneCall className="w-3.5 h-3.5 text-blue-700" /> Log Call, Site Visit Note or Update Reminder
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Activity Type</label>
                    <select value={noteType} onChange={(e) => setNoteType(e.target.value as 'Call' | 'Note' | 'Site Visit')} className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs bg-white">
                      <option value="Call">Outbound / Inbound Call Log</option>
                      <option value="Site Visit">Site Visit Feedback</option>
                      <option value="Note">Internal Sales Note</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Reschedule Follow-Up</label>
                    <input type="date" value={drawerFollowUp} onChange={(e) => setDrawerFollowUp(e.target.value)} className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs bg-white" />
                  </div>
                </div>
                <textarea rows={2} required placeholder="Enter call summary, unit preference, or negotiation remark..." value={noteText} onChange={(e) => setNoteText(e.target.value)} className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white focus:outline-none focus:border-blue-600" />
                <button type="submit" className="px-4 py-2 rounded-xl text-white text-xs font-bold shadow-2xs" style={{ backgroundColor: brand.accentBlue }}>Save Activity to Timeline</button>
              </form>

              <div>
                <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider mb-3">Chronological Lead Timeline ({activeLead.notes.length} Entries)</h4>
                <div className="space-y-3">
                  {activeLead.notes.map((n) => (
                    <div key={n.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                      <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
                        <span className="font-bold text-blue-800">{n.type} • {n.author}</span>
                        <span>{n.timestamp}</span>
                      </div>
                      <p className="text-slate-800">{n.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="text-lg font-bold text-slate-900">Register New Prospect Lead</h3>
              <button type="button" onClick={() => setShowAddModal(false)} className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700"><X className="w-4 h-4" /></button>
            </div>
            <form onSubmit={handleCreateLead} className="space-y-3.5 mt-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Full Name *</label>
                  <input type="text" required placeholder="e.g., Siddharth & Neha Kulkarni" value={leadName} onChange={(e) => setLeadName(e.target.value)} className="w-full px-3 py-2 rounded-xl border border-slate-300" />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Mobile Number *</label>
                  <input type="text" required placeholder="+91 98200 XXXXX" value={leadPhone} onChange={(e) => setLeadPhone(e.target.value)} className="w-full px-3 py-2 rounded-xl border border-slate-300" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Email Address</label>
                  <input type="email" placeholder="client@example.demo" value={leadEmail} onChange={(e) => setLeadEmail(e.target.value)} className="w-full px-3 py-2 rounded-xl border border-slate-300" />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Interested Project</label>
                  <select value={leadProjId} onChange={(e) => setLeadProjId(e.target.value)} className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white">
                    {projects.map((p) => (<option key={p.id} value={p.id}>{p.name} ({p.city})</option>))}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Lead Source</label>
                  <select value={leadSource} onChange={(e) => setLeadSource(e.target.value as LeadRecord['source'])} className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white">
                    <option value="Channel Partner">Channel Partner</option>
                    <option value="Digital Ads">Digital Ads</option>
                    <option value="Walk-in">Direct Walk-in</option>
                    <option value="Property Portal">Property Portal</option>
                    <option value="Referral">Customer Referral</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Assign Sales Executive</label>
                  <select value={leadAssigned} onChange={(e) => setLeadAssigned(e.target.value)} className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white">
                    <option value="Rahul Sharma">Rahul Sharma (Nexora Heights)</option>
                    <option value="Aditi Verma">Aditi Verma (Nexora Skyview)</option>
                    <option value="Neha Joshi">Neha Joshi (Business Park)</option>
                    <option value="Priya Nair">Priya Nair (AGM Sales)</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Configuration</label>
                  <input type="text" value={leadConfig} onChange={(e) => setLeadConfig(e.target.value)} className="w-full px-3 py-2 rounded-xl border border-slate-300" />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Budget Range</label>
                  <input type="text" value={leadBudget} onChange={(e) => setLeadBudget(e.target.value)} className="w-full px-3 py-2 rounded-xl border border-slate-300" />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Next Follow-Up</label>
                  <input type="date" value={leadFollowUp} onChange={(e) => setLeadFollowUp(e.target.value)} className="w-full px-3 py-2 rounded-xl border border-slate-300" />
                </div>
              </div>
              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-200">
                <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 rounded-xl border border-slate-300 font-semibold text-slate-700">Cancel</button>
                <button type="submit" className="px-4 py-2 rounded-xl text-white font-bold" style={{ backgroundColor: brand.accentBlue }}>Save Lead to CRM</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
