import { useWsContext } from '../../contexts/WorkspaceContext';
import { EditButton, DeleteButton, EnterButton, DownloadButton, DateContent } from '../_partials';

export default function Card({ item }) {

  const wsContext = useWsContext()

  return (
    <div className="bg-main-color rounded-2xl border-2 border-green-500 border-opacity-20">
      <div className="h-[435] flex flex-col justify-between p-12 space-y-3 overflow-hidden">
        <p className="font-medium text-center sm:text-left mb-4" title={item.title}>{item.title}</p>
        <div className="flex flex-col items-stretch sm:flex-row sm:items-center sm:justify-end sm:space-x-2">
          <EditButton onClick={() => wsContext.openWsModal(item)} />
          <DeleteButton onClick={() => wsContext.deleteWsItem(item.id)} />
          { /*<DownloadButton onClick={() => wsContext.exportWsItem(item)} />*/}
          <EnterButton path={`workspace/${item.id}`} />
        </div>
      </div>
      { /*<DateContent timestamp={item.created_at} />*/}
    </div>
  )
}