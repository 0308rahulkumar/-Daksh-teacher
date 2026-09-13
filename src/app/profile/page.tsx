"use client";

import { useState, useMemo } from "react";
import { useStateBundle } from "@/hooks/useAppState";
import { Button, Card, CardHeader, EmptyState, MasteryBadge, ProgressBar, SectionTitle } from "@/components/ui";
import { SUBJECTS, getSubject, getChapter, getTopic } from "@/lib/syllabus";
import type { StudentProfile, MasteryLevel } from "@/lib/types";

export default function ProfilePage() {
  const { state, saveProfile, refresh } = useStateBundle();

  if (!state) {
    return (
      <div className="flex items-center justify-center min-h-[50vh] text-muted">
        <span className="h-6 w-6 animate-spin rounded-full border-2 border-accent border-t-transparent mr-2" />
        Loading…
      </div>
    );
  }

  const { profile, progress, studySessions, quizHistory, mistakes } = state;
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({
    name: profile.name,
    board: profile.board,
    medium: profile.medium,
    dailyMinutes: profile.dailyMinutes,
    examDate: profile.examDate ?? "",
  });
  const [saved, setSaved] = useState(false);

  const subjects = SUBJECTS.filter((s) => profile.subjects.includes(s.id));

  function handleChange(key: string, value: string | number) {
    setForm((f) => ({ ...f, [key]: value }));
    setSaved(false);
  }

  async function handleSave() {
    await saveProfile(form as Partial<StudentProfile>);
    setEditMode(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    refresh();
  }

  /* Overall stats */
  let totalTopics = 0, mastered = 0;
  for (const s of subjects) {
    for (const ch of s.chapters) {
      totalTopics += ch.topics.length;
      for (const t of ch.topics) {
        if (progress[s.id]?.[ch.id]?.[t.id]?.mastery === "MASTERED") mastered++;
      }
    }
  }
  const overallPct = totalTopics ? Math.round((mastered / totalTopics) * 100) : 0;
  const avgScore = quizHistory.length
    ? Math.round((quizHistory.reduce((sum, q) => sum + q.correct / q.total, 0) / quizHistory.length) * 100)
    : 0;

  /* Streak */
  const dates = new Set(studySessions.map((s) => s.date).sort());
  let streak = 0;
  const today = new Date().toISOString().slice(0, 10);
  const yesterday = new Date(Date.now() - 86_400_000).toISOString().slice(0, 10);
  let cursor = dates.has(today) ? today : dates.has(yesterday) ? yesterday : null;
  while (cursor && dates.has(cursor)) {
    streak++;
    const d = new Date(`${cursor}T00:00:00Z`);
    d.setUTCDate(d.getUTCDate() - 1);
    cursor = d.toISOString().slice(0, 10);
  }

  return (
    <div className="space-y-8 max-w-3xl">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-ink">My profile</h1>
          <p className="text-sm text-muted">Personal details, study goal and exam date</p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={refresh}>Refresh</Button>
        </div>
      </div>

      {/* Stats header */}
      <div className="grid gap-4 sm:grid-cols-4">
        <Card accent="#16A34A">
          <CardHeader title="Overall mastery" />
          <p className="text-3xl font-bold text-success">{overallPct}%</p>
          <p className="text-xs text-muted">{mastered}/{totalTopics} topics mastered</p>
        </Card>
        <Card accent="#4338CA">
          <CardHeader title="Quiz average" />
          <p className="text-3xl font-bold text-accent">{avgScore}%</p>
          <p className="text-xs text-muted">{quizHistory.length} quizzes taken</p>
        </Card>
        <Card accent="#D97706">
          <CardHeader title="Mistakes logged" />
          <p className="text-3xl font-bold text-warning">{mistakes.length}</p>
          <p className="text-xs text-muted">awaiting review</p>
        </Card>
        <Card accent="#BE185D">
          <CardHeader title="Study streak" />
          <p className="text-3xl font-bold text-rose-600">{streak}</p>
          <p className="text-xs text-muted">consecutive days</p>
        </Card>
      </div>

      {/* Profile form */}
      <SectionTitle title={editMode ? "Edit profile" : "Your details"} />
      <Card accent="#4338CA">
        {!editMode ? (
          <dl className="grid gap-3 sm:grid-cols-2">
            <div>
              <dt className="text-xs text-muted">Name</dt>
              <dd className="font-medium text-ink">{form.name || "—"}</dd>
            </div>
            <div>
              <dt className="text-xs text-muted">Board</dt>
              <dd className="font-medium text-ink">{form.board}</dd>
            </div>
            <div>
              <dt className="text-xs text-muted">Medium</dt>
              <dd className="font-medium text-ink">{form.medium}</dd>
            </div>
            <div>
              <dt className="text-xs text-muted">Daily goal</dt>
              <dd className="font-medium text-ink">{form.dailyMinutes} min</dd>
            </div>
            <div>
              <dt className="text-xs text-muted">Exam date</dt>
              <dd className="font-medium text-ink">{form.examDate || "Not set"}</dd>
            </div>
            <div>
              <dt className="text-xs text-muted">Subjects</dt>
              <dd className="font-medium text-ink">
                {subjects.map((s) => s.icon + " " + s.name).join(" · ")}
              </dd>
            </div>
          </dl>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="block text-xs text-muted mb-1">Name</label>
              <input
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className="w-full rounded-lg border border-border bg-paper px-3 py-2 text-sm text-ink focus:border-accent"
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs text-muted mb-1">Board</label>
                <select
                  value={form.board}
                  onChange={(e) => handleChange("board", e.target.value)}
                  className="w-full rounded-lg border border-border bg-paper px-3 py-2 text-sm text-ink focus:border-accent"
                >
                  <option value="CBSE">CBSE</option>
                  <option value="ICSE">ICSE</option>
                  <option value="State Board">State Board</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-muted mb-1">Medium</label>
                <select
                  value={form.medium}
                  onChange={(e) => handleChange("medium", e.target.value)}
                  className="w-full rounded-lg border border-border bg-paper px-3 py-2 text-sm text-ink focus:border-accent"
                >
                  <option value="English">English</option>
                  <option value="Hindi">Hindi</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <label className="block text-xs text-muted mb-1">Daily goal (min)</label>
                <input
                  type="number"
                  min="10"
                  max="300"
                  value={form.dailyMinutes}
                  onChange={(e) => handleChange("dailyMinutes", Number(e.target.value))}
                  className="w-full rounded-lg border border-border bg-paper px-3 py-2 text-sm text-ink focus:border-accent"
                />
              </div>
              <div>
                <label className="block text-xs text-muted mb-1">Exam date</label>
                <input
                  type="date"
                  value={form.examDate}
                  onChange={(e) => handleChange("examDate", e.target.value)}
                  className="w-full rounded-lg border border-border bg-paper px-3 py-2 text-sm text-ink focus:border-accent"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleSave} disabled={saved}>{saved ? "Saved ✓" : "Save changes"}</Button>
              <Button variant="secondary" onClick={() => { setForm({...form}); setEditMode(false); }}>Cancel</Button>
            </div>
          </div>
        )}
        <div className="mt-4 flex gap-2">
          {!editMode && <Button onClick={() => setEditMode(true)}>Edit profile</Button>}
          {editMode && !saved && <Button variant="ghost" onClick={() => { setForm({...form}); setEditMode(false); }}>Cancel</Button>}
        </div>
      </Card>

      {/* Subject progress detail */}
      <SectionTitle title="Subject progress" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {subjects.map((s) => {
          let total = 0, mastered = 0, practicing = 0, needsReview = 0;
          for (const ch of s.chapters) {
            total += ch.topics.length;
            for (const t of ch.topics) {
              const m = progress[s.id]?.[ch.id]?.[t.id]?.mastery;
              if (m === "MASTERED") mastered++;
              else if (m === "PRACTICING" || m === "LEARNING") practicing++;
              else if (m === "REVIEW_NEEDED") needsReview++;
            }
          }
          const pct = total ? Math.round((mastered / total) * 100) : 0;
          return (
            <Card key={s.id} accent={s.accent}>
              <CardHeader title={s.name} action={<span className="text-xs text-muted">{pct}%</span>} />
              <ProgressBar value={mastered} max={total} color={s.accent} height={8} />
              <div className="mt-2 flex flex-wrap gap-1.5 text-xs">
                <MasteryBadge level="MASTERED" count={mastered} />
                <MasteryBadge level="PRACTICING" count={practicing} />
                <MasteryBadge level="REVIEW_NEEDED" count={needsReview} />
                <MasteryBadge level="NOT_STARTED" count={total - mastered - practicing - needsReview} />
              </div>
            </Card>
          );
        })}
      </div>

      {/* Recent activity */}
      <SectionTitle title="Recent quiz history" />
      {quizHistory.length === 0 ? (
        <EmptyState title="No quizzes yet">Take a quiz from any topic hub to see your history here.</EmptyState>
      ) : (
        <ul className="space-y-2" role="list">
          {quizHistory.slice(-10).reverse().map((q, i) => {
            const subject = getSubject(q.subjectId);
            const chapter = getChapter(q.subjectId, q.chapterId);
            const topic = q.topicId ? getTopic(q.subjectId, q.chapterId, q.topicId)?.topic : null;
            const acc = Math.round((q.correct / q.total) * 100);
            return (
              <li key={i} className="flex items-center justify-between gap-4 rounded-lg border border-border bg-surface px-4 py-3">
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-ink truncate">
                    {subject?.name} → {chapter?.name}{topic ? ` → ${topic.name}` : ""}
                  </p>
                  <p className="text-xs text-muted">{new Date(q.date).toLocaleString()}</p>
                </div>
                <div className="shrink-0 text-right">
                  <p className={`font-semibold ${acc >= 70 ? "text-success" : acc >= 40 ? "text-warning" : "text-danger"}`}>
                    {acc}% ({q.correct}/{q.total})
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}