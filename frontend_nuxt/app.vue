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
  --border-radius: 8px;
}

.app-root {
  background: var(--background);
  min-height: 100vh;
  color: var(--text-main);
  display: flex;
  flex-direction: column;
}

.main-content {
  display: flex;
  flex: 1 1 auto;
  margin: 0;
  padding: 0;
}

.notes-section {
  flex: 1 1 0;
  padding: 2rem 1rem 1rem 0.5rem;
  display: flex;
  flex-direction: column;
  background: #fff;
  min-height: 0;
  border-top-left-radius: var(--border-radius);
  border-bottom-left-radius: var(--border-radius);
  box-shadow: 0 0 10px 0 #0001;
}

.notes-toolbar {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 1rem;
}
.search-input {
  border: 1px solid #e0e0e0;
  border-radius: var(--border-radius);
  padding: 0.5rem 1rem;
  font-size: 1rem;
  width: 100%;
  max-width: 320px;
  transition: border-color 0.2s;
}
.search-input:focus {
  border-color: var(--primary);
  outline: none;
}

@media (max-width: 900px) {
  .main-content {
    flex-direction: column;
  }
  .notes-section {
    padding: 1rem 0.5rem;
    border-radius: 0;
  }
}

@media (max-width: 650px) {
  .sidebar {
    min-width: 100vw !important;
    max-width: 100vw !important;
    border-radius: 0 !important;
    box-shadow: none !important;
  }
}
</style>
