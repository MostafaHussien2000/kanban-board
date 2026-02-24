import Header from "./components/project/header/header";
import KanbanBoard from "./components/project/kanban-baord/kanban-board";

function App() {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <KanbanBoard />
    </div>
  );
}

export default App;
