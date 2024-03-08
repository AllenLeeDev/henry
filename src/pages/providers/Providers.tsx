import React from "react"
import { Link } from "react-router-dom"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import {
  FormControl,
  Box,
  Typography,
  List,
  Avatar,
  Container
} from "@mui/material"
import { useAppDispatch, useAppSelector } from "../../state/hooks"
import {
  addAvailableTimeSlot,
  IProvider,
  ISchedule
} from "../../state/providers/providersSlice"
import ListItem from "@mui/material/ListItem"
import ListItemText from "@mui/material/ListItemText"
import Divider from "@mui/material/Divider"

const ProvidersPage = () => {
  const providerState = useAppSelector(state => state.providersState)
  const dispatch = useAppDispatch()
  const [date, setDate] = React.useState("")
  const [startTime, setStartTime] = React.useState("")
  const [endTime, setEndTime] = React.useState("")
  const [providerId, setProviderId] = React.useState<number>()
  const [error, setError] = React.useState<string>("")

  const [currentSchedule, setCurrentSchedule] = React.useState<
    Array<ISchedule> | undefined
  >()

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = e.target.value

    const currentProvider = providerState.find(
      provider => provider.providerId === providerId
    )

    //find if duplicate date only for the selected provider
    const isDuplicateDate = currentProvider?.schedule.some(
      schedule => schedule.date === selectedDate
    )

    if (isDuplicateDate) {
      setError("Selected date already exists in the schedule.")
      return
    }

    setError("")
    setDate(selectedDate)
  }

  const handleSelectProvider = (id: number) => {
    const findSchedule = providerState.find(
      provider => provider.providerId === id
    )?.schedule
    setCurrentSchedule(findSchedule)
  }

  const handleStartTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartTime(e.target.value)
  }

  const handleEndTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndTime(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const newScheduleItem = {
      scheduleId: 0,
      providerId: providerId,
      date: date,
      startTime: startTime,
      endTime: endTime,
      appointments: []
    }

    // Don't allow duplicates in the schedule
    if (
      currentSchedule &&
      currentSchedule.some(
        schedule =>
          schedule.date === date &&
          schedule.startTime === startTime &&
          schedule.endTime === endTime
      )
    ) {
      return
    }

    setCurrentSchedule([...(currentSchedule || []), newScheduleItem])

    dispatch(addAvailableTimeSlot(newScheduleItem))
  }

  const getCurrentTime = new Date().toISOString().slice(11, 16)

  return (
    <>
      <Container>
        <form onSubmit={handleSubmit}>
          <FormControl
            sx={{
              gap: 8,
              marginY: 8,
              display: "flex",
              alignItems: "center",
              flexDirection: "column"
            }}
          >
            <Box sx={{ display: "flex", gap: 3, flexDirection: "column" }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 3,
                  justifyContent: "center"
                }}
              >
                {providerState &&
                  providerState.map((provider: IProvider, index) => (
                    <Avatar
                      key={provider.providerId}
                      sx={{
                        bgcolor: "rgb(0, 131, 108)",
                        cursor: "pointer",
                        flexDirection: "row",
                        boxShadow:
                          providerId === provider.providerId
                            ? "0px 0px 5px 5px rgba(0, 131, 108, 0.5)"
                            : "none",
                        "&:hover": {
                          boxShadow:
                            providerId !== provider.providerId
                              ? "0px 0px 5px 5px rgba(0, 131, 108, 0.5)"
                              : "none"
                        }
                      }}
                      onClick={() => {
                        handleSelectProvider(provider.providerId)
                        setProviderId(provider.providerId)
                      }}
                    >
                      {provider.providerName.charAt(0)}
                    </Avatar>
                  ))}
              </Box>
              {providerId && (
                <>
                  <TextField
                    type="date"
                    variant="outlined"
                    defaultValue="Outlined"
                    onChange={handleDateChange}
                  />
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center"
                    }}
                  >
                    <label>Start Time</label>
                    <TextField
                      type="time"
                      variant="outlined"
                      defaultValue="Outlined"
                      helperText={
                        startTime >= endTime
                          ? "Start time must be before end time"
                          : ""
                      }
                      error={(startTime && startTime >= endTime) || false}
                      onChange={handleStartTimeChange}
                    />
                  </Box>
                  <Typography
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    to
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center"
                    }}
                  >
                    <label>End Time</label>
                    <TextField
                      type="time"
                      variant="outlined"
                      defaultValue="Outlined"
                      onChange={handleEndTimeChange}
                      helperText={
                        endTime <= startTime
                          ? "End time must be in the future"
                          : ""
                      }
                      error={(endTime && endTime <= startTime) || false}
                    />
                  </Box>
                </>
              )}
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column", width: 200 }}>
              <Button
                type="submit"
                variant="contained"
                disabled={
                  !date || !startTime || !endTime || endTime <= startTime
                }
              >
                Submit
              </Button>
              <Typography
                color="error"
                variant="body2"
                sx={{ textAlign: "center" }}
              >
                {error}
              </Typography>
            </Box>
            <Button variant="contained">
              <Link
                to="/client"
                style={{ textDecoration: "none", color: "#fff" }}
              >
                Go to Client Dashboard
              </Link>
            </Button>
          </FormControl>
        </form>
      </Container>
      <Box
        sx={{
          bgcolor: "background.paper",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column"
        }}
      >
        <Typography variant="h4">Current Schedule</Typography>
        <List>
          {currentSchedule &&
            currentSchedule.map((schedule, index) => (
              <ListItem
                key={index}
                disablePadding
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 3
                }}
              >
                <ListItemText primary={schedule.date} />
                <ListItemText primary={schedule.startTime} />
                <ListItemText primary={schedule.endTime} />
                {index > 0 && <Divider />}
              </ListItem>
            ))}
        </List>
      </Box>
    </>
  )
}

export default ProvidersPage
