<template>
  <div v-if="notes.length === 0" class="empty-state">
    <span class="empty-text">No notes found. Create a new one!</span>
  </div>
  <section class="note-list" v-else>
    <article
      class="note-card"
      v-for="note in notes"
      :key="note.id"
      @click="onEdit(note)"
      tabindex="0"
      aria-label="Edit note"
    >
      <div class="note-title">
        {{ note.title }}
      </div>
      <div class="note-meta">
        <span class="note-category" :style="{ background: categoryColor(note.category) }">
          {{ categoryLabel(note.category) }}
        </span>
        <span class="note-date">{{ formatDate(note.updatedAt) }}</span>
      </div>
      <div class="note-content">
        {{ truncate(note.content) }}
      </div>
      <button
        class="delete-btn"
        aria-label="Delete note"
        @click.stop="onDelete(note)"
        title="Delete"
      >
        <i class="material-symbols-outlined">delete</i>
      </button>
    </article>
  </section>
</template>

<script setup lang="ts">
// PUBLIC_INTERFACE
/**
 * NoteList - shows list of notes (as cards) with edit/delete
 * Props: notes
 * Emits: edit(note), delete(note)
 */
import { computed } from 'vue'
const props = defineProps<{
  notes: Array<{
    id: string,
    title: string,
    content: string,
    category: string,
    updatedAt: string // ISO
  }>
}>()

const emit = defineEmits(['edit', 'delete'])

function formatDate(dt: string) {
  const d = new Date(dt)
  return d.toLocaleString(undefined, {
    year: 'numeric', month: 'short', day: 'numeric',
    hour: '2-digit', minute: '2-digit'
  })
}
function onEdit(note) {
  emit('edit', note)
}
function onDelete(note) {
  if (confirm('Delete this note?')) emit('delete', note)
}
function categoryLabel(catId: string) {
  switch (catId) {
    case 'work': return 'Work'
    case 'personal': return 'Personal'
    case 'ideas': return 'Ideas'
    case 'all': return 'All'
    default: return catId.charAt(0).toUpperCase() + catId.slice(1)
  }
}
function categoryColor(catId: string) {
  switch (catId) {
    case 'work': return '#1976D2';
    case 'personal': return '#424242';
    case 'ideas': return '#FFC107';
    default: return '#777';
  }
}
function truncate(text: string, len = 148) {
  if (!text) return ''
  return text.length > len ? text.slice(0, len) + '…' : text
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined');

.note-list {
  display: grid;
  gap: 1.1rem;
  grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
}
.note-card {
  border: 1.3px solid #ececec;
  border-radius: var(--border-radius);
  background: #fcfcfc;
  padding: 1rem 0.7rem 1.45rem 1rem;
  cursor: pointer;
  min-height: 125px;
  min-width: 0;
  box-shadow: 0 2px 10px #056be213;
  position: relative;
  transition: box-shadow 0.14s;
  outline: none;
}
.note-card:focus,
.note-card:hover {
  box-shadow: 0 4px 18px #056be234;
  border-color: var(--primary);
}
.note-title {
  font-size: 1.15rem;
  font-weight: bold;
  color: var(--primary);
  margin-bottom: 6px;
  word-break: break-word;
}
.note-content {
  color: #31313F;
  font-size: 1.07rem;
  margin: 0.5rem 0 0 0;
  white-space: pre-line;
  min-height: 2.8em;
  word-break: break-word;
}
.note-meta {
  font-size: 0.97rem;
  color: #888;
  display: flex;
  align-items: center;
  gap: 1.2em;
}
.note-category {
  background: var(--accent);
  color: #121212;
  border-radius: 9px;
  font-size: 0.93em;
  padding: 0.1em 0.7em;
  margin: 0 0.6em 0 0;
  font-weight: 500;
}
.note-date {
  font-size: 0.95em;
  color: #8e8e8e;
  margin-right: 0.3em;
}
.delete-btn {
  background: none;
  border: 0;
  color: #C0392B;
  position: absolute;
  top: 8px;
  right: 8px;
  font-size: 1.19rem;
  cursor: pointer;
  border-radius: 5px;
  padding: 0.2em 0.25em;
  transition: background 0.1s;
}
.delete-btn:hover,
.delete-btn:focus {
  background: #ffe6e2;
}
.empty-state {
  text-align: center;
  margin-top: 2.5em;
  color: #aaa;
}
.empty-text {
  font-size: 1.09rem;
}
@media (max-width: 650px) {
  .note-list {
    grid-template-columns: 1fr;
  }
}
</style>
