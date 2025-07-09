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
  background: #23272e21;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2vw;
}

.modal-window {
  background: #fff;
  color: var(--text-main);
  border-radius: var(--border-radius);
  min-width: 314px;
  max-width: 99vw;
  width: 374px;
  box-shadow: 0 2.5px 22px #1976d215, 0 1.5px 2.5px #42424212;
  padding: 0 1.4rem 1.15rem 1.4rem;
  animation: fadeInUp 0.23s;
  border: 2.1px solid var(--primary);
}

@keyframes fadeInUp {
  0% { opacity: 0; transform: translateY(35px);}
  100% { opacity: 1; transform: none;}
}

header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.3rem 0 0.77rem 0;
}

.modal-title {
  font-size: 1.18rem;
  font-weight: 600;
  color: var(--primary);
  display: flex;
  align-items: center;
  gap: 0.4em;
  letter-spacing: 0.01em;
  font-family: inherit;
}

.accent-icon {
  color: var(--accent);
  font-size: 1.39em;
}

.close-btn {
  background: none;
  border: none;
  color: #888;
  font-size: 2.08em;
  margin-left: 1.1em;
  border-radius: 10px;
  padding: 0.10em 0.1em;
  cursor: pointer;
  transition: background 0.13s;
}
.close-btn:hover, .close-btn:focus {
  background: #f4f4f7;
}

form {
  display: flex;
  flex-direction: column;
  gap: 0.99rem;
}
.form-group {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  margin-bottom: 5px;
}
.form-group label {
  font-size: 1.010rem;
  letter-spacing: 0.2px;
  color: #23272Edd;
  font-weight: 495;
  margin-bottom: 0.20rem;
}
input,
textarea,
select {
  font-family: inherit;
  border: 1.35px solid #e0e3ea;
  border-radius: var(--border-radius);
  font-size: 1.08rem;
  padding: 0.51em 1.01em;
  margin-bottom: 2px;
  outline: none;
  transition: border-color 0.15s, background 0.14s;
  background: #f8fbfd;
}
input:focus, textarea:focus, select:focus {
  border-color: var(--primary);
  background: #f2faff;
}
textarea {
  resize: vertical;
}
.modal-actions {
  display: flex;
  gap: 0.74rem;
  align-items: center;
  justify-content: flex-end;
  padding-top: 9px;
}
.save-btn {
  background: var(--primary);
  color: #fff;
  font-weight: 590;
  border-radius: var(--border-radius);
  border: 0;
  padding: 0.47em 1.01em;
  font-size: 1.05rem;
  display: flex;
  align-items: center;
  gap: 0.25em;
  cursor: pointer;
  transition: background 0.14s, filter 0.10s;
}
.save-btn:hover, .save-btn:focus {
  background: #1a85e7;
  filter: brightness(1.09);
}
.cancel-btn {
  background: none;
  color: var(--secondary);
  border: none;
  border-radius: var(--border-radius);
  padding: 0.45em 0.96em;
  font-size: 1.05rem;
  cursor: pointer;
  transition: background 0.11s;
}
.cancel-btn:hover, .cancel-btn:focus {
  background: #fafbfc;
}
@media (max-width: 540px) {
  .modal-window { width: 97vw; min-width: 0; padding: 0 0.4rem 0.89rem 0.4rem;}
  .modal-backdrop {padding: 0;}
}
</style>
