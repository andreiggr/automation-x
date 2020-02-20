import React from 'react';
import { TextField, Grid, FormControlLabel, Checkbox, Modal } from '@material-ui/core';
import ContentTable from 'components/ContentTable';


const Upload = () => {
	return (
		<div style={{ padding: '20px' }}>
			<Grid container direction="row">
				<Grid direction="column" item xs={6}>
					<p style={{ fontSize: '22px', fontWeight: '500', marginTop: '36px', marginLeft: '18px' }}>
						Upload Source Project
					</p>
					<TextField fullWidth label="GitHub URL" margin="dense" name="URL" required variant="outlined" />
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
						value={'Flutter Version'}
						variant="outlined"
					>
						<option value={'Very version'}>Very version</option>
					</TextField>
					<p style={{ fontSize: '16px', fontWeight: '500', marginTop: '36px', marginLeft: '18px' }}>
						Build on*
					</p>
					<Grid container direction="column">
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

					<Grid item lg={12} md={12} xl={12} xs={12}>
						<ContentTable />
					</Grid>
				</Grid>
			</Grid>
		</div>
	);
};

export default Upload;
