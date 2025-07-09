import { ref } from 'vue'
// PUBLIC_INTERFACE
/**
 * useNotes composable for managing notes state and local storage.
 * Returns: notes, createNote, updateNote, deleteNote, loadNotesFromStorage, saveNotesToStorage
 */
const NOTES_KEY = 'notes_app_entries'

type Note = {
  id: string,
  title: string,
  content: string,
  category: string,
  updatedAt: string
}

const notes = ref<Note[]>([])

function generateId () {
  return 'n_' + Math.random().toString(36).slice(2, 9)
}

// PUBLIC_INTERFACE
function createNote (obj: Omit<Note, 'id'>) {
  const note: Note = { ...obj, id: generateId() }
  notes.value.unshift(note)
  saveNotesToStorage()
}

// PUBLIC_INTERFACE
function updateNote (obj: Note) {
  const idx = notes.value.findIndex(n => n.id === obj.id)
  if (idx !== -1) {
    notes.value[idx] = { ...obj }
    saveNotesToStorage()
  }
}

// PUBLIC_INTERFACE
function deleteNote (note: Note) {
  notes.value = notes.value.filter(n => n.id !== note.id)
  saveNotesToStorage()
}

// PUBLIC_INTERFACE
function loadNotesFromStorage () {
  if (typeof localStorage !== 'undefined') {
    const arr = localStorage.getItem(NOTES_KEY)
    if (arr) {
      try {
        notes.value = JSON.parse(arr)
      } catch (e) {
        notes.value = []
      }
    }
  }
}

// PUBLIC_INTERFACE
function saveNotesToStorage () {
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(NOTES_KEY, JSON.stringify(notes.value))
  }
}

export function useNotes () {
  return {
    notes,
    createNote,
    updateNote,
    deleteNote,
    loadNotesFromStorage,
    saveNotesToStorage
  }
}
