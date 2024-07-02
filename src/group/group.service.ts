import { Injectable } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { Group } from './entities/group.entity';
import { GroupRepository } from './group.repository';

@Injectable()
export class GroupService {
  constructor(private readonly groupRepository:GroupRepository) {}

  async create(createGroupDto: CreateGroupDto) {
    const group = new Group();

    group.group_name = createGroupDto.group_name;
    group.is_flash = createGroupDto.is_flash;
    group.created_by = createGroupDto.created_by;
    group.groupUsers = createGroupDto.groupUsers;

    return await this.groupRepository.save(group);
  }

  findAll() {
    return this.groupRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} group`;
  }

  update(id: number, updateGroupDto: UpdateGroupDto) {
    return `This action updates a #${id} group`;
  }

  remove(id: number) {
    return `This action removes a #${id} group`;
  }
}
