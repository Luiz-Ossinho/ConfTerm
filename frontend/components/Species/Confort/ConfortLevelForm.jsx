import { Modal, Typography, Paper, Stack, TextField, Button } from '@mui/material';
import * as Yup from "yup";
import { useTheme } from '@mui/material';
import useValidations from '../../../lib/hooks/useValidations'
import { ConfortType } from '../../../lib/utils'
import SelectableConfortLevelList from './SelectableConfortLevelList';
import React from 'react'

export default function ConfortLevelForm({ isOpen, handleClose, onAddEvent, confortType, confortGroupId }) {
    const theme = useTheme();

    const [confortLevel, setConfortLevel] = React.useState(0);
    const handleConfortLevelChange = (e) => setConfortLevel(e.target.value);

    const {
        formValue: minimalTHI,
        handleChange: minimalTHIChange,
        isValueValid: isMinimalTHIValid
    } = useValidations(0, Yup.number().required());

    function handleMinimalTHIChange(e) {
        minimalTHIChange({ target: { value: e.target.value ? parseInt(e.target.value) : e.target.value } });
    }

    const {
        formValue: maximumTHI,
        handleChange: maximumTHIChange,
        isValueValid: isMaximumTHIValid
    } = useValidations(100, Yup.number().required());

    function handleMaximumTHIChange(e) {
        maximumTHIChange({ target: { value: e.target.value ? parseInt(e.target.value) : e.target.value } });
    }



    const {
        formValue: minimalBGTHI,
        handleChange: minimalBGTHIChange,
        isValueValid: isMinimalBGTHIValid
    } = useValidations(0, Yup.number().required());

    function handleMinimalBGTHIChange(e) {
        minimalBGTHIChange({ target: { value: e.target.value ? parseInt(e.target.value) : e.target.value } });
    }

    const {
        formValue: maximumBGTHI,
        handleChange: maximumBGTHIChange,
        isValueValid: isMaximumBGTHIValid
    } = useValidations(100, Yup.number().required());

    function handleMaximumBGTHIChange(e) {
        maximumBGTHIChange({ target: { value: e.target.value ? parseInt(e.target.value) : e.target.value } });
    }



    const {
        formValue: minimalTemperatureEdit,
        handleChange: minimalTemperatureEditChange,
        isValueValid: isMinimalTemperatureEditValid
    } = useValidations(0, Yup.number().required());

    function handleMinimalTemperatureEditChange(e) {
        minimalTemperatureEditChange({ target: { value: parseInt(e.target.value) } });
    }

    const {
        formValue: maximumTemperatureEdit,
        handleChange: maximumTemperatureEditChange,
        isValueValid: isMaximumTemperatureEditValid
    } = useValidations(100, Yup.number().required());

    function handleMaximumTemperatureEditChange(e) {
        maximumTemperatureEditChange({ target: { value: parseInt(e.target.value) } });
    }

    const {
        formValue: minimalHumidityEdit,
        handleChange: minimalHumidityEditChange,
        isValueValid: isMinimalHumidityEditValid
    } = useValidations(0, Yup.number().required());

    function handleMinimalHumidityEditChange(e) {
        minimalHumidityEditChange({ target: { value: parseInt(e.target.value) } });
    }

    const {
        formValue: maximumHumidityEdit,
        handleChange: maximumHumidityEditChange,
        isValueValid: isMaximumHumidityEditValid
    } = useValidations(100, Yup.number().required());

    function handleMaximumHumidityEditChange(e) {
        maximumHumidityEditChange({ target: { value: parseInt(e.target.value) } });
    }

    function ConfortLevelSelect() {
        return <SelectableConfortLevelList
            getTags={() => {
                return {
                    value: confortLevel,
                    onChange: handleConfortLevelChange
                }
            }}
        />
    }

    function getButtonTags(test) {
        if (test) return {};

        return { disabled: true };
    }

    function InsertButton({ onInsert, test }) {
        return <Button {...getButtonTags(test)} onClick={onInsert} variant="contained" fullWidth sx={{ color: theme.palette.background.default }}>
            Inserir
        </Button>
    }

    if (confortType === ConfortType.THI) {
        function getMinimalTHITags() {
            if (!isMinimalTHIValid)
                return { error: true, helperText: "ITU invalido!" };

            return {};
        }


        function getMaximumTHITags() {
            if (!isMaximumTHIValid)
                return { error: true, helperText: "ITU invalido!" };

            return {};
        }

        function onClose() {
            handleMinimalTHIChange({ target: { value: 0 } });
            handleMaximumTHIChange({ target: { value: 100 } });
            handleClose();
        }

        async function onInsert() {
            await onAddEvent(
                confortGroupId,
                {
                    MinimalTHI: minimalTHI,
                    MaximumTHI: maximumTHI
                },
                confortLevel,
                confortType
            );
            onClose()
        }

        return (
            <Modal
                open={isOpen}
                onClose={onClose}
            >
                <Paper style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    p: 4
                }}>
                    <Stack padding='20px' gap={2} direction='column' alignItems='flex-start'>
                        <Typography variant="h5" alignSelf="stretch" component="div">
                            Inserir Nivel de Conforto ITU
                        </Typography>
                        <Stack direction="row" gap={1} alignItems='center' justifyContent='space-between'>
                            <TextField
                                {...getMinimalTHITags()}
                                value={minimalTHI}
                                onChange={handleMinimalTHIChange}
                                label="ITU Minimo"
                                type="number"
                                style={{ width: "35%" }}
                                required
                                variant="outlined"
                            />
                            <TextField
                                {...getMaximumTHITags}
                                value={maximumTHI}
                                onChange={handleMaximumTHIChange}
                                label="ITU Maximo"
                                style={{ width: "35%" }}
                                type="number"
                                required
                                variant="outlined"
                            />
                            <ConfortLevelSelect />
                        </Stack>

                        <InsertButton onInsert={onInsert} test={isMinimalTHIValid && isMaximumTHIValid} />
                    </Stack>
                </Paper>
            </Modal>
        );
    } else if (confortType === ConfortType.BGTHI) {
        function getMinimalBGTHITags() {
            if (!isMinimalBGTHIValid)
                return { error: true, helperText: "ITGU invalido!" };

            return {};
        }


        function getMaximumBGTHITags() {
            if (!isMaximumBGTHIValid)
                return { error: true, helperText: "ITGU invalido!" };

            return {};
        }

        function onClose() {
            handleMinimalBGTHIChange({ target: { value: 0 } });
            handleMaximumBGTHIChange({ target: { value: 100 } });
            handleClose();
        }

        async function onInsert() {
            await onAddEvent(
                confortGroupId,
                {
                    MaximumBGTHI: maximumBGTHI,
                    MinimalBGTHI: minimalBGTHI
                },
                confortLevel,
                confortType
            );
            onClose()
        }

        return (
            <Modal
                open={isOpen}
                onClose={onClose}
            >
                <Paper style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    p: 4
                }}>
                    <Stack padding='20px' gap={2} direction='column' alignItems='flex-start'>
                        <Typography variant="h5" alignSelf="stretch" component="div">
                            Inserir Nivel de Conforto ITGU
                        </Typography>
                        <Stack direction="row" gap={1} alignItems='center' justifyContent='space-between'>
                            <TextField
                                {...getMinimalBGTHITags()}
                                value={minimalBGTHI}
                                onChange={handleMinimalBGTHIChange}
                                label="ITGU Minimo"
                                type="number"
                                style={{ width: "35%" }}
                                required
                                variant="outlined"
                            />
                            <TextField
                                {...getMaximumBGTHITags}
                                value={maximumBGTHI}
                                onChange={handleMaximumBGTHIChange}
                                label="ITGU Maximo"
                                style={{ width: "35%" }}
                                type="number"
                                required
                                variant="outlined"
                            />
                            <ConfortLevelSelect />
                        </Stack>

                        <InsertButton onInsert={onInsert} test={isMinimalBGTHIValid && isMaximumBGTHIValid} />
                    </Stack>
                </Paper>
            </Modal>
        );
    } else if (confortType === ConfortType.TH) {
        function getMinimalTemperatureTags() {
            if (!isMinimalTemperatureEditValid)
                return { error: true, helperText: "Temperatura invalida!" };

            return {};
        }

        function getMinimalHumidityTags() {
            if (!isMinimalHumidityEditValid)
                return { error: true, helperText: "Umidade invalida!" };

            return {};
        }

        function getMaximumTemperatureTags() {
            if (!isMaximumTemperatureEditValid)
                return { error: true, helperText: "Temperatura invalida!" };

            return {};
        }

        function getMaximumHumidityTags() {
            if (!isMaximumHumidityEditValid)
                return { error: true, helperText: "Umidade invalida!" };

            return {};
        }

        function onClose() {
            handleMinimalTemperatureEditChange({ target: { value: 0 } });
            handleMaximumTemperatureEditChange({ target: { value: 100 } });
            handleMinimalHumidityEditChange({ target: { value: 0 } });
            handleMaximumHumidityEditChange({ target: { value: 100 } });
            handleClose();
        }

        async function onInsert() {
            await onAddEvent(
                confortGroupId,
                {
                    MinimalHumidity: minimalHumidityEdit,
                    MaximumHumidity: maximumHumidityEdit,
                    MinimalTemperature: minimalTemperatureEdit,
                    MaximumTemperature: maximumTemperatureEdit,
                },
                confortLevel,
                confortType
            );
            onClose()
        }

        return (
            <Modal
                open={isOpen}
                onClose={onClose}
            >
                <Paper style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    p: 4
                }}>
                    <Stack padding='20px' gap={2} direction='column' alignItems='flex-start'>
                        <Typography variant="h5" alignSelf="stretch" component="div">
                            Inserir Nivel de Conforto Temperatura e Umidade
                        </Typography>
                        <Stack direction="row" gap={1} alignItems='center' justifyContent='flex-start'>
                            <Stack direction='column' gap={1} style={{ width: "65%" }}>
                                <Stack direction="row" gap={1}>
                                    <TextField
                                        {...getMinimalTemperatureTags()}
                                        label="Temp Minima"
                                        value={minimalTemperatureEdit}
                                        onChange={handleMinimalTemperatureEditChange}
                                        type="number"
                                        required
                                        style={{ width: '45%' }}
                                        InputLabelProps={{ shrink: true }}
                                    />
                                    <TextField
                                        label="Temp Maxima"
                                        type="number"
                                        {...getMaximumTemperatureTags()}
                                        value={maximumTemperatureEdit}
                                        onChange={handleMaximumTemperatureEditChange}
                                        required
                                        style={{ width: '45%' }}
                                        InputLabelProps={{ shrink: true }}
                                    />
                                </Stack>
                                <Stack direction="row" gap={1}>
                                    <TextField
                                        {...getMinimalHumidityTags()}
                                        value={minimalHumidityEdit}
                                        onChange={handleMinimalHumidityEditChange}
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
                                        value={maximumHumidityEdit}
                                        onChange={handleMaximumHumidityEditChange}
                                        required
                                        style={{ width: '45%' }}
                                        InputLabelProps={{ shrink: true }}
                                    />
                                </Stack>
                            </Stack>

                            <Stack direction='column' gap={1} style={{ width: "25%" }} >
                                <ConfortLevelSelect />
                            </Stack>
                        </Stack>

                        <InsertButton onInsert={onInsert} test={isMinimalBGTHIValid && isMaximumBGTHIValid} />
                    </Stack>
                </Paper>
            </Modal>
        );
    }

    return (<Modal
        open={false}
    />);
}