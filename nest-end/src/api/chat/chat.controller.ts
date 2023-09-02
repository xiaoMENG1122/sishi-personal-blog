import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { Result } from 'src/common/result';
import { ConfigService } from '@nestjs/config';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService,private configService: ConfigService) {}

  @Post()
  create(@Body() createChatDto: CreateChatDto) {
    return this.chatService.create(createChatDto);
  }

  @Get()
  async findAll(@Req() req) {
    
    const realIp = req.headers['x-real-ip'] || req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log(process.env.DATABASE_USERNAME);
    console.log(this.configService.get<string>('DATABASE_USERNAME'))
    return new Result(await this.chatService.findAll())
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.chatService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateChatDto: UpdateChatDto) {
    return this.chatService.update(+id, updateChatDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chatService.remove(+id);
  }
}