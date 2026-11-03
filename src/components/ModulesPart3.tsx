import React, { useState } from 'react';
import {
  HardHat, Camera, AlertTriangle, Plus, ShieldAlert, X, Star,
} from 'lucide-react';
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import {
  ProjectRecord, DPRRecord, SiteTaskRecord, MaterialRecord, MaterialMovementRecord,
  VendorRecord, PurchaseOrderRecord, BillExpenseRecord, BrandSettings,
} from '../types';
import { getStatusBadgeStyle } from './ModulesPart1';

interface ConstructionModuleProps {
  projects: ProjectRecord[];
  dprs: DPRRecord[];
  tasks: SiteTaskRecord[];
  selectedProjectId: string;
  brand: BrandSettings;
  onAddDPR: (dpr: DPRRecord) => void;
  onAddSiteTask: (task: SiteTaskRecord) => void;
  onUpdateTaskStatus: (taskId: string, status: SiteTaskRecord['status']) => void;
  onBumpMilestoneProgress: (projectId: string, stage: string) => void;
}

export const ConstructionModule: React.FC<ConstructionModuleProps> = ({
  projects, dprs, tasks, selectedProjectId, brand,
  onAddDPR, onAddSiteTask, onUpdateTaskStatus, onBumpMilestoneProgress,
}) => {
  const [showDprModal, setShowDprModal] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [previewPhotoDpr, setPreviewPhotoDpr] = useState<DPRRecord | null>(null);

  const [dprProjId, setDprProjId] = useState(selectedProjectId === 'ALL' ? 'proj-1' : selectedProjectId);
  const [dprZone, setDprZone] = useState('Tower A - 12th Floor Slab');
  const [dprStage, setDprStage] = useState('Structure');
  const [dprWorkers, setDprWorkers] = useState(145);
  const [dprWeather, setDprWeather] = useState<DPRRecord['weather']>('Clear & Sunny');
  const [dprSummary, setDprSummary] = useState('');
  const [dprEngineer] = useState('Rohan Kulkarni (Site Engineer)');

  const [taskTitle, setTaskTitle] = useState('');
  const [taskProjId, setTaskProjId] = useState(selectedProjectId === 'ALL' ? 'proj-1' : selectedProjectId);
  const [taskStage, setTaskStage] = useState<SiteTaskRecord['milestoneStage']>('Structure');
  const [taskOwner, setTaskOwner] = useState('Rohan Kulkarni');
  const [taskDue, setTaskDue] = useState('2026-11-08');

  const visibleProjects = selectedProjectId === 'ALL' ? projects : projects.filter((p) => p.id === selectedProjectId);
  const visibleDprs = selectedProjectId === 'ALL' ? dprs : dprs.filter((d) => d.projectId === selectedProjectId);
  const visibleTasks = selectedProjectId === 'ALL' ? tasks : tasks.filter((t) => t.projectId === selectedProjectId);

  const handleCreateDpr = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dprSummary.trim()) return;
    const proj = projects.find((p) => p.id === dprProjId) || projects[0];
    const created: DPRRecord = {
      id: `DPR-${504 + dprs.length}`,
      date: '2026-11-01',
      projectId: proj.id,
      projectName: proj.name,
      towerZone: dprZone,
      milestoneStage: dprStage,
      workforceCount: Number(dprWorkers) || 100,
      weather: dprWeather,
      workSummary: dprSummary.trim(),
      submittedBy: dprEngineer,
      photoCaption: `${proj.name} (${dprZone}) — Site Inspection Photo Placeholder`,
      status: 'Verified',
    };
    onAddDPR(created);
    setShowDprModal(false);
    setDprSummary('');
  };

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskTitle.trim()) return;
    const proj = projects.find((p) => p.id === taskProjId) || projects[0];
    const created: SiteTaskRecord = {
      id: `TSK-${206 + tasks.length}`,
      title: taskTitle.trim(),
      projectId: proj.id,
      projectName: proj.name,
      milestoneStage: taskStage,
      owner: taskOwner,
      dueDate: taskDue,
      priority: 'High',
      status: 'In Progress',
    };
    onAddSiteTask(created);
    setShowTaskModal(false);
    setTaskTitle('');
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-base font-bold text-slate-900">Site Construction, 6-Stage Milestone Tracker &amp; Daily Progress Reports (DPR)</h3>
          <p className="text-xs text-slate-500">Track Foundation, Plinth, Structure, Brickwork, MEP &amp; Finishing across active sites</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button type="button" onClick={() => setShowTaskModal(true)} className="px-3.5 py-2 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 text-xs font-bold flex items-center gap-1.5">
            <Plus className="w-3.5 h-3.5" /> Assign Site Task
          </button>
          <button type="button" onClick={() => setShowDprModal(true)} className="px-4 py-2 rounded-xl text-white text-xs font-bold shadow-xs flex items-center gap-1.5" style={{ backgroundColor: brand.accentBlue }}>
            <HardHat className="w-4 h-4" /> Submit Daily Progress Report (DPR)
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {visibleProjects.map((proj) => (
          <div key={proj.id} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-base font-extrabold text-slate-900">{proj.name}</span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">Overall Completion: {proj.progress}%</span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">Lead Engineer: <strong>{proj.siteEngineer}</strong> • Active Workforce Today: <strong>{proj.workforceCount} Workers</strong></p>
              </div>
              <span className="text-[11px] text-slate-400">Click &quot;+5% Update&quot; on any active milestone to test live progress sync</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {proj.milestones.map((ms, idx) => (
                <div key={ms.stage} className={`p-3.5 rounded-xl border flex flex-col justify-between ${ms.progress === 100 ? 'bg-emerald-50/50 border-emerald-200' : ms.progress > 0 ? 'bg-blue-50/40 border-blue-200' : 'bg-slate-50 border-slate-200'}`}>
                  <div>
                    <div className="flex items-center justify-between text-[11px] font-bold text-slate-500"><span>STAGE 0{idx + 1}</span><span>{ms.progress === 100 ? '✓' : `${ms.progress}%`}</span></div>
                    <div className="text-sm font-extrabold text-slate-900 mt-1">{ms.stage}</div>
                    <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden my-2">
                      <div className={`h-full rounded-full ${ms.progress === 100 ? 'bg-emerald-600' : 'bg-blue-600'}`} style={{ width: `${ms.progress}%` }} />
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[10px] font-semibold text-slate-500">{ms.status}</span>
                    {ms.progress < 100 && (
                      <button type="button" onClick={() => onBumpMilestoneProgress(proj.id, ms.stage)} className="px-2 py-0.5 rounded bg-white hover:bg-blue-600 hover:text-white text-blue-700 border border-blue-200 text-[10px] font-bold transition">
                        +5% Update
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-4 border-b border-slate-200">
            <h4 className="text-sm font-bold text-slate-900">Daily Progress Reports (DPR) Log</h4>
            <p className="text-xs text-slate-500">Field engineering logs with site photo attachment placeholders</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase">
                  <th className="py-3 px-4">DPR ID / Date</th>
                  <th className="py-3 px-4">Project &amp; Zone</th>
                  <th className="py-3 px-4">Work Completed Summary</th>
                  <th className="py-3 px-4">Workforce</th>
                  <th className="py-3 px-4 text-right">Site Photo</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {visibleDprs.map((dpr) => (
                  <tr key={dpr.id} className="hover:bg-slate-50">
                    <td className="py-3 px-4"><div className="font-mono font-bold text-slate-900">{dpr.id}</div><div className="text-[11px] text-slate-500">{dpr.date}</div></td>
                    <td className="py-3 px-4"><div className="font-bold text-slate-900">{dpr.projectName}</div><div className="text-[11px] text-blue-700 font-semibold">{dpr.towerZone}</div></td>
                    <td className="py-3 px-4 max-w-xs"><p className="text-slate-700 leading-relaxed">{dpr.workSummary}</p><span className="text-[10px] text-slate-400">By {dpr.submittedBy} • {dpr.weather}</span></td>
                    <td className="py-3 px-4 font-bold text-slate-900">{dpr.workforceCount} Workers</td>
                    <td className="py-3 px-4 text-right">
                      <button type="button" onClick={() => setPreviewPhotoDpr(dpr)} className="px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-blue-50 text-blue-700 font-bold text-[11px] inline-flex items-center gap-1">
                        <Camera className="w-3.5 h-3.5" /> View Photo
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-3.5">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-bold text-slate-900">Site Engineering Task List</h4>
              <p className="text-xs text-slate-500">Quality checks, slab sign-offs &amp; MEP inspections</p>
            </div>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-blue-700">{visibleTasks.length} Tasks</span>
          </div>
          <div className="space-y-3">
            {visibleTasks.map((tsk) => (
              <div key={tsk.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2">
                <div>
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-slate-200 text-slate-700">{tsk.projectName} • {tsk.milestoneStage}</span>
                  <h5 className="font-bold text-slate-900 mt-1">{tsk.title}</h5>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-200/70">
                  <span>Owner: <strong>{tsk.owner}</strong> • Due: {tsk.dueDate}</span>
                  <select value={tsk.status} onChange={(e) => onUpdateTaskStatus(tsk.id, e.target.value as SiteTaskRecord['status'])} className={`px-2 py-0.5 rounded-lg text-[10px] font-bold border ${getStatusBadgeStyle(tsk.status)}`}>
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="Delayed">Delayed</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {previewPhotoDpr && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-5 shadow-xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">Site Photo Attachment Placeholder • {previewPhotoDpr.id}</span>
                <h4 className="text-base font-bold text-slate-900 mt-1">{previewPhotoDpr.projectName} — {previewPhotoDpr.towerZone}</h4>
              </div>
              <button type="button" onClick={() => setPreviewPhotoDpr(null)} className="p-1 text-slate-400 hover:text-slate-700"><X className="w-4 h-4" /></button>
            </div>
            <div className="bg-slate-900 rounded-xl p-4 text-white">
              <svg viewBox="0 0 400 200" className="w-full h-44 rounded-lg bg-slate-800 border border-slate-700">
                <rect width="400" height="200" fill="#0f172a" />
                <rect x="60" y="30" width="110" height="150" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                <line x1="60" y1="65" x2="170" y2="65" stroke="#475569" strokeWidth="1.5" />
                <line x1="60" y1="100" x2="170" y2="100" stroke="#475569" strokeWidth="1.5" />
                <line x1="60" y1="135" x2="170" y2="135" stroke="#475569" strokeWidth="1.5" />
                <line x1="250" y1="180" x2="250" y2="20" stroke="#f59e0b" strokeWidth="4" />
                <line x1="150" y1="25" x2="340" y2="25" stroke="#f59e0b" strokeWidth="3" />
                <line x1="310" y1="25" x2="310" y2="85" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3 3" />
                <rect x="295" y="85" width="30" height="18" fill="#38bdf8" />
                <text x="200" y="165" fill="#e2e8f0" fontSize="11" fontWeight="bold" textAnchor="middle">GEO-TAGGED SITE PROGRESS VERIFICATION</text>
                <text x="200" y="182" fill="#38bdf8" fontSize="9.5" textAnchor="middle">{previewPhotoDpr.photoCaption}</text>
              </svg>
              <p className="text-xs text-slate-300 mt-3">{previewPhotoDpr.workSummary}</p>
            </div>
          </div>
        </div>
      )}

      {showDprModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="text-lg font-bold text-slate-900">Submit Daily Progress Report (DPR)</h3>
              <button type="button" onClick={() => setShowDprModal(false)} className="p-1 text-slate-400 hover:text-slate-700"><X className="w-4 h-4" /></button>
            </div>
            <form onSubmit={handleCreateDpr} className="space-y-3.5 mt-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div><label className="block font-bold text-slate-700 mb-1">Project</label><select value={dprProjId} onChange={(e) => setDprProjId(e.target.value)} className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white">{projects.map((p) => (<option key={p.id} value={p.id}>{p.name}</option>))}</select></div>
                <div><label className="block font-bold text-slate-700 mb-1">Tower / Wing Zone</label><input type="text" value={dprZone} onChange={(e) => setDprZone(e.target.value)} className="w-full px-3 py-2 rounded-xl border border-slate-300" /></div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div><label className="block font-bold text-slate-700 mb-1">Stage</label><input type="text" value={dprStage} onChange={(e) => setDprStage(e.target.value)} className="w-full px-3 py-2 rounded-xl border border-slate-300" /></div>
                <div><label className="block font-bold text-slate-700 mb-1">Active Workers</label><input type="number" value={dprWorkers} onChange={(e) => setDprWorkers(Number(e.target.value))} className="w-full px-3 py-2 rounded-xl border border-slate-300" /></div>
                <div><label className="block font-bold text-slate-700 mb-1">Site Weather</label><select value={dprWeather} onChange={(e) => setDprWeather(e.target.value as DPRRecord['weather'])} className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white"><option value="Clear & Sunny">Clear &amp; Sunny</option><option value="Partly Cloudy">Partly Cloudy</option><option value="Light Showers">Light Showers</option></select></div>
              </div>
              <div><label className="block font-bold text-slate-700 mb-1">Work Executed Summary *</label><textarea rows={3} required placeholder="Describe concrete pour volume, rebar inspection, brickwork or MEP progress..." value={dprSummary} onChange={(e) => setDprSummary(e.target.value)} className="w-full px-3 py-2 rounded-xl border border-slate-300" /></div>
              <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
                <button type="button" onClick={() => setShowDprModal(false)} className="px-4 py-2 rounded-xl border border-slate-300 font-semibold">Cancel</button>
                <button type="submit" className="px-4 py-2 rounded-xl text-white font-bold" style={{ backgroundColor: brand.accentBlue }}>Log DPR &amp; Attach Geo-Tag</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showTaskModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="text-lg font-bold text-slate-900">Create Site Engineering Task</h3>
              <button type="button" onClick={() => setShowTaskModal(false)} className="p-1 text-slate-400 hover:text-slate-700"><X className="w-4 h-4" /></button>
            </div>
            <form onSubmit={handleCreateTask} className="space-y-3.5 mt-4 text-xs">
              <div><label className="block font-bold text-slate-700 mb-1">Task Description *</label><input type="text" required placeholder="e.g., Cube strength test for Tower B 9th floor slab" value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} className="w-full px-3 py-2 rounded-xl border border-slate-300" /></div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="block font-bold text-slate-700 mb-1">Project</label><select value={taskProjId} onChange={(e) => setTaskProjId(e.target.value)} className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white">{projects.map((p) => (<option key={p.id} value={p.id}>{p.name}</option>))}</select></div>
                <div><label className="block font-bold text-slate-700 mb-1">Milestone Stage</label><select value={taskStage} onChange={(e) => setTaskStage(e.target.value as SiteTaskRecord['milestoneStage'])} className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white"><option value="Foundation">Foundation</option><option value="Plinth">Plinth</option><option value="Structure">Structure</option><option value="Brickwork">Brickwork</option><option value="MEP">MEP</option><option value="Finishing">Finishing</option></select></div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="block font-bold text-slate-700 mb-1">Assigned Engineer</label><input type="text" value={taskOwner} onChange={(e) => setTaskOwner(e.target.value)} className="w-full px-3 py-2 rounded-xl border border-slate-300" /></div>
                <div><label className="block font-bold text-slate-700 mb-1">Target Due Date</label><input type="date" value={taskDue} onChange={(e) => setTaskDue(e.target.value)} className="w-full px-3 py-2 rounded-xl border border-slate-300" /></div>
              </div>
              <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
                <button type="button" onClick={() => setShowTaskModal(false)} className="px-4 py-2 rounded-xl border border-slate-300 font-semibold">Cancel</button>
                <button type="submit" className="px-4 py-2 rounded-xl text-white font-bold" style={{ backgroundColor: brand.accentBlue }}>Assign Task</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

interface MaterialsModuleProps {
  materials: MaterialRecord[];
  movements: MaterialMovementRecord[];
  projects: ProjectRecord[];
  selectedProjectId: string;
  brand: BrandSettings;
  onRaiseIndent: (materialId: string, qty: number, projectId: string, requestedBy: string) => void;
  onRecordStockMovement: (materialId: string, type: 'Stock In (GRN)' | 'Stock Out (Site Issue)' | 'Inter-Site Transfer', qty: number) => void;
}

export const MaterialsModule: React.FC<MaterialsModuleProps> = ({
  materials, movements, projects, selectedProjectId, brand, onRaiseIndent, onRecordStockMovement,
}) => {
  const [catFilter, setCatFilter] = useState('ALL');
  const [showIndentModal, setShowIndentModal] = useState(false);
  const [showStockModal, setShowStockModal] = useState(false);

  const [indentMatId, setIndentMatId] = useState(materials[0]?.id || 'MAT-01');
  const [indentQty, setIndentQty] = useState(300);
  const [indentProjId, setIndentProjId] = useState('proj-1');
  const [indentBy, setIndentBy] = useState('Rohan Kulkarni (Site Engineer)');

  const [stockMatId, setStockMatId] = useState(materials[0]?.id || 'MAT-01');
  const [stockType, setStockType] = useState<'Stock In (GRN)' | 'Stock Out (Site Issue)' | 'Inter-Site Transfer'>('Stock In (GRN)');
  const [stockQty, setStockQty] = useState(250);

  const visibleMaterials = materials.filter((m) => {
    const matchesProj = selectedProjectId === 'ALL' || m.projectId === selectedProjectId;
    const matchesCat = catFilter === 'ALL' || m.category === catFilter;
    return matchesProj && matchesCat;
  });

  const lowStockItems = visibleMaterials.filter((m) => m.availableStock < m.minStock);

  const handleIndentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onRaiseIndent(indentMatId, Number(indentQty) || 100, indentProjId, indentBy);
    setShowIndentModal(false);
  };

  const handleStockSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onRecordStockMovement(stockMatId, stockType, Number(stockQty) || 50);
    setShowStockModal(false);
  };

  return (
    <div className="space-y-6">
      {lowStockItems.length > 0 && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-rose-900">Low-Stock Reorder Alert ({lowStockItems.length} Site Store Items Below Minimum Level)</h4>
              <p className="text-xs text-rose-800 mt-0.5">{lowStockItems.map((i) => `${i.name} at ${i.projectName} (${i.availableStock} ${i.unit} < Min ${i.minStock} ${i.unit})`).join(' • ')}</p>
            </div>
          </div>
          <button type="button" onClick={() => setShowIndentModal(true)} className="px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shrink-0">
            + Raise Urgent Material Indent
          </button>
        </div>
      )}

      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-1.5">
          {(['ALL', 'Cement', 'Steel', 'Sand', 'Blocks', 'Electrical', 'Plumbing'] as const).map((cat) => (
            <button key={cat} type="button" onClick={() => setCatFilter(cat)} className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${catFilter === cat ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
              {cat === 'ALL' ? 'All Categories' : cat}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button type="button" onClick={() => setShowStockModal(true)} className="px-3.5 py-2 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 text-xs font-bold">Stock In / Out / Transfer</button>
          <button type="button" onClick={() => setShowIndentModal(true)} className="px-4 py-2 rounded-xl text-white text-xs font-bold shadow-xs flex items-center gap-1.5" style={{ backgroundColor: brand.accentBlue }}>
            <Plus className="w-4 h-4" /> Raise Material Request (Indent)
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase">
              <th className="py-3.5 px-4">Material Item &amp; Spec</th>
              <th className="py-3.5 px-4">Category</th>
              <th className="py-3.5 px-4">Site Store</th>
              <th className="py-3.5 px-4">Available Stock</th>
              <th className="py-3.5 px-4">Min Reorder Level</th>
              <th className="py-3.5 px-4">Stock Valuation</th>
              <th className="py-3.5 px-4">Health</th>
              <th className="py-3.5 px-4 text-right">Quick Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {visibleMaterials.map((mat) => {
              const isLow = mat.availableStock < mat.minStock;
              const valLakhs = ((mat.availableStock * mat.unitRateInr) / 100000).toFixed(2);
              return (
                <tr key={mat.id} className="hover:bg-slate-50">
                  <td className="py-3.5 px-4"><div className="font-bold text-slate-900">{mat.name}</div><div className="text-[11px] text-slate-500">{mat.specification}</div></td>
                  <td className="py-3.5 px-4 font-semibold text-slate-700">{mat.category}</td>
                  <td className="py-3.5 px-4 font-semibold text-blue-800">{mat.projectName}</td>
                  <td className="py-3.5 px-4 font-extrabold text-slate-900">{mat.availableStock} {mat.unit}</td>
                  <td className="py-3.5 px-4 text-slate-500">{mat.minStock} {mat.unit}</td>
                  <td className="py-3.5 px-4 font-semibold text-slate-800">₹{valLakhs} L</td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${isLow ? 'bg-rose-50 text-rose-700 border-rose-200' : 'bg-emerald-50 text-emerald-700 border-emerald-200'}`}>
                      {isLow ? 'Low Stock Alert' : 'Adequate'}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button type="button" onClick={() => { setStockMatId(mat.id); setShowStockModal(true); }} className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-blue-50 text-blue-700 font-bold text-[11px]">
                      Update Stock
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-200"><h4 className="text-sm font-bold text-slate-900">Store Ledger: Stock In (GRN), Site Issue (Out), Inter-Site Transfers &amp; Indents</h4></div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase">
                <th className="py-3 px-4">Ref / Date</th>
                <th className="py-3 px-4">Movement Type</th>
                <th className="py-3 px-4">Material</th>
                <th className="py-3 px-4">Quantity</th>
                <th className="py-3 px-4">Project Site</th>
                <th className="py-3 px-4">Logged By</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {movements.map((mv) => (
                <tr key={mv.id} className="hover:bg-slate-50">
                  <td className="py-3 px-4"><div className="font-mono font-bold text-slate-900">{mv.referenceNo}</div><div className="text-[11px] text-slate-500">{mv.date}</div></td>
                  <td className="py-3 px-4 font-bold text-blue-800">{mv.type}</td>
                  <td className="py-3 px-4 font-semibold text-slate-900">{mv.materialName}</td>
                  <td className="py-3 px-4 font-extrabold text-slate-900">{mv.quantity} {mv.unit}</td>
                  <td className="py-3 px-4 text-slate-700">{mv.projectName}</td>
                  <td className="py-3 px-4 text-slate-500">{mv.handledBy}</td>
                  <td className="py-3 px-4"><span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${getStatusBadgeStyle(mv.status)}`}>{mv.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showIndentModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="text-lg font-bold text-slate-900">Raise Site Material Indent (Request)</h3>
              <button type="button" onClick={() => setShowIndentModal(false)} className="p-1 text-slate-400 hover:text-slate-700"><X className="w-4 h-4" /></button>
            </div>
            <form onSubmit={handleIndentSubmit} className="space-y-3.5 mt-4 text-xs">
              <div><label className="block font-bold text-slate-700 mb-1">Select Material SKU</label><select value={indentMatId} onChange={(e) => setIndentMatId(e.target.value)} className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white font-semibold">{materials.map((m) => (<option key={m.id} value={m.id}>{m.name} ({m.projectName} — Avail: {m.availableStock} {m.unit})</option>))}</select></div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="block font-bold text-slate-700 mb-1">Required Quantity *</label><input type="number" min={1} required value={indentQty} onChange={(e) => setIndentQty(Number(e.target.value))} className="w-full px-3 py-2 rounded-xl border border-slate-300" /></div>
                <div><label className="block font-bold text-slate-700 mb-1">Destination Site</label><select value={indentProjId} onChange={(e) => setIndentProjId(e.target.value)} className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white">{projects.map((p) => (<option key={p.id} value={p.id}>{p.name}</option>))}</select></div>
              </div>
              <div><label className="block font-bold text-slate-700 mb-1">Requested By</label><input type="text" value={indentBy} onChange={(e) => setIndentBy(e.target.value)} className="w-full px-3 py-2 rounded-xl border border-slate-300" /></div>
              <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
                <button type="button" onClick={() => setShowIndentModal(false)} className="px-4 py-2 rounded-xl border border-slate-300 font-semibold">Cancel</button>
                <button type="submit" className="px-4 py-2 rounded-xl text-white font-bold" style={{ backgroundColor: brand.accentBlue }}>Submit Indent for Approval</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showStockModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="text-lg font-bold text-slate-900">Record Stock In / Out / Transfer</h3>
              <button type="button" onClick={() => setShowStockModal(false)} className="p-1 text-slate-400 hover:text-slate-700"><X className="w-4 h-4" /></button>
            </div>
            <form onSubmit={handleStockSubmit} className="space-y-3.5 mt-4 text-xs">
              <div><label className="block font-bold text-slate-700 mb-1">Material Item</label><select value={stockMatId} onChange={(e) => setStockMatId(e.target.value)} className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white font-semibold">{materials.map((m) => (<option key={m.id} value={m.id}>{m.name} (Current: {m.availableStock} {m.unit})</option>))}</select></div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="block font-bold text-slate-700 mb-1">Transaction Type</label><select value={stockType} onChange={(e) => setStockType(e.target.value as 'Stock In (GRN)' | 'Stock Out (Site Issue)' | 'Inter-Site Transfer')} className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white"><option value="Stock In (GRN)">Stock In (GRN Receipt)</option><option value="Stock Out (Site Issue)">Stock Out (Issue to Tower)</option><option value="Inter-Site Transfer">Inter-Site Transfer</option></select></div>
                <div><label className="block font-bold text-slate-700 mb-1">Quantity</label><input type="number" min={1} required value={stockQty} onChange={(e) => setStockQty(Number(e.target.value))} className="w-full px-3 py-2 rounded-xl border border-slate-300" /></div>
              </div>
              <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
                <button type="button" onClick={() => setShowStockModal(false)} className="px-4 py-2 rounded-xl border border-slate-300 font-semibold">Cancel</button>
                <button type="submit" className="px-4 py-2 rounded-xl text-white font-bold" style={{ backgroundColor: brand.accentBlue }}>Update Site Store Ledger</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

interface VendorsModuleProps {
  vendors: VendorRecord[];
  pos: PurchaseOrderRecord[];
  projects: ProjectRecord[];
  selectedProjectId: string;
  brand: BrandSettings;
  onAddPO: (po: PurchaseOrderRecord) => void;
  onApprovePO: (poId: string) => void;
  onRecordGRN: (poId: string) => void;
  onAddVendor: (vendor: VendorRecord) => void;
}

export const VendorsModule: React.FC<VendorsModuleProps> = ({
  vendors, pos, projects, selectedProjectId, brand, onAddPO, onApprovePO, onRecordGRN, onAddVendor,
}) => {
  const [subTab, setSubTab] = useState<'pos' | 'vendors' | 'rfq'>('pos');
  const [showPoModal, setShowPoModal] = useState(false);
  const [showVendorModal, setShowVendorModal] = useState(false);

  const [poVendorId, setPoVendorId] = useState(vendors[0]?.id || 'VND-01');
  const [poProjId, setPoProjId] = useState('proj-1');
  const [poItems, setPoItems] = useState('600 Bags OPC 53 Grade Cement @ ₹395/Bag');
  const [poAmount, setPoAmount] = useState(2.37);
  const [poDelivery, setPoDelivery] = useState('2026-11-06');

  const [vName, setVName] = useState('');
  const [vCat, setVCat] = useState<VendorRecord['category']>('Cement & RMC');
  const [vContact, setVContact] = useState('');

  const visiblePOs = selectedProjectId === 'ALL' ? pos : pos.filter((p) => p.projectId === selectedProjectId);

  const handleCreatePO = (e: React.FormEvent) => {
    e.preventDefault();
    const v = vendors.find((vn) => vn.id === poVendorId) || vendors[0];
    const p = projects.find((pr) => pr.id === poProjId) || projects[0];
    const created: PurchaseOrderRecord = {
      id: `PO-0${pos.length + 1}`,
      poNumber: `PO-NX-2026-0${90 + pos.length}`,
      vendorId: v.id,
      vendorName: v.name,
      category: v.category,
      projectId: p.id,
      projectName: p.name,
      itemsSummary: poItems,
      amountLakhs: Number(poAmount) || 2.5,
      issueDate: '2026-11-01',
      deliveryDate: poDelivery,
      approvalStatus: 'Pending Approval',
      grnStatus: 'Pending Delivery',
    };
    onAddPO(created);
    setShowPoModal(false);
  };

  const handleCreateVendor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!vName.trim()) return;
    const created: VendorRecord = {
      id: `VND-0${vendors.length + 1}`,
      name: vName.trim(),
      category: vCat,
      contactPerson: vContact.trim() || 'Procurement Desk',
      phone: '+91 98202 33411',
      email: 'desk@vendor.demo',
      city: 'Thane / Kalyan',
      gstinDemo: '27AAACN8899K1Z3 (DEMO)',
      rating: 4.6,
      activePOs: 0,
      totalBusinessLakhs: 0,
      status: 'Empaneled',
    };
    onAddVendor(created);
    setShowVendorModal(false);
    setVName('');
    setVContact('');
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        <div className="flex flex-wrap gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200">
          <button type="button" onClick={() => setSubTab('pos')} className={`px-3.5 py-2 rounded-lg text-xs font-bold transition ${subTab === 'pos' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600'}`}>
            Purchase Orders (PO) &amp; GRN ({visiblePOs.length})
          </button>
          <button type="button" onClick={() => setSubTab('vendors')} className={`px-3.5 py-2 rounded-lg text-xs font-bold transition ${subTab === 'vendors' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600'}`}>
            Empaneled Vendor Directory ({vendors.length})
          </button>
          <button type="button" onClick={() => setSubTab('rfq')} className={`px-3.5 py-2 rounded-lg text-xs font-bold transition ${subTab === 'rfq' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600'}`}>
            Indent → RFQ Rate Comparison
          </button>
        </div>
        <div className="flex items-center gap-2">
          <button type="button" onClick={() => setShowVendorModal(true)} className="px-3.5 py-2 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-xs font-bold text-slate-800">+ Empanel Vendor</button>
          <button type="button" onClick={() => setShowPoModal(true)} className="px-4 py-2 rounded-xl text-white text-xs font-bold shadow-xs flex items-center gap-1.5" style={{ backgroundColor: brand.accentBlue }}>
            <Plus className="w-4 h-4" /> Create Purchase Order
          </button>
        </div>
      </div>

      {subTab === 'pos' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase">
                <th className="py-3.5 px-4">PO Number</th>
                <th className="py-3.5 px-4">Vendor &amp; Category</th>
                <th className="py-3.5 px-4">Project Site</th>
                <th className="py-3.5 px-4">Order Specification</th>
                <th className="py-3.5 px-4">PO Value</th>
                <th className="py-3.5 px-4">Approval / GRN Status</th>
                <th className="py-3.5 px-4 text-right">Workflow Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {visiblePOs.map((po) => (
                <tr key={po.id} className="hover:bg-slate-50">
                  <td className="py-3.5 px-4"><div className="font-mono font-bold text-blue-700">{po.poNumber}</div><div className="text-[11px] text-slate-500">Delivery: {po.deliveryDate}</div></td>
                  <td className="py-3.5 px-4"><div className="font-bold text-slate-900">{po.vendorName}</div><div className="text-[11px] text-slate-500">{po.category}</div></td>
                  <td className="py-3.5 px-4 font-semibold text-slate-800">{po.projectName}</td>
                  <td className="py-3.5 px-4 text-slate-700 max-w-xs">{po.itemsSummary}</td>
                  <td className="py-3.5 px-4 font-extrabold text-slate-900">₹{po.amountLakhs} L</td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${getStatusBadgeStyle(po.approvalStatus)}`}>{po.approvalStatus}</span>
                    <div className="text-[10px] text-slate-500 mt-1">GRN: {po.grnStatus}</div>
                  </td>
                  <td className="py-3.5 px-4 text-right space-x-1.5">
                    {po.approvalStatus === 'Pending Approval' && (
                      <button type="button" onClick={() => onApprovePO(po.id)} className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px]">Approve PO</button>
                    )}
                    {po.approvalStatus === 'Approved' && (
                      <button type="button" onClick={() => onRecordGRN(po.id)} className="px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-[11px]">Generate GRN</button>
                    )}
                    {po.approvalStatus === 'GRN Completed' && <span className="text-[11px] font-semibold text-emerald-700">GRN Logged ✓</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {subTab === 'vendors' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {vendors.map((v) => (
            <div key={v.id} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase px-2.5 py-0.5 rounded bg-blue-50 text-blue-700">{v.category}</span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${getStatusBadgeStyle(v.status)}`}>{v.status}</span>
                </div>
                <h4 className="text-base font-extrabold text-slate-900 mt-2">{v.name}</h4>
                <p className="text-xs text-slate-500">Contact: {v.contactPerson} • {v.city}</p>
                <div className="mt-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs space-y-1">
                  <div className="flex justify-between"><span className="text-slate-500">Phone:</span><span className="font-semibold text-slate-800">{v.phone}</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">GSTIN (Demo):</span><span className="font-mono text-slate-700">{v.gstinDemo}</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">Cumulative Volume:</span><span className="font-extrabold text-slate-900">₹{v.totalBusinessLakhs} Lakhs</span></div>
                </div>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                <span className="font-bold text-amber-600 flex items-center gap-1"><Star className="w-3.5 h-3.5 fill-amber-400" /> {v.rating} / 5.0 QC Rating</span>
                <button type="button" onClick={() => { setPoVendorId(v.id); setShowPoModal(true); }} className="font-bold text-blue-700 hover:underline">+ Issue PO to Vendor</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {subTab === 'rfq' && (
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
            <div>
              <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-amber-100 text-amber-800">RFQ #RFQ-NX-2026-41 • Linked to Indent IND-NH-109</span>
              <h4 className="text-base font-bold text-slate-900 mt-1">Comparative Vendor Quotation Matrix — 1,000 Bags OPC 53 Grade Cement (Nexora Heights)</h4>
            </div>
            <button type="button" onClick={() => setShowPoModal(true)} className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold">Award L1 Quote &amp; Generate PO</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-xl border-2 border-emerald-500 bg-emerald-50/30 space-y-2">
              <div className="flex items-center justify-between"><span className="px-2 py-0.5 rounded bg-emerald-600 text-white font-bold text-[10px]">L1 LOWEST BID (RECOMMENDED)</span><span className="font-bold text-emerald-700">₹395 / Bag</span></div>
              <div className="text-sm font-extrabold text-slate-900">Shree Infra Cement &amp; RMC Suppliers</div>
              <p className="text-slate-600">Total Landed: ₹3,95,000 • Credit Period: 30 Days • Delivery: 48 Hrs</p>
            </div>
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
              <div className="flex items-center justify-between"><span className="px-2 py-0.5 rounded bg-slate-200 text-slate-700 font-bold text-[10px]">L2 QUOTE</span><span className="font-bold text-slate-800">₹404 / Bag</span></div>
              <div className="text-sm font-extrabold text-slate-900">Metro BuildMart Traders</div>
              <p className="text-slate-600">Total Landed: ₹4,04,000 • Credit Period: 15 Days • Delivery: 72 Hrs</p>
            </div>
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
              <div className="flex items-center justify-between"><span className="px-2 py-0.5 rounded bg-slate-200 text-slate-700 font-bold text-[10px]">L3 QUOTE</span><span className="font-bold text-slate-800">₹410 / Bag</span></div>
              <div className="text-sm font-extrabold text-slate-900">Sahyadri Bulk Cement Corp</div>
              <p className="text-slate-600">Total Landed: ₹4,10,000 • Credit Period: Advance • Delivery: 48 Hrs</p>
            </div>
          </div>
        </div>
      )}

      {showPoModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="text-lg font-bold text-slate-900">Generate New Purchase Order (PO)</h3>
              <button type="button" onClick={() => setShowPoModal(false)} className="p-1 text-slate-400 hover:text-slate-700"><X className="w-4 h-4" /></button>
            </div>
            <form onSubmit={handleCreatePO} className="space-y-3.5 mt-4 text-xs">
              <div><label className="block font-bold text-slate-700 mb-1">Select Empaneled Vendor</label><select value={poVendorId} onChange={(e) => setPoVendorId(e.target.value)} className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white font-semibold">{vendors.map((v) => (<option key={v.id} value={v.id}>{v.name} ({v.category})</option>))}</select></div>
              <div><label className="block font-bold text-slate-700 mb-1">Delivery Project Site</label><select value={poProjId} onChange={(e) => setPoProjId(e.target.value)} className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white">{projects.map((p) => (<option key={p.id} value={p.id}>{p.name}</option>))}</select></div>
              <div><label className="block font-bold text-slate-700 mb-1">Material Specification &amp; Qty *</label><input type="text" required value={poItems} onChange={(e) => setPoItems(e.target.value)} className="w-full px-3 py-2 rounded-xl border border-slate-300" /></div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="block font-bold text-slate-700 mb-1">PO Value (₹ Lakhs)</label><input type="number" step="0.05" value={poAmount} onChange={(e) => setPoAmount(Number(e.target.value))} className="w-full px-3 py-2 rounded-xl border border-slate-300" /></div>
                <div><label className="block font-bold text-slate-700 mb-1">Expected Delivery</label><input type="date" value={poDelivery} onChange={(e) => setPoDelivery(e.target.value)} className="w-full px-3 py-2 rounded-xl border border-slate-300" /></div>
              </div>
              <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
                <button type="button" onClick={() => setShowPoModal(false)} className="px-4 py-2 rounded-xl border border-slate-300 font-semibold">Cancel</button>
                <button type="submit" className="px-4 py-2 rounded-xl text-white font-bold" style={{ backgroundColor: brand.accentBlue }}>Issue Purchase Order</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showVendorModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="text-lg font-bold text-slate-900">Empanel New Material / MEP Supplier</h3>
              <button type="button" onClick={() => setShowVendorModal(false)} className="p-1 text-slate-400 hover:text-slate-700"><X className="w-4 h-4" /></button>
            </div>
            <form onSubmit={handleCreateVendor} className="space-y-3.5 mt-4 text-xs">
              <div><label className="block font-bold text-slate-700 mb-1">Vendor Company Name *</label><input type="text" required placeholder="e.g., Mahalaxmi Ready-Mix Concrete LLP" value={vName} onChange={(e) => setVName(e.target.value)} className="w-full px-3 py-2 rounded-xl border border-slate-300" /></div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="block font-bold text-slate-700 mb-1">Supply Category</label><select value={vCat} onChange={(e) => setVCat(e.target.value as VendorRecord['category'])} className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white"><option value="Cement & RMC">Cement &amp; RMC</option><option value="TMT Steel">TMT Steel</option><option value="AAC Blocks & Sand">AAC Blocks &amp; Sand</option><option value="Electrical & Cables">Electrical &amp; Cables</option><option value="Plumbing & Sanitary">Plumbing &amp; Sanitary</option><option value="Elevators & MEP">Elevators &amp; MEP</option></select></div>
                <div><label className="block font-bold text-slate-700 mb-1">Contact Person</label><input type="text" placeholder="e.g., Rajesh Mehta" value={vContact} onChange={(e) => setVContact(e.target.value)} className="w-full px-3 py-2 rounded-xl border border-slate-300" /></div>
              </div>
              <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
                <button type="button" onClick={() => setShowVendorModal(false)} className="px-4 py-2 rounded-xl border border-slate-300 font-semibold">Cancel</button>
                <button type="submit" className="px-4 py-2 rounded-xl text-white font-bold" style={{ backgroundColor: brand.accentBlue }}>Empanel Vendor</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

interface AccountsModuleProps {
  bills: BillExpenseRecord[];
  projects: ProjectRecord[];
  selectedProjectId: string;
  brand: BrandSettings;
  onUpdateBillStatus: (billId: string, status: BillExpenseRecord['paymentStatus']) => void;
  onAddBill: (bill: BillExpenseRecord) => void;
}

export const AccountsModule: React.FC<AccountsModuleProps> = ({
  bills, projects, selectedProjectId, brand, onUpdateBillStatus, onAddBill,
}) => {
  const [showBillModal, setShowBillModal] = useState(false);
  const [invNo, setInvNo] = useState('INV/2026-27/1209');
  const [vendorName, setVendorName] = useState('Shree Infra Cement & RMC Suppliers');
  const [billCat, setBillCat] = useState<BillExpenseRecord['category']>('Material Supply');
  const [billProjId, setBillProjId] = useState('proj-1');
  const [billAmt, setBillAmt] = useState(8.5);
  const [billDue, setBillDue] = useState('2026-11-15');

  const visibleProjects = selectedProjectId === 'ALL' ? projects : projects.filter((p) => p.id === selectedProjectId);
  const visibleBills = selectedProjectId === 'ALL' ? bills : bills.filter((b) => b.projectId === selectedProjectId);
  const chartData = projects.map((p) => ({ name: p.name, budgetCr: p.budgetCr, actualCr: p.actualSpendCr }));

  const handleCreateBill = (e: React.FormEvent) => {
    e.preventDefault();
    const proj = projects.find((p) => p.id === billProjId) || projects[0];
    const amt = Number(billAmt) || 5.0;
    const tds = Number((amt * 0.02).toFixed(2));
    const created: BillExpenseRecord = {
      id: `BILL-${906 + bills.length}`,
      invoiceNumber: invNo,
      vendorName,
      category: billCat,
      projectId: proj.id,
      projectName: proj.name,
      billDate: '2026-11-01',
      dueDate: billDue,
      amountLakhs: amt,
      tdsLakhs: tds,
      netPayableLakhs: Number((amt - tds).toFixed(2)),
      paymentStatus: 'Pending Approval',
    };
    onAddBill(created);
    setShowBillModal(false);
  };

  return (
    <div className="space-y-6">
      <div className="p-3.5 rounded-2xl bg-slate-900 text-white flex flex-wrap items-center justify-between gap-2 text-xs border border-slate-700">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
          <span><strong>DEMONSTRATION MODULE DISCLAIMER:</strong> This module illustrates developer project cost tracking &amp; vendor bill approval workflows. It is not statutory accounting, GST filing, or audited tax software.</span>
        </div>
        <button type="button" onClick={() => setShowBillModal(true)} className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-1">
          <Plus className="w-3.5 h-3.5" /> Log Vendor Bill / Expense
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {visibleProjects.map((p) => {
          const utilPct = Math.round((p.actualSpendCr / p.budgetCr) * 100);
          return (
            <div key={p.id} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-slate-900">{p.name}</span>
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700">{utilPct}% Budget Utilized</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200"><span className="text-slate-500 block">Sanctioned Budget</span><span className="text-base font-extrabold text-slate-900">₹{p.budgetCr.toFixed(1)} Cr</span></div>
                <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200"><span className="text-emerald-700 block">Actual Spend</span><span className="text-base font-extrabold text-emerald-800">₹{p.actualSpendCr.toFixed(1)} Cr</span></div>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${utilPct}%`, backgroundColor: brand.accentBlue }} />
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
          <h4 className="text-sm font-bold text-slate-900 mb-1">Project Expenditure: Budget vs Actual (₹ Cr)</h4>
          <p className="text-xs text-slate-500 mb-4">Cumulative capital outlay across MMR projects</p>
          <div className="relative h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} unit=" Cr" />
                <Tooltip formatter={(val: number) => [`₹${val} Cr`, 'Amount']} />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
                <Bar dataKey="budgetCr" name="Sanctioned Budget (₹ Cr)" fill="#14263D" radius={[4, 4, 0, 0]} />
                <Bar dataKey="actualCr" name="Actual Spend (₹ Cr)" fill="#2864A6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="xl:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-4 border-b border-slate-200"><h4 className="text-sm font-bold text-slate-900">Vendor Bills &amp; Contractor RA Bills Register</h4><p className="text-xs text-slate-500">Approve pending invoices or mark NEFT disbursements</p></div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase">
                  <th className="py-3 px-4">Invoice No</th>
                  <th className="py-3 px-4">Vendor / Contractor</th>
                  <th className="py-3 px-4">Project</th>
                  <th className="py-3 px-4">Net Payable</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {visibleBills.map((b) => (
                  <tr key={b.id} className="hover:bg-slate-50">
                    <td className="py-3 px-4"><div className="font-mono font-bold text-slate-900">{b.invoiceNumber}</div><div className="text-[11px] text-slate-500">Due: {b.dueDate}</div></td>
                    <td className="py-3 px-4"><div className="font-bold text-slate-900">{b.vendorName}</div><div className="text-[11px] text-slate-500">{b.category}</div></td>
                    <td className="py-3 px-4 font-semibold text-slate-800">{b.projectName}</td>
                    <td className="py-3 px-4"><div className="font-extrabold text-slate-900">₹{b.netPayableLakhs} L</div><div className="text-[10px] text-slate-400">Gross: ₹{b.amountLakhs} L</div></td>
                    <td className="py-3 px-4"><span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${getStatusBadgeStyle(b.paymentStatus)}`}>{b.paymentStatus}</span></td>
                    <td className="py-3.5 px-4 text-right space-x-1">
                      {b.paymentStatus !== 'Paid' ? (
                        <button type="button" onClick={() => onUpdateBillStatus(b.id, b.paymentStatus === 'Pending Approval' ? 'Approved' : 'Paid')} className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px]">
                          {b.paymentStatus === 'Pending Approval' ? 'Approve Bill' : 'Mark Paid'}
                        </button>
                      ) : (
                        <span className="text-[11px] font-semibold text-emerald-700">Paid ✓</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showBillModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="text-lg font-bold text-slate-900">Enter Vendor Bill / Site Expense</h3>
              <button type="button" onClick={() => setShowBillModal(false)} className="p-1 text-slate-400 hover:text-slate-700"><X className="w-4 h-4" /></button>
            </div>
            <form onSubmit={handleCreateBill} className="space-y-3.5 mt-4 text-xs">
              <div><label className="block font-bold text-slate-700 mb-1">Invoice Reference No *</label><input type="text" required value={invNo} onChange={(e) => setInvNo(e.target.value)} className="w-full px-3 py-2 rounded-xl border border-slate-300 font-mono" /></div>
              <div><label className="block font-bold text-slate-700 mb-1">Vendor / Contractor Name *</label><input type="text" required value={vendorName} onChange={(e) => setVendorName(e.target.value)} className="w-full px-3 py-2 rounded-xl border border-slate-300" /></div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="block font-bold text-slate-700 mb-1">Expense Head</label><select value={billCat} onChange={(e) => setBillCat(e.target.value as BillExpenseRecord['category'])} className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white"><option value="Material Supply">Material Supply</option><option value="Civil Contractor">Civil Contractor</option><option value="MEP Subcontract">MEP Subcontract</option><option value="Marketing & CP">Marketing &amp; CP</option><option value="Site Overheads">Site Overheads</option></select></div>
                <div><label className="block font-bold text-slate-700 mb-1">Project</label><select value={billProjId} onChange={(e) => setBillProjId(e.target.value)} className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white">{projects.map((p) => (<option key={p.id} value={p.id}>{p.name}</option>))}</select></div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="block font-bold text-slate-700 mb-1">Gross Amount (₹ Lakhs)</label><input type="number" step="0.1" value={billAmt} onChange={(e) => setBillAmt(Number(e.target.value))} className="w-full px-3 py-2 rounded-xl border border-slate-300" /></div>
                <div><label className="block font-bold text-slate-700 mb-1">Due Date</label><input type="date" value={billDue} onChange={(e) => setBillDue(e.target.value)} className="w-full px-3 py-2 rounded-xl border border-slate-300" /></div>
              </div>
              <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
                <button type="button" onClick={() => setShowBillModal(false)} className="px-4 py-2 rounded-xl border border-slate-300 font-semibold">Cancel</button>
                <button type="submit" className="px-4 py-2 rounded-xl text-white font-bold" style={{ backgroundColor: brand.accentBlue }}>Log Bill for Approval</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
