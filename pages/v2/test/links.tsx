import { CustomLink, LinkColor } from "../../../components/v2/Link";

function links() {
  return (
    <div className="test-page-wrap">
      <CustomLink href={"/test"} text="Click here to show Home" />
      <CustomLink
        href={"/test/dropdowns"}
        text="Click here to show Dropdowns"
      />
      <CustomLink
        href={"/test/buttons"}
        text="Click here to show Buttons"
        arrow={true}
      />
      <CustomLink
        href={"/test/tooltips"}
        text="Click here to show Tooltips"
        arrow={true}
      />
      <CustomLink
        href={"/test"}
        text="Click here to show Home"
        color={LinkColor.BLUE}
      />
      <CustomLink
        href={"/test/dropdowns"}
        text="Click here to show Dropdowns"
        color={LinkColor.BLUE}
      />
      <CustomLink
        href={"/test/buttons"}
        text="Click here to show Buttons"
        arrow={true}
        color={LinkColor.BLUE}
      />
      <CustomLink
        href={"/test/tooltips"}
        text="Click here to show Tooltips"
        arrow={true}
        color={LinkColor.BLUE}
      />
    </div>
  );
}

export default links;
