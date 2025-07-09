<template>
  <aside class="sidebar" aria-label="Categories">
    <div class="cat-title">Categories</div>
    <ul class="category-list">
      <li
        v-for="cat in categories"
        :key="cat.id"
        :class="{ selected: cat.id === selectedCategory }"
        @click="$emit('select-category', cat.id)"
        tabindex="0"
        role="button"
        :aria-pressed="cat.id === selectedCategory"
      >
        {{ cat.name }}
      </li>
    </ul>
  </aside>
</template>

<script setup lang="ts">
// PUBLIC_INTERFACE
/**
 * Sidebar - shows categories, lets you filter notes.
 * Props: categories, selectedCategory
 * Emits: select-category(catId)
 */
defineProps<{
  categories: Array<{ id: string, name: string }>,
  selectedCategory: string
}>()
</script>

<style scoped>
.sidebar {
  min-width: 185px;
  max-width: 215px;
  background: #fff;
  border-right: 2.3px solid #eff1f5;
  box-shadow: 1px 0 8px #1976d210;
  padding: 2.2rem 0.6rem 1.2rem 1.15rem;
  border-top-right-radius: var(--border-radius);
  border-bottom-right-radius: var(--border-radius);
  display: flex;
  flex-direction: column;
}
.cat-title {
  font-size: 1.12rem;
  color: var(--secondary);
  font-weight: 610;
  margin-bottom: 1.07rem;
  letter-spacing: 0.54px;
  text-transform: uppercase;
  opacity: 0.85;
}
.category-list {
  list-style: none;
  margin: 0;
  padding: 0;
}
.category-list li {
  padding: 0.53rem 1rem 0.53rem 1.15rem;
  border-radius: 7px;
  margin-bottom: 0.10rem;
  cursor: pointer;
  color: #323246;
  font-size: 1.04rem;
  font-family: inherit;
  transition: background 0.12s, color 0.12s, box-shadow 0.13s;
  outline: none;
  border: none;
}
.category-list li.selected,
.category-list li:hover,
.category-list li:focus {
  background: var(--primary);
  color: #fff;
  box-shadow: 0 3px 6px #1976d218;
}

@media (max-width: 900px) {
  .sidebar {
    min-width: 100vw;
    max-width: 100vw;
    flex-direction: row;
    border-right: none;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    border-bottom: 2px solid #efefef;
    box-shadow: none;
    padding: 1rem 0.8rem;
    overflow-x: auto;
  }
  .category-list {
    display: flex;
    gap: 13px;
    align-items: center;
    flex-direction: row;
    width: 100%;
  }
  .cat-title {
    margin-right: 1rem;
    margin-bottom: 0;
    min-width: 67px;
    font-size: 1rem;
    letter-spacing: 0.5px;
  }
  .category-list li {
    margin-bottom: 0;
    padding: 0.52rem 1.1rem;
    font-size: 0.98rem;
  }
}
</style>
