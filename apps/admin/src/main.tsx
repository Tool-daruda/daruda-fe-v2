import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "@repo/ui/style.css";
import "@/app/styles/global.css.ts";
import { themeClass } from "@repo/ui";

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");
createRoot(rootElement).render(
	<StrictMode>
		<div className={themeClass}>
			<App />
		</div>
	</StrictMode>
);
