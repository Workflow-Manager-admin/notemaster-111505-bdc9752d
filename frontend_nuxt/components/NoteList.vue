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
  gap: 1.12rem;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
}
.note-card {
  border: 1.45px solid #e4e4ea;
  border-radius: var(--border-radius);
  background: #fcfdfe;
  padding: 1.07rem 0.8rem 1.28rem 1.05rem;
  cursor: pointer;
  min-height: 120px;
  min-width: 0;
  box-shadow: 0 3px 14px #056be210;
  position: relative;
  transition: box-shadow 0.14s, border-color 0.13s;
  outline: none;
  display: flex;
  flex-direction: column;
}
.note-card:focus,
.note-card:hover {
  box-shadow: 0 5px 19px #1976d222;
  border-color: var(--primary);
  z-index: 1;
}
.note-title {
  font-size: 1.16rem;
  font-weight: bold;
  color: var(--primary);
  margin-bottom: 4px;
  word-break: break-word;
  letter-spacing: 0.2px;
  font-family: inherit;
}

.note-meta {
  font-size: 0.97rem;
  color: #64719b;
  display: flex;
  align-items: center;
  gap: 1em;
  margin-bottom: 2px;
}
.note-category {
  background: var(--accent);
  color: #242450;
  border-radius: 7px;
  font-size: 0.93em;
  padding: 0.09em 0.65em;
  margin: 0 0.5em 0 0;
  font-weight: 550;
  letter-spacing: 0.4px;
  opacity: 0.94;
}
.note-date {
  font-size: 0.95em;
  color: #888ca3;
  margin-right: 0.23em;
  opacity: 0.95;
}
.note-content {
  color: #31313f;
  font-size: 1.08rem;
  margin: 0.45rem 0 0 0;
  white-space: pre-line;
  min-height: 2.5em;
  word-break: break-word;
  flex: 1 1 auto;
  letter-spacing: 0.01em;
}
.delete-btn {
  background: #fff0;
  border: 0;
  color: #D0392B;
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 1.19rem;
  cursor: pointer;
  border-radius: 8px;
  padding: 0.19em 0.22em;
  transition: background 0.13s, color 0.13s;
}
.delete-btn:hover,
.delete-btn:focus {
  background: #ffc10733;
  color: #84212d;
}
.empty-state {
  text-align: center;
  margin-top: 2.6em;
  color: #9ca3af;
  opacity: 0.85;
}
.empty-text {
  font-size: 1.11rem;
  font-weight: 460;
  letter-spacing: 0.06em;
}
@media (max-width: 650px) {
  .note-list {
    grid-template-columns: 1fr;
  }
  .note-card {
    min-width: unset;
    padding: 0.98rem 0.3rem 1.18rem 0.6rem;
  }
}
</style>
