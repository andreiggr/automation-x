import React from 'react';
import { TextField } from '@material-ui/core';

const Upload = () => {
  return ( 

    <div style={{padding:"20px"}}>
    <p style={{fontSize:"22px", fontWeight:"500", marginTop:"36px", marginLeft:"18px"}}>Upload Source Project</p>
    <TextField
                fullWidth
                label="GitHub URL"
                margin="dense"
                name="URL"
                required
                variant="outlined"
              />
    </div>
   );
}
 
export default Upload;