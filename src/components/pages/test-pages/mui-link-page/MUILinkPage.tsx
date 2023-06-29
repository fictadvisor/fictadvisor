import Link from '@/components/common/ui/link-mui';

enum LinkType {
  WHITE = 'white',
  BLUE = 'blue',
}

const LinkPage = () => {
  return (
    <div>
      <Link
        href="#"
        text="Click here to open documentation"
        type={LinkType.BLUE}
      />
      <br />
      <Link
        href="#"
        text="Click here to open documentation"
        type={LinkType.WHITE}
      />
    </div>
  );
};

export default LinkPage;
