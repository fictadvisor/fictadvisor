import Tooltip, { TooltipPosition } from '@/components/common/ui/tooltip';

import styles from '../test-pages.module.scss';

const TooltipsPage = () => (
  <div className={styles['test-page-wrap']}>
    <div className={styles['test-page-content']}>
      <div
        style={{
          width: '80%',
          display: 'flex',
          flexFlow: 'column',
        }}
      >
        <br />
        <br />
        <Tooltip position={TooltipPosition.TOP} text="Tooltip top Example">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sed illum
          quam incidunt earum architecto exercitationem tenetur eaque quibusdam,
          explicabo sit assumenda dolor consequuntur labore eveniet, beatae
          perferendis corporis. Adipisci, praesentium.
        </Tooltip>
        <br />
        <Tooltip
          position={TooltipPosition.BOTTOM}
          text="Tooltip bottom Example"
        >
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sed illum
          quam incidunt earum architecto exercitationem tenetur eaque quibusdam,
          explicabo sit assumenda dolor consequuntur labore eveniet, beatae
          perferendis corporis. Adipisci, praesentium.
        </Tooltip>
        <br />
        <Tooltip
          position={TooltipPosition.LEFT}
          text="Toquam incidunt earum architecto exercitationem tenetur eaque quibusdam,
          explicabo sit assumenda dolor consequuntur labore eveniet, beatae
          perferendis corporis. Adipisci, praesentiuoltip left Example"
        >
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sed illum
          quam incidunt earum architecto exercitationem tenetur eaque quibusdam,
          explicabo sit assumenda dolor consequuntur labore eveniet, beatae
          perferendis corporis. Adipisci, praesentium.
        </Tooltip>
        <br />
        <Tooltip
          position={TooltipPosition.RIGHT}
          text="Tooquam incidunt earum architecto exercitationem tenetur eaque quibusdam,
          explicabo sit assumenda dolor consequuntur labore eveniet, beatae
          perferendis corporis. Adipisci, praesentiultip right Example"
        >
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sed illum
          quam incidunt earum architecto exercitationem tenetur eaque quibusdam,
          explicabo sit assumenda dolor consequuntur labore eveniet, beatae
          perferendis corporis. Adipisci, praesentium.
        </Tooltip>

        <Tooltip
          text="Toquam incidunt earum architecto exercitationem tenetur eaque quibusdam,
          explicabo sit assumenda dolor consequuntur labore eveniet, beatae
          perferendis corporis. Adipisci, praesentiuoltip left Example"
        >
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sed illum
          quam incidunt earum architecto exercitationem tenetur eaque quibusdam,
          explicabo sit assumenda dolor consequuntur labore eveniet, beatae
          perferendis corporis. Adipisci, praesentium.
        </Tooltip>
        <Tooltip hasArrow={false} text="No arrow tooltip">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sed illum
          quam incidunt earum architecto exercitationem tenetur eaque quibusdam,
          explicabo sit assumenda dolor consequuntur labore eveniet, beatae
          perferendis corporis. Adipisci, praesentium.
        </Tooltip>
      </div>
    </div>
  </div>
);

export default TooltipsPage;
