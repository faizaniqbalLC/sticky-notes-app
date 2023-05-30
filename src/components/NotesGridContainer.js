import { useContext, useState } from "react";
import { NotesContext } from "../context/NotesContext";
import SingleNote from "./SingleNote";
import Toast from "../utils/Toast";

export default function NotesGridContainer() {
  const { notes, filteredNotes, searchValue, handleAddNote } =
    useContext(NotesContext);
  const [showToast, setShowToast] = useState(false);

  const handleCopyTextArea = (data) => {
    console.log("first");
    // Get the code snippet element
    var codeElement = data;
    console.log(codeElement);
    // Create a textarea element and set its value to the code snippet
    var textarea = document.createElement("textarea");
    textarea.value = codeElement;
    // Append the textarea element to the document
    document.body.appendChild(textarea);
    // Select the content of the textarea
    textarea.select();
    // Copy the selected text to the clipboard
    document.execCommand("copy");
    // Remove the textarea element from the document
    document.body.removeChild(textarea);
    // Provide some visual feedback to the user
    // Show a beautiful message using Toastr
    setShowToast(true);
  };
  return (
    <>
      <section
        className={`notesGridContainer grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2  overflow-y-scroll w-full h-full ${
          filteredNotes.length > 4 ? "place-items-center items-center" : ""
        } gap-8 p-4 `}>
        {" "}
        {showToast && <Toast setShowToast={setShowToast} />}
        {searchValue.length === 0 ? (
          <>
            {notes.map((note) => (
              <SingleNote key={note.id} id={note.id} noteData={note} />
            ))}
            <button
              onClick={handleAddNote}
              className="w-60 h-52 rounded bg-slate-800 hover:bg-slate-900">
              <i className="bi bi-plus text-white text-4xl" />
            </button>
          </>
        ) : (
          <>
            {filteredNotes.length >= 1 ? (
              filteredNotes.map((note) => (
                <SingleNote
                  key={note.id}
                  id={note.id}
                  noteData={note}
                  handleCopyTextArea={handleCopyTextArea}
                />
              ))
            ) : (
              <h1 className="text-2xl text-white font-bold">
                <i className="bi bi-emoji-frown-fill" /> No search results with
                that term.
              </h1>
            )}
          </>
        )}
      </section>
    </>
  );
}
