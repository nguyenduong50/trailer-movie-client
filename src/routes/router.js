import {createBrowserRouter} from "react-router-dom";

import Browse from '../pages/browse/Browse';
import Search from '../pages/search/Search';
import NotFound from '../pages/ErrorPage/NotFound';
import SearchAdvanced from '../pages/search/SearchAdvanced';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Browse />,
    },
    {
        path: '/search',
        element: <Search />
    },
    {
        path: '/search-advanced',
        element: <SearchAdvanced/>
    },
    {
        path: '*',
        element: <NotFound/>
    },
]);

export {router};