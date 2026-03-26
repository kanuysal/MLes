import { useWsContext } from '../../contexts/WorkspaceContext'
import { InputText, Modal } from '../_partials'
import ImportFile from './ImportFile'

export default function WorkspaceModal() {

  const wsContext = useWsContext()


  return (
    <Modal isOpen={wsContext.wsModal} onClose={() => wsContext.updateState({ wsModal: false })} title="Nouvelle tâche" onSave={() => wsContext.saveWsModal()
    }>
      {wsContext.wsEditIndex === -1 && <div className="space-y-2">
        <label className="block text-gray-500 font-medium">Ajout</label>
        <div className="flex space-x-4">
          <div>
            <input type="radio" id="ws_type_manual" onClick={() => wsContext.updateState({ wsType: "manual" })} className="hidden" />
            <label htmlFor="ws_type_manual"
              className={`py-2 px-4 border cursor-pointer block ${wsContext.wsType === "manual" ? 'bg-gray-100' : ''}`}>Manuel</label>
          </div>
          <div>
            <input type="radio" id="ws_type_import" onClick={() => wsContext.updateState({ wsType: "import" })} className="hidden" />
            <label htmlFor="ws_type_import"
              className={`py-2 px-4 border cursor-pointer block ${wsContext.wsType === "import" ? 'bg-gray-100' : ''}`}>Importation</label>
          </div>
        </div>
      </div>}
      {wsContext.wsType === "manual" && <InputText value={wsContext.wsTitle} onChange={(e) => wsContext.updateState({ wsTitle: e.target.value })} errorText={wsContext.wsTitleError} label="Titre" placeholder="Eg, 11 mois avant le mariage" id="workspace_title" />}
      {wsContext.wsType === "import" && <ImportFile />}
    </Modal>
  )
}
