<template>
  <div class="modal-backdrop" @click.self="close">
    <div class="modal-window" role="dialog" aria-modal="true" aria-label="Note details">
      <header>
        <span class="modal-title">
          <i class="material-symbols-outlined accent-icon">{{ mode === 'edit' ? 'edit_note' : 'note_add' }}</i>
          {{ mode === 'edit' ? 'Edit Note' : 'New Note' }}
        </span>
        <button class="close-btn" aria-label="Close" @click="close">
          <i class="material-symbols-outlined">close</i>
        </button>
      </header>
      <form @submit.prevent="submit">
        <div class="form-group">
          <label for="note-title">Title</label>
          <input v-model="form.title" id="note-title" maxlength="48" required autocomplete="off" autofocus
            placeholder="Note title..." />
        </div>
        <div class="form-group">
          <label for="note-category">Category</label>
          <select v-model="form.category" id="note-category" :disabled="mode === 'edit'">
            <option
              v-for="cat in categories"
              :key="cat.id"
              :value="cat.id"
              v-if="cat.id !== 'all'"
            >{{ cat.name }}</option>
          </select>
        </div>
        <div class="form-group">
          <label for="note-content">Content</label>
          <textarea
            v-model="form.content"
            id="note-content"
            maxlength="1000"
            required
            rows="6"
            placeholder="Write your note..."
          />
        </div>
        <div class="modal-actions">
          <button type="submit" class="save-btn">
            <i class="material-symbols-outlined">save</i>
            {{ mode === 'edit' ? 'Save Changes' : 'Create' }}
          </button>
          <button type="button" class="cancel-btn" @click="close">
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
// PUBLIC_INTERFACE
/**
 * NoteModal - for create/edit note.
 * Props:
 *   - note: note object (or null for new)
 *   - mode: 'create' | 'edit'
 *   - categories: all categories
 * Emits:
 *   - save(note), close()
 */
import { ref, watch, onMounted } from 'vue'
const props = defineProps<{
  note?: any,
  mode: 'create' | 'edit',
  categories: Array<{ id: string, name: string }>
}>()
const emit = defineEmits(['save', 'close'])
const form = ref({
  id: '',
  title: '',
  content: '',
  category: 'work'
})

watch(() => props.note, (note) => {
  if (props.mode === 'edit' && note) {
    form.value = {
      id: note.id,
      title: note.title,
      content: note.content,
      category: note.category
    }
  } else if (props.mode === 'create') {
    form.value = {
      id: '',
      title: '',
      content: '',
      category: props.categories.find(cat => cat.id !== 'all')?.id || 'work'
    }
  }
}, { immediate: true })

function close () {
  emit('close')
}
function submit () {
  if (!form.value.title.trim() || !form.value.content.trim()) return
  emit('save', { ...form.value, updatedAt: (new Date()).toISOString() })
}
onMounted(() => {
  window.addEventListener('keydown', onKey)
})
function onKey (e: KeyboardEvent) {
  if (e.key === 'Escape') close()
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined');

.modal-backdrop {
  position: fixed;
  z-index: 70;
  inset: 0;
  background: #23272e26;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2vw;
}
.modal-window {
  background: #fff;
  color: var(--text-main);
  border-radius: var(--border-radius);
  min-width: 320px;
  max-width: 98vw;
  width: 370px;
  box-shadow: 0 2px 18px #0002;
  padding: 0 1.3rem 1.3rem 1.3rem;
  animation: fadeInUp 0.25s;
  border: 2.5px solid var(--primary);
}
@keyframes fadeInUp {
  0% { opacity: 0; transform: translateY(35px);}
  100% { opacity: 1; transform: none;}
}
header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.2rem 0 0.8rem 0;
}
.modal-title {
  font-size: 1.15rem;
  font-weight: 600;
  color: var(--primary);
  display: flex;
  align-items: center;
  gap: 0.5em;
}
.accent-icon {
  color: var(--accent);
  font-size: 1.4em;
}
.close-btn {
  background: none;
  border: 0;
  color: #888;
  font-size: 2.1em;
  margin-left: 1.5em;
  border-radius: 9px;
  padding: 0.13em 0.1em;
  cursor: pointer;
}
.close-btn:hover, .close-btn:focus {
  background: #eee;
}

form {
  display: flex;
  flex-direction: column;
  gap: 1.08rem;
}
.form-group {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  margin-bottom: 5px;
}
.form-group label {
  font-size: 1.01rem;
  letter-spacing: 0.35px;
  color: #111a;
  font-weight: 510;
  margin-bottom: 0.21rem;
}
input,
textarea,
select {
  font-family: inherit;
  border: 1.4px solid #ddd;
  border-radius: var(--border-radius);
  font-size: 1.08rem;
  padding: 0.53em 1em;
  margin-bottom: 2px;
  outline: none;
  transition: border-color 0.16s;
}
input:focus, textarea:focus, select:focus {
  border-color: var(--primary);
  background: #f8fcff;
}
textarea {
  resize: vertical;
}
.modal-actions {
  display: flex;
  gap: 0.85rem;
  align-items: center;
  justify-content: flex-end;
  padding-top: 12px;
}
.save-btn {
  background: var(--primary);
  color: #fff;
  font-weight: 600;
  border-radius: var(--border-radius);
  border: 0;
  padding: 0.48em 1.08em;
  font-size: 1.05rem;
  display: flex;
  align-items: center;
  gap: 0.3em;
  cursor: pointer;
  transition: filter 0.12s;
}
.save-btn:hover, .save-btn:focus {
  filter: brightness(1.08);
}
.cancel-btn {
  background: none;
  color: var(--secondary);
  border: none;
  border-radius: var(--border-radius);
  padding: 0.48em 1em;
  font-size: 1.05rem;
  cursor: pointer;
  transition: background 0.11s;
}
.cancel-btn:hover, .cancel-btn:focus {
  background: #f9f9f9;
}
@media (max-width: 540px) {
  .modal-window { width: 97vw; min-width: 0; padding: 0 0.3rem 0.8rem 0.3rem;}
  .modal-backdrop {padding: 0;}
}
</style>
