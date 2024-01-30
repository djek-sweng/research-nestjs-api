import { Injectable } from '@nestjs/common';
import { DbService } from './../db/db.service';
import { CreateNoteDto, UpdateNoteDto } from './dto';

@Injectable()
export class NoteService {
  constructor(private db: DbService) {}

  createNote(userId: number, dto: CreateNoteDto) {
    return null;
  }

  getNote(userId: number, noteId: number) {
    return null;
  }

  getNotes(userId: number) {
    return null;
  }

  updateNote(userId: number, noteId: number, dto: UpdateNoteDto) {
    return null;
  }

  deleteNote(userId: number, noteId: number) {
    return null;
  }
}
