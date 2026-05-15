export type Player = {
  id: string
  room_id: string
  name: string
  is_admin: boolean,
  is_ready: boolean,
  finished: boolean,
  finished_at: number | null
}