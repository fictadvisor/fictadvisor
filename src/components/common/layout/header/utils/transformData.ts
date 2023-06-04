const roleMapper = {
  ['CAPTAIN']: 'Староста',
  ['MODERATOR']: 'Зам. старости',
  ['STUDENT']: 'Студент',
};

const transformData = (user?) => {
  const name = [user?.lastName, user?.firstName, user?.middleName].join(' ');
  const groupName = user?.group.state === 'APPROVED' ? user?.group.code : null;
  const position = roleMapper[user?.group.role];
  const avatar = user?.avatar;

  return { name, groupName, position, avatar };
};

export default transformData;
