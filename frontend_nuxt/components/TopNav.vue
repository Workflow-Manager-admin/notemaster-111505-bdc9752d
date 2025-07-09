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
  padding: 1.1rem 2.8vw 1.1rem 1.5vw;
  background: var(--primary);
  color: #fff;
  font-size: 1.17rem;
  min-height: 3.7rem;
  border-bottom: 3px solid var(--accent);
  z-index: 40;
}

.nav-title {
  display: flex;
  align-items: center;
  font-weight: 590;
  gap: 0.12em;
  font-family: 'Inter', 'Segoe UI', Arial, sans-serif;
}
.material-symbols-outlined {
  font-size: 2.13rem;
  margin-right: 0.6rem;
  font-variation-settings: 'FILL' 1;
}
.accent-icon {
  color: var(--accent) !important;
}
.title-text {
  letter-spacing: 0.3px;
  font-size: 1.18rem;
  font-weight: bold;
  font-family: inherit;
  text-shadow: 0 1px 5px #1976d222;
  padding-top: 2px;
}
.create-btn {
  background: var(--accent);
  color: #23272E;
  border: none;
  outline: none;
  font-weight: 570;
  border-radius: var(--border-radius);
  padding: 0.51rem 1.18rem;
  display: flex;
  align-items: center;
  gap: 7px;
  font-size: 1.07rem;
  cursor: pointer;
  box-shadow: 0 2px 11px #ffc10724;
  transition: filter 0.13s, box-shadow 0.15s, background 0.15s;
}
.create-btn:hover,
.create-btn:focus {
  filter: brightness(1.08);
  background: #ffd95a;
  box-shadow: 0 2px 17px #ffc10734;
}
@media (max-width: 600px) {
  .hide-sm { display: none; }
  .top-nav { padding: 0.85rem 1vw 0.85rem 1vw; font-size: 1.05rem;}
}
</style>
