import { ref } from 'vue';

const STORAGE_KEY = 'theme';

function getPreferredTheme() {
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === 'light' || stored === 'dark') return stored;
  const prefersDark = typeof window.matchMedia === 'function'
    && window.matchMedia('(prefers-color-scheme: dark)').matches;
  return prefersDark ? 'dark' : 'light';
}

function applyTheme(value) {
  document.documentElement.setAttribute('data-theme', value);
  window.localStorage.setItem(STORAGE_KEY, value);
}

const theme = ref(getPreferredTheme());
applyTheme(theme.value);

export function useTheme() {
  function toggleTheme() {
    theme.value = theme.value === 'dark' ? 'light' : 'dark';
    applyTheme(theme.value);
  }

  return { theme, toggleTheme };
}
