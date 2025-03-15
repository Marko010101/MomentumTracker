import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { Toaster } from "react-hot-toast";
import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import GlobalStyles from "./styles/globalStyles.js";
import Loader from "./components/ui/Loader.jsx";

const AppLayout = lazy(() => import("./components/AppLayout.jsx"));
const TaskListPage = lazy(() => import("./pages/TaskListPage.jsx"));
const TaskPage = lazy(() => import("./pages/TaskPage.jsx"));
const PageNotFound = lazy(() => import("./pages/PageNotFound.jsx"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <BrowserRouter>
        <GlobalStyles />
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route element={<AppLayout />}>
              <Route path="/" index element={<TaskListPage />} />
              <Route path="/:taskId" index element={<TaskPage />} />
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            // backgroundColor: "var(--color-neutral-700)",
            // color: "var(--color-neutral-100)",
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
