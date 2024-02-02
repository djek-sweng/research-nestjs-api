import { DbService } from 'src/db/db.service';

export class DbManager {
  constructor(private db: DbService) {}

  async deleteAll() {
    try {
      await this.db.note.deleteMany();
      await this.db.user.deleteMany();
    } catch (err) {
      console.error(err);
    }
  }
}
