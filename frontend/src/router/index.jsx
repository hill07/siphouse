import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';
import Schemes from '../pages/Schemes';
import SchemeDetail from '../pages/SchemeDetail';
import Docs from '../pages/Docs';
import AppLayout from '../App';

const router = createBrowserRouter([
    {
        path: '/',
        element: <AppLayout />,
        children: [
            { path: '/', element: <Home /> },
            { path: '/schemes', element: <Schemes /> },
            { path: '/scheme/:code', element: <SchemeDetail /> },
            { path: '/docs', element: <Docs /> }
        ]
    }
]);

export default router;
