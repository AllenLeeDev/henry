import React from "react"
import { Box, Typography, Avatar, Button } from "@mui/material"
import { Link } from "react-router-dom"
import Calendar from "../../components/calendar/Calendar"
import { useAppSelector } from "../../state/hooks"
import { IProvider, ISchedule } from "../../state/providers/providersSlice"

const ClientsPage = () => {
  const providerState = useAppSelector(state => state.providersState)

  const [currentSchedule, setCurrentSchedule] =
    React.useState<Array<ISchedule>>()
  const [providerId, setProviderId] = React.useState<number>(1)

  const handleSelectProvider = (id: number) => {
    const findSchedule = providerState.find(
      provider => provider.providerId === id
    )?.schedule
    setCurrentSchedule(findSchedule)
  }

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          gap: 4,
          margin: 14
        }}
      >
        <Button variant="contained">
          <Link
            to="/provider"
            style={{ textDecoration: "none", color: "#fff" }}
          >
            Go Providers
          </Link>
        </Button>
        <Typography variant="h4">Select a provider</Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            gap: 4
          }}
        >
          {providerState &&
            providerState.map((provider: IProvider, index: number) => (
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
      </Box>
      <Calendar schedule={currentSchedule} providerId={providerId} />
    </Box>
  )
}

export default ClientsPage
