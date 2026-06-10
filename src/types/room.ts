export type Room = {
  id: string;
  code: string;
  is_started: boolean;
  started_at: string | null;
  ended_at: string | null;
  awards_start_at: string | null;
  game_duration: number;
  enabled_categories: string[];
};
