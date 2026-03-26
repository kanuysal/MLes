import { createContext, useContext, useState } from 'react'
import { helper } from '../utils'
import { db } from './../database'

const WsContext = createContext()

export function WorkspaceContext(props) {
  const [state, setState] = useState({
    wsData: db.getTableData('workspaces'),
    wsModal: false,
    wsEditIndex: -1,
    wsTitle: '',
    wsCreatedAt: '',
    wsTitleError: '',
    wsType: 'manual',
    wsImportJson: [],
    wsImportError: '',
    wsImportUpload: false,
  })

  // Dynamically update state value
  const updateState = (payload) => {
    console.log('%cstate,payload', 'color:red;font-size:50px', state, payload)
    setState({
      ...state,
      ...payload,
    })
  }

  // Open create or edit Workspace Modal
  const openWsModal = (payload = null, upState) => {
    console.log(
      '%cpayload,upState',
      'color:red;font-size:50px',
      payload,
      upState
    )
    if (payload) {
      updateState({
        wsEditIndex: payload.id,
        wsTitle: payload.title,
        wsCreatedAt: payload.created_at,
        wsModal: true,
        wsType: 'manual',
        wsImportJson: [],
        wsImportError: '',
        wsTitleError: '',
        ...upState,
      })
    } else {
      updateState({
        wsEditIndex: -1,
        wsTitle: '',
        wsCreatedAt: '',
        wsImportJson: [],
        wsImportError: '',
        wsModal: true,
        wsType: 'manual',
        wsTitleError: '',
        ...upState,
      })
    }
  }

  // Save or Update workspace
  const saveWsModal = () => {
    if (state.wsType === 'manual') {
      if (state.wsTitle === '') {
        updateState({ wsTitleError: 'Please enter workspace name' })
      } else {
        const updatedWsData = {
          id:
            state.wsEditIndex === -1
              ? db.getId('workspaces')
              : state.wsEditIndex,
          title: state.wsTitle,
          created_at: helper.setCreatedTime(),
        }
        db.updateTable('workspaces', updatedWsData, state.wsEditIndex)
        updateState({ wsData: db.getTableData('workspaces'), wsModal: false })
      }
    }

    if (state.wsType === 'import') {
      if (state.wsImportJson) {
        db.importDb(state.wsImportJson)
        updateState({ wsData: db.getTableData('workspaces'), wsModal: false })
      } else {
        updateState({ wsImportError: 'Please select valid JSON file' })
      }
    }
  }

  // Delete Workspace
  const deleteWsItem = (id) => {
    let updatedWsData = db.deleteTable('workspaces', id)
    updateState({ wsData: updatedWsData })
  }

  // Export workspace
  const exportWsItem = (item) => {
    db.exportDb(item)
  }

  const value = {
    ...state,
    updateState,
    openWsModal,
    saveWsModal,
    deleteWsItem,
    exportWsItem,
  }

  return <WsContext.Provider value={value}>{props.children}</WsContext.Provider>
}

export const useWsContext = () => useContext(WsContext)
