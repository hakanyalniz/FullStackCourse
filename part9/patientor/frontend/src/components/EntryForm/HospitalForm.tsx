import { Button, TextField, Box } from "@mui/material";

import patientServices from "../../services/patients";
import { useState } from "react";
import { Patient } from "../../types";
import EntryForm from "./EntryForm";

const HospitalForm = ({
  patient,
  setFormType,
}: {
  patient: Patient;
  setFormType: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [dischargeInformation, setDischargeInformation] = useState({
    date: "0",
    criteria: "",
  });

  const handleEntryFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    console.log("test");

    event.preventDefault();

    patientServices.createEntry(
      {
        type: "Hospital",
        description,
        date,
        specialist,
        discharge: {
          date: dischargeInformation.date,
          criteria: dischargeInformation.criteria,
        },
      },
      patient.id
    );
  };

  return (
    <Box
      component="form"
      onSubmit={(e) => handleEntryFormSubmit(e)}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        width: 300,
        margin: "auto",
        mt: 4,
      }}
    >
      <EntryForm
        handleEntryFormSubmit={handleEntryFormSubmit}
        description={description}
        setDescription={setDescription}
        date={date}
        setDate={setDate}
        specialist={specialist}
        setSpecialist={setSpecialist}
        setFormType={setFormType}
      />

      <TextField
        label="Discharge date"
        type="date"
        value={dischargeInformation.date}
        onChange={(e) =>
          setDischargeInformation((prevState) => ({
            ...prevState, // spread the previous state and only update date
            date: e.target.value,
          }))
        }
        variant="outlined"
      />

      <TextField
        label="Discharge criteria"
        type="string"
        value={dischargeInformation.criteria}
        onChange={(e) =>
          setDischargeInformation((prevState) => ({
            ...prevState, // spread the previous state and only update criteria
            criteria: e.target.value,
          }))
        }
        variant="outlined"
      />

      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </Box>
  );
};

export default HospitalForm;
