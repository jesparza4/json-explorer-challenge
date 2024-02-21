import styled from "styled-components";
import { JsonExplorer } from "./components/JsonExplorer";

const jsonData = {
  date: "2021-10-27T07:49:14.896Z",
  hasError: false,
  fields: [
    {
      id: "4c212130",
      prop: "iban",
      value: "DE81200505501265402568",
      hasError: false,
    },
  ],
};

const AppContainer = styled.div`
  margin: 24px;
  display: flex;
  gap: 16px;
  flex-direction: column;
  width: 50%;
`;

const App = () => {
  return (
    <AppContainer>
      <JsonExplorer json={jsonData} rootName="res" />
    </AppContainer>
  );
};

export default App;
