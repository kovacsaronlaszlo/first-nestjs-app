import { Test } from '@nestjs/testing';
import { TasksService } from './tasks.service';

const mockTasksService = () => ({
  getTasks: jest.fn(),
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
});
