import { Helmet } from 'react-helmet';
import { Box, Container, Grid } from '@material-ui/core';
import CustomerProfile from '../components/customer/CustomerProfile';
import CustomerProfileDetails from '../components/customer/CustomerProfileDetails';

const CustomerDetail = () => (
  <>
    <Helmet>
      <title>Account | Material Kit</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={4}
            md={6}
            xs={12}
          >
            <CustomerProfile />
          </Grid>
          <Grid
            item
            lg={8}
            md={6}
            xs={12}
          >
            <CustomerProfileDetails />
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
);

export default CustomerDetail;
