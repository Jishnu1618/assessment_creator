'use client';

import React, { useState } from 'react';
import { Library, Search, BookOpen, FileText, Video, Link2, Upload, MoreVertical, Plus, X } from 'lucide-react';
import { useStore, LibraryItem } from '@/store/useStore';



const typeIcons: Record<LibraryItem['type'], React.ElementType> = {
  document: FileText,
  video: Video,
  link: Link2,
  assignment: BookOpen,
};

const typeColors: Record<LibraryItem['type'], string> = {
  document: '#FF7950',
  video: '#6C63FF',
  link: '#00C896',
  assignment: '#FF5B8D',
};

const typeLabels: Record<LibraryItem['type'], string> = {
  document: 'Document',
  video: 'Video',
  link: 'Link',
  assignment: 'Assignment',
};

export default function LibraryPage() {
  const { libraryItems: items, fetchLibraryItems, addLibraryItem, deleteLibraryItem } = useStore();
  const [search, setSearch] = useState('');
  const [activeType, setActiveType] = useState<LibraryItem['type'] | 'all'>('all');
  const [showUpload, setShowUpload] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newSubject, setNewSubject] = useState('Science');
  const [newType, setNewType] = useState<LibraryItem['type']>('document');

  const filtered = items.filter(item => {
    const matchSearch = item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.subject.toLowerCase().includes(search.toLowerCase());
    const matchType = activeType === 'all' || item.type === activeType;
    return matchSearch && matchType;
  });

  React.useEffect(() => {
    fetchLibraryItems();
  }, [fetchLibraryItems]);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    await addLibraryItem({
      title: newTitle.trim(),
      type: newType,
      subject: newSubject,
    });
    setNewTitle('');
    setShowUpload(false);
  };

  const handleDelete = async (id: string) => {
    await deleteLibraryItem(id);
  };

  return (
    <>
      {showUpload && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowUpload(false)} />
          <div className="relative bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl rounded-2xl border border-white/60 dark:border-zinc-800/40 shadow-2xl w-full max-w-sm mx-4 p-6 animate-scale-up z-10">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-[16px] font-bold font-display text-primary">Add to Library</h2>
              <button onClick={() => setShowUpload(false)} className="p-1.5 rounded-lg hover:bg-[#F0F0F0] cursor-pointer">
                <X className="w-4 h-4 text-muted" />
              </button>
            </div>
            <form onSubmit={handleAdd} className="space-y-4">
              <div>
                <label className="text-[12px] font-semibold text-muted font-display uppercase tracking-wide">Title *</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  placeholder="Resource title..."
                  className="mt-1.5 w-full px-3.5 py-3 rounded-xl border border-[#E5E5E5] text-[14px] font-display outline-none focus:border-orange-400 transition-all"
                  required
                />
              </div>
              <div>
                <label className="text-[12px] font-semibold text-muted font-display uppercase tracking-wide">Type</label>
                <select
                  value={newType}
                  onChange={e => setNewType(e.target.value as LibraryItem['type'])}
                  className="mt-1.5 w-full px-3.5 py-3 rounded-xl border border-[#E5E5E5] text-[14px] font-display bg-white outline-none focus:border-orange-400 cursor-pointer"
                >
                  <option value="document">Document</option>
                  <option value="video">Video</option>
                  <option value="link">Link</option>
                  <option value="assignment">Assignment</option>
                </select>
              </div>
              <div>
                <label className="text-[12px] font-semibold text-muted font-display uppercase tracking-wide">Subject</label>
                <select
                  value={newSubject}
                  onChange={e => setNewSubject(e.target.value)}
                  className="mt-1.5 w-full px-3.5 py-3 rounded-xl border border-[#E5E5E5] text-[14px] font-display bg-white outline-none focus:border-orange-400 cursor-pointer"
                >
                  {['Science', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'English'].map(s => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </div>
              <button
                type="submit"
                className="w-full py-3 rounded-xl text-white font-semibold font-display text-[14px] cursor-pointer"
                style={{ background: 'linear-gradient(180deg, #FF7950 0%, #C0350A 100%)' }}
              >
                Add to Library
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto animate-fade-in">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-[24px] font-extrabold font-display text-primary">My Library</h1>
            <p className="text-[14px] text-muted font-display mt-1">{items.length} resources saved • Your teaching materials collection.</p>
          </div>
          <button
            onClick={() => setShowUpload(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-white font-semibold font-display text-[14px] cursor-pointer transition-all active:scale-95"
            style={{ background: 'linear-gradient(180deg, #FF7950 0%, #C0350A 100%)' }}
          >
            <Plus className="w-4 h-4" />
            Add Resource
          </button>
        </div>

        {/* Filters + Search */}
        <div className="flex items-center gap-3 mb-5 flex-wrap">
          <div className="bg-white/40 dark:bg-zinc-900/40 border border-white/60 dark:border-zinc-800/40 rounded-full h-10 px-4 flex items-center gap-2 shadow-xs backdrop-blur-md">
            <Search className="w-3.5 h-3.5 text-[#A9A9A9] shrink-0" />
            <input
              type="text"
              placeholder="Search library..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="bg-transparent text-[14px] font-display text-primary placeholder-[#A9A9A9] outline-none w-40"
            />
          </div>
          {(['all', 'document', 'video', 'link', 'assignment'] as const).map(type => (
            <button
              key={type}
              onClick={() => setActiveType(type)}
              className={`px-3 py-1.5 rounded-full text-[13px] font-semibold font-display transition-all cursor-pointer ${
                activeType === type
                  ? 'bg-primary text-white'
                  : 'bg-white/40 dark:bg-zinc-900/40 border border-white/60 dark:border-zinc-800/40 text-muted dark:text-[#A0A0A0] hover:border-white/80 dark:hover:border-zinc-700/50 hover:bg-white/60 dark:hover:bg-zinc-900/50 backdrop-blur-md'
              }`}
            >
              {type === 'all' ? 'All' : typeLabels[type] + 's'}
            </button>
          ))}
        </div>

        {/* List */}
        <div className="space-y-2">
          {filtered.map(item => {
            const Icon = typeIcons[item.type];
            const color = typeColors[item.type];
            return (
              <div
                key={item.id}
                className="bg-white/40 dark:bg-zinc-900/40 border border-white/60 dark:border-zinc-800/40 px-4 py-3.5 flex items-center gap-4 hover:bg-white/60 dark:hover:bg-zinc-800/50 hover:border-white/80 dark:hover:border-zinc-700/50 hover:shadow-md transition-all group"
              >
                <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: color + '18' }}>
                  <Icon className="w-4 h-4" style={{ color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[14px] font-semibold font-display text-primary truncate">{item.title}</p>
                  <p className="text-[12px] text-muted font-display mt-0.5">
                    {item.subject} · {item.createdAt ? new Date(item.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : ''}{item.size ? ` · ${item.size}` : ''}
                  </p>
                </div>
                <span className="text-[12px] font-semibold px-2 py-0.5 rounded-lg font-display shrink-0" style={{ background: color + '18', color }}>
                  {typeLabels[item.type]}
                </span>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-1.5 rounded-lg text-[#A9A9A9] hover:text-danger hover:bg-red-50 transition-colors cursor-pointer opacity-0 group-hover:opacity-100"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-muted">
            <Library className="w-10 h-10 mx-auto mb-3 text-[#D0D0D0]" />
            <p className="text-[15px] font-semibold font-display">No items found</p>
            <p className="text-[13px] mt-1">Try a different search or add a new resource.</p>
          </div>
        )}
      </div>
    </>
  );
}
