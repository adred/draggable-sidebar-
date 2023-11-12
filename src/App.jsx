import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Content from './Content';

function App() {
    const [sidebarWidth, setSidebarWidth] = useState(300); // Set default width to 300

    return (
        <div className="app-container">
            <Sidebar width={sidebarWidth} setWidth={setSidebarWidth} />
            <Content />
        </div>
    );
}

export default App;
