import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ReqUser } from './../auth/decorator';
import { JwtAuthGuard } from './../auth/guard';
import { NoteService } from './note.service';
import { CreateNoteDto, UpdateNoteDto } from './dto';

@UseGuards(JwtAuthGuard)
@Controller('notes')
export class NoteController {
  constructor(private noteService: NoteService) {}

  @Post()
  createNote(@ReqUser('id') userId: number, @Body() dto: CreateNoteDto) {
    return this.noteService.createNote(userId, dto);
  }

  @Get(':noteId')
  getNote(
    @ReqUser('id') userId: number,
    @Param('noteId', ParseIntPipe) noteId: number,
  ) {
    return this.noteService.getNote(userId, noteId);
  }

  @Get()
  getNotes(@ReqUser('id') userId: number) {
    return this.noteService.getNotes(userId);
  }

  @Put(':noteId')
  updateNote(
    @ReqUser('id') userId: number,
    @Param('noteId', ParseIntPipe) noteId: number,
    @Body() dto: UpdateNoteDto,
  ) {
    return this.noteService.updateNote(userId, noteId, dto);
  }

  @Delete(':noteId')
  deleteNote(
    @ReqUser('id') userId: number,
    @Param('noteId', ParseIntPipe) noteId: number,
  ) {
    return this.noteService.deleteNote(userId, noteId);
  }
}
