import React from 'react'
import { TextField, Paper, Stack, Fab, Typography } from '@mui/material';
import { useTheme } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import useValidations from '../../../lib/hooks/useValidations';
import * as Yup from "yup";
import EditIcon from '@mui/icons-material/Edit';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ConfortLevelListingItem from './ConfortLevelListingItem';

export default function ConfortGroupListingItem({ confortGroup, confortGroupType, saveAgeChanges, saveConfortLevelChanges, addConfortLevel }) {
    const [isEditing, setEditing] = React.useState(false);
    const [isListing, setListing] = React.useState(false);

    const {
        formValue: minimalAgeEdit,
        handleChange: minimalAgeEditChange,
        isValueValid: isMinimalAgeEditValid
    } = useValidations(parseInt(confortGroup.MinimalAge), Yup.number().required());

    function handleMinimalAgeEditChange(e) {
        minimalAgeEditChange({ target: { value: parseInt(e.target.value) } });
    }

    const {
        formValue: maximumAgeEdit,
        handleChange: maximumAgeEditChange,
        isValueValid: isMaximumAgeEditValid
    } = useValidations(parseInt(confortGroup.MaximumAge), Yup.number().required());

    function handleMaximumAgeEditChange(e) {
        maximumAgeEditChange({ target: { value: parseInt(e.target.value) } });
    }

    const theme = useTheme()

    function getMinimalAgeTags() {
        if (!isEditing) return { value: parseInt(confortGroup.MinimalAge), disabled: true }

        return {
            value: minimalAgeEdit,
            onChange: handleMinimalAgeEditChange
        }
    }

    function getMaximumAgeTags() {
        if (!isEditing) return { value: parseInt(confortGroup.MaximumAge), disabled: true }

        return {
            value: maximumAgeEdit,
            onChange: handleMaximumAgeEditChange
        }
    }

    async function onSaveChanges() {
        if (minimalAgeEdit !== confortGroup.MinimalAge || maximumAgeEdit !== confortGroup.MaximumAge)
            await saveAgeChanges(confortGroup.Id, confortGroupType, minimalAgeEdit, maximumAgeEdit);
        setEditing(false);
    }

    function EditingButton() {
        if (isEditing)
            return (
                <Fab size='small' onClick={onSaveChanges} color='primary' style={{ marginLeft: 'auto' }}>
                    <SaveAsIcon sx={{ color: theme.palette.background.default }} />
                </Fab>
            );

        return <Fab size='small' onClick={() => setEditing(true)} color='primary' style={{ marginLeft: 'auto' }}>
            <EditIcon sx={{ color: theme.palette.background.default }} />
        </Fab>
    }

    function ListingButton() {
        if (isListing)
            return (
                <Fab size='small' onClick={() => setListing(false)} color='primary'>
                    <ArrowDropUpIcon sx={{ color: theme.palette.background.default }} />
                </Fab>
            );

        return <Fab size='small' onClick={() => setListing(true)} color='primary'>
            <ArrowDropDownIcon sx={{ color: theme.palette.background.default }} />
        </Fab>
    }

    function ConfortLevelsListing() {
        if (!isListing) return null;

        if (confortGroup.Conforts.length === 0)
            return (<Paper sx={{ padding: 1 }} style={{ width: '90%' }}>
                <Typography variant="subtitle1" component="div">
                    Adicione niveis de conforto.
                </Typography>
            </Paper>)

        return (<Stack direction='column' alignItems='center' gap={1} style={{ width: '90%' }}>
            {confortGroup.Conforts.map((confortLevel, index) => {
                return <ConfortLevelListingItem
                    key={index}
                    confortType={confortGroupType}
                    confortLevel={confortLevel}
                    saveConfortLevelChanges={saveConfortLevelChanges}
                />
            })}
        </Stack>)
    }

    return (<>
        <Paper sx={{ padding: 1 }} style={{ width: '95%' }}>
            <Stack direction="row" gap={1} alignItems='center' justifyContent='flex-start'>
                <TextField
                    {...getMinimalAgeTags()}
                    label="Idade Minima"
                    type="number"
                    style={{ width: '30%' }}
                    InputLabelProps={{ shrink: true }}
                />
                <TextField
                    label="Idade Maxima"
                    {...getMaximumAgeTags()}
                    type="number"
                    style={{ width: '30%' }}
                    InputLabelProps={{ shrink: true }}
                />

                <EditingButton />
                <Fab size='small' onClick={addConfortLevel} color='primary' >
                    <AddIcon sx={{ color: theme.palette.background.default }} />
                </Fab>
                <ListingButton />
            </Stack>
        </Paper>

        <ConfortLevelsListing />
    </>);
}