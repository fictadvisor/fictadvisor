import CustomLink, {LinkColor} from "@/components/common/ui/link/Link";
import styles from "../test-pages.module.scss";

const LinksPage = () => (
    <div className={styles["test-page-wrap"]}>
        <div className={styles["test-page-content"]}>
            <CustomLink href={"/test"} text="Click here to show Home"/>
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
    </div>
);

export default LinksPage;
