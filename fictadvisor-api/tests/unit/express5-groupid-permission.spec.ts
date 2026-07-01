import { PermissionGuard } from '../../src/common/guards/permission/v2/permission.guard';
import { NoPermissionException } from '../../src/common/exceptions/no-permission.exception';

// Regression test for the Express 5 blanket-403 poll bug: the group guards used
// to write req.query.groupId, but Express 5's req.query is a getter returning a
// fresh object each access, so the value never reached the PermissionGuard.
// The guards now write req.params.groupId (a stable object).
describe('PermissionGuard $groupId resolution (Express 5)', () => {
  const guard = new PermissionGuard({} as any, {} as any) as any;
  const PERM = 'groups.$groupId.questions.get';

  const resolve = (req: any) => {
    guard.request = req;
    return guard.getPermission(PERM);
  };

  it('pre-fix: groupId only on req.query is lost → throws NoPermissionException', () => {
    // Simulates Express 5 dropping the guard's req.query mutation.
    const req = { query: {}, params: { disciplineTeacherId: 'dt-1' }, body: undefined };
    expect(() => resolve(req)).toThrow(NoPermissionException);
  });

  it('post-fix: groupId written to req.params resolves the real permission string', () => {
    const req = { query: {}, params: { disciplineTeacherId: 'dt-1', groupId: 'GID-42' }, body: undefined };
    expect(resolve(req)).toBe('groups.GID-42.questions.get');
  });
});
