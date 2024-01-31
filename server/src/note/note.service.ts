import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DbService } from './../db/db.service';
import { CreateNoteDto, UpdateNoteDto } from './dto';

@Injectable()
export class NoteService {
  constructor(private db: DbService) {}

  async createNote(userId: number, dto: CreateNoteDto) {
    return await this.db.note.create({ data: { ...dto, userId } });
  }

  async getNote(userId: number, noteId: number) {
    const note = await this.db.note.findUnique({
      where: { id: noteId },
    });

    if (!note) {
      throw new NotFoundException();
    }

    if (note.userId !== userId) {
      throw new ForbiddenException();
    }

    return note;
  }

  getNotes(userId: number) {
    return this.db.note.findMany({ where: { userId: userId } });
  }

  updateNote(userId: number, noteId: number, dto: UpdateNoteDto) {
    return null;
  }

  deleteNote(userId: number, noteId: number) {
    return null;
  }
}
