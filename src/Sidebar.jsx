import React from 'react';
import { motion } from 'framer-motion';
import { FaHome, FaSearch } from 'react-icons/fa'; // Example icons
import cn from "classnames";

const Sidebar = ({ width, setWidth }) => {
    const negxSnapPoint = 130; // Point at which to snap to 60
    const posxSnapPoint = 170; // Point at which to snap to 300
    const minWidth = 60; // Width to snap to
    const expandedWidth = 300; // Default expanded width
    const maxSidebarWidth = 500; // Max width
    const [isDragging, setIsDragging] = React.useState(false);
    const [isHovered, setIsHovered] = React.useState(false);
    const [isSnappedToMin, setIsSnappedToMin] = React.useState(false);
    const sidebarRef = React.useRef();

    const handleDrag = (event, info) => {
        const draggingRight = info.delta.x > 0; // Determine drag direction
        let newWidth = width + info.delta.x;
    
        // Snap to snapTo if dragging left and width is less than negxSnapPoint
        if (!draggingRight && newWidth < negxSnapPoint && !isSnappedToMin) {
            console.log("in here")
            setIsSnappedToMin(true);
            newWidth = minWidth;
            // setWidth(newWidth);
        } 

        // Snap to expandedWidth if dragging right and width is greater than posxSnapPoint
        if (draggingRight && newWidth > posxSnapPoint && isSnappedToMin) {
            console.log("in here")
            setIsSnappedToMin(false);
            newWidth = expandedWidth;
            // setWidth(newWidth);
        } 
    
        // Enforce the snapTo and maxSidebarWidth boundaries
        if (draggingRight && newWidth <= maxSidebarWidth || !draggingRight && newWidth >= minWidth) {
            setWidth(newWidth);
        }
    };

    // Add "dragging" class when drag starts
    const handleDragStart = () => {
        setIsDragging(true);
    };

    const handleDoubleClick = (event) => {
        const sidebarRect = sidebarRef.current.getBoundingClientRect();
        if (event.clientX >= sidebarRect.right - 10 && event.clientX <= sidebarRect.right) {
            setWidth(prevWidth => {
                if (prevWidth === minWidth) {
                    return expandedWidth;
                } else if (prevWidth === expandedWidth) {
                    return minWidth;
                } else {
                    return expandedWidth
                }
            });
        }
    };

    const handleMouseMove = (event) => {
        const sidebarRect = sidebarRef.current.getBoundingClientRect();
        if (event.clientX >= sidebarRect.right - 10 && event.clientX <= sidebarRect.right) { // 10px threshold for the right edge
            setIsHovered(true);
        } else {
            setIsHovered(false);
        }
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    // Remove "dragging" class when drag ends
    const handleDragEnd = () => {
        setIsDragging(false);
    };

    let cursorClassname = "col-resize";
    if (width === minWidth) {
        cursorClassname = 'e-resize';
    } 
    // width is inaccurate when dragging, so we need to check for maxSidebarWidth -1
    else if (width > maxSidebarWidth -1 || width === maxSidebarWidth) {
        cursorClassname = 'w-resize';
    } 

    return (
        <motion.div
            ref={sidebarRef}
            drag="x"
            onDrag={handleDrag}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onDoubleClick={handleDoubleClick}
            style={{ width: `${width}px` }}
            className={cn(`sidebar ${cursorClassname}`, {"divider-dragging": isDragging, "divider-hovered": isHovered})}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0} // No elastic dragging
            dragMomentum={false}
        >
            <div className="menu-item">
                <FaHome />
                {width > negxSnapPoint && <span>Home</span>}
            </div>
            <div className="menu-item">
                <FaSearch />
                {width > negxSnapPoint && <span>Search</span>}
            </div>
            {/* More menu items */}
        </motion.div>
    );
};

export default Sidebar;
