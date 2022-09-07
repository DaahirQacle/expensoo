import React, { useContext, useState } from 'react';
import {
  Box,
  Button,
  Container,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { appContext } from '../context/context';
import Alert from '../components/Alert';

const AddExpense = () => {
  const [description, setDesc] = useState('');
  const [price, setPrice] = useState('');
  const [expense, setExpense] = useState('');
  const { expenseType, showAlert, createExpense, getExpenses, hideAlert } = useContext(appContext);

  const handlerExpense = (e) => {
    e.preventDefault();

    if (!description || !expense || !price) {
      return;
    }
    const expenseinfo = { description, price, expense };
    // console.log(expenseinfo);
    createExpense(expenseinfo);
    hideAlert();
    setDesc('');
    setPrice('');
    setExpense('');
  };
  return (
    <Container>
      <Box>
        {' '}
        <Typography variant="h4"> add new expense </Typography>{' '}
        <div>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column ',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: '2rem',
            }}
          >
            {showAlert && <Alert />}
            <form onSubmit={handlerExpense}>
              <TextField
                label="Description"
                id="outlined-start-adornment"
                sx={{ m: 1, width: '100%', marginBottom: '1.6rem' }}
                value={description}
                onChange={(e) => setDesc(e.target.value)}
                name="description "
              />
              <FormControl fullWidth sx={{ m: 1 }}>
                <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-amount"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  startAdornment={<InputAdornment position="start">$</InputAdornment>}
                  label="Amount"
                  price="price"
                />
              </FormControl>

              <FormControl fullWidth sx={{ marginTop: '2rem' }}>
                <InputLabel id="demo-simple-select-label">Type</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={expense}
                  label="Age"
                  onChange={(e) => setExpense(e.target.value)}
                  name="expense"
                >
                  {expenseType.map((job, indx) => {
                    return (
                      <MenuItem value={job} key={indx}>
                        {' '}
                        {job}{' '}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              <Box sx={{ display: 'flex', width: '100%', marginTop: '2rem', alignSelf: 'flex-end' }}>
                <Button type="submit" variant="contained" color="success">
                  add expense
                </Button>
              </Box>
            </form>
          </Box>
        </div>
      </Box>
    </Container>
  );
};

export default AddExpense;
