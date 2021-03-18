// aiteBet Helpers

// Check if valid URL - for jobs and rentals
export function validURL(str) {
  var pattern = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$',
    'i',
  ); // fragment locator
  return !!pattern.test(str);
}

// Add Commas e.g $1,000
export function commaHelper(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// Slugify e.g. some-string-yeah
export function slugify(str) {
  return str
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9']+/g, '-')
    .replace(/^-|-$/g, '');
}

// Turn slug 'some-slug-thing' into 'Some-Slug-Thing'
export function slugifyCap(str) {
  let arr = str.split('-');
  arr.forEach(function(item, index) {
    arr[index] = item.replace(item[0], item[0].toUpperCase());
  });

  return arr.join('-');
}

// Unslug 'some-slug-thing' into 'Some Slug Thing'
export function unSlugify(str) {
  let arr = str.split('-');
  arr.forEach(function(item, index) {
    arr[index] = item.replace(item[0], item[0].toUpperCase());
  });

  return arr.join(' ');
}

// Random Color String
export function randomColor() {
  return (
    '#' +
    Math.random()
      .toString(16)
      .slice(2, 8)
      .toUpperCase()
  );
}

// Trim a long string
export function truncateString(str, num) {
  if (str.length <= num) {
    return str;
  }
  return str.slice(0, num) + '...';
}

// TODO: This and the one below should be combined at some point. This is used for Team Members Admin
export function userRoleCheckMap(user) {
  if (user?._organization_admin) {
    return 'ORGANIZATION_ADMIN';
  }
  if (user?._organization_team_member) {
    return 'ORGANIZATION_TEAM_MEMBER';
  }
  if (user?._exhibitor_admin) {
    return 'EXHIBITOR_ADMIN';
  }
  if (user?._exhibitor_team_member) {
    return 'EXHIBITOR_TEAM_MEMBER';
  }
  if (user?._participant) {
    return 'PARTICIPANT';
  }
}

// Get user role type - not sure this is useful yet, but we need to have a way to check the roles and show the human readable type somehow
export function userRoleCheck(user) {
  if (user?.user._organization_admin) {
    return 'ORGANIZATION_ADMIN';
  }
  if (user?.user._organization_team_member) {
    return 'ORGANIZATION_TEAM_MEMBER';
  }
  if (user?.user._exhibitor_admin) {
    return 'EXHIBITOR_ADMIN';
  }
  if (user?.user._exhibitor_team_member) {
    return 'EXHIBITOR_TEAM_MEMBER';
  }
  if (user?.user._participant) {
    return 'PARTICIPANT';
  }
}

// Check users roles
export function isOrganization(user) {
  if (user?.user._organization_admin || user?.user._organization_team_member) {
    return true;
  }
}
// Check users roles
export function isExhibitor(user) {
  if (user?.user._exhibitor_admin || user?.user._exhibitor_team_member) {
    return true;
  }
}
// Check users roles
export function isParticipant(user) {
  if (user?.user._participant) {
    return true;
  }
}

// Format Date 2021-02-22 to 02/22/2021
export function formatDate(date: string) {
  var dateString = new Date(date);
  var timeString = dateString.toLocaleTimeString();
  return (
    dateString.getMonth() +
    1 +
    '/' +
    dateString.getDate() +
    '/' +
    dateString.getFullYear() +
    ' ' +
    timeString
  );
}
