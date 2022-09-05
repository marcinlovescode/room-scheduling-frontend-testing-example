import React from 'react'
import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from '../src/App'
import userEvent from '@testing-library/user-event'
import { rooms } from '../mocks/data'

describe('rooms', () => {
  it('Shows rooms list ', async () => {
    //Arrange
    render(<App />)
    const user = userEvent.setup()
    //Act
    await user.click(screen.getByText('Rooms'))
    //Assert
    rooms().forEach(async room => {
      const row = (await screen.findByText(room.name)).closest("tr") as HTMLTableRowElement;
      const withinRow = within(row);
      withinRow.getByText(room.numberOfSeats)
      expect((withinRow.getByLabelText("Has projector checkbox") as HTMLInputElement).checked).toBe(room.hasProjector)
      expect((withinRow.getByLabelText("Has sound system checkbox") as HTMLInputElement).checked).toBe(room.hasSoundSystem)
      expect((withinRow.getByLabelText("Has air conditioner checkbox") as HTMLInputElement).checked).toBe(room.hasAirConditioner)
    })
  })

  it('Can add a new room ', async () => {
    //Arrange
    render(<App />)
    const user = userEvent.setup()
    await user.click(screen.getByText('Rooms'))
    await user.click(screen.getByRole('button', { name: /new room/i }))
    const nameInputField = screen.getByLabelText(/name/i)
    const numberOfSeatsInputField = screen.getByLabelText(/Number of seats/i)
    const hasProjectorCheckbox = screen.getByRole('checkbox', { name: /Has projector/i, checked: false })
    const hasSoundSystemCheckbox = screen.getByRole('checkbox', { name: /Has sound system/i, checked: false })
    const hasAirConditionerCheckbox = screen.getByRole('checkbox', { name: /Has air conditioner/i, checked: false })
    const submitButton = screen.getByRole('button', { name: /Submit/i })
    var expectedName = `Room_${Math.floor(Math.random() * 999)}`
    var expectedCapacity = Math.floor(Math.random() * 16)
    var expectedHasProjectorCheckbox = true
    var expectedHasSoundSystemCheckbox = true
    var expectedHasAirConditionerCheckbox = false
    await user.clear(nameInputField)
    await user.clear(numberOfSeatsInputField)
    //Act
    await user.type(nameInputField, expectedName);
    await user.type(numberOfSeatsInputField, expectedCapacity.toString());
    await user.click(hasProjectorCheckbox);
    await user.click(hasSoundSystemCheckbox);
    await user.click(submitButton);
    //Assert
    const row = (await screen.findByText(expectedName)).closest("tr") as HTMLTableRowElement;
    const withinRow = within(row);
    withinRow.getByText(expectedCapacity)
    expect((withinRow.getByLabelText("Has projector checkbox") as HTMLInputElement).checked).toBe(expectedHasProjectorCheckbox)
    expect((withinRow.getByLabelText("Has sound system checkbox") as HTMLInputElement).checked).toBe(expectedHasSoundSystemCheckbox)
    expect((withinRow.getByLabelText("Has air conditioner checkbox") as HTMLInputElement).checked).toBe(expectedHasAirConditionerCheckbox)
  })
})

