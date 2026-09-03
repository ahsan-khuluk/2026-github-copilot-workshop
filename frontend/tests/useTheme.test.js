import { describe, it, expect, beforeEach } from 'vitest';

describe('useTheme', () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
    vi.resetModules();
  });

  it('defaults to light theme and applies it to the document', async () => {
    const { useTheme } = await import('../src/composables/useTheme.js');
    const { theme } = useTheme();

    expect(theme.value).toBe('light');
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
  });

  it('toggles between light and dark, updating the DOM and localStorage', async () => {
    const { useTheme } = await import('../src/composables/useTheme.js');
    const { theme, toggleTheme } = useTheme();

    toggleTheme();
    expect(theme.value).toBe('dark');
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    expect(window.localStorage.getItem('theme')).toBe('dark');

    toggleTheme();
    expect(theme.value).toBe('light');
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
    expect(window.localStorage.getItem('theme')).toBe('light');
  });

  it('restores the persisted theme on load', async () => {
    window.localStorage.setItem('theme', 'dark');
    const { useTheme } = await import('../src/composables/useTheme.js');
    const { theme } = useTheme();

    expect(theme.value).toBe('dark');
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });
});
