import ActionsPage from "./actions";
import CreditsPage from "./credits";
import InfoPage from "./info";
import ShortcutsPage from "./shortcuts";

const SettingsPage = () => {
  return (
    <>
      <ShortcutsPage />
      <ActionsPage />
      <InfoPage />
      <CreditsPage />
    </>
  );
};

export default SettingsPage;
