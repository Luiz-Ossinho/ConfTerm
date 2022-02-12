import { useTheme } from "@mui/material";
import Link from "next/link";
import { ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material'
import { pages } from '../lib/utils'

export default function ListButtonLink({ options: {
    currentPageId, targetPageId, targetPageRoute, targetPageRouteAlias, Icon, Text
} }) {
    const theme = useTheme();

    const selected = currentPageId === targetPageId;

    return (<Link href={targetPageRoute} as={targetPageRouteAlias} passHref>
        <ListItemButton
            component="a"
            selected={selected}
            disabled={selected}
            sx={{
                borderRadius: 20,
                color: theme.palette.background.default,
            }}
            style={{
                backgroundColor: theme.palette.primary.main
            }}
        >
            <ListItemText>
                <Typography variant="body1">
                    {Text}
                </Typography>
            </ListItemText>
            <ListItemIcon>
                {Icon}
            </ListItemIcon>
        </ListItemButton>
    </Link>)
}