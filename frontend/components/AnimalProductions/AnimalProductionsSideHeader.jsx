import { Typography, Fab, Stack, Paper, Button } from '@mui/material'
import React from 'react'
import { useTheme } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

export default function AnimalProductionsSideHeader({ onInsert }) {
    const theme = useTheme()

    return (<Paper sx={{ padding: 1 }} style={{ width: '100%' }}>
        <Stack direction="row" gap={1} alignItems='center' justifyContent='flex-end'>
            <Stack direction='column' gap={0} style={{ marginRight: 'auto' }}>
                <Typography variant="h5" component="div">
                    Producoes animais
                </Typography>
                <Typography variant="subtitle1" component="div">
                    Inserir e visualizar produções
                </Typography>
            </Stack>
            <Fab color='primary' onClick={onInsert}>
                <AddIcon sx={{ color: theme.palette.background.default }} />
            </Fab>
        </Stack>
    </Paper>);
}