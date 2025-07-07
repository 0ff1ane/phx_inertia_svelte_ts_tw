import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import { render } from '@testing-library/svelte';

import Login from '../../src/pages/Login.svelte';

describe('Login Page', () => {
  it('renders the Login page with card title', () => {
    const result = render(Login);

    const headerText = result.getByText('Sign in to your account');

    expect(headerText).toBeInTheDocument();
  });
});

