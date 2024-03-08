import type { PayloadAction } from "@reduxjs/toolkit"
import { createAppSlice } from "../createAppSlice"
import { initialState as dataInitialState } from "./data"

export interface IProvider {
  providerId: number
  providerName: string
  schedule: Array<ISchedule>
}

export interface ISchedule {
  scheduleId: number
  providerId: number
  date: string
  startTime: string
  endTime: string
  appointments: Array<IAppointment>
}

export interface IAppointment {
  appointmentId: number
  providerId: number
  providerName: string
  startTime: string
}

export const initialState: IProvider[] = dataInitialState

export const providersSlice = createAppSlice({
  name: "providersState",
  initialState,
  reducers: create => ({
    addAvailableTimeSlot: create.reducer<ISchedule>(
      (state, action: PayloadAction<ISchedule>) => {
        const { providerId, ...newSchedule } = action.payload

        // Find the provider by providerId
        const providerIndex = state.findIndex(
          provider => provider.providerId === providerId
        )
        if (providerIndex === -1) {
          // Provider not found, return state unchanged
          return state
        }

        // Check if the schedule already exists for the provider
        const existingScheduleIndex = state[providerIndex].schedule.findIndex(
          schedule =>
            schedule.startTime === newSchedule.startTime ||
            schedule.endTime === newSchedule.endTime
        )

        if (existingScheduleIndex !== -1) {
          // Schedule already exists, return state unchanged
          return state
        }

        // Update the schedule for the provider
        const updatedProvider = {
          ...state[providerIndex],
          schedule: [...state[providerIndex].schedule, newSchedule]
        }

        // Update the state with the updated provider
        return [
          ...state.slice(0, providerIndex),
          updatedProvider,
          ...state.slice(providerIndex + 1)
        ]
      }
    ),
    reserveTimeSlot: create.reducer<IAppointment>(
      (state, action: PayloadAction<ISchedule>) => {
        const { providerId, ...newSchedule } = action.payload

        // Update the state to add the appointment to the provider's schedule
        return state.map(provider => {
          if (provider.providerId === providerId) {
            const updatedSchedule = provider.schedule.map(schedule => {
              if (schedule.date === newSchedule.date) {
                // Only add new appointments to the existing appointments array
                return {
                  ...schedule,
                  appointments: [
                    ...schedule.appointments,
                    ...newSchedule.appointments
                  ]
                }
              }
              return schedule
            })

            // Return the provider with the updated schedule
            return {
              ...provider,
              schedule: updatedSchedule
            }
          }
          return provider
        })
      }
    )
  })
})

export const { addAvailableTimeSlot, reserveTimeSlot } = providersSlice.actions
