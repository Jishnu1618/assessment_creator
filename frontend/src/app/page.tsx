'use client';

import React, { useEffect } from 'react';
import { useStore } from '@/store/useStore';
import EmptyState from '@/components/EmptyState';
import FilledState from '@/components/FilledState';

export default function Home() {
  const { assignments, fetchAssignments } = useStore();

  useEffect(() => {
    fetchAssignments();
  }, [fetchAssignments]);

  return (
    <div className="w-full h-full min-h-[500px]">
      {assignments.length === 0 ? (
        <EmptyState />
      ) : (
        <FilledState />
      )}
    </div>
  );
}
