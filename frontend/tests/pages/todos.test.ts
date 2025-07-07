import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import { render } from '@testing-library/svelte';

import Todos from '../../src/pages/Todos.svelte';

describe('Todos Page', () => {
  it('renders the counter page with count and buttons', () => {
    const result = render(Todos);

    const countText = result.getByText('Complete svelte tutorial');

    expect(countText).toBeInTheDocument();
  });
});

