import { LocalAuthGuard } from './guards/auth.guard';

describe('AuthGuard', () => {
  it('should be defined', () => {
    expect(new LocalAuthGuard()).toBeDefined();
  });
});
