import React from 'react'
import useSWR from 'swr';
import { Paper, Stack, Typography, Divider, Button, Fab } from '@mui/material'
import { useTheme } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ConfortGroupListingItem from './Confort/ConfortGroupListingItem';
import { ConfortType } from '../../lib/utils';
import useConforts from '../../lib/hooks/useConforts';
import ConfortGroupForm from './Confort/ConfortGroupForm'
import ConfortLevelForm from './Confort/ConfortLevelForm';

export default function SpeciesContent({ SpeciesId }) {
    const { data: currentSpecies, mutate: mutateCurrentSpecies, error } = useSWR(SpeciesId, async () => await fetchSpecies(SpeciesId));
    const { fetchSpeciesWithConforts: fetchSpecies, updateConfortGroup, updateConfortLevel, insertConfortGroup, insertConfortLevel } = useConforts();
    const theme = useTheme()

    const [formConfortType, setFormConfortType] = React.useState(-1);

    const [isGroupFormOpen, setGroupFormOpen] = React.useState(false);
    const openGroupForm = () => setGroupFormOpen(true);
    const closeGroupForm = () => setGroupFormOpen(false);

    const [formConfortGroupId, setFormConfortGroupId] = React.useState(-1);
    const [isLevelFormOpen, setLevelFormOpen] = React.useState(false);
    const openLevelForm = () => setLevelFormOpen(true);
    const closeLevelForm = () => setLevelFormOpen(false);

    if (!currentSpecies) return null;

    async function onInsertConfortLevel(confortGroupId, confortLevelProps, confortLevel, confortType) {
        const createdConfortLevel = await insertConfortLevel(confortGroupId, confortLevelProps, confortLevel, confortType);

        let speciesProps = {};

        if (confortType == ConfortType.THI) {
            const originalGroup = currentSpecies.THI.filter(group => group.Id === confortGroupId)[0]
            const originalGroups = currentSpecies.THI.filter(group => group.Id !== confortGroupId);

            originalGroup.Conforts.push(createdConfortLevel);

            originalGroups.push(originalGroup)
            speciesProps = { THI: originalGroups }
        } else if (confortType == ConfortType.BGTHI) {
            const originalGroup = currentSpecies.BGTHI.filter(group => group.Id === confortGroupId)[0]
            const originalGroups = currentSpecies.BGTHI.filter(group => group.Id !== confortGroupId);

            originalGroup.Conforts.push(createdConfortLevel);

            originalGroups.push(originalGroup)
            speciesProps = { BGTHI: originalGroups }
        } else if (confortType == ConfortType.TH) {
            const originalGroup = currentSpecies.TH.filter(group => group.Id === confortGroupId)[0]
            const originalGroups = currentSpecies.TH.filter(group => group.Id !== confortGroupId);

            originalGroup.Conforts.push(createdConfortLevel);

            originalGroups.push(originalGroup)
            speciesProps = { TH: originalGroups }
        }

        mutateCurrentSpecies({ ...currentSpecies, speciesProps }, true)
    }

    async function onInsertConfortGroup(minimalAge, maximumAge) {
        const created = await insertConfortGroup(minimalAge, maximumAge, currentSpecies.Id, formConfortType);

        let speciesProps = {};

        if (formConfortType == ConfortType.THI) {
            const copy = currentSpecies.THI.slice();
            copy.push(created)
            speciesProps = { THI: copy }
        } else if (formConfortType == ConfortType.BGTHI) {
            const copy = currentSpecies.BGTHI.slice();
            copy.push(created)
            speciesProps = { BGTHI: copy }
        } else if (formConfortType == ConfortType.TH) {
            const copy = currentSpecies.TH.slice();
            copy.push(created)
            speciesProps = { TH: copy }
        }

        mutateCurrentSpecies({ ...currentSpecies, speciesProps }, true)
    }

    async function onUpdateConfortLevel(confortLevelId, confortType, confortLevelProps) {
        const updatedConfortLevel = await updateConfortLevel(confortLevelId, confortType, confortLevelProps);

        let speciesProps = {};

        if (confortType === ConfortType.THI) {
            const originalGroup = currentSpecies.THI.filter(confortGroup => confortGroup.Conforts.some(confortLevel => confortLevel.Id === confortLevelId))[0];
            const groupsCopy = currentSpecies.THI.filter(confortGroup => !confortGroup.Conforts.some(confortLevel => confortLevel.Id !== confortLevelId));

            const originalConfortLevels = originalGroup.Conforts.filter(confortLevel => confortLevel.Id !== confortLevelId);

            originalConfortLevels.push(updatedConfortLevel);

            originalGroup.Conforts = originalConfortLevels;

            groupsCopy.push(originalGroup);

            speciesProps = { THI: groupsCopy }
        } else if (confortType === ConfortType.BGTHI) {
            const originalGroup = currentSpecies.BGTHI.filter(confortGroup => confortGroup.Conforts.some(confortLevel => confortLevel.Id === confortLevelId))[0];
            const groupsCopy = currentSpecies.BGTHI.filter(confortGroup => !confortGroup.Conforts.some(confortLevel => confortLevel.Id !== confortLevelId));

            const originalConfortLevels = originalGroup.Conforts.filter(confortLevel => confortLevel.Id !== confortLevelId);

            originalConfortLevels.push(updatedConfortLevel);

            originalGroup.Conforts = originalConfortLevels;

            groupsCopy.push(originalGroup);

            speciesProps = { BGTHI: groupsCopy }
        } else if (confortType === ConfortType.TH) {
            const originalGroup = currentSpecies.TH.filter(confortGroup => confortGroup.Conforts.some(confortLevel => confortLevel.Id === confortLevelId))[0];
            const groupsCopy = currentSpecies.TH.filter(confortGroup => !confortGroup.Conforts.some(confortLevel => confortLevel.Id !== confortLevelId));

            const originalConfortLevels = originalGroup.Conforts.filter(confortLevel => confortLevel.Id !== confortLevelId);

            originalConfortLevels.push(updatedConfortLevel);

            originalGroup.Conforts = originalConfortLevels;

            groupsCopy.push(originalGroup);

            speciesProps = { TH: groupsCopy }
        }


        console.log(currentSpecies);

        console.log({ ...currentSpecies, ...speciesProps });

        mutateCurrentSpecies({ ...currentSpecies, ...speciesProps }, true);
    }

    async function onUpdateConfortGroupAge(confortGroupId, confortGroupType, newMinimalAge, newMaximumAge) {
        const updatedGroup = await updateConfortGroup(confortGroupId, confortGroupType, newMinimalAge, newMaximumAge);

        let speciesProps = {};

        if (confortGroupType === ConfortType.THI) {
            const listCopy = currentSpecies.THI.filter(confort => confort.Id !== confortGroupId);
            listCopy.push(updatedGroup);

            speciesProps = { THI: listCopy }
        } else if (confortGroupType === ConfortType.BGTHI) {
            const listCopy = currentSpecies.BGTHI.filter(confort => confort.Id !== confortGroupId);
            listCopy.push(updatedGroup);

            speciesProps = { BGTHI: listCopy }
        } else if (confortGroupType === ConfortType.TH) {
            const listCopy = currentSpecies.TH.filter(confort => confort.Id !== confortGroupId);
            listCopy.push(updatedGroup);

            speciesProps = { TH: listCopy }
        }

        mutateCurrentSpecies({ ...currentSpecies, ...speciesProps }, true);
    }

    function ConfortGroupListing({ onInsert, title, conforts, confortsType }) {

        return (<Stack direction='column' alignItems='center' gap={2} style={{ width: '100%' }}>
            <Paper sx={{ padding: 1 }} style={{ width: '100%' }} >
                <Stack direction="row" gap={1} alignItems='center' justifyContent='flex-end'>
                    <Typography variant="h6" component="div" style={{ marginRight: 'auto' }}>
                        {title}
                    </Typography>
                    <Fab color='primary' onClick={onInsert}>
                        <AddIcon sx={{ color: theme.palette.background.default }} />
                    </Fab>
                </Stack>
            </Paper>
            <Stack direction='column' gap={2} alignItems='center' style={{ maxHeight: '99%', overflow: 'auto' }}>
                {conforts.map((cg, index) => {
                    return <ConfortGroupListingItem
                        key={index}
                        confortGroup={cg}
                        confortGroupType={confortsType}
                        saveAgeChanges={onUpdateConfortGroupAge}
                        saveConfortLevelChanges={onUpdateConfortLevel}
                        addConfortLevel={() => { setFormConfortType(confortsType); setFormConfortGroupId(cg.Id); openLevelForm(); }}
                    />
                })}
            </Stack>
        </Stack>);
    }

    return (<Stack direction='column' alignItems='center' gap={2} style={{ width: '100%', maxHeight: '50%' }}>
        <Paper sx={{ padding: 1 }} style={{ width: '100%' }}>
            <Stack direction="row" gap={1} alignItems='center' justifyContent='flex-end'>
                <Stack direction='column' gap={0} style={{ marginRight: 'auto' }}>
                    <Typography variant="h4" component="div">
                        {currentSpecies?.Name}
                    </Typography>
                    <Typography variant="subtitle1" component="div">
                        Especie registrada
                    </Typography>
                </Stack>
            </Stack>
        </Paper>
        <Typography variant="h5" component="div">
            Faixas etárias
        </Typography>
        <ConfortLevelForm isOpen={isLevelFormOpen} handleClose={closeLevelForm} onAddEvent={onInsertConfortLevel} confortType={formConfortType} confortGroupId={formConfortGroupId} />
        <ConfortGroupForm isOpen={isGroupFormOpen} handleClose={closeGroupForm} onAddEvent={onInsertConfortGroup} />
        <Stack direction='row' alignItems='stretch' justifyContent='center' gap={2} style={{ width: '100%', maxHeight: '100%' }}>
            <ConfortGroupListing title="ITU" onInsert={() => { setFormConfortType(ConfortType.THI); openGroupForm(); }} conforts={currentSpecies.THI} confortsType={ConfortType.THI} addConfortLevel={openGroupForm} />
            <Divider orientation="vertical" />
            <ConfortGroupListing title="ITGU" onInsert={() => { setFormConfortType(ConfortType.BGTHI); openGroupForm(); }} conforts={currentSpecies.BGTHI} confortsType={ConfortType.BGTHI} addConfortLevel={openGroupForm} />
            <Divider orientation="vertical" />
            <ConfortGroupListing title="Temperatura e Umidade" onInsert={() => { setFormConfortType(ConfortType.TH); openGroupForm(); }} conforts={currentSpecies.TH} confortsType={ConfortType.TH} addConfortLevel={openGroupForm} />
        </Stack>
    </Stack>
    );
}