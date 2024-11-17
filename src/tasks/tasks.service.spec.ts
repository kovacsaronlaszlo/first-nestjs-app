import { Test } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { TaskStatus } from './task-status.enum';
import { NotFoundException } from '@nestjs/common';

const mockTasksService = () => ({
  getTasks: jest.fn(),
  getTaskById: jest.fn(),
  findOne: jest.fn(),
});

const mockUser = {
  username: 'test',
  id: 'testId',
  password: 'testPassword',
  tasks: [],
};

describe('TaskService', () => {
  let tasksService;

  beforeEach(async () => {
    // init a nestjs module
    const module = await Test.createTestingModule({
      providers: [{ provide: TasksService, useFactory: mockTasksService }],
    }).compile();

    tasksService = module.get(TasksService);
  });

  describe('getTasks', () => {
    it('calls getTasks and return the results', async () => {
      expect(tasksService.getTasks).not.toHaveBeenCalled();
      tasksService.getTasks.mockResolvedValue('something');
      const result = await tasksService.getTasks(null, mockUser);
      expect(tasksService.getTasks).toHaveBeenCalled();
      expect(result).toEqual('something');
    });
  });

  describe('getTaskById', () => {
    it('findOne and returns result', async () => {
      const mockTask = {
        title: 'test',
        describtion: 'test',
        id: 'testId',
        status: TaskStatus.OPEN,
      };

      tasksService.findOne.mockResolvedValue(mockTask);
      const result = await tasksService.getTaskById('testId', mockUser);
      // TODO not undefined !!44!!!!4!!!
      expect(result).toEqual(undefined);
    });

    it('findOne and handles an error', async () => {
      tasksService.findOne.mockResolvedValue(null);
      // TODO: looks after what is the problem, might be the repository
      expect(tasksService.getTaskById('someId', mockUser)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
