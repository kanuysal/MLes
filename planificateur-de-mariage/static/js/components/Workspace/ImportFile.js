import { useRef } from 'react'
import { useWsContext } from '../../contexts/WorkspaceContext'

export default function ImportFile() {

  const wsContext = useWsContext()
  const wsImportFile = useRef()

  const importWsFile = () => {
    const file = wsImportFile.current.files[0];
    new Response(file).json().then(json => {
      setUploadError();
      if (json.hasOwnProperty("workspaces") && json.hasOwnProperty("columns") && json.hasOwnProperty("tasks") && json.hasOwnProperty("attachments")) {
        json.workspaces.forEach((ws) => {
          if (!ws.hasOwnProperty("id") || !ws.hasOwnProperty("title") || !ws.hasOwnProperty("created_at")) {
            setUploadError("Invalid JSON format")
          }
        })

        json.columns.forEach((cl) => {
          if (!cl.hasOwnProperty("id") || !cl.hasOwnProperty("order") || !cl.hasOwnProperty("workspaces_id") || !cl.hasOwnProperty("title") || !cl.hasOwnProperty("created_at")) {
            setUploadError("Invalid JSON format")
          }
        })

        json.tasks.forEach((ts) => {
          if (!ts.hasOwnProperty("id") || !ts.hasOwnProperty("order") || !ts.hasOwnProperty("columns_id") || !ts.hasOwnProperty("workspaces_id") || !ts.hasOwnProperty("title") || !ts.hasOwnProperty("description") || !ts.hasOwnProperty("created_at")) {
            setUploadError("Invalid JSON format")
          }
        })

        json.attachments.forEach((at) => {
          if (!at.hasOwnProperty("id") || !at.hasOwnProperty("name") || !at.hasOwnProperty("src") || !at.hasOwnProperty("tasks_id") || !at.hasOwnProperty("workspaces_id") || !at.hasOwnProperty("created_at")) {
            setUploadError("Invalid JSON format")
          }
        })
        if (wsContext.wsImportError === "") {
          wsContext.updateState({ wsImportJson: json })
        }
      } else {
        setUploadError("Invalid JSON format")
      }
    }, err => {
      setUploadError("Invalid JSON file")
    })
  }

  const setUploadError = (text = "") => {
    wsContext.updateState({ wsImportError: text })
  }

  return (
    <div className="space-y-2">
      <label htmlFor="ws_import_file" className="block text-gray-500 font-medium">Importer un fichier</label>
      <input type="file" ref={wsImportFile} onChange={() => importWsFile()} id="ws_import_file" accept="application/json" className="w-full border py-3 px-4" />
      {wsContext.wsImportError && <small className="text-red-500">{wsContext.wsImportError}</small>}
    </div>
  )
}
