'use client';

import React, { useState } from 'react';
import { Users, Plus, Search, MoreVertical, BookOpen, X } from 'lucide-react';
import { useStore } from '@/store/useStore';

interface Group {
  id: string;
  name: string;
  subject: string;
  students: number;
  color: string;
}

const mockGroups: Group[] = [
  { id: '1', name: 'Class 8A - Science', subject: 'Science', students: 38, color: '#FF7950' },
  { id: '2', name: 'Class 9B - Mathematics', subject: 'Mathematics', students: 34, color: '#6C63FF' },
  { id: '3', name: 'Class 10A - Physics', subject: 'Physics', students: 32, color: '#00C896' },
  { id: '4', name: 'Class 7C - English', subject: 'English', students: 40, color: '#FF5B8D' },
];

function CreateGroupModal({ onClose, onCreate }: { onClose: () => void; onCreate: (g: Group) => void }) {
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('Science');
  const [students, setStudents] = useState(30);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onCreate({
      id: Date.now().toString(),
      name: name.trim(),
      subject,
      students,
      color: ['#FF7950', '#6C63FF', '#00C896', '#FF5B8D'][Math.floor(Math.random() * 4)],
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl rounded-2xl border border-white/60 dark:border-zinc-800/40 shadow-2xl w-full max-w-sm mx-4 p-6 animate-scale-up z-10">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-[16px] font-bold font-display text-primary">Create Group</h2>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-[#F0F0F0] cursor-pointer">
            <X className="w-4 h-4 text-muted" />
          </button>
        </div>
        <form onSubmit={handleCreate} className="space-y-4">
          <div>
            <label className="text-[12px] font-semibold text-muted font-display uppercase tracking-wide">Group Name *</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Class 8A - Science"
              className="mt-1.5 w-full px-3.5 py-3 rounded-xl border border-[#E5E5E5] text-[14px] font-display text-primary outline-none focus:border-orange-400 transition-all"
              required
            />
          </div>
          <div>
            <label className="text-[12px] font-semibold text-muted font-display uppercase tracking-wide">Subject</label>
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="mt-1.5 w-full px-3.5 py-3 rounded-xl border border-[#E5E5E5] text-[14px] font-display text-primary bg-white outline-none focus:border-orange-400 transition-all cursor-pointer"
            >
              {['Science', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'History', 'Geography'].map(s => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-[12px] font-semibold text-muted font-display uppercase tracking-wide">Number of Students</label>
            <input
              type="number"
              value={students}
              onChange={(e) => setStudents(Number(e.target.value))}
              min={1}
              max={100}
              className="mt-1.5 w-full px-3.5 py-3 rounded-xl border border-[#E5E5E5] text-[14px] font-display text-primary outline-none focus:border-orange-400 transition-all"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 rounded-xl text-white font-semibold font-display text-[14px] cursor-pointer"
            style={{ background: 'linear-gradient(180deg, #FF7950 0%, #C0350A 100%)' }}
          >
            Create Group
          </button>
        </form>
      </div>
    </div>
  );
}

export default function GroupsPage() {
  const { groups, fetchGroups, addGroup, groupsLoading } = useStore();
  const [search, setSearch] = useState('');
  const [showCreate, setShowCreate] = useState(false);

  React.useEffect(() => {
    fetchGroups();
  }, [fetchGroups]);

  const filtered = groups.filter(g =>
    g.name.toLowerCase().includes(search.toLowerCase()) ||
    g.subject.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      {showCreate && (
        <CreateGroupModal
          onClose={() => setShowCreate(false)}
          onCreate={async (g) => {
            await addGroup(g);
          }}
        />
      )}

      <div className="max-w-4xl mx-auto animate-fade-in">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-[24px] font-extrabold font-display text-primary">My Groups</h1>
            <p className="text-[14px] text-muted font-display mt-1">Manage your class groups and student rosters.</p>
          </div>
          <button
            onClick={() => setShowCreate(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-white font-semibold font-display text-[14px] cursor-pointer transition-all active:scale-95"
            style={{ background: 'linear-gradient(180deg, #FF7950 0%, #C0350A 100%)' }}
          >
            <Plus className="w-4 h-4" />
            New Group
          </button>
        </div>

        {/* Search */}
        <div className="bg-white/40 dark:bg-zinc-900/40 border border-white/60 dark:border-zinc-800/40 rounded-full h-11 px-4 flex items-center gap-2 shadow-xs mb-5 max-w-sm backdrop-blur-md">
          <Search className="w-4 h-4 text-[#A9A9A9] shrink-0" />
          <input
            type="text"
            placeholder="Search groups..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent text-[14px] font-display text-primary placeholder-[#A9A9A9] outline-none"
          />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((group) => (
            <div
              key={group.id}
              className="bg-white/40 dark:bg-zinc-900/40 border border-white/60 dark:border-zinc-800/40 rounded-2xl p-5 hover:bg-white/60 dark:hover:bg-zinc-800/50 hover:border-white/80 dark:hover:border-zinc-700/50 transition-all cursor-pointer group shadow-md shadow-slate-200/20 dark:shadow-none hover:-translate-y-0.5"
            >
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: group.color + '20' }}
                  >
                    <Users className="w-5 h-5" style={{ color: group.color }} />
                  </div>
                  <div>
                    <h3 className="text-[15px] font-bold font-display text-primary leading-tight">{group.name}</h3>
                    <p className="text-[12px] text-muted font-display">{group.subject}</p>
                  </div>
                </div>
                <button className="p-1.5 rounded-lg text-[#A9A9A9] hover:text-primary hover:bg-[#F5F5F5] transition-colors cursor-pointer">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
              <div className="flex items-center gap-2 text-[13px] font-display text-muted">
                <Users className="w-3.5 h-3.5" />
                <span>{group.students} students</span>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-muted">
            <Users className="w-10 h-10 mx-auto mb-3 text-[#D0D0D0]" />
            <p className="text-[15px] font-semibold font-display">No groups found</p>
            <p className="text-[13px] mt-1">Try a different search or create a new group.</p>
          </div>
        )}
      </div>
    </>
  );
}
