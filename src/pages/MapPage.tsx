import { useEffect, useRef, useState } from "react";
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import { OSM, XYZ } from "ol/source";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import Feature from "ol/Feature";
import Polygon from "ol/geom/Polygon";
import { fromLonLat } from "ol/proj";
import { Fill, Stroke, Style } from "ol/style";
import Overlay from "ol/Overlay";
import { useLocation } from "react-router-dom";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

// 🔹 Lokacije
const LOCATIONS = [
  {
    id: "1",
    name: "Centar Brod – Gradski trg",
    description:
      "Zemljište u centru Broda, u blizini opštine i šetališta uz Savu.",
    areaM2: 7500,
    pricePerM2: 35,
    coordinates: [
      [17.9859, 45.1369],
      [17.988, 45.1369],
      [17.988, 45.1381],
      [17.9859, 45.1381],
      [17.9859, 45.1369],
    ],
  },
  {
    id: "2",
    name: "Mahale – Stambene zone",
    description:
      "Stambeno područje u severozapadnom delu Broda, pogodno za razvoj novih zgrada i prateće sadržaje.",
    areaM2: 16000,
    pricePerM2: 22,
    coordinates: [
      [18.0068, 45.1493],
      [18.0077, 45.1493],
      [18.0077, 45.1499],
      [18.0068, 45.1499],
      [18.0068, 45.1493],
    ],
  },
  {
    id: "3",
    name: 'Poslovna zona "Skele"',
    description:
      "Industrijsko-poslovna zona u blizini obale Save, pogodna za proizvodne i logističke pogone.",
    areaM2: 28000,
    pricePerM2: 18,
    coordinates: [
      [17.9785, 45.1472],
      [17.981, 45.1472],
      [17.981, 45.1488],
      [17.9785, 45.1488],
      [17.9785, 45.1472],
    ],
  },
  {
    id: "4",
    name: 'Poslovna zona "Utvaj"',
    description:
      "Zona u južnom delu Broda, uz pristupne saobraćajnice i slobodne površine za investicije.",
    areaM2: 35000,
    pricePerM2: 17,
    coordinates: [
      [17.983, 45.1265],
      [17.986, 45.1265],
      [17.986, 45.128],
      [17.983, 45.128],
      [17.983, 45.1265],
    ],
  },
  {
    id: "5",
    name: "Poslovna zona pored magistralnog puta Brod–Sarajevo",
    description:
      "Lokacija uz magistralni put, pogodna za benzinske pumpe, servise i veće komercijalne objekte.",
    areaM2: 41000,
    pricePerM2: 20,
    coordinates: [
      [18.001, 45.132],
      [18.004, 45.132],
      [18.004, 45.134],
      [18.001, 45.134],
      [18.001, 45.132],
    ],
  },
  {
    id: "6",
    name: "Poslovni objekat pored nekadašnje pekare (Ulica Ive Andrića)",
    description:
      "Manji poslovni objekat na atraktivnoj lokaciji u urbanom delu Broda, mogućnost rekonstrukcije.",
    areaM2: 2200,
    pricePerM2: 40,
    coordinates: [
      [17.9892, 45.1408],
      [17.99, 45.1408],
      [17.99, 45.1414],
      [17.9892, 45.1414],
      [17.9892, 45.1408],
    ],
  },
  {
    id: "7",
    name: "Poslovni objekat nekadašnje pekare",
    description:
      "Postojeći poslovni objekat u centru Broda, pogodan za prenamenu u ugostiteljstvo, trgovinu ili administrativne svrhe.",
    areaM2: 1900,
    pricePerM2: 38,
    coordinates: [
      [17.9885, 45.141],
      [17.989, 45.141],
      [17.989, 45.1416],
      [17.9885, 45.1416],
      [17.9885, 45.141],
    ],
  },
];

