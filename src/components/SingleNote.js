import { useContext, useState } from "react";
import { NotesContext } from "../context/NotesContext";
import ExpandedNote from "./ExpandedNote";
import Modal from "./Modal";
import Toast from "../utils/Toast";
import { enqueueSnackbar } from "notistack";

export default function SingleNote({ id, noteData }) {
  const { handleChangeNoteData, handleDeleteNote } = useContext(NotesContext);
  const [clipboardText, setClipboardText] = useState("");

  const [showModal, setShowModal] = useState(false);

  const handleClickModalBtn = () => {
    setShowModal(!showModal);
  };

  const handleCopyTextArea = (data) => {
    setClipboardText(data);
    if (clipboardText !== data) {
      enqueueSnackbar("Text Copied To Clipboard", {
        variant: "success",
      });
    } else if (clipboardText === data) {
      return false;
    }
    var codeElement = data;
    console.log(codeElement);
    var textarea = document.createElement("textarea");
    textarea.value = codeElement;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
  };
  return (
    <>
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        handleClickModalBtn={handleClickModalBtn}>
        <ExpandedNote
          id={id}
          noteData={noteData}
          handleClickModalBtn={handleClickModalBtn}
        />
      </Modal>

      <figure className={`singleNote w-60 h-56  bg-slate-500`}>
        <header
          className={`flex flex-col px-2 py-1 border-t-8 border-slate-800 bg-slate-600 text-white`}>
          <div className="flex items-center justify-between">
            <div></div>
            <button
              onClick={() => handleCopyTextArea(noteData.body)}
              title="Copy Text">
              <i className="bi bi-clipboard-check" />
            </button>
            <input
              type="text"
              name="title"
              placeholder="Add a title..."
              value={noteData.title}
              onChange={(e) => handleChangeNoteData(e, id)}
              className="w-40 px-1 text-center text-white font-bold bg-transparent rounded"
            />

            <button onClick={handleClickModalBtn} title="Expand">
              <i className="bi bi-arrows-fullscreen" />
            </button>
          </div>
        </header>

        <section className="flex flex-col p-2">
          <textarea
            placeholder="Type something..."
            onChange={(e) => handleChangeNoteData(e, id)}
            id="copyText"
            name="body"
            value={noteData.body}
            className="singleNote__textArea ease-in-out duration-150 w-full h-32 p-1 text-sm text-white bg-transparent outline-none outline-0 rounded focus:outline-2 outline-slate-300 bg-slate-600">
            {noteData.body}
          </textarea>
        </section>

        <div className="flex justify-between items-center px-2 py-1">
          <button title="Delete note" onClick={() => handleDeleteNote(id)}>
            <i className="bi bi-trash text-white" />
          </button>

          <p
            title="Creation date"
            className="self-end pt-1 text-sm text-white font-bold">
            <span className="mr-2">{noteData.createdAt}</span>
            <i className="bi bi-calendar-fill" />
          </p>
        </div>
      </figure>
    </>
  );
}
