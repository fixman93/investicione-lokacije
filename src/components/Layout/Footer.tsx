import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function Footer() {
  return (
    <Box sx={{ backgroundColor: "#e9ecef", py: 3, textAlign: "center" }}>
      <Typography variant="body2" color="textSecondary">
        © {new Date().getFullYear()} Opština Brod | Invest Lokacije Brod
      </Typography>
    </Box>
  );
}
