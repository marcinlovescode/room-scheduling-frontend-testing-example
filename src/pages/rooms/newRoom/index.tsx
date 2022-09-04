import { Room } from '../models'
import NewRoomForm from './newRoom'
import fetch from 'cross-fetch'

export interface NewRoomProps {
    onNewRoomAdded: (roomName: string) => void
}

const NewRoom = ({ onNewRoomAdded }: NewRoomProps) => {

    const onSubmitNewRoomClicked = async (room: Room): Promise<void> => {
        var response = await fetch('http://localhost:5175/api/Rooms', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(room),
        })
        const locationOfCreatedResource = response.headers.get('Location') 
        if(!locationOfCreatedResource)
            throw "Couldn't find location header"
        const id = locationOfCreatedResource.split('/').slice(-1)[0]
        onNewRoomAdded(id)
    }

    return (
        <NewRoomForm onSaveSubmitClicked={onSubmitNewRoomClicked} />
    )
}

export default NewRoom