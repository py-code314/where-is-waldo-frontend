/* -------------------- Components -------------------- */
import App from '../App'
import Homepage from '../pages/home/Homepage'
import DefaultMainLayout from '../components/layouts/main/DefaultMainLayout'
import GamePage from '../pages/game-page/GamePage'

/* Array of routes */
const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Homepage />,
        children: [
          { index: true, element: <DefaultMainLayout /> },
          { path: '/home', element: <DefaultMainLayout /> },
          { path: '/scene', element: <GamePage /> },
        ],
      },
    ],
  },
]

export default routes
