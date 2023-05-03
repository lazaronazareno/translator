import { test, expect } from 'vitest'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

// Test E2E

test('My app works as expected', async () => {
  const user = userEvent.setup()
  const app = render(<App />)

  const textareaFrom = app.getByPlaceholderText('Introducir texto')

  await user.type(textareaFrom, 'Hola mundo')
  const result = await app.findByDisplayValue(/Hello World/i, {}, { timeout: 3000 })

  expect(result).toBeTruthy()
})
