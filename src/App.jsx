import React, { memo } from 'react'
import routes from '../src/router'
import {HashRouter} from 'react-router-dom'
import {renderRoutes} from 'react-router-config'
import Discover from './pages/Discover'
import Yorn from './pages/Yorn'

export default memo(function App() {
    return (
        <HashRouter>
            The first route：<Discover/>
            The mounted route：{renderRoutes(routes)}
            The second route:<Yorn/>
        </HashRouter>
    )
})
