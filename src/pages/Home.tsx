import {
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
} from "@mui/material";
import { Link } from "react-router-dom";
import { LOCATIONS } from "../data/locations";
import LocationCard from "../components/LocationCard";

export default function Home() {
  return (
    <Container sx={{ py: 6 }}>
      {/* Naslov i opis */}
      <Typography
        variant="h3"
        sx={{ fontWeight: "bold", mt: 2, mb: 1, textAlign: "center" }}
      >
        Raspoložive investicione lokacije
      </Typography>

      <Typography
        variant="h6"
        color="text.secondary"
        sx={{ mb: 5, textAlign: "center" }}
      >
        Pregled dostupnih lokacija za ulaganja na području opštine Brod
      </Typography>

      {/* GRID sa karticama */}
      <Grid container spacing={3}>
        {LOCATIONS.map((loc) => (
          <Grid key={loc.id} size={{ xs: 12, sm: 6, md: 4 }}>
            <LocationCard location={loc} />
          </Grid>
        ))}
      </Grid>

      {/* CTA sekcija */}
      <Card
        sx={{
          mt: 8,
          p: 4,
          textAlign: "center",
          backgroundColor: "#f9f9f9",
          boxShadow: 2,
        }}
      >
        <CardContent>
          <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
            Pogledajte sve lokacije na interaktivnoj mapi
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            component={Link}
            to="/mapa"
          >
            Otvori mapu
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
}
