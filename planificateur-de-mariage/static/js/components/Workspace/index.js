import { PageHeading } from '../_partials'
import AddWorkspaceButton from './AddWorkspaceButton'
import Card from './Card'
import WorkspaceModal from './WorkspaceModal'
import { useWsContext } from './../../contexts/WorkspaceContext'

export default function Workspace() {
  const wsContext = useWsContext()
  const wsData = wsContext.wsData

  return (
    <>
      <PageHeading title="" />


      <div className="td-container">
        <div className="grid grid-cols-1 gap-10">
          {wsData.length > 0 &&
            wsData.map((ws) => <Card item={ws} key={ws.id} />)}

          <AddWorkspaceButton onClick={() => wsContext.openWsModal()} />
        </div>
      </div>

      <WorkspaceModal />
    </>
  )
}
