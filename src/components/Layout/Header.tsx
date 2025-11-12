import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <AppBar position="sticky" color="primary" sx={{ mb: 4 }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          color="inherit"
          sx={{ textDecoration: "none" }}
        >
          Invest Lokacije Brod
        </Typography>
        <div>
          <Button color="inherit" component={Link} to="/">
            Početna
          </Button>
          <Button color="inherit" component={Link} to="/mapa">
            Mapa
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
}
