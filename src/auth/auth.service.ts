import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  private async createUser(data: AuthCredentialsDto): Promise<void> {
    const { username, password } = data;

    const user = this.usersRepository.create({ username, password });
    await this.usersRepository.save(user);
  }

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.createUser(authCredentialsDto);
  }
}
