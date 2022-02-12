import { Typography, TextField, Stack, Paper, Button } from '@mui/material'
import React from 'react'

export default function ManagementHeader({ options: { title, subtitle, onInsert, searchFilter, onSearch } }) {

    return (<Paper sx={{ padding: 1 }} style={{ width: '100%' }}>
        <Stack direction="row" gap={1} alignItems='center' justifyContent='flex-end'>
            <Stack direction='column' gap={0} style={{ marginRight: 'auto' }}>
                <Typography variant="h4" component="div">
                    {title}
                </Typography>
                <Typography variant="subtitle1" component="div">
                    {subtitle}
                </Typography>
            </Stack>
            <TextField label="Pesquisa (nome)" type="search" style={{ width: '20%' }} value={searchFilter} onChange={onSearch} />
            <Button size='large' variant="contained" sx={{ color: "#FFFFFF" }} style={{ height: '110%' }} onClick={onInsert}>
                Inserir
            </Button>
        </Stack>
    </Paper>);
}