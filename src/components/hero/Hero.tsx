import * as React from "react"
import { alpha } from "@mui/material"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Container from "@mui/material/Container"
import Stack from "@mui/material/Stack"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import HenryLogo from "../../assets/henrymeds-logo.jpg"
import { Link } from "react-router-dom"

const Hero = () => {
  return (
    <Box
      id="hero"
      sx={{
        width: "100%"
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          pt: { xs: 14, sm: 20 },
          pb: { xs: 8, sm: 12 }
        }}
      >
        <img
          src={HenryLogo}
          alt="HenryMeds Logo"
          style={{ aspectRatio: "auto 264/153.38", width: "264px" }}
        />
      </Box>
      <Container
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <Stack
          spacing={2}
          useFlexGap
          sx={{
            width: { xs: "100%" },
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <Typography component="h1" variant="h1">
            Welcome to&nbsp;
            <Typography
              component="span"
              variant="h1"
              sx={{
                color: "rgb(0, 131, 108)"
              }}
            >
              Henry
            </Typography>
          </Typography>
          <Typography variant="body1" textAlign="center" color="text.secondary">
            Are you a Client or a Provider?
          </Typography>
          <Box sx={{ display: "flex", gap: 8 }}>
            <Link to="/client">
              <Button variant="outlined">Client</Button>
            </Link>
            <Link to="/provider">
              <Button variant="contained" color="primary">
                Provider
              </Button>
            </Link>
          </Box>
        </Stack>
      </Container>
    </Box>
  )
}

export default Hero
