import { setupServer } from 'msw/node'
import { handlers } from './handlers/roomHandler'

export const server = setupServer(...handlers)