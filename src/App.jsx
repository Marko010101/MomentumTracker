import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import GlobalStyles from "./styles/GlobalStyles";
import { Toaster } from "react-hot-toast";

const Home = lazy(() => import("./pages/Home.jsx"));

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
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      <BrowserRouter>
        <GlobalStyles />
        {/* <Suspense fallback={<SpinnerFullPage />}> */}
        <Routes>
          <Route path="/" index element={<Home />} />
          {/* <Route path="*" element={<PageNotFound />} /> */}
        </Routes>
        {/* </Suspense> */}
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
