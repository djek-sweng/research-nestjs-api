import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { NotebookModule } from './notebook/notebook.module';
import { DbModule } from './db/db.module';

@Module({
  imports: [AuthModule, UserModule, NotebookModule, DbModule],
})
export class AppModule {}
