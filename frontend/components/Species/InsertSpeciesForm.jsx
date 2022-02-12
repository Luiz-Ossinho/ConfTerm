import { Modal, Typography, Paper, Stack, TextField, Button } from '@mui/material'
import * as Yup from "yup";
import useValidations from '../../lib/hooks/useValidations'
import { useTheme } from '@mui/material';
import useSpecies from '../../lib/hooks/useSpecies';

export default function InsertSpeciesForm({ isOpen, handleClose }) {
    const { formValue: name, setFormValue: setName, handleChange: handleNameChange, isValueValid: isNameValid } = useValidations("Nome da especie*", Yup.string().required());
    const theme = useTheme();
    const { createNewSpecies } = useSpecies();

    function getNameFieldTags() {
        if (!isNameValid)
            return { error: true, helperText: "Nome invalido" };

        return {};
    }

    function onClose() {
        setName("Nome da especie*");
        handleClose();
    }

    function getButtonTags() {
        if (isNameValid)
            return {};

        return { disabled: true };
    }

    async function onInsert(e) {
        await createNewSpecies(name);
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
                        Inserir especie
                    </Typography>
                    <TextField {...getNameFieldTags()} required value={name} onChange={handleNameChange} label="Nome da especie" variant="outlined" />
                    <Button {...getButtonTags()} onClick={onInsert} variant="contained" fullWidth sx={{ color: theme.palette.background.default }}>
                        Inserir
                    </Button>
                </Stack>
            </Paper>
        </Modal>
    );
}