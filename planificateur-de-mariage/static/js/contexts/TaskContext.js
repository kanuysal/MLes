import { createContext, useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { helper, sorting } from '../utils'
import { db } from './../database'

const TsContext = createContext()

export function TaskContext(props) {
  // Get workspace ID
  const { id } = useParams()

  // Get workspace Record
  const getWorkspaceData = () => {
    return db.getTableDataById('workspaces', id)
  }

  // Get workspace columns
  const getColumnData = () => {
    return db.getTableDataByRelationId('columns', 'workspaces', id, true)
  }

  // Get workspace columns Tasks
  const getTaskData = () => {
    return db.getTableDataByRelationId('tasks', 'workspaces', id, true)
  }

  const [state, setState] = useState({
    wsData: getWorkspaceData(),
    clData: getColumnData(),
    tsData: getTaskData(),
    clModal: false,
    clTitle: '',
    clCreatedAt: '',
    clOrder: 0,
    clEditIndex: -1,
    clTitleError: '',
    tsModal: false,
    tsTitle: '',
    tsDescription: '',
    tsCreatedAt: '',
    tsOrder: 0,
    tsAttachments: [],
    tsEditIndex: -1,
    tsColumnId: 0,
    tsTitleError: '',
    vtsModal: false,
    vtsColumn: null,
    vtsTask: null,
    lsModal: false,
    lclId: 0,
    ltsData: {},
  })

  // Initlaling sorting of columns and tasks
  useEffect(() => {
    sorting.sortColumn()
    sorting.sortTask()
  }, [state.clData, state.tsData])

  // Dynamically update state
  const updateState = (payload) => {
    setState({
      ...state,
      ...payload,
    })
  }

  // Open create or edit column modal
  const openClModal = (payload = null, upState) => {
    if (payload) {
      updateState({
        clTitle: payload.title,
        clEditIndex: payload.id,
        clCreatedAt: payload.created_at,
        clOrder: payload.order,
        clModal: true,
        clTitleError: '',
        ...upState,
      })
    } else {
      updateState({
        clTitle: '',
        clEditIndex: -1,
        clOrder: 0,
        clCreatedAt: '',
        clModal: true,
        clTitleError: '',
        ...upState,
      })
    }
  }

  // Save or Update column modal
  const saveClModal = () => {
    if (state.clTitle === '') {
      updateState({ clTitleError: 'Please enter column name' })
    } else {
      const updatedClData = {
        id: state.clEditIndex === -1 ? db.getId('columns') : state.clEditIndex,
        order:
          state.clOrder === 0
            ? db.getOrderNumber('columns', 'workspaces', id)
            : state.clOrder,
        workspaces_id: parseInt(id),
        title: state.clTitle,
        created_at:
          state.clEditIndex === -1
            ? helper.setCreatedTime()
            : state.clCreatedAt,
      }
      db.updateTable('columns', updatedClData, state.clEditIndex)
      updateState({ clData: getColumnData(), clModal: false })
    }
  }

  // Delete column
  const deleteClItem = (cid) => {
    db.deleteTable('columns', cid)
    updateState({ clData: getColumnData() })
  }

  // Create or Edit task modal
  const openTsModal = (columnId, payload = null, upState) => {
    if (payload) {
      const attachments = db.getTableDataByRelationId(
        'attachments',
        'tasks',
        payload.id
      )
      updateState({
        tsTitle: payload.title,
        tsDescription: payload.description,
        tsCreatedAt: payload.created_at,
        tsEditIndex: payload.id,
        tsAttachments: attachments,
        tsColumnId: columnId,
        tsOrder: payload.order,
        tsModal: true,
        tsTitleError: '',
        ...upState,
      })
    } else {
      updateState({
        tsTitle: '',
        tsDescription: '',
        tsEditIndex: -1,
        tsAttachments: [],
        tsCreatedAt: '',
        tsColumnId: columnId,
        tsOrder: 0,
        tsModal: true,
        tsTitleError: '',
        ...upState,
      })
    }
  }

  // Save or Update task modal
  const saveTsModal = () => {
    if (state.tsTitle === '') {
      updateState({ tsTitleError: 'Please enter task name' })
    } else {
      const taskId =
        state.tsEditIndex === -1 ? db.getId('tasks') : state.tsEditIndex
      const order =
        state.tsOrder === 0
          ? db.getOrderNumber('tasks', 'columns', state.tsColumnId)
          : state.tsOrder
      const createdAt =
        state.tsEditIndex === -1 ? helper.setCreatedTime() : state.tsCreatedAt

      const updateTsData = {
        id: taskId,
        order: order,
        columns_id: state.tsColumnId,
        workspaces_id: parseInt(id),
        title: state.tsTitle,
        description: state.tsDescription,
        created_at: createdAt,
      }

      state.tsAttachments.forEach((tsa) => {
        if (tsa.id < 0) {
          const attachId = db.getId('attachments')
          const attachment = {
            ...tsa,
            id: attachId,
            tasks_id: taskId,
            workspaces_id: parseInt(id),
            created_at: helper.setCreatedTime(),
          }

          db.updateTable('attachments', attachment)
        }
      })
      db.updateTable('tasks', updateTsData, state.tsEditIndex)

      const attachments = db.getTableDataByRelationId(
        'attachments',
        'tasks',
        taskId
      )
      updateState({
        tsData: getTaskData(),
        tsModal: false,
        vtsColumn: db.getTableDataById('columns', state.tsColumnId),
        tsAttachment: attachments,
        vtsTask: db.getTableDataById('tasks', taskId),
        vtsModal: true,
      })
    }
  }

  // Delete task modal
  const deleteTsItem = (tid) => {
    db.deleteTable('tasks', tid)
    updateState({ tsData: getTaskData() })
  }

  // View task modal
  const openVtsModal = (column, task) => {
    const attachments = db.getTableDataByRelationId(
      'attachments',
      'tasks',
      task.id
    )
    console.log(attachments)
    updateState({
      vtsColumn: column,
      vtsTask: task,
      vtsModal: true,
      tsAttachments: attachments,
    })
  }

  // Open column list for sorting task
  const openColumnList = (clId, task) => {
    updateState({
      lclId: clId,
      ltsData: task,
      lsModal: true,
    })
  }

  // Update task column after sorting from one column to another column
  const updateTaskColumn = (clId) => {
    const updateTsData = {
      ...state.ltsData,
      columns_id: clId,
    }
    db.updateTable('tasks', updateTsData, state.ltsData.id)
    updateState({ tsData: getTaskData(), lsModal: false })
  }

  const value = {
    id,
    ...state,
    updateState,
    openClModal,
    saveClModal,
    deleteClItem,
    openTsModal,
    saveTsModal,
    deleteTsItem,
    openVtsModal,
    openColumnList,
    updateTaskColumn,
  }

  return <TsContext.Provider value={value}>{props.children}</TsContext.Provider>
}

export const useTsContext = () => useContext(TsContext)
