import React from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DevicesIcon from '@mui/icons-material/Devices';
import BadgeIcon from '@mui/icons-material/Badge';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FileCopyIcon from '@mui/icons-material/FileCopy';
 
export const navData = [
    {
        id: 0,
        icon: <DashboardIcon/>,
        text: "Control Desk",
        link: "/controlDesk"
    },
    {
        id: 1,
        icon: <DevicesIcon/>,
        text: "Devices",
        link: "/devices"
    },
    {
        id: 2,
        icon: <BadgeIcon/>,
        text: "Employees",
        link: "/employees"
    },
    {
        id: 3,
        icon: <AccountCircleIcon/>,
        text: "Accounts",
        link: "/accounts"
    },
    {
        id: 4,
        icon: <FileCopyIcon/>,
        text: "Invoices",
        link: "/invoices"
    }
]