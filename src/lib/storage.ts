const PLAYER_ID_KEY = 'sushi-league-player-id'

export function savePlayerId(
    playerId: string
) {
    localStorage.setItem(
        PLAYER_ID_KEY,
        playerId
    )
}

export function getPlayerId() {
    return localStorage.getItem(
        PLAYER_ID_KEY
    )
}

export function removePlayerId() {
    localStorage.removeItem(
        PLAYER_ID_KEY
    )
}