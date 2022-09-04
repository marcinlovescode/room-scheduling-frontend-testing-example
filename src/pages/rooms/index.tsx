import { Route, Routes, Navigate } from 'react-router-dom';
import NewRoom from './newRoom';
import RoomList from './roomsList'
import { useNavigate } from "react-router-dom";

const RoomsPage = () => {
    const navigate = useNavigate();

    const newRoomClicked = () => {
        navigate("new", { replace: true });
    };

    const newRoomAdded = (id: string) => {
        navigate("list", { replace: true });
    };

    return (
        <>
            <Routes>
                <Route index element={<Navigate to="list" />} />
                <Route path="/list" element={<RoomList onNewRoomClicked={newRoomClicked}/>} />
                <Route path="/new" element={<NewRoom onNewRoomAdded={newRoomAdded}/>} />
            </Routes>
        </>
    )
}

export default RoomsPage