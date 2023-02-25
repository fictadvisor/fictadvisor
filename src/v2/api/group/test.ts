function addPermissions (groupId: string) {
	let permissionList = {
	  CAPTAIN : {
		'groups.$groupId.*' : true
	  },
	  MODERATOR : {
		'groups.$groupId.admin.switch' : false,
		'groups.$groupId.*' : true
	  },
	  STUDENT : {
		'groups.$groupId.admin.switch' : false,
		'groups.$groupId.students.get' : true,
		'groups.$groupId.students.*' : false,
		'groups.$groupId.*' : true
	  }
	};
	
	for (let [role, permission] of Object.entries(permissionList)){
	  let roleId = "helloworld"
		let grants = Object.entries(permission)
		.map(([perm, set]) => ({
			permission: perm.replace("$groupId", groupId), 
			set: set
		}))
	  console.log(createGrants(roleId, grants));
	}
}

function createGrants (roleId: string, grants: CreateGrantDTO[]) {
  const newgrants = grants.map((g) => ({ roleId, ...g }));
  return newgrants
}

class CreateGrantDTO {
	permission: string;
	set?: boolean;
}

addPermissions("12345");
