import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { faker } from '@faker-js/faker';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// components
import { appContext } from '../context/context';

import Page from '../components/Page';
import Iconify from '../components/Iconify';

// sections
import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
} from '../sections/@dashboard/app';

// ----------------------------------------------------------------------

export default function DashboardApp() {
  const { theUser, expenses, getExpenses } = useContext(appContext);
  const navigate = useNavigate();
  console.log(theUser);
  const theme = useTheme();
  useEffect(() => {
    if (!theUser) {
      navigate('/register');
    }
  }, [theUser]);

  useEffect(() => {
    getExpenses();
  }, []);

  const incomes = expenses.reduce((accu, curr) => {
    if (curr.expense === 'income') {
      return accu + curr.price;
    }
    return accu;
  }, 0);
  const yourExp = expenses.reduce((accu, curr) => {
    if (curr.expense === 'expense') {
      return accu + curr.price;
    }
    return accu;
  }, 0);

  const difference = incomes - yourExp;
  console.log(incomes);

  return (
    <Page title="Dashboard">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back {theUser?.firstName}
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="total transactions" total={expenses.length} icon={'icon-park-solid:transaction'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="your incomes" total={incomes} color="info" icon={'ant-design:apple-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="your expenses"
              total={`  ${yourExp}`}
              color="warning"
              icon={'akar-icons:arrow-up-down'}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="difference"
              total={difference}
              color={`${difference > 0 ? 'info' : 'error'}`}
              icon={'ant-design:bug-filled'}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits
              title="this chart is just for demo purposes"
              subheader="the right chart is the right chart"
              chartLabels={[
                '01/01/2003',
                '02/01/2003',
                '03/01/2003',
                '04/01/2003',
                '05/01/2003',
                '06/01/2003',
                '07/01/2003',
                '08/01/2003',
                '09/01/2003',
                '10/01/2003',
                '11/01/2003',
              ]}
              chartData={[
                {
                  name: 'Team A',
                  type: 'column',
                  fill: 'solid',
                  data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                },
                {
                  name: 'Team B',
                  type: 'area',
                  fill: 'gradient',
                  data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                },
                {
                  name: 'Team C',
                  type: 'line',
                  fill: 'solid',
                  data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="your incomes and expenses"
              chartData={[
                { label: 'expenses', value: yourExp },
                { label: 'income', value: incomes },
              ]}
              chartColors={[theme.palette.primary.main, theme.palette.chart.violet[0], theme.palette.chart.yellow[0]]}
            />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
