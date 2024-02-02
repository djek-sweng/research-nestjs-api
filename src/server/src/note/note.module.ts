import { Module } from '@nestjs/common';
import { AuthModule } from './../auth/auth.module';
import { NoteService } from './note.service';
import { NoteController } from './note.controller';

@Module({
  imports: [AuthModule],
  controllers: [NoteController],
  providers: [NoteService],
})
export class NoteModule {}
