import { Modal, Typography, Paper, Stack, TextField, Button } from '@mui/material';
import * as Yup from "yup";
import { useTheme } from '@mui/material';
import useValidations from '../../lib/hooks/useValidations';
import useHousings from '../../lib/hooks/useHousings';


export default function InsertHousingForm({ isOpen, handleClose }) {
    const { formValue: name, setFormValue: setName, handleChange: handleNameChange, isValueValid: isNameValid } = useValidations("Nome do alojamento*", Yup.string().required());
    const theme = useTheme();
    const { createNewHousing } = useHousings();

    function getNameFieldTags() {
        if (!isNameValid)
            return { error: true, helperText: "Nome invalido" };

        return {};
    }

    function onClose() {
        setName("Nome do alojamento*");
        handleClose();
    }

    function getButtonTags() {
        if (isNameValid)
            return {};

        return { disabled: true };
    }

    async function onInsert(e) {
        await createNewHousing(name);
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
                        Inserir Alojamento
                    </Typography>
                    <TextField ini {...getNameFieldTags()} required value={name} onChange={handleNameChange} label="Nome do alojamento" variant="outlined" />
                    <Button {...getButtonTags()} onClick={onInsert} variant="contained" fullWidth sx={{ color: theme.palette.background.default }}>
                        Inserir
                    </Button>
                </Stack>
            </Paper>
        </Modal>
    );
}