import * as React from "react";
import { SnackbarKey, SnackbarProvider } from "notistack";
import { Button } from "@material-ui/core";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { persistor, store } from "_redux";
import { ThemeProvider } from "layout";
import { Routes } from "./Routes";
import { UserProvider } from "../layout/core/UserContext";

function App() {
  const notistackRef = React.useRef<SnackbarProvider>(null!);
  const onClickDismiss = (key: SnackbarKey) => () => {
    notistackRef.current.closeSnackbar(key);
  };

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <UserProvider>
          <ThemeProvider>
            <SnackbarProvider
              ref={notistackRef}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              autoHideDuration={3000}
              action={(key) => (
                <Button onClick={onClickDismiss(key)} color="inherit">
                  关闭
                </Button>
              )}
            >
              <Routes />
            </SnackbarProvider>
          </ThemeProvider>
        </UserProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
