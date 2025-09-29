import { colors, fonts } from "@repo/ui/foundations/index.ts";
import "./App.css";

function App() {
  return (
    <>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <p style={{ color: colors.brand.orange[500], ...fonts.h1_1 }}>
        이 글씨는 오렌지색입니다.
      </p>
    </>
  );
}

export default App;
