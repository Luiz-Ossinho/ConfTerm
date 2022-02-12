import useAnimalProductions from "../../lib/hooks/useAnimalProductions";
import React from 'react'
import AnimalProductionsSideHeader from "./AnimalProductionsSideHeader";
import InsertAnimalProductionSideForm from "./InsertAnimalProductionSideForm";
import AnimalProductionCard from "./AnimalProductionCard";
import { Stack, Box } from "@mui/material";

export default function AnimalProductionsSideContent() {
    const [isFormOpen, setFormOpen] = React.useState(false);
    const handleCloseForm = () => setFormOpen(false)

    const { animalProductions, isLoading } = useAnimalProductions();

    if (isLoading) {
        return (<Stack direction='column' gap={1}>
            Loading
        </Stack>);
    }

    return (<Stack direction='column' gap={2} alignItems='center' style={{ width: '100%' }}>
        <InsertAnimalProductionSideForm handleClose={handleCloseForm} isOpen={isFormOpen} />
        <AnimalProductionsSideHeader onInsert={() => { setFormOpen(true) }} />
        {animalProductions.map((animalProduction, index) => {
            return <AnimalProductionCard key={index} animalProduction={animalProduction} />
        })}
    </Stack>);
}