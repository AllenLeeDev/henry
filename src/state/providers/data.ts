import type { IProvider } from "./providersSlice"

export const initialState: Array<IProvider> = [
  {
    providerId: 1,
    providerName: "John Doe",
    schedule: [
      {
        scheduleId: 1,
        providerId: 1,
        date: "2024-03-09",
        startTime: "09:00",
        endTime: "17:00",
        appointments: []
      }
    ]
  },
  {
    providerId: 2,
    providerName: "Patrick Smith",
    schedule: [
      {
        scheduleId: 2,
        providerId: 2,
        date: "2024-03-09",
        startTime: "10:00",
        endTime: "18:00",
        appointments: []
      }
    ]
  }
]
