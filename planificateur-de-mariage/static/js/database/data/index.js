import _ from 'lodash'

const dbTable = {
  settings: require('./settings.json'),
  workspaces: require('./workspaces.json'),
  columns: require('./columns.json'),
  tasks: require('./tasks.json'),
  attachments: require('./attachments.json'),
}

export const getId = (table) => {
  const tableDetails = dbTable.settings.find((st) => st.table === table)
  return tableDetails.length + 1
}

export const getTableData = (table) => {
  return dbTable[table]
}

export const getTableDataById = (table, id) => {
  return dbTable[table].find((i) => i.id === parseInt(id))
}

export const getTableDataByRelationId = (
  table,
  attachTable,
  id,
  orderBy = false,
  sorting = 'asc'
) => {
  let items = dbTable[table].filter(
    (dt) => dt[attachTable + '_id'] === parseInt(id)
  )
  if (orderBy) return _.sortBy(items, ['order'], [sorting])
  return items
}

export const getAttachmentTableSize = () => {
  let totalSize = 0
  getTableData('attachments').forEach((at) => {
    totalSize += at.size
  })
  return totalSize
}

export const updateTable = (table, payload, id = -1) => {
  if (id === -1) {
    dbTable.settings = dbTable.settings.map((st) => {
      if (st.table === table) {
        return {
          ...st,
          length: payload.id,
        }
      }
      return st
    })
    dbTable[table].push(payload)
  } else {
    dbTable[table] = dbTable[table].map((pl) => {
      if (pl.id === payload.id) {
        return {
          ...pl,
          ...payload,
        }
      }
      return pl
    })
  }
}

export const deleteTable = (table, id) => {
  dbTable[table] = dbTable[table].filter((tbl) => tbl.id !== id)

  const settingTable = dbTable.settings.find((st) => st.table === table)
  for (let i = 0; i < settingTable.relations.length; i++) {
    deleteRelatedTable(settingTable.relations[i], table, id)
  }

  return getTableData(table)
}

export const deleteRelatedTable = (relatedTable, belongTable, id) => {
  dbTable[relatedTable] = dbTable[relatedTable]?.filter((rt) => {
    if (rt[belongTable + '_id'] === id) {
      const settingTable = dbTable.settings.find(
        (st) => st.table === relatedTable
      )
      for (let i = 0; i < settingTable.relations.length; i++) {
        deleteRelatedTable(settingTable.relations[i], relatedTable, rt.id)
      }
      return false
    }
    return true
  })
}

export const getOrderNumber = (table, belongTable = null, id = null) => {
  let items = getTableData(table)
  if (belongTable && id) {
    items = items.filter((it) => it[belongTable + '_id'] === parseInt(id))
  }
  const orders = items.map((it) => {
    return it.order
  })
  return _.max(orders) + 1
}

export const exportDb = (payload = null) => {
  const exportDb = {
    workspaces: payload
      ? dbTable.workspaces.filter((ws) => ws.id === parseInt(payload.id))
      : dbTable.workspaces,
    columns: payload
      ? dbTable.columns.filter(
          (cl) => cl.workspaces_id === parseInt(payload.id)
        )
      : dbTable.columns,
    tasks: payload
      ? dbTable.tasks.filter((ts) => ts.workspaces_id === parseInt(payload.id))
      : dbTable.tasks,
    attachments: payload
      ? dbTable.attachments.filter(
          (at) => at.workspaces_id === parseInt(payload.id)
        )
      : dbTable.attachments,
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

export const importDb = () => {
  alert('Import workspace disabled in demo mode')
}
