import { useEffect, useState } from 'react';
import { Room } from '../models';
import RoomListTable from './roomsList'
import fetch from 'cross-fetch';
import { Button } from '@mui/material';
import { css } from '@emotion/react'

export interface RoomListProps{
    onNewRoomClicked: () => void
}

const fetchRooms = async (): Promise<Room[]> => {
    const response = await fetch(
        `http://localhost:5175/api/Rooms`
    );
    const data = await response.json();
    return data
}

const newRoomButtonStyle = css({
    float: 'right',
    paddingBottom: '20px'
  })


const RoomsList = ({onNewRoomClicked}: RoomListProps) => {
    const [rooms, setRooms] = useState<Room[]>(([]))

    const handleClick = () => {
        onNewRoomClicked();
    };

    useEffect(() => {
        fetchRooms().then((data) => {
            setRooms(data)
        })
    }, [])
    return (
        <>
            <div css={newRoomButtonStyle}>
                <Button variant="contained" onClick={handleClick}>New room</Button>
            </div>
            <div>
                <RoomListTable rooms={rooms} />
            </div>
        </>
    )
}

export default RoomsList