import { screen, waitFor } from "@testing-library/react";
import App from "../App";

test("App should have correct initial render", () => {
  renderWithProviders(<App />);
});
