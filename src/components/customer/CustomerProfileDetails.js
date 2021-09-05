import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField
} from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ApiConstants from '../../constant/ApiConstants';
import { CMS_API_URL } from '../../constant/serviceurl';

const domain = [
  {
    value: 'ecommerce',
    label: 'ECommerce'
  },
  {
    value: 'Manufacturing',
    label: 'manufacturing'
  },
  {
    value: 'Marketing',
    label: 'marketing'
  }
];

const type = [
  {
    value: 'Tecnology',
    label: 'technology'
  },
  {
    value: 'healthcare',
    label: 'healthcare'
  },
  {
    value: 'Hospatility',
    label: 'Hospatility'
  }
];

const CustomerProfileDetails = (props) => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: '',
    customerid: '',
    email: '',
    phone: '',
    communication: '',
    address: '',
    city: '',
    website: '',
    type: '',
    domain: '',
    country: '',
    taxnumber: '',
    gst: ''
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = async () => {
    const userLoginToken = localStorage.getItem('userLoginToken');
    await axios({
      method: ApiConstants.METHOD_POST,
      url: CMS_API_URL + ApiConstants.API_ADD_CUSTOMER_URL,
      headers: {
        Authorization: ApiConstants.BEARER + userLoginToken,
      },
      data: {
        name: values.name,
        customerid: values.customerid,
        email: values.email,
        phone: values.phone,
        communication: values.communication,
        address: values.address,
        city: values.city,
        website: values.city,
        type: values.city,
        domain: values.city,
        country: values.city,
        taxnumber: values.city,
        gst: values.gst
      }
    }).then((response) => {
      if (response.data !== null) {
        console.log(response.data);
        navigate(ApiConstants.APP_CUSTOMER_URL, { replace: true });
      }
    });
  };

  return (
    <form
      autoComplete="off"
      noValidate
      {...props}
    >
      <Card>
        <CardHeader
          subheader="The information can be viewed/edited"
          title="Customer Profile"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                helperText="Please specify the first name"
                label="Name"
                name="name"
                onChange={handleChange}
                required
                value={values.name}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Customer Id"
                name="customerid"
                onChange={handleChange}
                required
                value={values.customerid}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                onChange={handleChange}
                required
                value={values.email}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Phone Number"
                name="phone"
                onChange={handleChange}
                type="number"
                value={values.phone}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Address"
                name="address"
                onChange={handleChange}
                required
                value={values.address}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="City"
                name="city"
                onChange={handleChange}
                required
                value={values.city}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Country"
                name="country"
                onChange={handleChange}
                required
                value={values.country}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Domain"
                name="domain"
                onChange={handleChange}
                required
                select
                SelectProps={{ native: true }}
                value={values.domain}
                variant="outlined"
              >
                {domain.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Type"
                name="type"
                onChange={handleChange}
                required
                select
                SelectProps={{ native: true }}
                value={values.type}
                variant="outlined"
              >
                {type.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                helperText="website"
                label="Website"
                name="website"
                onChange={handleChange}
                required
                value={values.website}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                helperText="Tan/Pan Number"
                label="Tan/pan Number"
                name="taxnumber"
                onChange={handleChange}
                required
                value={values.taxnumber}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                helperText="GST Number"
                label="GST Number"
                name="gst"
                onChange={handleChange}
                required
                value={values.gst}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2
          }}
        >
          <Button
            color="primary"
            variant="contained"
            type="submit"
            onSubmit={handleSubmit}
          >
            Save details
          </Button>
        </Box>
      </Card>
    </form>
  );
};

export default CustomerProfileDetails;
