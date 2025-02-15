import { Toaster } from "sonner";
import ContextProvider from "./context";
import ShortcutsPage from "./pages/settings/shortcuts";
import { Route, Switch } from "wouter";
import SettingsPage from "./pages/settings";
import Layout from "./components/layout";
import KeyboardSelector from "./sections/KeyboardSelector";
import Home from "./pages/home";
import SettingsSidebar from "./pages/settings/sidebar";
import ActionsPage from "./pages/settings/actions";
import InfoPage from "./pages/settings/info";
import CreditsPage from "./pages/settings/credits";
function App() {
  return (
    <ContextProvider>
      <Layout
        main={
          <Switch>
            <Route path="/">
              <Home />
            </Route>
            <Route path="/settings">
              <SettingsPage />
            </Route>
            <Route path="/settings/shortcuts">
              <ShortcutsPage />
            </Route>
            <Route path="/settings/actions">
              <ActionsPage />
            </Route>
            <Route path="/settings/info">
              <InfoPage />
            </Route>
            <Route path="/settings/credits">
              <CreditsPage />
            </Route>
          </Switch>
        }
        side={
          <Switch>
            <Route path="/">
              <KeyboardSelector />
            </Route>
            <Route path="/settings/:subsection?">
              <SettingsSidebar />
            </Route>
          </Switch>
        }
      />
      <Toaster
        toastOptions={{
          className:
            "bg-primary-900 text-primary-100 [&__*.sonner-loading-bar]:bg-primary-100",
          descriptionClassName: "text-primary-300",
        }}
      />
    </ContextProvider>
  );
}

export default App;
