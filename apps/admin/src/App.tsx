import { vars } from "@repo/ui/foundations/index.ts";
import "./App.css";

function App() {
  return (
    <>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <p style={{ color: vars.colors.brand.orange[500] }}>
        이 글씨는 오렌지색입니다.
      </p>
    </>
  );
}

export default App;
