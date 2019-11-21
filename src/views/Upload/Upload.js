import React from 'react';
import { TextField, Grid, FormControlLabel, Checkbox } from '@material-ui/core';
import ContentTable from 'components/ContentTable';

const Upload = () => {
  return (

    <div style={{ padding: "20px" }}>
      <Grid
        item
        xs={4}
      >
        <p style={{ fontSize: "22px", fontWeight: "500", marginTop: "36px", marginLeft: "18px" }}>Upload Source Project</p>
        <TextField
          fullWidth
          label="GitHub URL"
          margin="dense"
          name="URL"
          required
          variant="outlined"
        />
        <TextField
          fullWidth
          label="Select State"
          margin="dense"
          name="state"
          //onChange={handleChange}
          required
          select
          // eslint-disable-next-line react/jsx-sort-props
          SelectProps={{ native: true }}
          value={"Flutter Version"}
          variant="outlined"
        >

          <option
            value={"Very version"}
          >
            Very version
                  </option>
        </TextField>
      </Grid>

      <p style={{ fontSize: "16px", fontWeight: "500", marginTop: "36px", marginLeft: "18px" }}>Build on*</p>
      <Grid
        container
        direction="column"
      >
        <FormControlLabel
          control={
            <Checkbox
              color="primary"
              defaultChecked //
            />
          }
          label="Android"
        />
        <FormControlLabel
          control={
            <Checkbox
              color="primary"
              defaultChecked //
            />
          }
          label="iOS"
        />
      </Grid>

      <Grid
        item
        lg={6}
        md={8}
        xl={6}
        xs={8}
      >
        <ContentTable />
      </Grid>
      <div style={{ backgroundImage: `url("../../assets/phone.png")` }} />
    </div>
  );
}

export default Upload;