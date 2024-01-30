import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ReqUser } from './../auth/decorator';
import { JwtAuthGuard } from './../auth/guard';
import { NoteService } from './note.service';

@UseGuards(JwtAuthGuard)
@Controller('notes')
export class NoteController {
  constructor(private noteService: NoteService) {}

  @Post()
  createNote(@ReqUser('id') userId: number) {}

  @Get(':noteId')
  getNote(@ReqUser('id') userId: number, @Param('noteId') noteId: number) {}

  @Get(':noteId')
  getNotes(@ReqUser('id') userId: number, @Param('noteId') noteId: number) {}

  @Put(':noteId')
  updateNote(@ReqUser('id') userId: number, @Param('noteId') noteId: number) {}

  @Delete(':noteId')
  deleteNote(@ReqUser('id') userId: number, @Param('noteId') noteId: number) {}
}
