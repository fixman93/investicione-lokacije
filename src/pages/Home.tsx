import { Box, Container, Typography, Button, Grid, Fade } from "@mui/material";
import { Link } from "react-router-dom";
import { LOCATIONS } from "../data/locations";
import LocationCard from "../components/LocationCard";

export default function Home() {
  return (
    <Box sx={{ backgroundColor: "#f8fafc", minHeight: "100vh" }}>
      {/* Hero Section */}
      <Box
        sx={{
          py: { xs: 8, md: 12 },
          background: "linear-gradient(135deg, #1565c0 0%, #1e88e5 100%)",
          color: "white",
          textAlign: "center",
        }}
      >
        <Container maxWidth="md">
          <Fade in timeout={800}>
            <Box>
              <Typography
                variant="h2"
                sx={{
                  fontWeight: "bold",
                  mb: 2,
                  fontSize: { xs: "2rem", md: "3.5rem" },
                }}
              >
                Investicione lokacije opštine Brod
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  mb: 4,
                  opacity: 0.9,
                  lineHeight: 1.6,
                }}
              >
                Pregled slobodnih zona, poslovnih i građevinskih parcela
                dostupnih za ulaganja. Vizuelni prikaz, detalji i kontakti – sve
                na jednom mestu.
              </Typography>
              <Button
                variant="contained"
                size="large"
                sx={{
                  backgroundColor: "white",
                  color: "#1565c0",
                  fontWeight: 600,
                  "&:hover": { backgroundColor: "#e3f2fd" },
                }}
                component={Link}
                to="/mapa"
              >
                Pogledaj interaktivnu mapu
              </Button>
            </Box>
          </Fade>
        </Container>
      </Box>

      {/* Grid sekcija */}
      <Container sx={{ py: { xs: 6, md: 10 } }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            textAlign: "center",
            mb: 2,
            color: "#0f172a",
          }}
        >
          Dostupne lokacije
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            textAlign: "center",
            mb: 6,
            color: "text.secondary",
            maxWidth: 700,
            mx: "auto",
          }}
        >
          Od poslovnih zona do urbanih parcela – istražite najatraktivnije
          lokacije za razvoj privrede, industrije i stanovanja.
        </Typography>

        <Grid container spacing={3}>
          {LOCATIONS.map((loc, i) => (
            <Grid key={loc.id} size={{ xs: 12, sm: 6, md: 4 }}>
              <Fade in timeout={300 + i * 150}>
                <Box>
                  <LocationCard location={loc} />
                </Box>
              </Fade>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* CTA Section */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #1565c0 0%, #0d47a1 100%)",
          color: "white",
          textAlign: "center",
          py: { xs: 6, md: 8 },
          mt: 6,
        }}
      >
        <Container maxWidth="sm">
          <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
            Pogledajte sve lokacije na interaktivnoj mapi
          </Typography>
          <Typography
            variant="body1"
            sx={{ mb: 3, opacity: 0.85, lineHeight: 1.6 }}
          >
            Jednim klikom pregledajte sve zone na satelitskoj mapi i pronađite
            idealnu lokaciju za vaše ulaganje.
          </Typography>
          <Button
            variant="contained"
            size="large"
            sx={{
              backgroundColor: "white",
              color: "#0d47a1",
              fontWeight: 600,
              "&:hover": { backgroundColor: "#bbdefb" },
            }}
            component={Link}
            to="/mapa"
          >
            Otvori mapu
          </Button>
        </Container>
      </Box>
    </Box>
  );
}
