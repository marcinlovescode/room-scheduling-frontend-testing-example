import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Checkbox } from '@mui/material';
import { Room } from '../models';

export interface RoomsListProps{
    rooms: Room[]
}

const RoomListTable = ({rooms}: RoomsListProps) => {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="center">Number&nbsp;of&nbsp;seats</TableCell>
                        <TableCell align="center">Has&nbsp;projector</TableCell>
                        <TableCell align="center">Has&nbsp;sound&nbsp;system</TableCell>
                        <TableCell align="center">Has&nbsp;air&nbsp;conditioner</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rooms.map((room) => (
                        <TableRow
                            key={room.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {room.name}
                            </TableCell>
                            <TableCell align="center">{room.numberOfSeats}</TableCell>
                            <TableCell align="center">
                                <Checkbox {...{ inputProps: { 'aria-label': 'Has projector checkbox' } }} checked={room.hasProjector} disabled />
                            </TableCell>
                            <TableCell align="center">
                                <Checkbox {...{ inputProps: { 'aria-label': 'Has sound system checkbox' } }} checked={room.hasSoundSystem} disabled />
                            </TableCell>
                            <TableCell align="center">
                                <Checkbox {...{ inputProps: { 'aria-label': 'Has air conditioner checkbox' } }} checked={room.hasAirConditioner} disabled />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default RoomListTable