import React from 'react'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
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
    //  it('First change - add a new button - find button by role and name', async () => {
    //     //Arrange
    //     var expectedName = `ExpectedRoomName_${Math.floor(Math.random() * 999)}`
    //     var expectedCapacity = Math.floor(Math.random() * 16)
    //     var expectedHasProjectorCheckbox = true
    //     var expectedHasSoundSystemCheckbox = true
    //     var expectedHasAirConditionerCheckbox = false
    //     const { container } = render(<NewRoom onNewRoomAdded={onRoomAddedFunc} />)
    //     // Zmiana kolejnosci spowowduje wpisanie danych do złego pola
    //     const inputs = container.querySelectorAll('input')
    //     const nameInput = inputs[0]
    //     const numberOfSeatsInput = inputs[1]
    //     // Wybranie po ID
    //     // Zmiana elementu na taki bez ID spowoduje nie znalezienie elementu 
    //     const newRoomHasSoundSystem = container.querySelector('#new-room-form-has-sound-system') as HTMLInputElement
    //     // Ustawienie defaultowej wartosci
    //     const newRoomHasAirConditioner = container.querySelector('#new-room-form-has-air-conditioner') as HTMLInputElement
    //     // Odnalzezienie elementu po CSS
    //     const newRoomHasProjectorChecbox = container.querySelector('.MuiSvgIcon-fontSizeSmall') as HTMLInputElement
    //     // Wybranie jedynego przycisku. Dodanie drugiego rozwala 
    //     const submitButton = screen.getByRole('button', { name: /Submit/ })
    //     //Act
    //     fireEvent.input(nameInput, { target: { value: expectedName } })
    //     fireEvent.input(numberOfSeatsInput, { target: { value: expectedCapacity } })
    //     fireEvent.click(newRoomHasProjectorChecbox)
    //     fireEvent.click(newRoomHasAirConditioner)
    //     fireEvent.click(newRoomHasAirConditioner)
    //     fireEvent.click(newRoomHasSoundSystem)
    //     fireEvent.click(submitButton as HTMLButtonElement)
    //     //Assert
    //     await waitFor(() => expect(newRoomData).not.toBeNull())
    //     expect(newRoomData?.name).to.equal(expectedName)
    //     expect(newRoomData?.numberOfSeats).to.equal(expectedCapacity)
    //     expect(newRoomData?.hasSoundSystem).to.equal(expectedHasSoundSystemCheckbox)
    //     expect(newRoomData?.hasAirConditioner).to.equal(expectedHasAirConditionerCheckbox)
    //     expect(newRoomData?.hasProjector).to.equal(expectedHasProjectorCheckbox)
    // })

    // it('Second change - change checkbox style - find checkbox by label and type ', async () => {
    //     //Arrange
    //     var expectedName = `ExpectedRoomName_${Math.floor(Math.random() * 999)}`
    //     var expectedCapacity = Math.floor(Math.random() * 16)
    //     var expectedHasProjectorCheckbox = true
    //     var expectedHasSoundSystemCheckbox = true
    //     var expectedHasAirConditionerCheckbox = false
    //     const { container } = render(<NewRoom onNewRoomAdded={onRoomAddedFunc} />)
    //     // Zmiana kolejnosci spowowduje wpisanie danych do złego pola
    //     const inputs = container.querySelectorAll('input')
    //     const nameInput = inputs[0]
    //     const numberOfSeatsInput = inputs[1]
    //     // Wybranie po ID
    //     // Zmiana elementu na taki bez ID spowoduje nie znalezienie elementu 
    //     const newRoomHasSoundSystem = container.querySelector('#new-room-form-has-sound-system') as HTMLInputElement
    //     // Ustawienie defaultowej wartosci
    //     const newRoomHasAirConditioner = container.querySelector('#new-room-form-has-air-conditioner') as HTMLInputElement
    //     // Odnalzezienie elementu po CSS
    //     const newRoomHasProjectorChecbox = screen.getByRole('checkbox', { name: /Has projector/i })
    //     // Wybranie jedynego przycisku. Dodanie drugiego rozwala 
    //     const submitButton = screen.getByRole('button', { name: /Submit/ })
    //     //Act
    //     fireEvent.input(nameInput, { target: { value: expectedName } })
    //     fireEvent.input(numberOfSeatsInput, { target: { value: expectedCapacity } })
    //     fireEvent.click(newRoomHasProjectorChecbox)
    //     fireEvent.click(newRoomHasAirConditioner)
    //     fireEvent.click(newRoomHasAirConditioner)
    //     fireEvent.click(newRoomHasSoundSystem)
    //     fireEvent.click(submitButton as HTMLButtonElement)
    //     //Assert
    //     await waitFor(() => expect(newRoomData).not.toBeNull())
    //     expect(newRoomData?.name).to.equal(expectedName)
    //     expect(newRoomData?.numberOfSeats).to.equal(expectedCapacity)
    //     expect(newRoomData?.hasSoundSystem).to.equal(expectedHasSoundSystemCheckbox)
    //     expect(newRoomData?.hasAirConditioner).to.equal(expectedHasAirConditionerCheckbox)
    //     expect(newRoomData?.hasProjector).to.equal(expectedHasProjectorCheckbox)
    // })

    // it('Third change - forget about adding id - find button by role and name ', async () => {
    //     //Arrange
    //     var expectedName = `ExpectedRoomName_${Math.floor(Math.random() * 999)}`
    //     var expectedCapacity = Math.floor(Math.random() * 16)
    //     var expectedHasProjectorCheckbox = true
    //     var expectedHasSoundSystemCheckbox = true
    //     var expectedHasAirConditionerCheckbox = false
    //     const { container } = render(<NewRoom onNewRoomAdded={onRoomAddedFunc} />)
    //     // Zmiana kolejnosci spowowduje wpisanie danych do złego pola
    //     const inputs = container.querySelectorAll('input')
    //     const nameInput = inputs[0]
    //     const numberOfSeatsInput = inputs[1]
    //     // Wybranie po ID
    //     // Zmiana elementu na taki bez ID spowoduje nie znalezienie elementu 
    //     const newRoomHasSoundSystem = container.querySelector('#new-room-form-has-sound-system') as HTMLInputElement
    //     // Ustawienie defaultowej wartosci
    //     const newRoomHasAirConditioner = screen.getByRole('checkbox', { name: /Has air conditioner/i })
    //     // Odnalzezienie elementu po CSS
    //     const newRoomHasProjectorChecbox = screen.getByRole('checkbox', { name: /Has projector/i })
    //     // Wybranie jedynego przycisku. Dodanie drugiego rozwala 
    //     const submitButton = screen.getByRole('button', { name: /Submit/ })
    //     //Act
    //     fireEvent.input(nameInput, { target: { value: expectedName } })
    //     fireEvent.input(numberOfSeatsInput, { target: { value: expectedCapacity } })
    //     fireEvent.click(newRoomHasProjectorChecbox)
    //     fireEvent.click(newRoomHasAirConditioner)
    //     fireEvent.click(newRoomHasAirConditioner)
    //     fireEvent.click(newRoomHasSoundSystem)
    //     fireEvent.click(submitButton as HTMLButtonElement)
    //     //Assert
    //     await waitFor(() => expect(newRoomData).not.toBeNull())
    //     expect(newRoomData?.name).to.equal(expectedName)
    //     expect(newRoomData?.numberOfSeats).to.equal(expectedCapacity)
    //     expect(newRoomData?.hasSoundSystem).to.equal(expectedHasSoundSystemCheckbox)
    //     expect(newRoomData?.hasAirConditioner).to.equal(expectedHasAirConditionerCheckbox)
    //     expect(newRoomData?.hasProjector).to.equal(expectedHasProjectorCheckbox)
    // })

    // it('Fourth change - move order of inputs ', async () => {
    //     //Arrange
    //     var expectedName = `ExpectedRoomName_${Math.floor(Math.random() * 999)}`
    //     var expectedCapacity = Math.floor(Math.random() * 16)
    //     var expectedHasProjectorCheckbox = true
    //     var expectedHasSoundSystemCheckbox = true
    //     var expectedHasAirConditionerCheckbox = false
    //     const { container } = render(<NewRoom onNewRoomAdded={onRoomAddedFunc} />)
    //     // Zmiana kolejnosci spowowduje wpisanie danych do złego pola
    //     const nameInput = screen.getByLabelText(/name/i)
    //     const numberOfSeatsInput = screen.getByLabelText(/Number of seats/i)
    //     // Wybranie po ID
    //     // Zmiana elementu na taki bez ID spowoduje nie znalezienie elementu 
    //     const newRoomHasSoundSystem = container.querySelector('#new-room-form-has-sound-system') as HTMLInputElement
    //     // Ustawienie defaultowej wartosci
    //     const newRoomHasAirConditioner = screen.getByRole('checkbox', { name: /Has air conditioner/i })
    //     // Odnalzezienie elementu po CSS
    //     const newRoomHasProjectorChecbox = screen.getByRole('checkbox', { name: /Has projector/i })
    //     // Wybranie jedynego przycisku. Dodanie drugiego rozwala 
    //     const submitButton = screen.getByRole('button', { name: /Submit/ })
    //     //Act
    //     fireEvent.input(nameInput, { target: { value: expectedName } })
    //     fireEvent.input(numberOfSeatsInput, { target: { value: expectedCapacity } })
    //     fireEvent.click(newRoomHasProjectorChecbox)
    //     fireEvent.click(newRoomHasAirConditioner)
    //     fireEvent.click(newRoomHasAirConditioner)
    //     fireEvent.click(newRoomHasSoundSystem)
    //     fireEvent.click(submitButton as HTMLButtonElement)
    //     //Assert
    //     await waitFor(() => expect(newRoomData).not.toBeNull())
    //     expect(newRoomData?.name).to.equal(expectedName)
    //     expect(newRoomData?.numberOfSeats).to.equal(expectedCapacity)
    //     expect(newRoomData?.hasSoundSystem).to.equal(expectedHasSoundSystemCheckbox)
    //     expect(newRoomData?.hasAirConditioner).to.equal(expectedHasAirConditionerCheckbox)
    //     expect(newRoomData?.hasProjector).to.equal(expectedHasProjectorCheckbox)
    // })

    //  it('Fifth change - default state of checkbox ', async () => {
    //     //Arrange
    //     var expectedName = `ExpectedRoomName_${Math.floor(Math.random() * 999)}`
    //     var expectedCapacity = Math.floor(Math.random() * 16)
    //     var expectedHasProjectorCheckbox = true
    //     var expectedHasSoundSystemCheckbox = true
    //     var expectedHasAirConditionerCheckbox = false
    //     const { container } = render(<NewRoom onNewRoomAdded={onRoomAddedFunc} />)
    //     // Zmiana kolejnosci spowowduje wpisanie danych do złego pola
    //     const nameInput = screen.getByLabelText(/name/i)
    //     const numberOfSeatsInput = screen.getByLabelText(/Number of seats/i)
    //     // Wybranie po ID
    //     // Zmiana elementu na taki bez ID spowoduje nie znalezienie elementu 
    //      screen.getByRole('checkbox', { name: /Has sound system/i, checked: true })
    //     // Ustawienie defaultowej wartosci
    //     const newRoomHasAirConditioner = screen.getByRole('checkbox', { name: /Has air conditioner/i })
    //     // Odnalzezienie elementu po CSS
    //     const newRoomHasProjectorChecbox = screen.getByRole('checkbox', { name: /Has projector/i })
    //     // Wybranie jedynego przycisku. Dodanie drugiego rozwala 
    //     const submitButton = screen.getByRole('button', { name: /Submit/ })
    //     //Act
    //     fireEvent.input(nameInput, { target: { value: expectedName } })
    //     fireEvent.input(numberOfSeatsInput, { target: { value: expectedCapacity } })
    //     fireEvent.click(newRoomHasProjectorChecbox)
    //     fireEvent.click(newRoomHasAirConditioner)
    //     fireEvent.click(newRoomHasAirConditioner)
    //     fireEvent.click(submitButton as HTMLButtonElement)
    //     //Assert
    //     await waitFor(() => expect(newRoomData).not.toBeNull())
    //     expect(newRoomData?.name).to.equal(expectedName)
    //     expect(newRoomData?.numberOfSeats).to.equal(expectedCapacity)
    //     expect(newRoomData?.hasSoundSystem).to.equal(expectedHasSoundSystemCheckbox)
    //     expect(newRoomData?.hasAirConditioner).to.equal(expectedHasAirConditionerCheckbox)
    //     expect(newRoomData?.hasProjector).to.equal(expectedHasProjectorCheckbox)
    // })

   it('', async () => {
   })

})

