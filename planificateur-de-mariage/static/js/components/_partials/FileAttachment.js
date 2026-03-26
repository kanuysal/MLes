import { useRef, useState } from 'react'
import { useTsContext } from '../../contexts/TaskContext'
import { db } from '../../database'
import DeleteButton from './DeleteButton'
import DownloadButton from './DownloadButton'

export default function FileAttachment({ readOnly = false }) {

  const tsContext = useTsContext()
  const fileRef = useRef()
  const [tempId, setTempId] = useState(-1)

  const fileAttachment = () => {
    const file = fileRef.current.files[0];
    if (file) {
      if (db.getAttachmentTableSize() + file.size > process.env.REACT_APP_ATTACHMENT_SIZE_LIMIT && file.size > process.env.REACT_APP_ATTACHMENT_FILE_SIZE_LIMIT) {
        alert(`You are running out of space. Please try to remove some of the attachments or select less than ${process.env.REACT_APP_ATTACHMENT_FILE_SIZE_LIMIT} bytes file`)
      } else {
        var reader = new FileReader();
        reader.readAsDataURL(file)
        reader.onload = () => {
          const fileArr = tsContext.tsAttachments.slice()
          fileArr.push({
            id: tempId,
            tasks_id: tsContext.tsEditIndex,
            name: file.name,
            size: file.size,
            src: reader.result
          })
          setTempId(tempId - 1);
          tsContext.updateState({ tsAttachments: fileArr })
        };
        fileRef.current.value = ''
      }
    }
  }

  const removeAttachment = (item) => {
    const fileArr = tsContext.tsAttachments.filter((tsa) => tsa.id !== item.id)
    if (item.id > 0) {
      db.deleteTable("attachments", item.id)
    }
    tsContext.updateState({ tsAttachments: fileArr })
  }

  const downloadFile = (item) => {
    fetch(item.src)
      .then(response => response.blob())
      .then(blob => {
        var link = window.document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = item.name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
  }

  return (
    <div className="space-y-2">
      <p className="font-medium">Pièces jointes</p>
      <div className="grid grid-cols-1 gap-4">
        {tsContext.tsAttachments.map((tsa) => (
          <div key={tsa.id} className="bg-gray-100 py-3 px-4 border flex items-center justify-between space-x-2">
            <span className="line-clamp-1" title={tsa.name}>{tsa.name}</span>
            {readOnly ? <DownloadButton onClick={() => downloadFile(tsa)} /> : <DeleteButton onClick={() => removeAttachment(tsa)} />}
          </div>
        ))}
        {!readOnly && (<label className="space-y-2 border text-gray-500 font-medium flex items-center justify-center py-3 px-4 cursor-pointer" htmlFor="file_attachments">+ Joindre un fichier
          <input ref={fileRef} onChange={() => fileAttachment()} type="file" id="file_attachments" className="hidden" />
        </label>)}
      </div>
    </div>
  )
}
