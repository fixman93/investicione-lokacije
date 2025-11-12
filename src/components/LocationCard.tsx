import { Card, CardContent, Typography, CardActionArea } from "@mui/material";
import { Link } from "react-router-dom";
import type { LocationFeature } from "../types/location";

export default function LocationCard({
  location,
}: {
  location: LocationFeature;
}) {
  return (
    <Card>
      <CardActionArea component={Link} to={`/mapa?focus=${location.id}`}>
        <CardContent>
          <Typography variant="h6">{location.name}</Typography>
          <Typography color="text.secondary" variant="body2">
            {location.description}
          </Typography>
          <Typography sx={{ mt: 1 }}>
            {location.areaM2} m² · {location.pricePerM2} €/m²
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
