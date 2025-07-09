<template>
  <div class="app-root">
    <TopNav :on-create="openCreateModal" />
    <div class="main-content">
      <Sidebar
        :categories="categories"
        :selected-category="selectedCategory"
        @select-category="selectCategory"
      />
      <section class="notes-section">
        <div class="notes-toolbar">
          <input
            class="search-input"
            type="search"
            v-model="searchQuery"
            placeholder="Search notes..."
            aria-label="Search notes"
          />
        </div>
        <NoteList
          :notes="filteredNotes"
          @edit="openEditModal"
          @delete="deleteNote"
        />
      </section>
    </div>
    <NoteModal
      v-if="modalOpen"
      :note="modalNote"
      :mode="modalMode"
      :categories="categories"
      @close="closeModal"
      @save="saveNote"
    />
  </div>
</template>

<script setup lang="ts">
// PUBLIC_INTERFACE
/**
 * Main App Layout for Notes App.
 * - Layout: TopNav, Sidebar (categories), main notes list, search, modals.
 * - Handles state for all features.
 */
import { ref, computed, watch, onMounted } from 'vue'
import TopNav from './components/TopNav.vue'
import Sidebar from './components/Sidebar.vue'
import NoteList from './components/NoteList.vue'
import NoteModal from './components/NoteModal.vue'
import { useNotes } from './composables/useNotes'

const defaultCategories = [
  { id: 'all', name: 'All' },
  { id: 'work', name: 'Work' },
  { id: 'personal', name: 'Personal' },
  { id: 'ideas', name: 'Ideas' }
]
const categories = ref([...defaultCategories])

const {
  notes,
  createNote,
  updateNote,
  deleteNote,
  loadNotesFromStorage,
  saveNotesToStorage
} = useNotes()

const searchQuery = ref('')
const selectedCategory = ref('all')
const modalOpen = ref(false)
const modalMode = ref<'create' | 'edit'>('create')
const modalNote = ref(null)

// Modal helpers
function openCreateModal () {
  modalMode.value = 'create'
  modalNote.value = null
  modalOpen.value = true
}
function openEditModal (note) {
  modalMode.value = 'edit'
  modalNote.value = { ...note }
  modalOpen.value = true
}
function closeModal () {
  modalOpen.value = false
  modalNote.value = null
}
// Save note from modal
function saveNote (note) {
  if (modalMode.value === 'create') {
    createNote(note)
  } else if (modalMode.value === 'edit') {
    updateNote(note)
  }
  modalOpen.value = false
}

function selectCategory (catId: string) {
  selectedCategory.value = catId
}

const filteredNotes = computed(() => {
  let arr = notes.value
  if (selectedCategory.value !== 'all') {
    arr = arr.filter(
      n => n.category === selectedCategory.value
    )
  }
  if (searchQuery.value) {
    arr = arr.filter(
      n => n.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
           n.content.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }
  // Optionally, can sort by update time (not implemented for brevity)
  return arr
})

onMounted(() => {
  loadNotesFromStorage()
})

watch(notes, saveNotesToStorage, { deep: true })
</script>

<style scoped>
:root {
  --accent: #FFC107;
  --primary: #1976D2;
  --secondary: #424242;
  --background: #f7f9fa;
  --text-main: #23272E;
  --border-radius: 12px;
  --nav-height: 62px;
}

.app-root {
  background: var(--background);
  min-height: 100vh;
  color: var(--text-main);
  display: flex;
  flex-direction: column;
  font-family: 'Inter', 'Segoe UI', Arial, sans-serif;
  letter-spacing: 0.01em;
}

.main-content {
  display: flex;
  flex: 1 1 auto;
  margin: 0;
  padding: 0;
  min-height: calc(100vh - var(--nav-height));
  background: var(--background);
  transition: background 0.2s;
}

/* Sidebar handled in own component */

.notes-section {
  flex: 1 1 0;
  padding: 2.2rem 2vw 1.2rem 1vw;
  display: flex;
  flex-direction: column;
  background: #fff;
  min-height: 0;
  border-top-left-radius: var(--border-radius);
  border-bottom-left-radius: var(--border-radius);
  box-shadow: 0 0 16px 0 #0002;
  margin-left: 0.6rem;
}

.notes-toolbar {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 1.2rem;
}
.search-input {
  border: 1.5px solid #e2e7ef;
  border-radius: var(--border-radius);
  padding: 0.57rem 1.25rem;
  font-size: 1rem;
  width: 100%;
  max-width: 330px;
  background: #f8fbff;
  color: var(--secondary);
  box-shadow: 0 1.5px 6px 0 #1976d205;
  transition: border-color 0.17s, box-shadow 0.13s;
}
.search-input:focus {
  border-color: var(--primary);
  outline: none;
  background: #f2faff;
  box-shadow: 0 2px 8px 0 #1976d215;
}

@media (max-width: 900px) {
  .main-content {
    flex-direction: column;
    min-height: unset;
  }
  .notes-section {
    border-radius: 0;
    padding: 1.2rem 0.7rem;
    margin-left: 0;
    box-shadow: 0 1px 11px #0002;
  }
}

@media (max-width: 650px) {
  .main-content {
    flex-direction: column;
  }
  .sidebar {
    min-width: 100vw !important;
    max-width: 100vw !important;
    border-radius: 0 !important;
    box-shadow: none !important;
  }
  .notes-section {
    border-radius: 0;
    padding: 0.44rem 0.1rem 0.7rem 0.1rem;
    box-shadow: none;
  }
}
</style>
