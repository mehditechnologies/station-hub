import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";
import { ThemeProvider } from "./context/theme.Context";
import { NotificationProvider } from "./context/NotificationContext";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <NotificationProvider>
          <AppRoutes />
        </NotificationProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
