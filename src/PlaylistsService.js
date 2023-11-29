const { Pool } = require('pg');

class PlaylistsService {
  constructor() {
    this._pool = new Pool();
  }

  async getPlaylist(id) {
    const query = {
      text: `
            SELECT id, name 
            FROM playlists
            WHERE id = $1
        `,
      values: [id],
    };

    const result = await this._pool.query(query);
    return result.rows[0];
  }

  async getSongsOnPlaylist(id) {
    const query = {
      text: `
            SELECT s.id, s.title, s.performer
            FROM playlists p
            JOIN playlist_songs ps ON p.id = ps.playlist_id
            JOIN songs s ON s.id = ps.song_id
            WHERE ps.playlist_id = $1

        `,
      values: [id],
    };

    const result = await this._pool.query(query);
    return result.rows;
  }
}

module.exports = PlaylistsService;
