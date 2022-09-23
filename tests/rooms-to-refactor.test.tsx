import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import { describe, expect, it,  vi } from 'vitest'
import { Room } from '../src/pages/rooms/models'
import NewRoom from '../src/pages/rooms/newRoom'

let newRoomData: Room | null = null as unknown as Room;

vi.mock('cross-fetch', () => ({
    default: (...args) => {
        return ({
            headers: {
                get: () => { 
                    newRoomData = (JSON.parse(args[1].body) as Room)
                    return `http://localhost:5175/api/Rooms${newRoomData.name}`
                }
            }
        })
    }
}))

const onRoomAddedFunc = (_: string) => {
    return
}

describe('rooms', () => {
    it('Click on submit button send a new room form ', async () => {
        //Arrange
        var expectedName = `ExpectedRoomName_${Math.floor(Math.random() * 999)}`
        var expectedCapacity = Math.floor(Math.random() * 16)
        var expectedHasProjectorCheckbox = true
        var expectedHasSoundSystemCheckbox = true
        var expectedHasAirConditionerCheckbox = false
        const { container } = render(<NewRoom onNewRoomAdded={onRoomAddedFunc} />)
        const inputs = container.querySelectorAll('input')
        const nameInput = inputs[0]
        const numberOfSeatsInput = inputs[1]
        const newRoomHasSoundSystem = container.querySelector('#new-room-form-has-sound-system') as HTMLInputElement
        const newRoomHasAirConditioner = container.querySelector('#new-room-form-has-air-conditioner') as HTMLInputElement
        const newRoomHasProjectorChecbox = container.querySelector('.MuiSvgIcon-fontSizeSmall') as HTMLInputElement
        const submitButton = container.querySelector('button')
        //Act
        fireEvent.input(nameInput, { target: { value: expectedName } })
        fireEvent.input(numberOfSeatsInput, { target: { value: expectedCapacity } })
        fireEvent.click(newRoomHasProjectorChecbox)
        fireEvent.click(newRoomHasAirConditioner)
        fireEvent.click(newRoomHasAirConditioner)
        fireEvent.click(newRoomHasSoundSystem)
        fireEvent.click(submitButton as HTMLButtonElement)
        //Assert
        await waitFor(() => expect(newRoomData).not.toBeNull())
        expect(newRoomData?.name).to.equal(expectedName)
        expect(newRoomData?.numberOfSeats).to.equal(expectedCapacity)
        expect(newRoomData?.hasSoundSystem).to.equal(expectedHasSoundSystemCheckbox)
        expect(newRoomData?.hasAirConditioner).to.equal(expectedHasAirConditionerCheckbox)
        expect(newRoomData?.hasProjector).to.equal(expectedHasProjectorCheckbox)
    })
})

