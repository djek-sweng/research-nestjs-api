import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { NotebookModule } from './notebook/notebook.module';

@Module({
  imports: [AuthModule, UserModule, NotebookModule],
})
export class AppModule {}
