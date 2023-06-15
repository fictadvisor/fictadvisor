import dynamic from 'next/dynamic';

import { TeacherRoles } from '@/lib/api/teacher/dto/GetTeacherDTO';

const Mobile11 = dynamic(() =>
  import('@/components/common/ui/radar/utils/radar-background/11-mobile').then(
    module => module.Mobile11,
  ),
);
const Mobile12 = dynamic(() =>
  import('@/components/common/ui/radar/utils/radar-background/12-mobile').then(
    module => module.Mobile12,
  ),
);
const Mobile13 = dynamic(() =>
  import('@/components/common/ui/radar/utils/radar-background/13-mobile').then(
    module => module.Mobile13,
  ),
);
const Mobile15 = dynamic(() =>
  import('@/components/common/ui/radar/utils/radar-background/15-mobile').then(
    module => module.Mobile15,
  ),
);
const Lab12Desktop = dynamic(() =>
  import(
    '@/components/common/ui/radar/utils/radar-background/lab-12-desktop'
  ).then(module => module.Lab12Desktop),
);
const Lect11Desktop = dynamic(() =>
  import(
    '@/components/common/ui/radar/utils/radar-background/lect-11-desktop'
  ).then(module => module.Lect11Desktop),
);
const LectLab13Desktop = dynamic(() =>
  import(
    '@/components/common/ui/radar/utils/radar-background/lect-lab-13-desktop'
  ).then(module => module.LectLab13Desktop),
);
const LectPract13Desktop = dynamic(() =>
  import(
    '@/components/common/ui/radar/utils/radar-background/lect-pract-13-desktop'
  ).then(module => module.LectPract13Desktop),
);
const LectPractLab15Desktop = dynamic(() =>
  import(
    '@/components/common/ui/radar/utils/radar-background/lect-pract-lab-15-desktop'
  ).then(module => module.LectPractLab15Desktop),
);
const Pract12Desktop = dynamic(() =>
  import(
    '@/components/common/ui/radar/utils/radar-background/pract-12-desktop'
  ).then(module => module.Pract12Desktop),
);

const getBackgroundImage = (
  labels: string[],
  isMobile: boolean,
  roles: TeacherRoles[],
) => {
  if (isMobile)
    switch (labels.length) {
      case 11:
        return <Mobile11 />;
      case 12:
        return <Mobile12 />;
      case 13:
        return <Mobile13 />;
      case 15:
        return <Mobile15 />;
    }
  else
    switch (labels.length) {
      case 11:
        return <Lect11Desktop />;
      case 12:
        if ('LABORANT' in roles) {
          return <Lab12Desktop />;
        }
        return <Pract12Desktop />;
      case 13:
        if ('LABORANT' in roles) {
          return <LectLab13Desktop />;
        }
        return <LectPract13Desktop />;
      case 15:
        return <LectPractLab15Desktop />;
    }
};

export default getBackgroundImage;
