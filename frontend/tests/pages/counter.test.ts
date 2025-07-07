import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import { render } from '@testing-library/svelte';

import Counter from '../../src/pages/Counter.svelte';

describe('Counter Page', () => {
  it('renders the counter page with count and buttons', () => {
    const result = render(Counter);

    const countText = result.getByText('0');

    expect(countText).toBeInTheDocument();
  });
});

