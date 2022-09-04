import { rest } from 'msw'
import { Room } from '../../src/pages/rooms/models'
import { rooms as roomsData } from '../data'

let rooms = roomsData()

export const handlers = [
  rest.get('http://localhost:5175/api/Rooms', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(rooms))
  }),
  rest.post('http://localhost:5175/api/Rooms', async (req, res, ctx) => {
    const room = await req.json<Room>()
    rooms.push(room)
    ctx.status(201);
    return res(ctx.set('Location', `http://localhost:5175/api/Room/${room.name}`));
  }),
]