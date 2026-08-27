import * as s from "./layout.css";

export default function ToolListLayout({ children }: { children: React.ReactNode }) {
	return <section className={s.wrapper}>{children}</section>;
}
