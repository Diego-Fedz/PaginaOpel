import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import RootLayout from './components/RootLayout.jsx'
import MenuCoches from './components/MenuCoches.jsx'
import DetalleCoche from './components/DetalleCoche.jsx'
import { RootProvider } from './context/RootContext.jsx';
const router = createBrowserRouter([
 {
   path: '/',
   element: <RootLayout />,
   children: [
     {
       //path: '/',
       index : true,
       element: <MenuCoches/>,
     },
     {
       path: 'modelo/:idmodelo/acabados',
       element: <DetalleCoche/>,
     },
    
   ],
 },
]);

const App = () => {
   return (
    <RootProvider>
      <RouterProvider router={router} />
    </RootProvider>

          //Asi es como se renderiza la app cuando no usas el context
           //<RouterProvider router={router} />
   );
}

export default App