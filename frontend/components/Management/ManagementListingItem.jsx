import { Typography, Stack, Paper, Button, Fab } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link'
import { useTheme } from '@mui/material';
import React from 'react'

export default function ManagementListingItem({ options: { subtitle, entity: { Id, Name }, routeTemplate } }) {
    function FormatUnicorn(str, formatArgs) {
        "use strict";

        for (let key in formatArgs) {
            str = str.replace(new RegExp("\\{" + key + "\\}", "gi"), formatArgs[key]);
        }

        return str;
    };
    const route = FormatUnicorn(routeTemplate, { Id });
    const theme = useTheme();

    return (<Paper sx={{ padding: 1 }} style={{ width: '80%' }}>
        <Stack direction="row" gap={1} alignItems='center' justifyContent='space-between'>
            <Stack direction='column' gap={0} style={{ marginRight: 'auto' }}>
                <Typography variant="h5" component="div">
                    {Name}
                </Typography>
                <Typography variant="subtitle1" component="div">
                    {subtitle}
                </Typography>
            </Stack>
            <Link href={route} passHref>
                <Fab color='primary'>
                    <MenuIcon sx={{ color: theme.palette.background.default }} />
                </Fab>
            </Link>
        </Stack>
    </Paper>);
}