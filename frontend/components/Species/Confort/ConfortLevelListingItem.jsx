import { ConfortType } from "../../../lib/utils"
import React from 'react'
import { TextField, Paper, Stack, Fab, Typography } from '@mui/material';
import { useTheme } from '@mui/material';
import * as Yup from "yup";
import useValidations from '../../../lib/hooks/useValidations'
import EditIcon from '@mui/icons-material/Edit';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import SelectableConfortLevelList from './SelectableConfortLevelList'

export default function ConfortLevelListingItem({ confortType, confortLevel, saveConfortLevelChanges }) {
    const [isEditing, setEditing] = React.useState(false);

    const [confortLevelEdit, setConfortLevelEdit] = React.useState(parseInt(confortLevel.ConfortLevel));
    const handleConfortLevelEditChange = (e) => setConfortLevelEdit(e.target.value);

    const theme = useTheme()

    const {
        formValue: minimalTHIEdit,
        handleChange: minimalTHIChange,
        isValueValid: isMinimalTHIValid
    } = useValidations(parseInt(confortLevel.MinimalTHI), Yup.number().required());

    function handleMinimalTHIChange(e) {
        minimalTHIChange({ target: { value: parseInt(e.target.value) } });
    }

    const {
        formValue: maximumTHIEdit,
        handleChange: maximumTHIChange,
        isValueValid: isMaximumTHIValid
    } = useValidations(parseInt(confortLevel.MaximumTHI), Yup.number().required());

    function handleMaximumTHIChange(e) {
        maximumTHIChange({ target: { value: parseInt(e.target.value) } });
    }


    const {
        formValue: minimalBGTHIEdit,
        handleChange: minimalBGTHIChange,
        isValueValid: isMinimalBGTHIValid
    } = useValidations(parseInt(confortLevel.MinimalBGTHI), Yup.number().required());

    function handleMinimaBGTHIChange(e) {
        minimalBGTHIChange({ target: { value: parseInt(e.target.value) } });
    }

    const {
        formValue: maximumBGTHIEdit,
        handleChange: maximumBGTHIChange,
        isValueValid: isMaximumBGTHIValid
    } = useValidations(parseInt(confortLevel.MaximumBGTHI), Yup.number().required());

    function handleMaximumBGTHIChange(e) {
        maximumBGTHIChange({ target: { value: parseInt(e.target.value) } });
    }



    const {
        formValue: minimalTemperatureEdit,
        handleChange: minimalTemperatureEditChange,
        isValueValid: isMinimalTemperatureEditValid
    } = useValidations(parseInt(confortLevel.MinimalTemperature), Yup.number().required());

    function handleMinimalTemperatureEditChange(e) {
        minimalTemperatureEditChange({ target: { value: parseInt(e.target.value) } });
    }

    const {
        formValue: maximumTemperatureEdit,
        handleChange: maximumTemperatureEditChange,
        isValueValid: isMaximumTemperatureEditValid
    } = useValidations(parseInt(confortLevel.MaximumTemperature), Yup.number().required());

    function handleMaximumTemperatureEditChange(e) {
        maximumTemperatureEditChange({ target: { value: parseInt(e.target.value) } });
    }

    const {
        formValue: minimalHumidityEdit,
        handleChange: minimalHumidityEditChange,
        isValueValid: isMinimalHumidityEditValid
    } = useValidations(parseInt(confortLevel.MinimalHumidity), Yup.number().required());

    function handleMinimalHumidityEditChange(e) {
        minimalHumidityEditChange({ target: { value: parseInt(e.target.value) } });
    }

    const {
        formValue: maximumHumidityEdit,
        handleChange: maximumHumidityEditChange,
        isValueValid: isMaximumHumidityEditValid
    } = useValidations(parseInt(confortLevel.MaximumBGTHI), Yup.number().required());

    function handleMaximumHumidityEditChange(e) {
        maximumHumidityEditChange({ target: { value: parseInt(e.target.value) } });
    }

    function EditingButton({ onSaveChanges }) {
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

    function getConfortLevelTags() {
        if (!isEditing) return { value: parseInt(confortLevel.ConfortLevel), disabled: true }

        return {
            value: confortLevelEdit,
            onChange: handleConfortLevelEditChange
        }
    }

    if (confortType === ConfortType.THI) {
        function getMinimalTHITags() {
            if (!isEditing) return { value: parseInt(confortLevel.MinimalTHI), disabled: true }

            return {
                value: minimalTHIEdit,
                onChange: handleMinimalTHIChange
            }
        }

        function getMaximumTHITags() {
            if (!isEditing) return { value: parseInt(confortLevel.MaximumTHI), disabled: true }

            return {
                value: maximumTHIEdit,
                onChange: handleMaximumTHIChange
            }
        }

        async function onSaveChange() {
            if (minimalTHIEdit !== confortLevel.MinimalTHI || maximumTHIEdit !== confortLevel.MaximumTHI || confortLevelEdit !== confortLevel.ConfortLevel)
                await saveConfortLevelChanges(confortLevel.Id, confortType, { MinimalTHI: minimalTHIEdit, MaximumTHI: maximumTHIEdit, ConfortLevel: confortLevelEdit });
            setEditing(false);
        }

        return (<Paper sx={{ padding: 1 }} style={{ width: '100%' }}>
            <Stack direction="row" gap={1} alignItems='center' justifyContent='flex-start'>
                <TextField
                    {...getMinimalTHITags()}
                    label="ITU Minimo"
                    type="number"
                    required
                    style={{ width: '25%' }}
                    InputLabelProps={{ shrink: true }}
                />
                <TextField
                    label="ITU Maximo"
                    type="number"
                    required
                    {...getMaximumTHITags()}
                    style={{ width: '25%' }}
                    InputLabelProps={{ shrink: true }}
                />
                <SelectableConfortLevelList
                    getTags={getConfortLevelTags}
                />
                <EditingButton onSaveChanges={onSaveChange} />
            </Stack>
        </Paper>)
    } else if (confortType === ConfortType.TH) {
        function getMinimalTemperatureTags() {
            if (!isEditing) return { value: parseInt(confortLevel.MinimalTemperature), disabled: true }

            return {
                value: minimalTemperatureEdit,
                onChange: handleMinimalTemperatureEditChange
            }
        }

        function getMinimalHumidityTags() {
            if (!isEditing) return { value: parseInt(confortLevel.MinimalHumidity), disabled: true }

            return {
                value: minimalHumidityEdit,
                onChange: handleMinimalHumidityEditChange
            }
        }

        function getMaximumTemperatureTags() {
            if (!isEditing) return { value: parseInt(confortLevel.MaximumTemperature), disabled: true }

            return {
                value: maximumTemperatureEdit,
                onChange: handleMaximumTemperatureEditChange
            }
        }

        function getMaximumHumidityTags() {
            if (!isEditing) return { value: parseInt(confortLevel.MaximumHumidity), disabled: true }

            return {
                value: maximumHumidityEdit,
                onChange: handleMaximumHumidityEditChange
            }
        }

        async function onSaveChange() {
            if (
                minimalHumidityEdit !== confortLevel.MinimalHumidity ||
                maximumHumidityEdit !== confortLevel.MaximumHumidity ||
                confortLevelEdit !== confortLevel.ConfortLevel ||
                minimalTemperatureEdit !== confortLevel.MinimalTemperature ||
                maximumTemperatureEdit !== confortLevel.MaximumTemperature
            )
                await saveConfortLevelChanges(
                    confortLevel.Id,
                    confortType,
                    {
                        MinimalHumidity: minimalHumidityEdit,
                        MaximumHumidity: maximumHumidityEdit,
                        MinimalTemperature: minimalTemperatureEdit,
                        MaximumTemperature: maximumTemperatureEdit,
                        ConfortLevel: confortLevelEdit
                    }
                );

            setEditing(false);
        }

        return (<Paper sx={{ padding: 1 }} style={{ width: '100%' }}>
            <Stack direction="row" gap={1} alignItems='center' justifyContent='flex-start'>


                <Stack direction='column' gap={1} style={{ width: "65%" }}>
                    <Stack direction="row" gap={1}>
                        <TextField
                            {...getMinimalTemperatureTags()}
                            label="Temp Minima"
                            type="number"
                            required
                            style={{ width: '45%' }}
                            InputLabelProps={{ shrink: true }}
                        />
                        <TextField
                            label="Temp Maxima"
                            type="number"
                            {...getMaximumTemperatureTags()}
                            required
                            style={{ width: '45%' }}
                            InputLabelProps={{ shrink: true }}
                        />
                    </Stack>
                    <Stack direction="row" gap={1}>
                        <TextField
                            {...getMinimalHumidityTags()}
                            label="Umidade Minima"
                            type="number"
                            required
                            style={{ width: '45%' }}
                            InputLabelProps={{ shrink: true }}
                        />
                        <TextField
                            label="Umidade Maxima"
                            type="number"
                            {...getMaximumHumidityTags()}
                            required
                            style={{ width: '45%' }}
                            InputLabelProps={{ shrink: true }}
                        />
                    </Stack>

                </Stack>

                <Stack direction='column' gap={1} style={{ width: "25%" }} >
                    <SelectableConfortLevelList
                        getTags={getConfortLevelTags}
                    />
                </Stack>

                <Stack direction='column' gap={1} style={{ width: "10%" }} >
                    <EditingButton onSaveChanges={onSaveChange} />
                </Stack>

            </Stack>
        </Paper>)
    } else if (confortType === ConfortType.BGTHI) {
        function getMinimalBGTHITags() {
            if (!isEditing) return { value: parseInt(confortLevel.MinimalBGTHI), disabled: true }

            return {
                value: minimalBGTHIEdit,
                onChange: handleMinimaBGTHIChange
            }
        }

        function getMaximumBGTHITags() {
            if (!isEditing) return { value: parseInt(confortLevel.MaximumBGTHI), disabled: true }

            return {
                value: maximumBGTHIEdit,
                onChange: handleMaximumBGTHIChange
            }
        }

        async function onSaveChange() {
            if (minimalTHIEdit !== confortLevel.MinimalBGTHI || maximumTHIEdit !== confortLevel.MaximumBGTHI || confortLevelEdit !== confortLevel.ConfortLevel)
                await saveConfortLevelChanges(confortLevel.Id, confortType, { MinimalBGTHI: minimalTHIEdit, MaximumBGTHI: maximumTHIEdit, ConfortLevel: confortLevelEdit });
            setEditing(false);
        }

        return (<Paper sx={{ padding: 1 }} style={{ width: '100%' }}>
            <Stack direction="row" gap={1} alignItems='center' justifyContent='flex-start'>
                <TextField
                    {...getMinimalBGTHITags()}
                    label="ITGU Minimo"
                    type="number"
                    required
                    style={{ width: '25%' }}
                    InputLabelProps={{ shrink: true }}
                />
                <TextField
                    label="ITGU Maximo"
                    type="number"
                    {...getMaximumBGTHITags()}
                    required
                    style={{ width: '25%' }}
                    InputLabelProps={{ shrink: true }}
                />
                <SelectableConfortLevelList
                    getTags={getConfortLevelTags}
                />
                <EditingButton onSaveChanges={onSaveChange} />
            </Stack>
        </Paper>)
    }

    return (<Typography variant="subtitle1" component="div">
        Erro desconhecido.
    </Typography>);
}