import NotesApp from "./components/NotesApp";
import SingleNote from "./components/SingleNote";
import { NotesProvider } from "./context/NotesContext";
import { SnackbarProvider, enqueueSnackbar } from "notistack";

function App() {
  return (
    <>
      <div className="App">
        <NotesProvider>
          <NotesApp />
        </NotesProvider>
        <SnackbarProvider />
      </div>
    </>
  );
}

export default App;
