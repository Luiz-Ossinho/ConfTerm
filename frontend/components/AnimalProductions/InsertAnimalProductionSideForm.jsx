import { Modal, Typography, Paper, Stack, TextField, Button, InputLabel } from '@mui/material'
import * as Yup from "yup";
import React from 'react'
import useValidations from '../../lib/hooks/useValidations'
import { useTheme } from '@mui/material';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';
import SelectableSpeciesListing from '../Species/SelectableSpeciesListing';
import SelectableHousingsListing from '../Housings/SelectableHousingsListing';
import useAnimalProductions from '../../lib/hooks/useAnimalProductions';

export default function InsertAnimalProductionSideForm({ isOpen, handleClose }) {
    const {
        formValue: equipamentName,
        setFormValue: setEquipamentName,
        handleChange: equipamentNameChange,
        isValueValid: isEquipamentNameValid
    } = useValidations("", Yup.string().optional());

    const {
        formValue: birthday,
        setFormValue: setBirthDay,
        handleChange: handleValidationBirthDayChange,
        isValueValid: isBirthdayValid
    } = useValidations(new Date(), Yup.date().required());

    function handleBirthdayChange(date) {
        const event = {
            target: {
                value: date
            }
        }

        handleValidationBirthDayChange(event);
    }

    const [species, setSpecies] = React.useState("");
    const handleSpeciesChange = (e) => setSpecies(e.target.value);

    const [housing, setHousing] = React.useState("");
    const handleHousingChange = (e) => setHousing(e.target.value);


    const theme = useTheme();

    const { create } = useAnimalProductions();

    function onClose() {
        setEquipamentName("");
        handleClose();
    }

    async function onInsert(e) {
        await create(species, housing, birthday.getTime(),equipamentName)
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
                        Inserir alojamento
                    </Typography>
                    <TextField value={equipamentName} onChange={equipamentNameChange} label="Nome do equipamento" variant="outlined" />
                    <div>
                        <InputLabel id="birthday">Data de nascimento</InputLabel>
                        <DatePicker
                            selected={birthday}
                            onChange={handleBirthdayChange}
                            dateFormat="dd/MM/yyyy"
                        />
                    </div>

                    <div>
                        <InputLabel id="species">Especie</InputLabel>
                        <SelectableSpeciesListing
                            selectedValue={species}
                            handleSelectedValueChange={handleSpeciesChange}
                        />
                    </div>

                    <div>
                        <InputLabel id="species">Alojamento</InputLabel>
                        <SelectableHousingsListing
                            selectedValue={housing}
                            handleSelectedValueChange={handleHousingChange}
                        />
                    </div>

                    <Button onClick={onInsert} variant="contained" fullWidth sx={{ color: theme.palette.background.default }}>
                        Inserir
                    </Button>
                </Stack>
            </Paper>
        </Modal>
    );
}