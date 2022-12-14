import { Checkbox, FormControlLabel, Button, TextField, Snackbar, Alert } from "@mui/material"
import { Container } from "@mui/system"
import { FormEvent, useState } from "react"
import { Room } from "../models"

export interface NewRoomFormProps {
    onSaveSubmitClicked: (room: Room) => Promise<void>
}

const NewRoomForm = ({ onSaveSubmitClicked }: NewRoomFormProps) => {

    const [name, setName] = useState<string>("")
    const [numberOfSeats, setNumberOfSeats] = useState<number>(0)
    const [hasProjector, setHasProjector] = useState<boolean>(false)
    const [hasAirConditioner, setHasAirConditioner] = useState<boolean>(false)
    const [hasSoundSystem, setHasSoundSystem] = useState<boolean>(false)
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");

    const validate = (): boolean => {
        let errorMessages: string[] = []
        if (name.length < 3)
            errorMessages.push('Name length must be greater or equal 3')
        if (numberOfSeats < 1)
            errorMessages.push('Room capacity must be greater or equal 1')
        if (errorMessages.length == 0)
            return true
        setSnackbarMessage(errorMessages.join("; "))
        setOpenSnackbar(true)
        return false
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const room = {
            name, numberOfSeats, hasProjector, hasAirConditioner, hasSoundSystem
        }
        if (validate())
            await onSaveSubmitClicked(room)
    }

    const handleCloseSnackbarClicked = () => {
        setOpenSnackbar(false)
    }


    return (
        <Container>
            <form onSubmit={handleSubmit}>
                <div>
                    <TextField id="new-room-form-name" label="Name" variant="standard" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div>
                    <TextField id="new-room-form-number-of-seats" label="Number of seats" variant="standard" value={numberOfSeats} onChange={(e) => setNumberOfSeats(+e.target.value)} type="number" />
                </div>
                <div>
                    <FormControlLabel label="Has projector" control={
                        <Checkbox {...{ inputProps: { 'aria-label': 'Has projector checkbox' } }} checked={hasProjector} onChange={(e) => setHasProjector(e.target.checked)} id="new-room-form-has-projector" />}
                    />
                </div>
                <div>
                    <FormControlLabel label="Has sound system" control={
                        <Checkbox {...{ inputProps: { 'aria-label': 'Has sound system checkbox' } }} checked={hasSoundSystem} onChange={(e) => setHasSoundSystem(e.target.checked)} id="new-room-form-has-sound-system" />}
                    />
                </div>
                <div>
                    <FormControlLabel label="Has air conditioner" control={
                        <Checkbox {...{ inputProps: { 'aria-label': 'Has air conditioner checkbox' } }} checked={hasAirConditioner} onChange={(e) => setHasAirConditioner(e.target.checked)} id="new-room-form-has-air-conditioner" />
                    } />
                </div>
                <Button variant="contained" type='submit'>Submit</Button>
            </form>
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbarClicked}>
                <Alert onClose={handleCloseSnackbarClicked} severity="error" sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Container>
    )
}

export default NewRoomForm