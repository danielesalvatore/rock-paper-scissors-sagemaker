import React from 'react';
import {Icon, Menu} from 'semantic-ui-react'

function TopMenu({handleSignOut, userAttributes}) {
    return (
        <Menu stackable pointing>
            <Menu.Item>
                <Icon name='hand scissors outline'/>
            </Menu.Item>

            <Menu.Item
                name='logout'
                position='right'
                onClick={handleSignOut}
            >
                Logout
            </Menu.Item>
        </Menu>
    );
}

export default TopMenu;
