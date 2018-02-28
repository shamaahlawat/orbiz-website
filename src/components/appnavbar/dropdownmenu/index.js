import React from 'react';
import { Menu } from 'antd';

const DropdownMenu = (vehicle_types, onMenuClicked) => {
    return (
        <div className="navbarDropdownMenuContainer">
            <Menu theme="dark" onClick={(e) => onMenuClicked(e.key)} selectable={true}>
                <Menu.Item key="0">
                    <span className="font-14 is-font-medium">All</span>
                </Menu.Item>

                {vehicle_types.map((type) => {
                    return (
                        <Menu.Item key={type.name}>
                            <span className="font-14 is-font-medium">{type.name}</span>
                        </Menu.Item>
                    );
                })}
            </Menu>
        </div>
    );
};

export default DropdownMenu;
