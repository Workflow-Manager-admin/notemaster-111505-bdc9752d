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
  min-width: 195px;
  max-width: 220px;
  background: #fff;
  border-right: 2px solid #efefef;
  box-shadow: 1px 0 8px #0001;
  padding: 2.2rem 0.6rem 1rem 0.8rem;
  border-top-right-radius: var(--border-radius);
  border-bottom-right-radius: var(--border-radius);
  display: flex;
  flex-direction: column;
}
.cat-title {
  font-size: 1.08rem;
  color: var(--secondary);
  font-weight: 600;
  margin-bottom: 1.15rem;
  letter-spacing: 1px;
}
.category-list {
  list-style: none;
  margin: 0;
  padding: 0;
}
.category-list li {
  padding: 0.65rem 1rem;
  border-radius: var(--border-radius);
  margin-bottom: 0.15rem;
  cursor: pointer;
  color: #323246;
  font-size: 1.06rem;
  font-family: inherit;
  transition: background 0.13s, color 0.13s;
  outline: none;
}
.category-list li.selected,
.category-list li:hover,
.category-list li:focus {
  background: var(--primary);
  color: #fff;
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
    gap: 14px;
    align-items: center;
    flex-direction: row;
    width: 100%;
  }
  .cat-title {
    margin-right: 1rem;
    margin-bottom: 0;
    min-width: 72px;
  }
  .category-list li {
    margin-bottom: 0;
    padding: 0.55rem 1.1rem;
    font-size: 1rem;
  }
}
</style>
