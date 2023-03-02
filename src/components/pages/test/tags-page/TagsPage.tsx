import { HomeIcon } from '@heroicons/react/24/outline';

import { CustomCheck } from '@/components/common/custom-svg/CustomCheck';
import Tag, {
  TagColor,
  TagSize,
  TagVariant,
} from '@/components/common/ui/tag/Tag';

import styles from '../test-pages.module.scss';
const TagsPage = () => (
  <div className={styles['test-page-wrap']}>
    <div className={styles['test-page-content']}>
      <Tag
        className={styles['test']}
        variant={TagVariant.FILLED}
        color={TagColor.PRIMARY}
        size={TagSize.SMALL}
        icon={<HomeIcon className="icon" />}
      ></Tag>
      <Tag
        variant={TagVariant.FILLED}
        color={TagColor.PRIMARY}
        text="Primary"
        size={TagSize.SMALL}
      ></Tag>
      <Tag
        variant={TagVariant.DARKER}
        color={TagColor.PRIMARY}
        text="Primary"
        size={TagSize.MEDIUM}
        icon={<CustomCheck />}
      ></Tag>
      <Tag
        variant={TagVariant.DARKER}
        color={TagColor.PRIMARY}
        text="Primary"
        size={TagSize.SMALL}
      ></Tag>
      <Tag
        variant={TagVariant.OUTLINE}
        color={TagColor.PRIMARY}
        text="Primary"
        size={TagSize.SMALL}
        icon={<CustomCheck />}
      ></Tag>
      <Tag
        variant={TagVariant.OUTLINE}
        color={TagColor.PRIMARY}
        text="Primary"
        size={TagSize.MEDIUM}
      ></Tag>
      <Tag
        variant={TagVariant.FILLED}
        color={TagColor.SUCCESS}
        text="Success"
        size={TagSize.SMALL}
        icon={<CustomCheck />}
      ></Tag>
      <Tag
        variant={TagVariant.FILLED}
        color={TagColor.SUCCESS}
        text="Success"
        size={TagSize.SMALL}
      ></Tag>
      <Tag
        variant={TagVariant.DARKER}
        color={TagColor.SUCCESS}
        text="Success"
        size={TagSize.MEDIUM}
        icon={<CustomCheck />}
      ></Tag>
      <Tag
        variant={TagVariant.DARKER}
        color={TagColor.SUCCESS}
        text="Success"
        size={TagSize.SMALL}
      ></Tag>
      <Tag
        variant={TagVariant.OUTLINE}
        color={TagColor.SUCCESS}
        text="Success"
        size={TagSize.SMALL}
        icon={<CustomCheck />}
      ></Tag>
      <Tag
        variant={TagVariant.OUTLINE}
        color={TagColor.SUCCESS}
        text="Success"
        size={TagSize.MEDIUM}
      ></Tag>
      <Tag
        variant={TagVariant.FILLED}
        color={TagColor.ERROR}
        text="Error"
        size={TagSize.SMALL}
        icon={<CustomCheck />}
      ></Tag>
      <Tag
        variant={TagVariant.FILLED}
        color={TagColor.ERROR}
        text="Error"
        size={TagSize.SMALL}
      ></Tag>
      <Tag
        variant={TagVariant.DARKER}
        color={TagColor.ERROR}
        text="Error"
        size={TagSize.MEDIUM}
        icon={<CustomCheck />}
      ></Tag>
      <Tag
        variant={TagVariant.DARKER}
        color={TagColor.ERROR}
        text="Error"
        size={TagSize.SMALL}
      ></Tag>
      <Tag
        variant={TagVariant.OUTLINE}
        color={TagColor.ERROR}
        text="Error"
        size={TagSize.SMALL}
        icon={<CustomCheck />}
      ></Tag>
      <Tag
        variant={TagVariant.OUTLINE}
        color={TagColor.ERROR}
        text="Error"
        size={TagSize.MEDIUM}
      ></Tag>
      <Tag
        variant={TagVariant.FILLED}
        color={TagColor.WARNING}
        text="Warning"
        size={TagSize.SMALL}
        icon={<CustomCheck />}
      ></Tag>
      <Tag
        variant={TagVariant.FILLED}
        color={TagColor.WARNING}
        text="Warning"
        size={TagSize.SMALL}
      ></Tag>
      <Tag
        variant={TagVariant.DARKER}
        color={TagColor.WARNING}
        text="Warning"
        size={TagSize.MEDIUM}
        icon={<CustomCheck />}
      ></Tag>
      <Tag
        variant={TagVariant.DARKER}
        color={TagColor.WARNING}
        text="Warning"
        size={TagSize.SMALL}
      ></Tag>
      <Tag
        variant={TagVariant.OUTLINE}
        color={TagColor.WARNING}
        text="Warning"
        size={TagSize.SMALL}
        icon={<CustomCheck />}
      ></Tag>
      <Tag
        variant={TagVariant.OUTLINE}
        color={TagColor.WARNING}
        text="Warning"
        size={TagSize.MEDIUM}
      ></Tag>
      <Tag
        variant={TagVariant.FILLED}
        color={TagColor.INFO}
        text="info"
        size={TagSize.SMALL}
        icon={<CustomCheck />}
      ></Tag>
      <Tag
        variant={TagVariant.FILLED}
        color={TagColor.INFO}
        text="info"
        size={TagSize.SMALL}
      ></Tag>
      <Tag
        variant={TagVariant.DARKER}
        color={TagColor.INFO}
        text="info"
        size={TagSize.MEDIUM}
        icon={<CustomCheck />}
      ></Tag>
      <Tag
        variant={TagVariant.DARKER}
        color={TagColor.INFO}
        text="info"
        size={TagSize.SMALL}
      ></Tag>
      <Tag
        variant={TagVariant.OUTLINE}
        color={TagColor.INFO}
        text="info"
        size={TagSize.SMALL}
        icon={<CustomCheck />}
      ></Tag>
      <Tag
        variant={TagVariant.OUTLINE}
        color={TagColor.INFO}
        text="info"
        size={TagSize.MEDIUM}
      ></Tag>
      <Tag
        variant={TagVariant.FILLED}
        color={TagColor.GRAY}
        text="gray"
        size={TagSize.SMALL}
        icon={<CustomCheck />}
      ></Tag>
      <Tag
        variant={TagVariant.FILLED}
        color={TagColor.GRAY}
        text="gray"
        size={TagSize.SMALL}
      ></Tag>
      <Tag
        variant={TagVariant.DARKER}
        color={TagColor.GRAY}
        text="gray"
        size={TagSize.MEDIUM}
        icon={<CustomCheck />}
      ></Tag>
      <Tag
        variant={TagVariant.DARKER}
        color={TagColor.GRAY}
        text="gray"
        size={TagSize.SMALL}
      ></Tag>
      <Tag
        variant={TagVariant.OUTLINE}
        color={TagColor.GRAY}
        text="gray"
        size={TagSize.SMALL}
        icon={<CustomCheck />}
      ></Tag>
      <Tag
        variant={TagVariant.OUTLINE}
        color={TagColor.GRAY}
        text="gray"
        size={TagSize.MEDIUM}
      ></Tag>
      <Tag
        variant={TagVariant.FILLED}
        color={TagColor.VIOLET}
        text="violet"
        size={TagSize.SMALL}
        icon={<CustomCheck />}
      ></Tag>
      <Tag
        variant={TagVariant.FILLED}
        color={TagColor.VIOLET}
        text="violet"
        size={TagSize.SMALL}
      ></Tag>
      <Tag
        variant={TagVariant.DARKER}
        color={TagColor.VIOLET}
        text="violet"
        size={TagSize.MEDIUM}
        icon={<CustomCheck />}
      ></Tag>
      <Tag
        variant={TagVariant.DARKER}
        color={TagColor.VIOLET}
        text="violet"
        size={TagSize.SMALL}
      ></Tag>
      <Tag
        variant={TagVariant.OUTLINE}
        color={TagColor.VIOLET}
        text="violet"
        size={TagSize.SMALL}
        icon={<CustomCheck />}
      ></Tag>
      <Tag
        variant={TagVariant.OUTLINE}
        color={TagColor.VIOLET}
        text="violet"
        size={TagSize.MEDIUM}
      ></Tag>
      <Tag
        variant={TagVariant.FILLED}
        color={TagColor.MINT}
        text="mint"
        size={TagSize.SMALL}
        icon={<CustomCheck />}
      ></Tag>
      <Tag
        variant={TagVariant.FILLED}
        color={TagColor.MINT}
        text="mint"
        size={TagSize.SMALL}
      ></Tag>
      <Tag
        variant={TagVariant.DARKER}
        color={TagColor.MINT}
        text="mint"
        size={TagSize.MEDIUM}
        icon={<CustomCheck />}
      ></Tag>
      <Tag
        variant={TagVariant.DARKER}
        color={TagColor.MINT}
        text="mint"
        size={TagSize.SMALL}
      ></Tag>
      <Tag
        variant={TagVariant.OUTLINE}
        color={TagColor.MINT}
        text="mint"
        size={TagSize.SMALL}
        icon={<CustomCheck />}
      ></Tag>
      <Tag
        variant={TagVariant.OUTLINE}
        color={TagColor.MINT}
        text="mint"
        size={TagSize.MEDIUM}
      ></Tag>
      <Tag
        variant={TagVariant.FILLED}
        color={TagColor.ORANGE}
        text="orange"
        size={TagSize.SMALL}
        icon={<CustomCheck />}
      ></Tag>
      <Tag
        variant={TagVariant.FILLED}
        color={TagColor.ORANGE}
        text="orange"
        size={TagSize.SMALL}
      ></Tag>
      <Tag
        variant={TagVariant.DARKER}
        color={TagColor.ORANGE}
        text="orange"
        size={TagSize.MEDIUM}
        icon={<CustomCheck />}
      ></Tag>
      <Tag
        variant={TagVariant.DARKER}
        color={TagColor.ORANGE}
        text="orange"
        size={TagSize.SMALL}
      ></Tag>
      <Tag
        variant={TagVariant.OUTLINE}
        color={TagColor.ORANGE}
        text="orange"
        size={TagSize.SMALL}
        icon={<CustomCheck />}
      ></Tag>
      <Tag
        variant={TagVariant.OUTLINE}
        color={TagColor.ORANGE}
        text="orange"
        size={TagSize.MEDIUM}
      ></Tag>
    </div>
  </div>
);

export default TagsPage;
