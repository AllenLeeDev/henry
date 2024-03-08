import React from "react"
import type { ISchedule } from "../../state/providers/providersSlice"
import { reserveTimeSlot } from "../../state/providers/providersSlice"
import { useAppDispatch } from "../../state/hooks"
import {
  Button,
  Grid,
  Typography,
  Box,
  TextField,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from "@mui/material"

const Calendar = ({ schedule, providerId }) => {
  const dispatch = useAppDispatch()
  const [filteredSchedule, setFilteredSchedule] = React.useState<ISchedule[]>()
  const [selectedTimeSlot, setSelectedTimeSlot] = React.useState(null)
  const [availableAppointments, setAvailableAppointments] =
    React.useState<Array<string>>()
  const [showPast24Hours, setShowPast24Hours] = React.useState(false)
  const [selectedDate, setSelectedDate] = React.useState("")

  const sortSchedule = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (!schedule) return
    const filteredSchedule = schedule.filter(s => {
      return s.date === e.target.value
    })

    findAvailableAppointments(filteredSchedule)
  }
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value)
    sortSchedule(e)
  }

  // Function to parse time string to minutes
  const parseTimeToMinutes = (timeString: string) => {
    if (!timeString) return 0
    const [hours, minutes] = timeString.split(":").map(Number)
    return hours * 60 + minutes
  }

  const generateTimeSlots = (startTime: string, endTime: string, date) => {
    let now = new Date(date).getTime()
    let tomorrow = new Date(date).getTime() + 1

    //remove any slots that are within 24 hours

    if (!startTime || !endTime) return []
    const slots = []

    let currentTime = parseTimeToMinutes(startTime)

    while (currentTime && currentTime < parseTimeToMinutes(endTime)) {
      const hours = Math.floor(currentTime / 60)
      const minutes = currentTime % 60
      slots.push(
        `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`
      )

      currentTime += 15 // Increment by 15 minutes
    }

    return slots
  }

  // Function to find available appointments
  const findAvailableAppointments = filteredSchedule => {
    if (!filteredSchedule || filteredSchedule.length <= 0) {
      setAvailableAppointments([])
      return
    }

    const currentSchedule = filteredSchedule.indexOf(
      filteredSchedule.find(s => s.providerId === providerId)
    )

    const { startTime, endTime, appointments, date } = filteredSchedule[0]

    // Generate time slots
    const timeSlots = generateTimeSlots(startTime, endTime, date)

    // Filter out time slots that overlap with existing appointments
    const availableSlots = timeSlots.filter(
      slot =>
        !appointments.some((appointment: { time: string }) => {
          const appointmentStartTime = parseTimeToMinutes(appointment.time)
          const appointmentEndTime = appointmentStartTime + 15
          const currentTime = parseTimeToMinutes(slot)
          return (
            currentTime >= appointmentStartTime &&
            currentTime < appointmentEndTime
          )
        })
    )

    setAvailableAppointments(availableSlots)
  }

  const handleReservation = (time: string) => {
    if (!schedule || !time) return

    // Find the schedule for the provider
    const updatedSchedule = schedule.map(s => {
      if (s.providerId === providerId) {
        return {
          ...s,
          appointments: [
            ...s.appointments,
            {
              time: time,
              clientId: 1
            }
          ]
        }
      }
      return s
    })

    findAvailableAppointments(updatedSchedule)

    setFilteredSchedule(updatedSchedule)

    // Dispatch the updated schedule for the provider
    dispatch(
      reserveTimeSlot({
        providerId,
        ...updatedSchedule.find(s => s.providerId === providerId)
      })
    )

    setSelectedTimeSlot(null)
  }

  const handleReserveTimeSlot = (time: string) => {
    setSelectedTimeSlot(time)
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column"
      }}
    >
      <Typography variant="h6" gutterBottom sx={{ marginBottom: "20px" }}>
        Upcoming meetings
      </Typography>
      <Container
        sx={{
          overflowY: "auto",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          flexWrap: "wrap",
          height: "100%"
        }}
      >
        <TextField
          type="date"
          variant="outlined"
          value={selectedDate}
          onChange={handleDateChange}
          sx={{ marginBottom: "20px" }}
        />
        <Grid container spacing={2}>
          {availableAppointments &&
            availableAppointments.map((appointment, index) => (
              <Grid item xs={4} key={index}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleReserveTimeSlot(appointment)}
                  fullWidth
                  sx={{ marginBottom: "10px" }}
                >
                  {appointment}
                </Button>
              </Grid>
            ))}
        </Grid>
      </Container>
      <Dialog
        open={selectedTimeSlot !== null}
        onClose={() => setSelectedTimeSlot(null)}
      >
        <DialogTitle>Confirm Reservation</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to reserve the time slot:{" "}
            <strong>{selectedTimeSlot}</strong>?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSelectedTimeSlot(null)} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => handleReservation(selectedTimeSlot)}
            color="primary"
            autoFocus
          >
            Reserve
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default Calendar
