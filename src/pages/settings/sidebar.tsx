import { List, Command, Lightning, Info, Star } from "@phosphor-icons/react";
import { useRoute, Link } from "wouter";
import Button from "../../components/button";

type Props = {};

function SettingsSidebar({}: Props) {
  const [_, params] = useRoute("/settings/:subsection?");
  const isAll = !params?.subsection;
  const isShortcuts = params?.subsection === "shortcuts";
  const isActions = params?.subsection === "actions";
  const isInfo = params?.subsection === "info";
  const isCredits = params?.subsection === "credits";
  return (
    <>
      <Button
        size={"sm"}
        className="px-4 mb-1"
        asChild
        variant="ghost"
        aria-selected={isAll}
      >
        <Link href="/settings/">
          <List size={16} weight="duotone" className="mr-2" />
          All
        </Link>
      </Button>
      <Button
        size={"sm"}
        className="px-4 mb-1"
        asChild
        variant="ghost"
        aria-selected={isShortcuts}
      >
        <Link href="/settings/shortcuts">
          <Command size={16} weight="duotone" className="mr-2" />
          Shortcuts
        </Link>
      </Button>
      <Button
        size={"sm"}
        className="px-4 mb-1"
        asChild
        variant="ghost"
        aria-selected={isActions}
      >
        <Link href="/settings/actions">
          <Lightning size={16} weight="duotone" className="mr-2" />
          Actions
        </Link>
      </Button>
      <Button
        size={"sm"}
        className="px-4 mb-1"
        asChild
        variant="ghost"
        aria-selected={isInfo}
      >
        <Link href="/settings/info">
          <Info size={16} weight="duotone" className="mr-2" />
          Information
        </Link>
      </Button>
      <Button
        size={"sm"}
        className="px-4 mb-1"
        asChild
        variant="ghost"
        aria-selected={isCredits}
      >
        <Link href="/settings/credits">
          <Star size={16} weight="duotone" className="mr-2" />
          Credits and acknowledgements
        </Link>
      </Button>
    </>
  );
}

export default SettingsSidebar;
