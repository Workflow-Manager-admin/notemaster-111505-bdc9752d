<template>
  <header class="top-nav">
    <div class="nav-title">
      <i class="material-symbols-outlined accent-icon">sticky_note_2</i>
      <span class="title-text">NoteMaster</span>
    </div>
    <button class="create-btn" aria-label="New note" @click="$emit('on-create')">
      <i class="material-symbols-outlined">add</i>
      <span class="hide-sm">New Note</span>
    </button>
  </header>
</template>

<script setup lang="ts">
// PUBLIC_INTERFACE
/**
 * TopNav - displays app title and new note button.
 * Emits: 'on-create'
 */
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined');

.top-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2.5vw 1rem 1.5vw;
  background: var(--primary);
  color: #fff;
  font-size: 1.2rem;
  min-height: 3.5rem;
  border-bottom: 3px solid var(--accent);
}
.nav-title {
  display: flex;
  align-items: center;
  font-weight: 500;
}
.material-symbols-outlined {
  font-size: 2rem;
  margin-right: 0.6rem;
  font-variation-settings: 'FILL' 1;
}
.accent-icon {
  color: var(--accent);
}
.title-text {
  letter-spacing: 0.5px;
  font-size: 1.2rem;
  font-weight: bold;
  font-family: 'Segoe UI', 'Inter', Arial, sans-serif;
}

.create-btn {
  background: var(--accent);
  color: #292929;
  border: none;
  outline: none;
  font-weight: 600;
  border-radius: var(--border-radius);
  padding: 0.45rem 1.1rem;
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 1.09rem;
  cursor: pointer;
  transition: filter 0.12s;
  box-shadow: 0 2px 10px #ffc10725;
}
.create-btn:hover, .create-btn:focus {
  filter: brightness(1.08);
}
@media (max-width: 600px) {
  .hide-sm { display: none; }
  .top-nav { padding: 0.8rem 1vw 0.8rem 1vw; }
}
</style>
