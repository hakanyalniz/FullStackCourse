import { TextField } from "@mui/material";

import { EntryProps } from "../../types";

const EntryForm = ({
  description,
  setDescription,
  date,
  setDate,
  specialist,
  setSpecialist,
  setFormType,
}: EntryProps) => {
  return (
    <>
      <select
        id="form-type"
        name="form-type"
        onChange={(e) => setFormType(e.target.value)}
        defaultValue={"default"}
      >
        <option value="default" disabled>
          --Select--
        </option>
        <option value="hospital">Hospital</option>
        <option value="healthCheck">Health Check</option>
        <option value="occupationalHealthcare">Occupational Healthcare</option>
      </select>
      <TextField
        label="Description"
        type="text"
        variant="outlined"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <TextField
        label="Entry date"
        type="date"
        variant="outlined"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        InputLabelProps={{ shrink: true }}
      />

      <TextField
        label="Specialist"
        type="text"
        variant="outlined"
        value={specialist}
        onChange={(e) => setSpecialist(e.target.value)}
      />
    </>
  );
};

export default EntryForm;
