import { RouterProvider } from "react-router-dom";
import AppThemeProvider from "./theme/AppThemeProvider";
import router from "./navigation/Router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "dayjs/locale/it";

dayjs.locale("it");

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 0,
      retry: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <AppThemeProvider>
          <RouterProvider router={router} />
        </AppThemeProvider>
      </LocalizationProvider>
    </QueryClientProvider>
  );
}

export default App;
