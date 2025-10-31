import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock window.matchMedia for jsdom environment
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => {
    const matches = false; // Default to false for tests
    return {
      matches,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    };
  }),
});

// Mock window.scrollTo for jsdom environment
Object.defineProperty(window, 'scrollTo', {
  writable: true,
  value: vi.fn(),
});