export default function MapPage() {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<Map | null>(null);
  const vectorSourceRef = useRef<VectorSource | null>(null);
  const osmLayerRef = useRef<TileLayer<OSM> | null>(null);
  const satelliteLayerRef = useRef<TileLayer<XYZ> | null>(null);
  const [selected, setSelected] = useState<(typeof LOCATIONS)[0] | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const routerLocation = useLocation();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // Inicijalizacija mape
  useEffect(() => {
    if (!mapRef.current) return;

    const vectorSource = new VectorSource();

    // 🗺️ Dodaj sve lokacije inicijalno
    LOCATIONS.forEach((loc) => {
      const coords = loc.coordinates.map((c) => fromLonLat(c));
      const polygon = new Polygon([coords]);
      const feature = new Feature({
        geometry: polygon,
        id: loc.id,
        name: loc.name,
      });

      feature.setStyle(
        new Style({
          stroke: new Stroke({ color: "#1565c0", width: 2 }),
          fill: new Fill({ color: "rgba(21,101,192,0.15)" }),
        })
      );
      vectorSource.addFeature(feature);
    });

    const vectorLayer = new VectorLayer({
      source: vectorSource,
    });

    const osmLayer = new TileLayer({ source: new OSM(), visible: true });

    const satelliteLayer = new TileLayer({
      source: new XYZ({
        url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        attributions:
          "Tiles © Esri — Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",
      }),
      visible: false,
    });

    const map = new Map({
      target: mapRef.current,
      layers: [osmLayer, satelliteLayer, vectorLayer],
      view: new View({
        center: fromLonLat([17.99, 45.143]),
        zoom: 13.7,
        maxZoom: 18.5,
      }),
    });

    mapInstance.current = map;
    vectorSourceRef.current = vectorSource;
    osmLayerRef.current = osmLayer;
    satelliteLayerRef.current = satelliteLayer;

    // Tooltip overlay
    const tooltipOverlay = new Overlay({
      element: tooltipRef.current!,
      offset: [0, -10],
      positioning: "bottom-center",
    });
    map.addOverlay(tooltipOverlay);

    // Hover event – prikaz naziva zone
    map.on("pointermove", (evt) => {
      if (!tooltipRef.current) return;
      const feature = map.forEachFeatureAtPixel(evt.pixel, (f) => f);
      if (feature) {
        const name = feature.get("name");
        tooltipRef.current.innerHTML = name;
        tooltipRef.current.style.display = "block";
        tooltipOverlay.setPosition(evt.coordinate);
      } else {
        tooltipRef.current.style.display = "none";
      }
    });

    // 🎚️ Earth view aktivan pri većem zoomu
    map.getView().on("change:resolution", () => {
      const zoom = map.getView().getZoom();
      if (!osmLayerRef.current || !satelliteLayerRef.current) return;

      if (zoom && zoom >= 15.5) {
        osmLayerRef.current.setVisible(false);
        satelliteLayerRef.current.setVisible(true);
      } else {
        osmLayerRef.current.setVisible(true);
        satelliteLayerRef.current.setVisible(false);
      }
    });

    // 🖱️ Klik na mapu
    map.on("singleclick", (evt) => {
      let clickedLocation: any = null;

      map.forEachFeatureAtPixel(evt.pixel, (feature) => {
        const id = feature.get("id");
        const loc = LOCATIONS.find((l) => l.id === id);
        if (loc) clickedLocation = loc;
      });

      // Ako kliknemo istu lokaciju ponovo → odselektuj
      if (clickedLocation && selected?.id === clickedLocation.id) {
        setSelected(null);
      }
      // Ako kliknemo drugu → selektuj novu
      else if (clickedLocation) {
        setSelected(clickedLocation);
      }
      // Ako kliknemo prazno → odselektuj
      else {
        setSelected(null);
      }
    });

    return () => map.setTarget(undefined);
  }, []);

  // Kada se izabere lokacija (iz liste ili mape)
  useEffect(() => {
    if (!mapInstance.current || !vectorSourceRef.current) return;

    const map = mapInstance.current;
    const source = vectorSourceRef.current;

    // resetuj stil svih
    source.getFeatures().forEach((f) => {
      f.setStyle(
        new Style({
          stroke: new Stroke({ color: "#1565c0", width: 2 }),
          fill: new Fill({ color: "rgba(21,101,192,0.15)" }),
        })
      );
    });

    if (selected) {
      // selektovana – zumiraj i oboji
      const polygonCoords = selected.coordinates.map((c) => fromLonLat(c));
      const polygon = new Polygon([polygonCoords]);
      const extent = polygon.getExtent();

      const feature = source
        .getFeatures()
        .find((f) => f.get("id") === selected.id);

      if (feature) {
        feature.setStyle(
          new Style({
            stroke: new Stroke({ color: "#d32f2f", width: 3 }),
            fill: new Fill({ color: "rgba(211,47,47,0.25)" }),
          })
        );
      }

      map.getView().fit(extent, {
        padding: [60, 60, 60, 60],
        duration: 700,
      });
    } else {
      // ništa selektovano → prikaži sve
      const allFeatures = source.getFeatures();
      const allExtents = allFeatures.map((f) => f.getGeometry()?.getExtent());
      const fullExtent = allExtents.reduce(
        (acc: any, curr) => {
          if (!curr) return acc;
          return [
            Math.min(acc[0], curr[0]),
            Math.min(acc[1], curr[1]),
            Math.max(acc[2], curr[2]),
            Math.max(acc[3], curr[3]),
          ];
        },
        [Infinity, Infinity, -Infinity, -Infinity]
      );

      map
        .getView()
        .fit(fullExtent, { padding: [50, 50, 50, 50], duration: 600 });
    }
  }, [selected]);

  useEffect(() => {
    if (!mapInstance.current || !vectorSourceRef.current) return;

    const query = new URLSearchParams(routerLocation.search);
    const focusId = query.get("focus");

    if (focusId) {
      const loc = LOCATIONS.find((l) => l.id === focusId);
      if (loc) setSelected(loc);
    }
  }, [routerLocation]);

  // 📋 Lista lokacija
  const LocationList = (
    <Box sx={{ width: isMobile ? "100vw" : 350, p: 2 }}>
      {/* <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h6">Lokacije</Typography>
        {isMobile && (
          <IconButton onClick={() => setDrawerOpen(false)}>
            <CloseIcon />
          </IconButton>
        )}
      </Box> */}
      {/* <Divider sx={{ mb: 1 }} /> */}
      <List>
        {LOCATIONS.map((l) => (
          <ListItem key={l.id} disablePadding>
            <ListItemButton
              selected={selected?.id === l.id}
              onClick={() => {
                setSelected(l);
                if (isMobile) setDrawerOpen(false); // ✅ zatvori drawer ako je mobilni
              }}
            >
              <ListItemText
                primary={l.name}
                secondary={`${l.areaM2} m² · ${l.pricePerM2} €/m²`}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
  return (
    <Box
      sx={{
        display: "flex",
        height: "calc(100vh - 70px)",
        position: "relative",
      }}
    >
      {!isMobile && (
        <Box
          sx={{
            width: 350,
            borderRight: "1px solid #ddd",
            backgroundColor: "#fafafa",
            overflowY: "auto",
          }}
        >
          {LocationList}
        </Box>
      )}

      <Box sx={{ flex: 1, position: "relative" }}>
        {/* 🧭 Meni ikonica — UVIJEK vidljiva */}
        {isMobile && (
          <IconButton
            onClick={() => setDrawerOpen(true)}
            sx={{
              position: "fixed",
              top: 60,
              right: 16,
              zIndex: 50,
              backgroundColor: "white",
              boxShadow: 3,
              borderRadius: "50%",
              width: 46,
              height: 46,
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: "#f1f5f9",
                transform: "scale(1.05)",
              },
            }}
          >
            <MenuIcon sx={{ color: "#1565c0" }} />
          </IconButton>
        )}

        {/* 🗺️ Tooltip */}
        <div
          ref={tooltipRef}
          style={{
            position: "absolute",
            background: "white",
            padding: "4px 8px",
            borderRadius: "4px",
            boxShadow: "0 1px 4px rgba(0,0,0,0.3)",
            fontSize: "13px",
            fontWeight: 500,
            pointerEvents: "none",
            whiteSpace: "nowrap",
            transform: "translate(-50%, -120%)",
            display: "none",
            zIndex: 20,
          }}
        />

        {/* 🌍 Mapa */}
        <div
          ref={mapRef}
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "8px",
            overflow: "hidden",
          }}
        />

        {/* 🏷️ Info Card */}
        {selected && (
          <Card
            sx={{
              position: isMobile ? "fixed" : "absolute",
              bottom: isMobile ? 0 : "auto",
              top: isMobile ? "auto" : 20,
              left: isMobile ? 0 : "auto",
              right: isMobile ? 0 : 20,
              width: isMobile ? "100%" : 320,
              borderRadius: isMobile ? "20px 20px 0 0" : 2,
              boxShadow: 6,
              backgroundColor: "#fff",
              zIndex: 30,
              p: 1,
            }}
          >
            <CardContent>
              <Typography variant="h6">{selected.name}</Typography>
              <Divider sx={{ my: 1 }} />
              <Typography variant="body2" color="text.secondary">
                {selected.description}
              </Typography>
              <Typography sx={{ mt: 2 }}>
                <strong>Površina:</strong> {selected.areaM2} m²
              </Typography>
              <Typography>
                <strong>Cena:</strong> {selected.pricePerM2} €/m²
              </Typography>
            </CardContent>
          </Card>
        )}

        {/* 📱 Modern Drawer */}
        <Drawer
          anchor="bottom"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          transitionDuration={400}
          PaperProps={{
            sx: {
              borderTopLeftRadius: "24px",
              borderTopRightRadius: "24px",
              height: "70%",
              background: "rgba(255,255,255,0.85)",
              backdropFilter: "blur(12px)",
              boxShadow: "0 -2px 20px rgba(0,0,0,0.1)",
              overflow: "hidden",
              position: "relative",
            },
          }}
        >
          {/* Grab handle i naslov */}
          <Box
            sx={{
              textAlign: "center",
              position: "relative",
              py: 2,
              borderBottom: "1px solid rgba(0,0,0,0.1)",
            }}
          >
            <Box
              sx={{
                width: 40,
                height: 4,
                borderRadius: 2,
                backgroundColor: "rgba(0,0,0,0.2)",
                mx: "auto",
                mb: 1,
              }}
            />
            <Typography variant="h6">Dostupne lokacije</Typography>

            {/* Close button fiksiran u gornji desni ugao */}
            <IconButton
              onClick={() => setDrawerOpen(false)}
              sx={{
                position: "absolute",
                right: 10,
                top: 10,
                color: "rgba(0,0,0,0.6)",
                backgroundColor: "rgba(255,255,255,0.6)",
                "&:hover": { backgroundColor: "#f1f5f9" },
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Lista unutar drawer-a */}
          <Box sx={{ overflowY: "auto", height: "100%" }}>{LocationList}</Box>
        </Drawer>
      </Box>
    </Box>
  );
}
