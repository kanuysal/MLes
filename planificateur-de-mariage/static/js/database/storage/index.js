import _ from 'lodash'
import workspaces from '../data/workspaces.json'
import columns from '../data/columns.json'
import tasks from '../data/tasks.json'
import attachments from '../data/attachments.json'

export const storage = window.localStorage

export const initialStorageSetting = () => {
  const settings = [
    {
      table: 'workspaces',
      length: 0,
      relations: ['columns', 'tasks', 'attachments'],
      belong: [],
    },
    {
      table: 'columns',
      length: 0,
      relations: ['tasks'],
      belong: ['workspaces'],
    },
    {
      table: 'tasks',
      length: 0,
      relations: ['attachments'],
      belong: ['workspaces', 'columns'],
    },
    {
      table: 'attachments',
      length: 0,
      relations: [],
      belong: ['tasks', 'workspaces'],
    },
  ]

  const setLocalStorageIfEmpty = (key, value) => {
    if (!localStorage.getItem(key) || localStorage.getItem(key) === 'null') {
      localStorage.setItem(key, JSON.stringify(value))
    }
  }

  setLocalStorageIfEmpty('settings', settings)
  setLocalStorageIfEmpty('workspaces', workspaces)
  setLocalStorageIfEmpty('columns', columns)
  setLocalStorageIfEmpty('tasks', tasks)
  setLocalStorageIfEmpty('attachments', attachments)
  return settings
}

export const getLocalStorage = (table) => {
  return JSON.parse(storage.getItem(table))
}

export const setLocalStorage = (table, payload = []) => {
  storage.setItem(table, JSON.stringify(payload))
}

let settings = getLocalStorage('settings') || initialStorageSetting()

export const getId = (table) => {
  const tableDetails = getLocalStorage(table)
  // const tableDetails = settings.find((st) => st.table === table)
  return tableDetails.length + 1
}

export const getTableData = (table) => {
  return getLocalStorage(table)
}

export const getTableDataById = (table, id) => {
  let items = getLocalStorage(table)
  return items.find((i) => i.id === parseInt(id))
}

export const getTableDataByRelationId = (
  table,
  attachTable,
  id,
  orderBy = false,
  sorting = 'asc'
) => {
  let items = getTableData(table).filter(
    (dt) => dt[attachTable + '_id'] === parseInt(id)
  )
  if (orderBy) return _.sortBy(items, ['order'], [sorting])
  return items
}

export const getAttachmentTableSize = () => {
  let totalSize = 0
  getTableData('attachments').forEach((at) => {
    console.log(at.size)

    totalSize += at.size
  })
  return totalSize
}

export const setTableSettingId = (table, id) => {
  settings = settings.map((st) => {
    if (st.table === table) {
      return {
        ...st,
        length: id,
      }
    }
    return st
  })
  setLocalStorage('settings', settings)
}

export const updateTable = (table, payload, id = -1) => {
  let updatedItem = getTableData(table)
  if (id === -1) {
    setTableSettingId(table, payload.id)
    updatedItem.push(payload)
  } else {
    updatedItem = updatedItem.map((pl) => {
      if (pl.id === payload.id) {
        return {
          ...pl,
          ...payload,
        }
      }
      return pl
    })
  }
  setLocalStorage(table, updatedItem)
}

export const deleteTable = (table, id) => {
  const items = getTableData(table).filter((i) => i.id !== parseInt(id))
  setLocalStorage(table, items)

  const settingTable = getTableData('settings').find((st) => st.table === table)
  for (let i = 0; i < settingTable.relations.length; i++) {
    deleteRelatedTable(settingTable.relations[i], table, id)
  }

  return getTableData(table)
}

export const deleteRelatedTable = (relatedTable, belongTable, id) => {
  const items = getTableData(relatedTable)?.filter((rt) => {
    if (rt[belongTable + '_id'] === id) {
      const settingTable = getTableData('settings').find(
        (st) => st.table === relatedTable
      )
      for (let i = 0; i < settingTable.relations.length; i++) {
        deleteRelatedTable(settingTable.relations[i], relatedTable, rt.id)
      }
      return false
    }
    return true
  })
  setLocalStorage(relatedTable, items)
}

export const getOrderNumber = (table, belongTable = null, id = null) => {
  let items = getTableData(table)
  if (belongTable && id) {
    items = items.filter((it) => it[belongTable + '_id'] === parseInt(id))
  }
  const orders = items.map((it) => {
    return it.order
  })
  return (_.max(orders) || 0) + 1
}

export const exportDb = (payload = null) => {
  const exportDb = {
    workspaces: payload
      ? getTableData('workspaces').filter(
          (ws) => ws.id === parseInt(payload.id)
        )
      : getTableData('workspaces'),
    columns: payload
      ? getTableData('columns').filter(
          (cl) => cl.workspaces_id === parseInt(payload.id)
        )
      : getTableData('columns'),
    tasks: payload
      ? getTableData('tasks').filter(
          (ts) => ts.workspaces_id === parseInt(payload.id)
        )
      : getTableData('tasks'),
    attachments: payload
      ? getTableData('attachments').filter(
          (at) => at.workspaces_id === parseInt(payload.id)
        )
      : getTableData('attachments'),
  }
  const url = window.URL.createObjectURL(
    new Blob([JSON.stringify(exportDb)], { type: 'text/json' })
  )
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', payload.title + '.json')
  document.body.appendChild(link)
  link.click()
  link.remove()
}

export const importDb = (payload) => {
  console.log('%cpayload', 'color:red;font-size:50px', payload)
  payload.workspaces.forEach((ws) => {
    const wsId = getId('workspaces')
    let workspaces = getTableData('workspaces')
    workspaces.push({
      ...ws,
      id: wsId,
    })
    setLocalStorage('workspaces', workspaces)
    setTableSettingId('workspaces', wsId)

    payload.columns.forEach((cl) => {
      if (cl.workspaces_id === ws.id) {
        const clId = getId('columns')
        let columns = getTableData('columns')
        columns.push({
          ...cl,
          id: clId,
          workspaces_id: wsId,
        })
        setLocalStorage('columns', columns)
        setTableSettingId('columns', clId)

        payload.tasks.forEach((ts) => {
          if (ts.columns_id === cl.id) {
            const tsId = getId('tasks')
            let tasks = getTableData('tasks')
            tasks.push({
              ...ts,
              id: tsId,
              columns_id: clId,
              workspaces_id: wsId,
            })
            setLocalStorage('tasks', tasks)
            setTableSettingId('tasks', tsId)

            payload.attachments.forEach((at) => {
              if (at.tasks_id === ts.id) {
                const atId = getId('attachments')
                let attachments = getTableData('attachments')
                attachments.push({
                  ...at,
                  id: atId,
                  tasks_id: tsId,
                  workspaces_id: wsId,
                })
                setLocalStorage('attachments', attachments)
                setTableSettingId('attachments', atId)
              }
            })
          }
        })
      }
    })
  })
}
