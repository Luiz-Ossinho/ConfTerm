import { Modal, Typography, Paper, Stack, TextField, Button } from '@mui/material';
import * as Yup from "yup";
import { useTheme } from '@mui/material';
import useValidations from '../../../lib/hooks/useValidations'

export default function ConfortGroupForm({ isOpen, handleClose, onAddEvent }) {
    const theme = useTheme();

    const {
        formValue: minimalAge,
        handleChange: minimalAgeChange,
        isValueValid: isMinimalAgeValid
    } = useValidations(0, Yup.number().required());

    function handleMinimalAgeChange(e) {
        minimalAgeChange({ target: { value: e.target.value ? parseInt(e.target.value) : e.target.value } });
    }

    const {
        formValue: maximumAge,
        handleChange: maximumAgeChange,
        isValueValid: isMaximumAgeValid
    } = useValidations(100, Yup.number().required());

    function handleMaximumAgeChange(e) {
        maximumAgeChange({ target: { value: e.target.value ? parseInt(e.target.value) : e.target.value } });
    }

    function getMinimalAgeTags() {
        if (!isMinimalAgeValid)
            return { error: true, helperText: "Idade invalida!" };

        return {};
    }

    function getMaximumAgeTags() {
        if (!isMaximumAgeValid)
            return { error: true, helperText: "Idade invalida!" };

        return {};
    }

    function onClose() {
        handleMinimalAgeChange({ target: { value: 0 } });
        handleMaximumAgeChange({ target: { value: 100 } });
        handleClose();
    }

    function getButtonTags() {
        if (isMaximumAgeValid && isMinimalAgeValid)
            return {};

        return { disabled: true };
    }

    async function onInsert(e) {
        await onAddEvent(minimalAge, maximumAge);
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
                <Stack padding='20px' gap={2} direction='column' alignItems='center'>
                    <Typography variant="h5" alignSelf="stretch" component="div">
                        Inserir Faixa Etária
                    </Typography>
                    <TextField
                        {...getMinimalAgeTags()}
                        value={minimalAge}
                        onChange={handleMinimalAgeChange}
                        label="Idade Minima"
                        type="number"
                        required
                        variant="outlined"
                    />
                    <TextField
                        label="Idade Maxima"
                        {...getMaximumAgeTags()}
                        value={maximumAge}
                        onChange={handleMaximumAgeChange}
                        type="number"
                        required
                        variant="outlined"
                    />
                    <Button {...getButtonTags()} onClick={onInsert} variant="contained" fullWidth sx={{ color: theme.palette.background.default }}>
                        Inserir
                    </Button>
                </Stack>
            </Paper>
        </Modal>
    );
}