import { Injectable } from '@nestjs/common';
import { DbService } from './../db/db.service';
import { CreateNoteDto, UpdateNoteDto } from './dto';

@Injectable()
export class NoteService {
  constructor(private db: DbService) {}

  createNote(userId: number, dto: CreateNoteDto) {}

  getNote(userId: number, noteId: number) {}

  getNotes(userId: number) {}

  updateNote(userId: number, noteId: number, dto: UpdateNoteDto) {}

  deleteNote(userId: number, noteId: number) {}
}
