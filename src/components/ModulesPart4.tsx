import React, { useState } from 'react';
import {
  Download, Calendar, Sparkles, Database, Smartphone, RefreshCw,
} from 'lucide-react';
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import {
  ProjectRecord, LeadRecord, ChannelPartnerRecord, InventoryUnit,
  MaterialRecord, BillExpenseRecord, BrandSettings,
} from '../types';
import { MONTHLY_SALES_CHART_DATA } from '../data/mockData';

type ReportTab = 'sales' | 'conversion' | 'cp' | 'inventory' | 'construction' | 'materials' | 'expenditure';

interface ReportsModuleProps {
  projects: ProjectRecord[];
  leads: LeadRecord[];
  cps: ChannelPartnerRecord[];
  units: InventoryUnit[];
  materials: MaterialRecord[];
  bills: BillExpenseRecord[];
  selectedProjectId: string;
  brand: BrandSettings;
  onTriggerToast: (msg: string) => void;
}

export const ReportsModule: React.FC<ReportsModuleProps> = ({
  projects, cps, materials, brand, onTriggerToast,
}) => {
  const [activeReport, setActiveReport] = useState<ReportTab>('sales');
  const [dateRange, setDateRange] = useState('YTD FY 2026-27 (Apr - Nov)');

  const reportTabs: { id: ReportTab; label: string }[] = [
    { id: 'sales', label: '1. Sales Report' },
    { id: 'conversion', label: '2. Lead Conversion' },
    { id: 'cp', label: '3. Channel Partner ROI' },
    { id: 'inventory', label: '4. Inventory Valuation' },
    { id: 'construction', label: '5. Construction Progress' },
    { id: 'materials', label: '6. Material Consumption' },
    { id: 'expenditure', label: '7. Project Expenditure' },
  ];

  const conversionData = [
    { stage: 'Total Enquiries', count: 126, rate: '100%' },
    { stage: 'Contacted & Verified', count: 98, rate: '77.8%' },
    { stage: 'Qualified Prospects', count: 64, rate: '50.8%' },
    { stage: 'Site Visits Completed', count: 42, rate: '33.3%' },
    { stage: 'Price Negotiation', count: 27, rate: '21.4%' },
    { stage: 'Confirmed Bookings', count: 18, rate: '14.3%' },
  ];

  const handleDownloadCSV = () => {
    let csvContent = '';
    if (activeReport === 'sales') {
      csvContent = 'Month,Nexora Heights (Cr),Nexora Skyview (Cr),Nexora Business Park (Cr),Total Sales (Cr)\n' +
        MONTHLY_SALES_CHART_DATA.map((r) => `${r.month},${r.heights},${r.skyview},${r.businessPark},${r.total}`).join('\n');
    } else if (activeReport === 'conversion') {
      csvContent = 'Funnel Stage,Lead Count,Conversion Rate\n' +
        conversionData.map((r) => `${r.stage},${r.count},${r.rate}`).join('\n');
    } else if (activeReport === 'cp') {
      csvContent = 'Agency Name,Partner,City,Leads,Site Visits,Bookings,Total Commission (Lakhs)\n' +
        cps.map((c) => `"${c.agencyName}","${c.name}","${c.city}",${c.leadsCount},${c.siteVisitsCount},${c.bookingsCount},${c.totalCommissionLakhs}`).join('\n');
    } else {
      csvContent = 'Project Name,Location,Type,Total Units,Sold Units,Available Units,Progress %,Budget (Cr),Actual Spend (Cr)\n' +
        projects.map((p) => `"${p.name}","${p.location}",${p.type},${p.totalUnits},${p.soldUnits},${p.availableUnits},${p.progress}%,${p.budgetCr},${p.actualSpendCr}`).join('\n');
    }
    try {
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `RealEstateOS_${activeReport}_report_demo.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch {
      // Fallback in restricted sandbox
    }
    onTriggerToast(`Downloaded ${activeReport.toUpperCase()} Report CSV (${dateRange})`);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        <div>
          <h3 className="text-base font-bold text-slate-900">Executive MIS &amp; Cross-Module Analytics Suite</h3>
          <p className="text-xs text-slate-500">7 Pre-Built Real Estate Developer Reports • Filtered by Date &amp; Project</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-700">
            <Calendar className="w-3.5 h-3.5 text-blue-600" />
            <select value={dateRange} onChange={(e) => setDateRange(e.target.value)} className="bg-transparent focus:outline-none">
              <option value="Last 30 Days (Oct - Nov 2026)">Last 30 Days (Oct - Nov 2026)</option>
              <option value="Q2 FY 2026-27 (Jul - Sep)">Q2 FY 2026-27 (Jul - Sep)</option>
              <option value="YTD FY 2026-27 (Apr - Nov)">YTD FY 2026-27 (Apr - Nov)</option>
              <option value="All Time Since Launch">All Time Since Launch</option>
            </select>
          </div>
          <button type="button" onClick={handleDownloadCSV} className="px-4 py-2 rounded-xl text-white text-xs font-bold shadow-xs flex items-center gap-1.5" style={{ backgroundColor: brand.accentBlue }}>
            <Download className="w-4 h-4" /> Download CSV Report
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5 bg-white p-2 rounded-2xl border border-slate-200 shadow-2xs">
        {reportTabs.map((tab) => (
          <button key={tab.id} type="button" onClick={() => setActiveReport(tab.id)} className={`px-3.5 py-2 rounded-xl text-xs font-bold transition ${activeReport === tab.id ? 'bg-slate-900 text-white shadow-2xs' : 'text-slate-600 hover:bg-slate-100'}`}>
            {tab.label}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-5">
        {activeReport === 'sales' && (
          <div className="space-y-4">
            <h4 className="text-base font-bold text-slate-900">1. Monthly Sales Velocity &amp; Revenue Realization Report ({dateRange})</h4>
            <div className="relative h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={MONTHLY_SALES_CHART_DATA}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} unit=" Cr" />
                  <Tooltip formatter={(v: number) => [`₹${v} Cr`, 'Sales']} />
                  <Legend wrapperStyle={{ fontSize: '12px' }} />
                  <Bar dataKey="heights" name="Nexora Heights" fill="#14263D" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="skyview" name="Nexora Skyview" fill="#2864A6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="businessPark" name="Nexora Business Park" fill="#0EA5E9" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
        {activeReport === 'conversion' && (
          <div className="space-y-4">
            <h4 className="text-base font-bold text-slate-900">2. CRM Lead Funnel &amp; Site-Visit-to-Booking Conversion Report</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {conversionData.map((stage) => (
                <div key={stage.stage} className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center">
                  <div className="text-[11px] font-bold text-slate-500">{stage.stage}</div>
                  <div className="text-2xl font-extrabold text-slate-900 my-1">{stage.count}</div>
                  <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-blue-100 text-blue-800">{stage.rate} of Top Funnel</span>
                </div>
              ))}
            </div>
          </div>
        )}
        {activeReport === 'cp' && (
          <div className="space-y-4">
            <h4 className="text-base font-bold text-slate-900">3. Channel Partner Brokerage Performance &amp; Deal Contribution Report</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase">
                    <th className="py-3 px-4">CP Agency</th>
                    <th className="py-3 px-4">City</th>
                    <th className="py-3 px-4">Leads Registered</th>
                    <th className="py-3 px-4">Site Visits</th>
                    <th className="py-3 px-4">Closed Bookings</th>
                    <th className="py-3 px-4">Total Commission</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {cps.map((c) => (
                    <tr key={c.id}>
                      <td className="py-3 px-4 font-bold text-slate-900">{c.agencyName}</td>
                      <td className="py-3 px-4 text-slate-600">{c.city}</td>
                      <td className="py-3 px-4 font-semibold">{c.leadsCount}</td>
                      <td className="py-3 px-4 font-semibold">{c.siteVisitsCount}</td>
                      <td className="py-3 px-4 font-bold text-emerald-700">{c.bookingsCount}</td>
                      <td className="py-3 px-4 font-extrabold text-slate-900">₹{c.totalCommissionLakhs} Lakhs</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        {activeReport === 'inventory' && (
          <div className="space-y-4">
            <h4 className="text-base font-bold text-slate-900">4. Project-Wise Sold vs Unsold Inventory Valuation Report (248 Total Units)</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              {projects.map((p) => (
                <div key={p.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="text-sm font-extrabold text-slate-900">{p.name}</div>
                  <div className="flex justify-between"><span className="text-slate-500">Total Units:</span><span className="font-bold">{p.totalUnits} Units</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">Sold Units:</span><span className="font-bold text-emerald-700">{p.soldUnits} Units</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">Hold / Blocked:</span><span className="font-bold text-amber-700">{p.holdUnits} Units</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">Unsold Available:</span><span className="font-bold text-blue-700">{p.availableUnits} Units</span></div>
                  <div className="flex justify-between pt-2 border-t border-slate-200"><span className="font-bold text-slate-700">Booked Revenue:</span><span className="font-extrabold text-slate-900">₹{p.totalSalesCr} Cr</span></div>
                </div>
              ))}
            </div>
          </div>
        )}
        {activeReport === 'construction' && (
          <div className="space-y-4">
            <h4 className="text-base font-bold text-slate-900">5. Physical Construction Progress &amp; Milestone Completion Report</h4>
            <div className="space-y-3 text-xs">
              {projects.map((p) => (
                <div key={p.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="flex justify-between font-bold text-slate-900 mb-2">
                    <span>{p.name} ({p.location}) — Engineer: {p.siteEngineer}</span>
                    <span className="text-emerald-700">{p.progress}% Overall Completion</span>
                  </div>
                  <div className="grid grid-cols-6 gap-2">
                    {p.milestones.map((m) => (
                      <div key={m.stage} className="p-2 rounded bg-white border border-slate-200 text-center">
                        <div className="text-[10px] text-slate-500">{m.stage}</div>
                        <div className="font-extrabold text-slate-900">{m.progress}%</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {activeReport === 'materials' && (
          <div className="space-y-4">
            <h4 className="text-base font-bold text-slate-900">6. Site Material Stock Valuation &amp; Consumption Report</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase">
                    <th className="py-3 px-4">Material</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Site Store</th>
                    <th className="py-3 px-4">Available Stock</th>
                    <th className="py-3 px-4">Min Stock</th>
                    <th className="py-3 px-4">Unit Rate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {materials.map((m) => (
                    <tr key={m.id}>
                      <td className="py-2.5 px-4 font-bold text-slate-900">{m.name}</td>
                      <td className="py-2.5 px-4">{m.category}</td>
                      <td className="py-2.5 px-4 font-semibold text-blue-800">{m.projectName}</td>
                      <td className="py-2.5 px-4 font-bold">{m.availableStock} {m.unit}</td>
                      <td className="py-2.5 px-4 text-slate-500">{m.minStock} {m.unit}</td>
                      <td className="py-2.5 px-4">₹{m.unitRateInr.toLocaleString('en-IN')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        {activeReport === 'expenditure' && (
          <div className="space-y-4">
            <h4 className="text-base font-bold text-slate-900">7. Project-Wise Capital Expenditure &amp; Vendor Payables Report</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              {projects.map((p) => (
                <div key={p.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="text-sm font-extrabold text-slate-900">{p.name}</div>
                  <div className="flex justify-between"><span className="text-slate-500">Total Sanctioned Budget:</span><span className="font-bold">₹{p.budgetCr} Cr</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">Cumulative Spend to Date:</span><span className="font-bold text-blue-700">₹{p.actualSpendCr} Cr</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">Remaining Unspent Budget:</span><span className="font-extrabold text-emerald-700">₹{(p.budgetCr - p.actualSpendCr).toFixed(1)} Cr</span></div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

interface SettingsModuleProps {
  brand: BrandSettings;
  onUpdateBrand: (updated: BrandSettings) => void;
  onResetDemoData: () => void;
}

export const THEME_PRESETS = [
  { name: 'Nexora Navy & Royal Blue (Default)', companyName: 'NEXORA DEVELOPERS', logoText: 'NX', primaryNavy: '#14263D', accentBlue: '#2864A6' },
  { name: 'Emerald Imperial Realty', companyName: 'CRESTLINE REALTY GROUP', logoText: 'CR', primaryNavy: '#064E3B', accentBlue: '#059669' },
  { name: 'Indigo & Slate Landmarks', companyName: 'APEX INFRASTRUCTURE MMR', logoText: 'AX', primaryNavy: '#1E1B4B', accentBlue: '#4F46E5' },
  { name: 'Obsidian & Executive Teal', companyName: 'SURYA BUILDCON CORP', logoText: 'SB', primaryNavy: '#0F172A', accentBlue: '#0284C7' },
];

export const SettingsModule: React.FC<SettingsModuleProps> = ({
  brand, onUpdateBrand, onResetDemoData,
}) => {
  const handleToggleNotification = (key: keyof BrandSettings['notifications']) => {
    onUpdateBrand({
      ...brand,
      notifications: { ...brand.notifications, [key]: !brand.notifications[key] },
    });
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl p-5 text-white flex flex-col lg:flex-row lg:items-center justify-between gap-4 shadow-sm" style={{ background: `linear-gradient(135deg, ${brand.primaryNavy} 0%, ${brand.accentBlue} 100%)` }}>
        <div>
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-amber-400 text-slate-950">White-Label SaaS Engine • Live Preview</span>
          <h3 className="text-xl font-extrabold mt-1">{brand.companyName} — White-Label Branding &amp; Tenant Configuration</h3>
          <p className="text-xs text-blue-100 mt-0.5">Change the developer name, logo monogram, or primary brand colors below to demonstrate instant multi-tenant white-labeling to prospective builder clients.</p>
        </div>
        <button type="button" onClick={onResetDemoData} className="px-4 py-2 rounded-xl bg-white/15 hover:bg-white/25 border border-white/25 text-white text-xs font-bold flex items-center gap-1.5 shrink-0 self-start">
          <RefreshCw className="w-3.5 h-3.5" /> Reset All Demo State to Default
        </button>
      </div>

      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
        <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-500" /> One-Click White-Label Client Theme Presets (Test Live in Presentation)
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {THEME_PRESETS.map((preset) => {
            const isCurrent = brand.primaryNavy === preset.primaryNavy && brand.companyName === preset.companyName;
            return (
              <button
                key={preset.name}
                type="button"
                onClick={() => onUpdateBrand({ ...brand, companyName: preset.companyName, logoText: preset.logoText, primaryNavy: preset.primaryNavy, accentBlue: preset.accentBlue })}
                className={`p-3.5 rounded-xl border text-left transition flex flex-col justify-between gap-2 ${isCurrent ? 'border-blue-600 ring-2 ring-blue-500/20 bg-blue-50/30' : 'border-slate-200 hover:border-slate-300'}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-md border border-black/10" style={{ backgroundColor: preset.primaryNavy }} />
                    <span className="w-5 h-5 rounded-md border border-black/10" style={{ backgroundColor: preset.accentBlue }} />
                  </div>
                  {isCurrent && <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">Active</span>}
                </div>
                <div>
                  <div className="text-xs font-extrabold text-slate-900">{preset.companyName}</div>
                  <div className="text-[11px] text-slate-500">{preset.name}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-5 text-xs">
          <h4 className="text-sm font-bold text-slate-900 border-b border-slate-200 pb-2.5">Developer Brand Identity, Colors &amp; Custom Domain</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="block font-bold text-slate-700 mb-1">Developer Company Name</label>
              <input type="text" value={brand.companyName} onChange={(e) => onUpdateBrand({ ...brand, companyName: e.target.value })} className="w-full px-3 py-2 rounded-xl border border-slate-300 font-bold text-slate-900" />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Logo Monogram (2-3 Chars)</label>
              <input type="text" maxLength={3} value={brand.logoText} onChange={(e) => onUpdateBrand({ ...brand, logoText: e.target.value.toUpperCase() })} className="w-full px-3 py-2 rounded-xl border border-slate-300 font-bold text-center" />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Primary Sidebar Navy Hex ({brand.primaryNavy})</label>
              <div className="flex items-center gap-2">
                <input type="color" value={brand.primaryNavy} onChange={(e) => onUpdateBrand({ ...brand, primaryNavy: e.target.value })} className="w-10 h-9 rounded-lg border border-slate-300 cursor-pointer" />
                <input type="text" value={brand.primaryNavy} onChange={(e) => onUpdateBrand({ ...brand, primaryNavy: e.target.value })} className="flex-1 px-3 py-2 rounded-xl border border-slate-300 font-mono" />
              </div>
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Accent Action Royal Blue Hex ({brand.accentBlue})</label>
              <div className="flex items-center gap-2">
                <input type="color" value={brand.accentBlue} onChange={(e) => onUpdateBrand({ ...brand, accentBlue: e.target.value })} className="w-10 h-9 rounded-lg border border-slate-300 cursor-pointer" />
                <input type="text" value={brand.accentBlue} onChange={(e) => onUpdateBrand({ ...brand, accentBlue: e.target.value })} className="flex-1 px-3 py-2 rounded-xl border border-slate-300 font-mono" />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">White-Label Custom Domain Placeholder</label>
              <input type="text" value={brand.domain} onChange={(e) => onUpdateBrand({ ...brand, domain: e.target.value })} className="w-full px-3 py-2 rounded-xl border border-slate-300 font-mono" />
              <span className="text-[10px] text-emerald-700 font-semibold mt-1 block">✓ CNAME → cname.realestateos.cloud (Simulated SSL Active)</span>
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Corporate RERA Master ID (Demo)</label>
              <input type="text" value={brand.reraMasterId} onChange={(e) => onUpdateBrand({ ...brand, reraMasterId: e.target.value })} className="w-full px-3 py-2 rounded-xl border border-slate-300 font-mono" />
            </div>
          </div>
          <div>
            <label className="block font-bold text-slate-700 mb-1">Registered Corporate Office Address</label>
            <input type="text" value={brand.corporateAddress} onChange={(e) => onUpdateBrand({ ...brand, corporateAddress: e.target.value })} className="w-full px-3 py-2 rounded-xl border border-slate-300" />
          </div>
        </div>

        <div className="space-y-5">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-500">Live Application White-Label Preview</h4>
            <div className="rounded-xl border border-slate-200 overflow-hidden shadow-xs">
              <div className="p-3 text-white flex items-center justify-between" style={{ backgroundColor: brand.primaryNavy }}>
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg flex items-center justify-center font-extrabold text-xs text-white" style={{ backgroundColor: brand.accentBlue }}>{brand.logoText}</span>
                  <div>
                    <div className="text-xs font-bold leading-none">{brand.companyName}</div>
                    <div className="text-[10px] text-slate-300 mt-0.5">{brand.domain}</div>
                  </div>
                </div>
                <span className="text-[9px] px-2 py-0.5 rounded bg-amber-400 text-slate-950 font-bold">DEMO</span>
              </div>
              <div className="p-3 bg-slate-50 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-700">Primary CTA Button:</span>
                  <span className="px-3 py-1 rounded-lg text-white font-bold text-[11px]" style={{ backgroundColor: brand.accentBlue }}>+ New Booking</span>
                </div>
                <div className="text-[11px] text-slate-500">Subscription Tier: <strong className="text-slate-800">{brand.planName}</strong></div>
              </div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3 text-xs">
            <h4 className="text-sm font-bold text-slate-900">Automated Notification Channels</h4>
            {([
              ['whatsappLeads', 'WhatsApp Instant Lead & Site Visit Alerts'],
              ['dailyDprDigest', '8:00 PM Daily Site DPR & Workforce Digest'],
              ['lowStockSms', 'Low-Stock Store Reorder SMS to Procurement'],
              ['poApprovalAlerts', 'Purchase Order & Vendor Bill Approval Alerts'],
              ['bookingEmails', 'Automated Welcome & CLP Demand Emails'],
            ] as const).map(([key, label]) => (
              <div key={key} className="flex items-center justify-between py-1.5 border-b border-slate-100 last:border-none">
                <span className="text-slate-700 font-medium">{label}</span>
                <button type="button" onClick={() => handleToggleNotification(key)} className={`w-10 h-5 rounded-full transition relative ${brand.notifications[key] ? 'bg-emerald-600' : 'bg-slate-300'}`}>
                  <span className={`w-4 h-4 rounded-full bg-white absolute top-0.5 transition ${brand.notifications[key] ? 'right-0.5' : 'left-0.5'}`} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-slate-900 text-white p-5 rounded-2xl border border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-amber-400 font-bold"><Database className="w-4 h-4" /> Production Multi-Tenant Security Note (Supabase RLS)</div>
          <p className="text-slate-300 leading-relaxed">
            In this client demo prototype, data lives in browser memory so you can freely test without a backend. Before onboarding real developer customers, every table (`projects`, `leads`, `units`, `bookings`, `materials`, `bills`) maps to PostgreSQL with mandatory <strong>Supabase Row-Level Security (`tenant_id = auth.jwt()-&gt;&gt;&apos;tenant_id&apos;`)</strong> so each builder&apos;s data is cryptographically isolated.
          </p>
        </div>
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-sky-400 font-bold"><Smartphone className="w-4 h-4" /> Expo React Native Mobile App Readiness</div>
          <p className="text-slate-300 leading-relaxed">
            All TypeScript interfaces (`ProjectRecord`, `LeadRecord`, `DPRRecord`, `MaterialRecord`) are decoupled from the UI so you can share the exact same data models with future <strong>Expo (iOS/Android) field apps</strong> for Site Engineers (offline DPR photo capture) and Sales Executives (instant walk-in lead scanning).
          </p>
        </div>
      </div>
    </div>
  );
};
