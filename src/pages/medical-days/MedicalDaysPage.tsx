import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Typography,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import MedicalDayTable from "../../components/table/MedicalDayTable";
import { useQueries } from "@tanstack/react-query";
import {
  DipendenteControllerApi,
  MedicoControllerApi,
  RangeFilterLocalDate,
  SedeControllerApi,
} from "../../api";

function MedicalDaysPage() {
  const months = () => {
    const newDate = new Date();
    const currentMonth = newDate.getMonth();

    newDate.setMonth(currentMonth + 1);

    return newDate;
  };
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  function handleOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  const [provincia, setProvincia] = useState("");
  const [sedeId, setSedeId] = useState("");
  const [medico, setMedico] = useState("");
  const [{ data: sedi }, { data: medici }, { data: dipendenti }] = useQueries({
    queries: [
      {
        queryKey: ["medicalday-sedi"],
        queryFn: () => new SedeControllerApi().findAll1(),
      },
      {
        queryKey: ["medicalday-medici"],
        queryFn: () =>
          new MedicoControllerApi().findAll2(
            { sedeId: { equals: sedeId as unknown as number } },
            {},
          ),
        enabled: sedeId !== undefined,
      },
      {
        queryKey: ["medicalday-dipendenti-scadenza"],
        queryFn: () =>
          new DipendenteControllerApi().findAll5(
            {
              scadenzaVisitaDal: {
                greaterOrEqualThan:
                  new Date() as unknown as RangeFilterLocalDate,
              },
              scadenzaVisitaAl: {
                lessOrEqualThan: months as unknown as RangeFilterLocalDate,
              },
            },
            { size: 6 },
          ),
      },
    ],
  });

  console.log(medici + "medici e sedeid: " + sedeId);
  return (
    <>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <Card style={{ width: "80%" }}>
          <CardHeader
            component={() => (
              <Box style={{ backgroundColor: theme.palette.primary.light }}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Nuovo Medical Day
                </Typography>
              </Box>
            )}
          ></CardHeader>
          <CardContent>
            <InputLabel id="demo-simple-select-label">Provincia</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={provincia}
              label="Provincia"
              onChange={(e) => {
                setProvincia(e.target.value);
                setSedeId(e.target.value);
              }}
            >
              {sedi?.data
                ?.map((s) => (
                  <MenuItem key={s.id} value={s.id}>
                    {s.denominazione}
                  </MenuItem>
                ))
                .sort((a, b) =>
                  a.props.children.localeCompare(b.props.children),
                )}
            </Select>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={medico}
              label="Medico"
              onChange={(e) => {
                setMedico(e.target.value);
              }}
            >
              {medici?.data.content
                ?.map((m) => (
                  <MenuItem key={m.id} value={m.nome}>
                    {m.nome + " " + m.cognome}
                  </MenuItem>
                ))
                .sort((a, b) =>
                  a.props.children.localeCompare(b.props.children),
                )}
            </Select>
            {dipendenti?.data.content?.map((d) => (
              <FormControlLabel
                key={d.id}
                label={d.nome + " " + d.cognome + " " + d.scadenzaVisita}
                control={<Checkbox />}
              />
            ))}
          </CardContent>
        </Card>
      </Modal>
      <MedicalDayTable />
    </>
  );
}

export default MedicalDaysPage;
