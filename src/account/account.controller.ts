import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { AccountService } from './account.service';
import { ApiOkResponse } from '@nestjs/swagger';
import { AccountDto, PatchAccountDto } from './dto/account.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { SessionInfo } from 'src/auth/session-info.decorator';
import { GetSessionInfoDto } from 'src/auth/dto/auth.dto';

@Controller('account')
@UseGuards(AuthGuard)
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get()
  @ApiOkResponse({ type: AccountDto })
  getAccount(@SessionInfo() session: GetSessionInfoDto) {
    return this.accountService.getAccount(session.id);
  }

  @Patch()
  @ApiOkResponse({ type: AccountDto })
  patchAccount(
    @SessionInfo() session: GetSessionInfoDto,
    @Body() dto: PatchAccountDto,
  ) {
    return this.accountService.patchAccount(session.id, dto);
  }
}
