import { Injectable } from '@nestjs/common';
import { DbService } from './../db/db.service';

@Injectable()
export class NoteService {
  constructor(private db: DbService) {}

  createNote() {}

  getNote() {}

  getNotes() {}

  updateNote() {}

  deleteNote() {}
}
