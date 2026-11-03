import React, { useState } from 'react';
import {
  Plus, Search, ExternalLink, X, Sparkles,
} from 'lucide-react';
import {
  ChannelPartnerRecord, CommissionLedgerEntry, InventoryUnit, UnitStatus,
  BookingRecord, EmployeeRecord, UserRole, ProjectRecord, LeadRecord, BrandSettings,
} from '../types';
import { getStatusBadgeStyle, ArchitecturalFloorPlanSVG } from './ModulesPart1';

interface ChannelPartnersModuleProps {
  cps: ChannelPartnerRecord[];
  ledger: CommissionLedgerEntry[];
  leads: LeadRecord[];
  units: InventoryUnit[];
  projects: ProjectRecord[];
  selectedProjectId: string;
  brand: BrandSettings;
  onAddCP: (cp: ChannelPartnerRecord) => void;
  onUpdateCPKyc: (cpId: string, status: ChannelPartnerRecord['kycStatus']) => void;
  onUpdateCommissionStatus: (ledgerId: string, status: CommissionLedgerEntry['status']) => void;
  onRegisterPortalLead: (leadName: string, phone: string, projectId: string, config: string, cpAgency: string) => void;
}

export const ChannelPartnersModule: React.FC<ChannelPartnersModuleProps> = ({
  cps, ledger, leads, units, projects, selectedProjectId, brand,
  onAddCP, onUpdateCPKyc, onUpdateCommissionStatus, onRegisterPortalLead,
}) => {
  const [subTab, setSubTab] = useState<'directory' | 'ledger' | 'portal'>('directory');
  const [selectedCP, setSelectedCP] = useState<ChannelPartnerRecord | null>(cps[0] || null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchQ, setSearchQ] = useState('');

  const [cpName, setCpName] = useState('');
  const [agencyName, setAgencyName] = useState('');
  const [reraId, setReraId] = useState('A51700077812 (DEMO)');
  const [cpPhone, setCpPhone] = useState('');
  const [cpEmail, setCpEmail] = useState('');
  const [cpCity, setCpCity] = useState('Thane West');
  const [cpSlab, setCpSlab] = useState('2.5% Silver Tier');

  const [portalClientName, setPortalClientName] = useState('');
  const [portalClientPhone, setPortalClientPhone] = useState('');
  const [portalProjId, setPortalProjId] = useState('proj-1');
  const [portalConfig, setPortalConfig] = useState('2 BHK (745 sq.ft)');

  const activeProjObj = projects.find((p) => p.id === selectedProjectId);
  const filteredCPs = cps.filter((cp) => {
    const matchesProj = selectedProjectId === 'ALL' || (activeProjObj && cp.assignedProjects.includes(activeProjObj.name));
    const q = searchQ.toLowerCase();
    const matchesQ = !q || cp.name.toLowerCase().includes(q) || cp.agencyName.toLowerCase().includes(q) || cp.city.toLowerCase().includes(q);
    return matchesProj && matchesQ;
  });

  const handleCreateCP = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cpName.trim() || !agencyName.trim()) return;
    const created: ChannelPartnerRecord = {
      id: `CP-0${cps.length + 1}`,
      name: cpName.trim(),
      agencyName: agencyName.trim(),
      reraId: reraId.includes('DEMO') ? reraId : `${reraId} (DEMO)`,
      phone: cpPhone.trim() || '+91 98200 00000',
      email: cpEmail.trim() || 'partner@agency.demo',
      city: cpCity,
      assignedProjects: ['Nexora Heights', 'Nexora Skyview'],
      kycStatus: 'Verified',
      leadsCount: 1,
      siteVisitsCount: 0,
      bookingsCount: 0,
      commissionSlab: cpSlab,
      totalCommissionLakhs: 0,
      paidCommissionLakhs: 0,
      pendingCommissionLakhs: 0,
      payoutStatus: 'Pending Verification',
    };
    onAddCP(created);
    setSelectedCP(created);
    setShowAddModal(false);
    setCpName('');
    setAgencyName('');
  };

  const handlePortalLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!portalClientName.trim() || !portalClientPhone.trim()) return;
    onRegisterPortalLead(portalClientName.trim(), portalClientPhone.trim(), portalProjId, portalConfig, selectedCP?.agencyName || 'PropVista Realty Advisory');
    setPortalClientName('');
    setPortalClientPhone('');
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex flex-wrap gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200">
          <button type="button" onClick={() => setSubTab('directory')} className={`px-3.5 py-2 rounded-lg text-xs font-bold transition ${subTab === 'directory' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600'}`}>
            CP Directory &amp; Profiles ({filteredCPs.length})
          </button>
          <button type="button" onClick={() => setSubTab('ledger')} className={`px-3.5 py-2 rounded-lg text-xs font-bold transition ${subTab === 'ledger' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600'}`}>
            Commission Ledger &amp; Payouts ({ledger.length})
          </button>
          <button type="button" onClick={() => setSubTab('portal')} className={`px-3.5 py-2 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${subTab === 'portal' ? 'bg-white text-blue-700 shadow-2xs' : 'text-slate-600'}`}>
            <ExternalLink className="w-3.5 h-3.5" /> CP Portal Preview (External View)
          </button>
        </div>
        <button type="button" onClick={() => setShowAddModal(true)} className="px-4 py-2 rounded-xl text-white text-xs font-bold shadow-xs flex items-center gap-1.5" style={{ backgroundColor: brand.accentBlue }}>
          <Plus className="w-4 h-4" /> Onboard Channel Partner
        </button>
      </div>

      {subTab === 'directory' && (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="p-4 border-b border-slate-200 flex items-center justify-between gap-2">
              <div className="relative flex-1 max-w-sm">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input type="text" placeholder="Search broker name, agency, city..." value={searchQ} onChange={(e) => setSearchQ(e.target.value)} className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs" />
              </div>
              <span className="text-xs text-slate-500">Click any row to view CP Profile</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase">
                    <th className="py-3 px-4">Agency &amp; Principal</th>
                    <th className="py-3 px-4">City &amp; Projects</th>
                    <th className="py-3 px-4">KYC Status</th>
                    <th className="py-3 px-4">Leads / Bookings</th>
                    <th className="py-3 px-4">Commission</th>
                    <th className="py-3 px-4 text-right">Profile</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-xs">
                  {filteredCPs.map((cp) => (
                    <tr key={cp.id} onClick={() => setSelectedCP(cp)} className={`cursor-pointer transition ${selectedCP?.id === cp.id ? 'bg-blue-50/60' : 'hover:bg-slate-50'}`}>
                      <td className="py-3 px-4">
                        <div className="font-bold text-slate-900">{cp.agencyName}</div>
                        <div className="text-[11px] text-slate-500">{cp.name} • {cp.phone}</div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-semibold text-slate-800">{cp.city}</div>
                        <div className="text-[11px] text-slate-500 truncate max-w-[180px]">{cp.assignedProjects.join(', ')}</div>
                      </td>
                      <td className="py-3 px-4"><span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${getStatusBadgeStyle(cp.kycStatus)}`}>{cp.kycStatus}</span></td>
                      <td className="py-3 px-4"><span className="font-bold text-slate-900">{cp.leadsCount} Leads</span> • <span className="font-bold text-emerald-700">{cp.bookingsCount} Booked</span></td>
                      <td className="py-3 px-4"><div className="font-extrabold text-slate-900">₹{cp.totalCommissionLakhs} L</div><div className="text-[10px] text-slate-500">{cp.commissionSlab}</div></td>
                      <td className="py-3 px-4 text-right"><button type="button" onClick={() => setSelectedCP(cp)} className="px-2.5 py-1 rounded-lg bg-slate-900 text-white text-[11px] font-semibold">Inspect</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {selectedCP && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-4">
              <div className="flex items-start justify-between border-b border-slate-200 pb-3">
                <div>
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-bold">{selectedCP.id} • RERA: {selectedCP.reraId}</span>
                  <h4 className="text-lg font-extrabold text-slate-900 mt-1">{selectedCP.agencyName}</h4>
                  <p className="text-xs text-slate-500">Partner: {selectedCP.name} ({selectedCP.city})</p>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${getStatusBadgeStyle(selectedCP.kycStatus)}`}>{selectedCP.kycStatus}</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200"><div className="text-[11px] text-slate-500">Total Earned</div><div className="text-sm font-extrabold text-slate-900">₹{selectedCP.totalCommissionLakhs} L</div></div>
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200"><div className="text-[11px] text-emerald-700">Paid Out</div><div className="text-sm font-extrabold text-emerald-800">₹{selectedCP.paidCommissionLakhs} L</div></div>
                <div className="p-3 rounded-xl bg-amber-50 border border-amber-200"><div className="text-[11px] text-amber-700">Pending Balance</div><div className="text-sm font-extrabold text-amber-800">₹{selectedCP.pendingCommissionLakhs} L</div></div>
              </div>
              <div className="text-xs space-y-2 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <div className="flex justify-between"><span className="text-slate-500">Brokerage Slab:</span><span className="font-bold text-blue-700">{selectedCP.commissionSlab}</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Contact:</span><span className="font-semibold text-slate-800">{selectedCP.phone}</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Email:</span><span className="font-semibold text-slate-800">{selectedCP.email}</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Site Visits Conducted:</span><span className="font-bold text-slate-900">{selectedCP.siteVisitsCount} Visits</span></div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Update Registration / RERA KYC Status</label>
                <div className="flex gap-2">
                  {(['Verified', 'Under Review', 'Pending KYC'] as const).map((st) => (
                    <button key={st} type="button" onClick={() => { onUpdateCPKyc(selectedCP.id, st); setSelectedCP({ ...selectedCP, kycStatus: st }); }} className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold border transition ${selectedCP.kycStatus === st ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'}`}>
                      {st}
                    </button>
                  ))}
                </div>
              </div>
              <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
                <button type="button" onClick={() => setSubTab('ledger')} className="text-xs font-bold text-blue-700 hover:underline">View Payout Ledger →</button>
                <button type="button" onClick={() => setSubTab('portal')} className="px-3 py-1.5 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 text-xs font-bold">Preview Partner Portal</button>
              </div>
            </div>
          )}
        </div>
      )}

      {subTab === 'ledger' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-4 border-b border-slate-200">
            <h4 className="text-sm font-bold text-slate-900">Channel Partner Brokerage &amp; Payout Ledger</h4>
            <p className="text-xs text-slate-500">Includes 5% statutory TDS deduction calculation (simulated demo figures)</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase">
                  <th className="py-3 px-4">Ref / Booking</th>
                  <th className="py-3 px-4">CP Agency</th>
                  <th className="py-3 px-4">Project &amp; Unit</th>
                  <th className="py-3 px-4">Agreement Value</th>
                  <th className="py-3 px-4">Gross ( Slab % )</th>
                  <th className="py-3 px-4">Net Payable (Post TDS)</th>
                  <th className="py-3 px-4">Payout Status</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-xs">
                {ledger.map((row) => (
                  <tr key={row.id} className="hover:bg-slate-50">
                    <td className="py-3 px-4"><div className="font-mono font-bold text-slate-900">{row.id}</div><div className="text-[11px] text-slate-500">{row.bookingId} • {row.customerName}</div></td>
                    <td className="py-3 px-4 font-bold text-slate-800">{row.cpAgency}</td>
                    <td className="py-3 px-4"><span className="font-semibold text-slate-900">{row.projectName}</span> ({row.unitNumber})</td>
                    <td className="py-3 px-4 font-semibold">₹{row.agreementValueLakhs} L</td>
                    <td className="py-3 px-4">₹{row.grossCommissionLakhs} L ({row.brokeragePercent}%)</td>
                    <td className="py-3 px-4 font-extrabold text-emerald-700">₹{row.netPayableLakhs} L</td>
                    <td className="py-3 px-4"><span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${getStatusBadgeStyle(row.status)}`}>{row.status}</span></td>
                    <td className="py-3 px-4 text-right">
                      {row.status !== 'Paid' ? (
                        <button type="button" onClick={() => onUpdateCommissionStatus(row.id, 'Paid')} className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold">Release Payout</button>
                      ) : (
                        <span className="text-[11px] text-slate-400 font-semibold">Settled via NEFT</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {subTab === 'portal' && (
        <div className="space-y-5">
          <div className="p-4 rounded-2xl bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 border border-slate-700">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-400 text-slate-950">Simulated External Partner View</span>
              <h4 className="text-base font-bold mt-1">{brand.companyName} — Official Channel Partner Portal ({selectedCP?.agencyName || 'PropVista Realty Advisory'})</h4>
              <p className="text-xs text-slate-300">External brokers log into this white-labeled portal to register walk-in leads (with 48-hour lead protection) and check live approved inventory.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <form onSubmit={handlePortalLeadSubmit} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3.5 text-xs">
              <h5 className="text-sm font-bold text-slate-900">Register Client Walk-In (48-Hr Protection)</h5>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Client Full Name *</label>
                <input type="text" required placeholder="e.g., Rohit & Ankita Sawant" value={portalClientName} onChange={(e) => setPortalClientName(e.target.value)} className="w-full px-3 py-2 rounded-xl border border-slate-300" />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Client Mobile Number *</label>
                <input type="text" required placeholder="+91 98201 XXXXX" value={portalClientPhone} onChange={(e) => setPortalClientPhone(e.target.value)} className="w-full px-3 py-2 rounded-xl border border-slate-300" />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Select Project</label>
                <select value={portalProjId} onChange={(e) => setPortalProjId(e.target.value)} className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white">
                  {projects.map((p) => (<option key={p.id} value={p.id}>{p.name} ({p.city})</option>))}
                </select>
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Unit Configuration</label>
                <input type="text" value={portalConfig} onChange={(e) => setPortalConfig(e.target.value)} className="w-full px-3 py-2 rounded-xl border border-slate-300" />
              </div>
              <button type="submit" className="w-full py-2.5 rounded-xl text-white font-bold shadow-xs" style={{ backgroundColor: brand.accentBlue }}>Submit Lead &amp; Generate Visit Pass</button>
            </form>

            <div className="lg:col-span-2 space-y-5">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                <h5 className="text-sm font-bold text-slate-900 mb-3">My Registered Client Leads ({leads.filter((l) => l.source === 'Channel Partner').length})</h5>
                <div className="space-y-2 text-xs">
                  {leads.filter((l) => l.source === 'Channel Partner').map((l) => (
                    <div key={l.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                      <div>
                        <div className="font-bold text-slate-900">{l.name} <span className="text-slate-400 font-normal">({l.phone})</span></div>
                        <div className="text-[11px] text-slate-500">{l.projectName} • {l.configurationInterest} • Tagged to: {l.cpAgency || 'PropVista Realty'}</div>
                      </div>
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${getStatusBadgeStyle(l.status)}`}>{l.status}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                <h5 className="text-sm font-bold text-slate-900 mb-3">Approved Sellable Inventory Snapshot (Available Units Only)</h5>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  {units.filter((u) => u.status === 'Available').slice(0, 8).map((u) => (
                    <div key={u.id} className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-200">
                      <div className="font-bold text-slate-900">{u.unitNumber} ({u.bhk})</div>
                      <div className="text-[11px] text-slate-600">{u.projectName}</div>
                      <div className="text-xs font-extrabold text-emerald-800 mt-1">₹{u.basePriceLakhs} L ({u.carpetArea} sq.ft)</div>
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
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="text-lg font-bold text-slate-900">Empanel New Channel Partner</h3>
              <button type="button" onClick={() => setShowAddModal(false)} className="p-1 text-slate-400 hover:text-slate-700"><X className="w-4 h-4" /></button>
            </div>
            <form onSubmit={handleCreateCP} className="space-y-3.5 mt-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Agency / Brokerage Firm Name *</label>
                <input type="text" required placeholder="e.g., Horizon PropTech Advisors" value={agencyName} onChange={(e) => setAgencyName(e.target.value)} className="w-full px-3 py-2 rounded-xl border border-slate-300" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Principal Broker Name *</label>
                  <input type="text" required placeholder="e.g., Amitabh Kulkarni" value={cpName} onChange={(e) => setCpName(e.target.value)} className="w-full px-3 py-2 rounded-xl border border-slate-300" />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">MahaRERA Agent ID (Demo)</label>
                  <input type="text" value={reraId} onChange={(e) => setReraId(e.target.value)} className="w-full px-3 py-2 rounded-xl border border-slate-300 font-mono" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Mobile Phone</label>
                  <input type="text" placeholder="+91 98200 XXXXX" value={cpPhone} onChange={(e) => setCpPhone(e.target.value)} className="w-full px-3 py-2 rounded-xl border border-slate-300" />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">City / Operating Zone</label>
                  <input type="text" value={cpCity} onChange={(e) => setCpCity(e.target.value)} className="w-full px-3 py-2 rounded-xl border border-slate-300" />
                </div>
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Brokerage Slab Tier</label>
                <select value={cpSlab} onChange={(e) => setCpSlab(e.target.value)} className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white">
                  <option value="2.0% Base Tier">2.0% Base Tier</option>
                  <option value="2.5% Silver Tier">2.5% Silver Tier</option>
                  <option value="2.75% Gold Tier">2.75% Gold Tier</option>
                  <option value="3.0% Platinum Tier">3.0% Platinum Tier</option>
                </select>
              </div>
              <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
                <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 rounded-xl border border-slate-300 font-semibold">Cancel</button>
                <button type="submit" className="px-4 py-2 rounded-xl text-white font-bold" style={{ backgroundColor: brand.accentBlue }}>Onboard Partner</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

interface InventoryModuleProps {
  units: InventoryUnit[];
  projects: ProjectRecord[];
  selectedProjectId: string;
  brand: BrandSettings;
  onUpdateUnitStatus: (unitId: string, status: UnitStatus, customerName?: string) => void;
  onQuickCreateBookingFromUnit: (unit: InventoryUnit, customerName: string, phone: string) => void;
}

export const InventoryModule: React.FC<InventoryModuleProps> = ({
  units, selectedProjectId, onUpdateUnitStatus, onQuickCreateBookingFromUnit,
}) => {
  const [towerFilter, setTowerFilter] = useState('ALL');
  const [bhkFilter, setBhkFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selectedUnit, setSelectedUnit] = useState<InventoryUnit | null>(null);
  const [holdCustomerInput, setHoldCustomerInput] = useState('');
  const [holdPhoneInput] = useState('+91 98201 55410');

  const filteredUnits = units.filter((u) => {
    const matchesProj = selectedProjectId === 'ALL' || u.projectId === selectedProjectId;
    const matchesTower = towerFilter === 'ALL' || u.tower === towerFilter;
    const matchesBhk = bhkFilter === 'ALL' || u.bhk === bhkFilter;
    const matchesStatus = statusFilter === 'ALL' || u.status === statusFilter;
    return matchesProj && matchesTower && matchesBhk && matchesStatus;
  });

  const towersList = Array.from(new Set(units.map((u) => u.tower)));
  const activeUnit = selectedUnit ? units.find((u) => u.id === selectedUnit.id) || selectedUnit : null;

  return (
    <div className="space-y-5">
      <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 flex flex-wrap items-center justify-between gap-2 text-xs text-amber-900">
        <div className="flex items-center gap-2 font-semibold">
          <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
          <span>DEMO INVENTORY NOTICE: All flat numbers, carpet areas, indicative prices, and CAD floor plans are sample demonstration data for NEXORA DEVELOPERS.</span>
        </div>
        <span className="font-bold">Portfolio Total: 248 Units across 3 Projects</span>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <select value={towerFilter} onChange={(e) => setTowerFilter(e.target.value)} className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold bg-white">
            <option value="ALL">All Towers / Wings</option>
            {towersList.map((t) => (<option key={t} value={t}>{t}</option>))}
          </select>
          <select value={bhkFilter} onChange={(e) => setBhkFilter(e.target.value)} className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold bg-white">
            <option value="ALL">All Configurations</option>
            <option value="2 BHK">2 BHK</option>
            <option value="3 BHK">3 BHK</option>
            <option value="4 BHK">4 BHK</option>
            <option value="Retail">Retail Showroom</option>
            <option value="Office">Commercial Office</option>
          </select>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold bg-white">
            <option value="ALL">All Unit Statuses</option>
            <option value="Available">Available</option>
            <option value="Hold">On Hold (48h)</option>
            <option value="Booked">Booked</option>
            <option value="Registered">Agreement Registered</option>
          </select>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-xs">
          {(['Available', 'Hold', 'Booked', 'Registered'] as const).map((st) => {
            const cnt = filteredUnits.filter((u) => u.status === st).length;
            return (
              <button key={st} type="button" onClick={() => setStatusFilter(statusFilter === st ? 'ALL' : st)} className={`px-3 py-1.5 rounded-xl font-bold border flex items-center gap-1.5 transition ${getStatusBadgeStyle(st)}`}>
                <span>{st}:</span><span>{cnt}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredUnits.map((unit) => {
          const cardBorder = unit.status === 'Available' ? 'border-emerald-300 hover:border-emerald-500 bg-white' : unit.status === 'Hold' ? 'border-amber-300 hover:border-amber-500 bg-amber-50/20' : unit.status === 'Booked' ? 'border-blue-300 hover:border-blue-500 bg-blue-50/20' : 'border-indigo-300 hover:border-indigo-500 bg-slate-50';
          return (
            <div key={unit.id} onClick={() => { setSelectedUnit(unit); setHoldCustomerInput(unit.customerName || 'Aarav Mehta'); }} className={`rounded-2xl p-4 border-2 shadow-2xs transition cursor-pointer flex flex-col justify-between ${cardBorder}`}>
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-base font-extrabold text-slate-900">{unit.unitNumber}</span>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${getStatusBadgeStyle(unit.status)}`}>{unit.status}</span>
                </div>
                <div className="text-xs font-semibold text-blue-800 mt-1">{unit.projectName} • {unit.tower} (Floor {unit.floor})</div>
                <div className="grid grid-cols-2 gap-2 mt-3 p-2.5 rounded-xl bg-slate-50 border border-slate-200/70 text-xs">
                  <div><span className="text-[10px] text-slate-400 block">Configuration</span><span className="font-bold text-slate-900">{unit.bhk}</span></div>
                  <div><span className="text-[10px] text-slate-400 block">RERA Carpet</span><span className="font-bold text-slate-900">{unit.carpetArea} sq.ft</span></div>
                  <div><span className="text-[10px] text-slate-400 block">Agreement Base</span><span className="font-bold text-slate-900">₹{unit.basePriceLakhs} L</span></div>
                  <div><span className="text-[10px] text-slate-400 block">All-Inclusive</span><span className="font-extrabold text-emerald-700">₹{unit.allInclusiveLakhs} L</span></div>
                </div>
                {unit.customerName && (
                  <div className="mt-2.5 text-[11px] text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg truncate">Client: <strong>{unit.customerName}</strong></div>
                )}
              </div>
              <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500 text-[11px]">Facing: {unit.facing}</span>
                <button type="button" onClick={(e) => { e.stopPropagation(); setSelectedUnit(unit); setHoldCustomerInput(unit.customerName || 'Aarav Mehta'); }} className="font-bold text-blue-700 hover:underline flex items-center gap-1">
                  Inspect Unit →
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {activeUnit && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 space-y-5 my-8">
            <div className="flex items-start justify-between border-b border-slate-200 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase px-2.5 py-0.5 rounded bg-slate-900 text-white">{activeUnit.projectName} • {activeUnit.tower}</span>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${getStatusBadgeStyle(activeUnit.status)}`}>{activeUnit.status}</span>
                </div>
                <h3 className="text-xl font-extrabold text-slate-900 mt-1">Unit {activeUnit.unitNumber} — {activeUnit.bhk} (Floor {activeUnit.floor})</h3>
              </div>
              <button type="button" onClick={() => setSelectedUnit(null)} className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600"><X className="w-4 h-4" /></button>
            </div>

            <ArchitecturalFloorPlanSVG bhk={activeUnit.bhk} unitNumber={activeUnit.unitNumber} carpetArea={activeUnit.carpetArea} facing={activeUnit.facing} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">Indicative Cost Sheet (Demo Estimate)</h4>
                <div className="flex justify-between"><span className="text-slate-500">RERA Carpet / Salable Area:</span><span className="font-semibold">{activeUnit.carpetArea} / {activeUnit.salableArea} sq.ft</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Agreement Base Value:</span><span className="font-bold text-slate-900">₹{activeUnit.basePriceLakhs.toFixed(2)} Lakhs</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Stamp Duty (6%) + Reg:</span><span className="font-semibold">₹{(activeUnit.basePriceLakhs * 0.06 + 0.3).toFixed(2)} Lakhs</span></div>
                <div className="flex justify-between"><span className="text-slate-500">GST (5% Under Construction):</span><span className="font-semibold">₹{(activeUnit.basePriceLakhs * 0.05).toFixed(2)} Lakhs</span></div>
                <div className="flex justify-between pt-2 border-t border-slate-200 text-sm"><span className="font-bold text-slate-900">All-Inclusive Package:</span><span className="font-extrabold text-emerald-700">₹{activeUnit.allInclusiveLakhs.toFixed(2)} Lakhs</span></div>
              </div>

              <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-200 space-y-3 flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] mb-2">Allocation &amp; Live Inventory Action</h4>
                  {activeUnit.customerName ? (
                    <div className="space-y-1 text-xs mb-3">
                      <div><span className="text-slate-500">Allocated Client:</span> <strong className="text-slate-900">{activeUnit.customerName}</strong></div>
                      {activeUnit.bookingId && <div><span className="text-slate-500">Booking Ref:</span> <span className="font-mono font-bold text-blue-700">{activeUnit.bookingId}</span></div>}
                    </div>
                  ) : (
                    <p className="text-xs text-slate-600 mb-2">This unit is currently <strong>Available</strong> for immediate blocking or booking.</p>
                  )}
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Client Name for Hold / Booking</label>
                  <input type="text" value={holdCustomerInput} onChange={(e) => setHoldCustomerInput(e.target.value)} placeholder="Enter customer name..." className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-xs mb-2" />
                </div>

                <div className="flex flex-wrap gap-2">
                  {activeUnit.status === 'Available' && (
                    <>
                      <button type="button" onClick={() => onUpdateUnitStatus(activeUnit.id, 'Hold', `${holdCustomerInput || 'Walk-in Client'} (Hold)`)} className="flex-1 py-2 px-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs">
                        Place 48h Hold
                      </button>
                      <button type="button" onClick={() => { onQuickCreateBookingFromUnit(activeUnit, holdCustomerInput || 'Aarav Mehta', holdPhoneInput); setSelectedUnit(null); }} className="flex-1 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs">
                        Confirm Booking
                      </button>
                    </>
                  )}
                  {activeUnit.status === 'Hold' && (
                    <>
                      <button type="button" onClick={() => onUpdateUnitStatus(activeUnit.id, 'Available', undefined)} className="flex-1 py-2 px-3 rounded-xl border border-slate-300 bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs">
                        Release Hold
                      </button>
                      <button type="button" onClick={() => { onQuickCreateBookingFromUnit(activeUnit, holdCustomerInput.replace(' (Hold)', '') || 'Aarav Mehta', holdPhoneInput); setSelectedUnit(null); }} className="flex-1 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs">
                        Convert to Booking
                      </button>
                    </>
                  )}
                  {(activeUnit.status === 'Booked' || activeUnit.status === 'Registered') && (
                    <button type="button" onClick={() => onUpdateUnitStatus(activeUnit.id, 'Registered', activeUnit.customerName)} className="w-full py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs">
                      {activeUnit.status === 'Registered' ? 'Agreement Registered ✓' : 'Mark Agreement Registered'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

interface BookingsModuleProps {
  bookings: BookingRecord[];
  projects: ProjectRecord[];
  units: InventoryUnit[];
  selectedProjectId: string;
  brand: BrandSettings;
  onRecordMilestonePayment: (bookingId: string, milestoneId: string) => void;
  onAddBooking: (booking: BookingRecord, unitId?: string) => void;
}

export const BookingsModule: React.FC<BookingsModuleProps> = ({
  bookings, units, selectedProjectId, brand, onRecordMilestonePayment, onAddBooking,
}) => {
  const [selectedBooking, setSelectedBooking] = useState<BookingRecord | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const [custName, setCustName] = useState('');
  const [coApp, setCoApp] = useState('');
  const [custPhone, setCustPhone] = useState('+91 98201 44510');
  const [custEmail, setCustEmail] = useState('customer@example.demo');
  const [selectedUnitId, setSelectedUnitId] = useState(units.find((u) => u.status === 'Available' || u.status === 'Hold')?.id || units[0]?.id || '');
  const [bankLoan, setBankLoan] = useState('HDFC Home Loans (Pre-Approved)');

  const filteredBookings = selectedProjectId === 'ALL' ? bookings : bookings.filter((b) => b.projectId === selectedProjectId);
  const activeDrawerBooking = selectedBooking ? bookings.find((b) => b.id === selectedBooking.id) || selectedBooking : null;

  const handleCreateBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!custName.trim()) return;
    const targetUnit = units.find((u) => u.id === selectedUnitId) || units[0];
    const val = targetUnit.basePriceLakhs;
    const token = Number((val * 0.1).toFixed(2));
    const newBk: BookingRecord = {
      id: `BK-NX-${1045 + bookings.length}`,
      customerName: custName.trim(),
      coApplicant: coApp.trim() || 'Self / Single Applicant',
      phone: custPhone,
      email: custEmail,
      panMasked: 'ABCDE9988Z (DEMO)',
      aadhaarMasked: 'XXXX-XXXX-9012 (DEMO)',
      projectId: targetUnit.projectId,
      projectName: targetUnit.projectName,
      tower: targetUnit.tower,
      unitNumber: targetUnit.unitNumber,
      bhk: targetUnit.bhk,
      carpetArea: targetUnit.carpetArea,
      bookingDate: '2026-11-01',
      agreementValueLakhs: val,
      paidAmountLakhs: token,
      balanceLakhs: Number((val - token).toFixed(2)),
      status: 'Token Received',
      bankLoanProvider: bankLoan,
      salesExecutive: 'Rahul Sharma',
      paymentSchedule: [
        { id: `ps-new-1-${Date.now()}`, milestoneName: 'Booking Token (10%)', percentage: 10, amountLakhs: token, dueDate: '2026-11-01', status: 'Paid', paidDate: '2026-11-01', receiptNo: `RCPT-${9060 + bookings.length}`, paymentMode: 'NEFT' },
        { id: `ps-new-2-${Date.now()}`, milestoneName: 'Agreement Execution (20%)', percentage: 20, amountLakhs: Number((val * 0.2).toFixed(2)), dueDate: '2026-11-20', status: 'Due' },
        { id: `ps-new-3-${Date.now()}`, milestoneName: 'Construction Slab Milestones (60%)', percentage: 60, amountLakhs: Number((val * 0.6).toFixed(2)), dueDate: '2027-03-15', status: 'Upcoming' },
        { id: `ps-new-4-${Date.now()}`, milestoneName: 'Possession Handover (10%)', percentage: 10, amountLakhs: token, dueDate: '2027-06-30', status: 'Upcoming' },
      ],
    };
    onAddBooking(newBk, targetUnit.id);
    setShowAddModal(false);
    setSelectedBooking(newBk);
    setCustName('');
    setCoApp('');
  };

  return (
    <div className="space-y-5">
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-base font-bold text-slate-900">Customer Bookings &amp; Demand Collection Register ({filteredBookings.length})</h3>
          <p className="text-xs text-slate-500">Track customer KYC, Construction-Linked Payment (CLP) schedules, receipts &amp; bank loan disbursements</p>
        </div>
        <button type="button" onClick={() => setShowAddModal(true)} className="px-4 py-2 rounded-xl text-white text-xs font-bold shadow-xs flex items-center gap-1.5" style={{ backgroundColor: brand.accentBlue }}>
          <Plus className="w-4 h-4" /> New Customer Booking
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase">
              <th className="py-3.5 px-4">Booking ID</th>
              <th className="py-3.5 px-4">Customer &amp; Contact</th>
              <th className="py-3.5 px-4">Project &amp; Unit</th>
              <th className="py-3.5 px-4">Booking Date</th>
              <th className="py-3.5 px-4">Agreement Value</th>
              <th className="py-3.5 px-4">Paid / Balance</th>
              <th className="py-3.5 px-4">Status</th>
              <th className="py-3.5 px-4 text-right">Ledger</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 text-xs">
            {filteredBookings.map((bk) => (
              <tr key={bk.id} className="hover:bg-slate-50">
                <td className="py-3.5 px-4 font-mono font-bold text-blue-700">{bk.id}</td>
                <td className="py-3.5 px-4"><div className="font-bold text-slate-900">{bk.customerName}</div><div className="text-[11px] text-slate-500">{bk.phone}</div></td>
                <td className="py-3.5 px-4"><div className="font-semibold text-slate-900">{bk.projectName} — <span className="text-blue-700">{bk.unitNumber}</span></div><div className="text-[11px] text-slate-500">{bk.tower} • {bk.bhk} ({bk.carpetArea} sq.ft)</div></td>
                <td className="py-3.5 px-4 text-slate-600">{bk.bookingDate}</td>
                <td className="py-3.5 px-4 font-extrabold text-slate-900">₹{bk.agreementValueLakhs} L</td>
                <td className="py-3.5 px-4"><span className="font-bold text-emerald-700">₹{bk.paidAmountLakhs} L</span> / <span className="text-amber-700 font-semibold">₹{bk.balanceLakhs} L</span></td>
                <td className="py-3.5 px-4"><span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${getStatusBadgeStyle(bk.status)}`}>{bk.status}</span></td>
                <td className="py-3.5 px-4 text-right"><button type="button" onClick={() => setSelectedBooking(bk)} className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold">Open Drawer</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {activeDrawerBooking && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex justify-end">
          <div className="bg-white w-full max-w-2xl h-full shadow-2xl border-l border-slate-200 overflow-y-auto p-6 space-y-5">
            <div className="flex items-start justify-between border-b border-slate-200 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded bg-blue-50 text-blue-700">{activeDrawerBooking.id}</span>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${getStatusBadgeStyle(activeDrawerBooking.status)}`}>{activeDrawerBooking.status}</span>
                </div>
                <h3 className="text-xl font-extrabold text-slate-900 mt-1">{activeDrawerBooking.customerName}</h3>
                <p className="text-xs text-slate-500">{activeDrawerBooking.projectName} • {activeDrawerBooking.tower} • Unit {activeDrawerBooking.unitNumber} ({activeDrawerBooking.bhk})</p>
              </div>
              <button type="button" onClick={() => setSelectedBooking(null)} className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600"><X className="w-4 h-4" /></button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
              <div><span className="text-slate-400 block">Co-Applicant</span><span className="font-bold text-slate-900">{activeDrawerBooking.coApplicant}</span></div>
              <div><span className="text-slate-400 block">Contact Info</span><span className="font-bold text-slate-900">{activeDrawerBooking.phone}</span></div>
              <div><span className="text-slate-400 block">PAN / Aadhaar (Demo)</span><span className="font-mono font-semibold text-slate-800">{activeDrawerBooking.panMasked}</span></div>
              <div><span className="text-slate-400 block">Agreement Value</span><span className="font-extrabold text-slate-900">₹{activeDrawerBooking.agreementValueLakhs} Lakhs</span></div>
              <div><span className="text-slate-400 block">Received Till Date</span><span className="font-extrabold text-emerald-700">₹{activeDrawerBooking.paidAmountLakhs} Lakhs</span></div>
              <div><span className="text-slate-400 block">Balance Receivable</span><span className="font-extrabold text-amber-700">₹{activeDrawerBooking.balanceLakhs} Lakhs</span></div>
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 mb-2.5">Construction-Linked Payment Schedule (CLP) &amp; Receipt History</h4>
              <div className="border border-slate-200 rounded-xl overflow-hidden">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-bold text-slate-500 uppercase">
                      <th className="py-2.5 px-3">Milestone Stage</th>
                      <th className="py-2.5 px-3">Due Date</th>
                      <th className="py-2.5 px-3">Demand Amt</th>
                      <th className="py-2.5 px-3">Status / Receipt</th>
                      <th className="py-2.5 px-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {activeDrawerBooking.paymentSchedule.map((ms) => (
                      <tr key={ms.id} className="hover:bg-slate-50">
                        <td className="py-2.5 px-3 font-semibold text-slate-900">{ms.milestoneName}</td>
                        <td className="py-2.5 px-3 text-slate-600">{ms.dueDate}</td>
                        <td className="py-2.5 px-3 font-bold text-slate-900">₹{ms.amountLakhs} L</td>
                        <td className="py-2.5 px-3">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${getStatusBadgeStyle(ms.status)}`}>{ms.status}</span>
                          {ms.receiptNo && <div className="text-[10px] font-mono text-slate-500 mt-0.5">{ms.receiptNo} ({ms.paymentMode})</div>}
                        </td>
                        <td className="py-2.5 px-3 text-right">
                          {ms.status !== 'Paid' ? (
                            <button type="button" onClick={() => onRecordMilestonePayment(activeDrawerBooking.id, ms.id)} className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold">Record Payment</button>
                          ) : (
                            <span className="text-[11px] text-emerald-700 font-semibold">Paid ✓</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="text-lg font-bold text-slate-900">Create New Flat / Office Booking</h3>
              <button type="button" onClick={() => setShowAddModal(false)} className="p-1 text-slate-400 hover:text-slate-700"><X className="w-4 h-4" /></button>
            </div>
            <form onSubmit={handleCreateBooking} className="space-y-3.5 mt-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div><label className="block font-bold text-slate-700 mb-1">Primary Applicant Name *</label><input type="text" required placeholder="e.g., Sneha & Kunal Deshpande" value={custName} onChange={(e) => setCustName(e.target.value)} className="w-full px-3 py-2 rounded-xl border border-slate-300" /></div>
                <div><label className="block font-bold text-slate-700 mb-1">Co-Applicant Name</label><input type="text" placeholder="e.g., Kunal Deshpande" value={coApp} onChange={(e) => setCoApp(e.target.value)} className="w-full px-3 py-2 rounded-xl border border-slate-300" /></div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div><label className="block font-bold text-slate-700 mb-1">Mobile Number</label><input type="text" value={custPhone} onChange={(e) => setCustPhone(e.target.value)} className="w-full px-3 py-2 rounded-xl border border-slate-300" /></div>
                <div><label className="block font-bold text-slate-700 mb-1">Email ID</label><input type="email" value={custEmail} onChange={(e) => setCustEmail(e.target.value)} className="w-full px-3 py-2 rounded-xl border border-slate-300" /></div>
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Select Unit from Inventory</label>
                <select value={selectedUnitId} onChange={(e) => setSelectedUnitId(e.target.value)} className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white font-semibold">
                  {units.map((u) => (<option key={u.id} value={u.id}>{u.projectName} — Unit {u.unitNumber} ({u.bhk}, {u.carpetArea} sq.ft) — ₹{u.basePriceLakhs} L [{u.status}]</option>))}
                </select>
              </div>
              <div><label className="block font-bold text-slate-700 mb-1">Home Loan / Financing Partner</label><input type="text" value={bankLoan} onChange={(e) => setBankLoan(e.target.value)} className="w-full px-3 py-2 rounded-xl border border-slate-300" /></div>
              <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
                <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 rounded-xl border border-slate-300 font-semibold">Cancel</button>
                <button type="submit" className="px-4 py-2 rounded-xl text-white font-bold" style={{ backgroundColor: brand.accentBlue }}>Generate Allotment &amp; Lock Unit</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export const ALL_ROLES: UserRole[] = [
  'Company Admin', 'Project Manager', 'Sales Manager', 'Sales Executive', 'Accounts', 'Site Engineer', 'Storekeeper',
];

const ROLE_PERMISSIONS_MAP: Record<UserRole, { modules: string; accessNote: string }> = {
  'Company Admin': { modules: 'Full Access across all 12 CRM & ERP Modules + White-Label Branding', accessNote: 'Can approve high-value POs, vendor bills, brokerage payouts, and manage tenant settings.' },
  'Project Manager': { modules: 'Projects, Construction DPRs, Material Indents, Vendors & Reports', accessNote: 'Oversees civil & MEP milestones, workforce deployment, and site task schedules.' },
  'Sales Manager': { modules: 'CRM Leads, Channel Partners, Inventory Grid, Bookings & Sales Reports', accessNote: 'Manages sales pipeline, CP brokerage approvals, and unit hold/waiver requests.' },
  'Sales Executive': { modules: 'Assigned Leads, Site Visits, Flat Availability Grid & Customer Bookings', accessNote: 'Logs daily client calls, conducts site visits, and blocks units for 48 hours.' },
  'Accounts': { modules: 'Bookings CLP Receipts, CP Payouts, Vendor Bills, Expenses & Financial Reports', accessNote: 'Verifies customer RTGS/NEFT receipts, vendor GST invoices, and budget vs actual spend.' },
  'Site Engineer': { modules: 'Construction Milestones, Daily Progress Reports (DPR), Site Tasks & Material Indents', accessNote: 'Submits daily field progress with geo-tagged site photos and raises material requests.' },
  'Storekeeper': { modules: 'Material Stock Directory, Inward GRN, Site Issue & Inter-Site Transfers', accessNote: 'Manages physical site stores for Cement, Steel, Sand, Blocks, Electrical & Plumbing.' },
};

interface EmployeesModuleProps {
  employees: EmployeeRecord[];
  projects: ProjectRecord[];
  activeRole: UserRole;
  selectedProjectId: string;
  brand: BrandSettings;
  onSwitchRole: (role: UserRole) => void;
  onAddEmployee: (emp: EmployeeRecord) => void;
}

export const EmployeesModule: React.FC<EmployeesModuleProps> = ({
  employees, projects, activeRole, selectedProjectId, brand, onSwitchRole, onAddEmployee,
}) => {
  const [selectedEmp, setSelectedEmp] = useState<EmployeeRecord | null>(employees[0] || null);
  const [showAddModal, setShowAddModal] = useState(false);

  const [empName, setEmpName] = useState('');
  const [empDesig, setEmpDesig] = useState('');
  const [empRole, setEmpRole] = useState<UserRole>('Sales Executive');
  const [empDept] = useState<EmployeeRecord['department']>('Sales & CRM');
  const [empProjId, setEmpProjId] = useState('proj-1');
  const [empPhone] = useState('+91 98201 00991');

  const filteredEmployees = selectedProjectId === 'ALL' ? employees : employees.filter((e) => e.projectId === 'ALL' || e.projectId === selectedProjectId);

  const handleCreateEmp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!empName.trim() || !empDesig.trim()) return;
    const proj = projects.find((p) => p.id === empProjId);
    const created: EmployeeRecord = {
      id: `EMP-0${employees.length + 1}`,
      name: empName.trim(),
      designation: empDesig.trim(),
      department: empDept,
      role: empRole,
      projectId: empProjId,
      projectName: proj ? proj.name : 'All Projects (Corporate HQ)',
      phone: empPhone,
      email: `${empName.toLowerCase().replace(/\s+/g, '.')}@nexoradevelopers.demo`,
      joiningDate: '2026-11-01',
      reportsTo: 'Vikramaditya Deshmukh',
      status: 'Active',
      kpiSummary: 'Newly Onboarded Team Member • Assigned to MMR Operations',
    };
    onAddEmployee(created);
    setSelectedEmp(created);
    setShowAddModal(false);
    setEmpName('');
    setEmpDesig('');
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 text-white p-5 rounded-2xl border border-slate-700 space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-amber-400 text-slate-950">Simulated Role Switcher • Demo Only</span>
              <span className="text-xs text-slate-300">Not cryptographic authentication — Production uses Supabase Auth + PostgreSQL RLS</span>
            </div>
            <h3 className="text-lg font-bold mt-1">Active Simulated Persona: <span className="text-amber-300">{activeRole}</span></h3>
            <p className="text-xs text-slate-300 mt-0.5"><strong>Scope:</strong> {ROLE_PERMISSIONS_MAP[activeRole].modules} — {ROLE_PERMISSIONS_MAP[activeRole].accessNote}</p>
          </div>
          <button type="button" onClick={() => setShowAddModal(true)} className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shrink-0 flex items-center gap-1.5 self-start">
            <Plus className="w-4 h-4" /> Add Employee
          </button>
        </div>
        <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-800">
          {ALL_ROLES.map((r) => (
            <button key={r} type="button" onClick={() => onSwitchRole(r)} className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${activeRole === r ? 'bg-amber-400 text-slate-950 shadow-sm' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}>
              Switch to: {r}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-xs overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase">
                <th className="py-3.5 px-4">Employee &amp; ID</th>
                <th className="py-3.5 px-4">Designation &amp; Dept</th>
                <th className="py-3.5 px-4">RBAC Role</th>
                <th className="py-3.5 px-4">Assigned Project</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Profile</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-xs">
              {filteredEmployees.map((emp) => (
                <tr key={emp.id} onClick={() => setSelectedEmp(emp)} className={`cursor-pointer ${selectedEmp?.id === emp.id ? 'bg-blue-50/60' : 'hover:bg-slate-50'}`}>
                  <td className="py-3 px-4"><div className="font-bold text-slate-900">{emp.name}</div><div className="text-[11px] text-slate-500">{emp.id} • {emp.phone}</div></td>
                  <td className="py-3 px-4"><div className="font-semibold text-slate-800">{emp.designation}</div><div className="text-[11px] text-slate-500">{emp.department}</div></td>
                  <td className="py-3 px-4"><span className="px-2 py-0.5 rounded bg-slate-100 text-slate-800 font-bold text-[11px]">{emp.role}</span></td>
                  <td className="py-3 px-4 text-slate-700 font-medium">{emp.projectName}</td>
                  <td className="py-3 px-4"><span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${getStatusBadgeStyle(emp.status)}`}>{emp.status}</span></td>
                  <td className="py-3 px-4 text-right"><button type="button" onClick={() => setSelectedEmp(emp)} className="px-2.5 py-1 rounded-lg bg-slate-900 text-white text-[11px] font-semibold">View</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {selectedEmp && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-4">
            <div className="border-b border-slate-200 pb-3">
              <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-blue-50 text-blue-700">{selectedEmp.id} • {selectedEmp.department}</span>
              <h4 className="text-lg font-extrabold text-slate-900 mt-1">{selectedEmp.name}</h4>
              <p className="text-xs text-slate-500">{selectedEmp.designation}</p>
            </div>
            <div className="space-y-2 text-xs bg-slate-50 p-3.5 rounded-xl border border-slate-200">
              <div className="flex justify-between"><span className="text-slate-500">System Role:</span><span className="font-bold text-blue-700">{selectedEmp.role}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Assigned Project:</span><span className="font-bold text-slate-900">{selectedEmp.projectName}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Reporting Manager:</span><span className="font-semibold text-slate-800">{selectedEmp.reportsTo}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Official Email:</span><span className="font-semibold text-slate-800">{selectedEmp.email}</span></div>
            </div>
            <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200 text-xs">
              <div className="font-bold text-emerald-900 mb-1">Key Performance Summary</div>
              <p className="text-emerald-800">{selectedEmp.kpiSummary}</p>
            </div>
            <button type="button" onClick={() => onSwitchRole(selectedEmp.role)} className="w-full py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold">
              Simulate {selectedEmp.name}&apos;s Role ({selectedEmp.role})
            </button>
          </div>
        )}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="text-lg font-bold text-slate-900">Add Employee to Team Directory</h3>
              <button type="button" onClick={() => setShowAddModal(false)} className="p-1 text-slate-400 hover:text-slate-700"><X className="w-4 h-4" /></button>
            </div>
            <form onSubmit={handleCreateEmp} className="space-y-3.5 mt-4 text-xs">
              <div><label className="block font-bold text-slate-700 mb-1">Full Name *</label><input type="text" required placeholder="e.g., Omkar Sawant" value={empName} onChange={(e) => setEmpName(e.target.value)} className="w-full px-3 py-2 rounded-xl border border-slate-300" /></div>
              <div><label className="block font-bold text-slate-700 mb-1">Designation *</label><input type="text" required placeholder="e.g., Assistant Site Engineer" value={empDesig} onChange={(e) => setEmpDesig(e.target.value)} className="w-full px-3 py-2 rounded-xl border border-slate-300" /></div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">System Role</label>
                  <select value={empRole} onChange={(e) => setEmpRole(e.target.value as UserRole)} className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white">
                    {ALL_ROLES.map((r) => (<option key={r} value={r}>{r}</option>))}
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Assigned Project</label>
                  <select value={empProjId} onChange={(e) => setEmpProjId(e.target.value)} className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white">
                    <option value="ALL">All Projects (Corporate)</option>
                    {projects.map((p) => (<option key={p.id} value={p.id}>{p.name}</option>))}
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
                <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 rounded-xl border border-slate-300 font-semibold">Cancel</button>
                <button type="submit" className="px-4 py-2 rounded-xl text-white font-bold" style={{ backgroundColor: brand.accentBlue }}>Add Team Member</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
