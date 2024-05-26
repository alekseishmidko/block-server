import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInBodyDto, SignUpBodyDto } from './dto/auth.dto';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { Response } from 'express';
import { CookieService } from './cookie.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private cookieService: CookieService,
  ) {}
  @Post('sign-up')
  @ApiCreatedResponse()
  async signUp(
    @Body() dto: SignUpBodyDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken } = await this.authService.signUp(
      dto.email,
      dto.password,
    );
    this.cookieService.setToken(res, accessToken);
  }

  @Post('sign-in')
  @ApiOkResponse()
  @HttpCode(HttpStatus.OK)
  signIn(@Body() dto: SignInBodyDto) {
    return null;
  }

  @Post('sign-out')
  @ApiOkResponse()
  signOut() {}

  @Get('session')
  @ApiOkResponse()
  getSessionInfo() {
    // return this.authService.getSessionInfo();
  }
}
