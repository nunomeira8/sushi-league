export type Room = {
  id: string
  code: string
  is_started: boolean,
  game_duration: number
  enabled_categories: string[]
}