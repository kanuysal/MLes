import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Main from './components/Main'
import LoadingPage from './components/_layouts/LoadingPage'
import { TaskContext } from './contexts/TaskContext'
import { WorkspaceContext } from './contexts/WorkspaceContext'

const Workspace = React.lazy(() => import('./components/Workspace'))
const Task = React.lazy(() => import('./components/Task'))
const NotFound = React.lazy(() => import('./components/Error/NotFound'))

function App() {
  return (
    <BrowserRouter basename="/planificateur-de-mariage">
      <Routes>
        <Route element={<Main />}>
          
          {/* APP HOME */}
          <Route
            index
            element={
              <React.Suspense fallback={<LoadingPage />}>
                <WorkspaceContext>
                  <Workspace />
                </WorkspaceContext>
              </React.Suspense>
            }
          />

          {/* WORKSPACE */}
          <Route
            path="workspace/:id"
            element={
              <React.Suspense fallback={<LoadingPage />}>
                <TaskContext>
                  <Task />
                </TaskContext>
              </React.Suspense>
            }
          />

          {/* 404 INSIDE APP ONLY */}
          <Route path="*" element={<NotFound />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;