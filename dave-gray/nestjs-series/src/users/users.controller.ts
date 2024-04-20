import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

/**
 * [GET] /users OR /users?role=value
 * [GET] /users/:id
 * [POST] /users/
 * [PATCH] /users/:id
 * [DELETE] /users/:id
 */
@Controller('users')
export class UsersController {
  @Get() // GET /users or/ users?role=value
  findAll(@Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    return [role];
  }

  @Get(':id') // GET /users/:id
  findOne(@Param('id') id: string) {
    return { id };
  }

  @Post()
  create(@Body() user: {}) {
    return user;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() userUpdate: {}) {
    return { id, ...userUpdate };
  }

  @Delete(':id')
  removePost(@Param('id') id: string) {
    return { id };
  }
}
