import { useRef, useState, useContext } from 'react';
import { Link as RouterLink } from 'react-router-dom';

// material
import {
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
  ListItemText,
  Modal,
  Box,
  Button,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  Select,
} from '@mui/material';
// component
import Iconify from '../../../components/Iconify';
import { appContext } from '../../../context/context';
import Alert from '../../../components/Alert';

// ----------------------------------------------------------------------
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
export default function UserMoreMenu({ id }) {
  const [description, setDesc] = useState('');
  const [price, setPrice] = useState('');
  const [expense, setExpense] = useState('');
  const [open, setOpen] = useState(false);
  const [EditId, setEditId] = useState('');

  // console.log(EachExpense);

  const { expenseType, deleteExpense, expenses, updateExpense, showAlert, hideAlert } = useContext(appContext);
  const handleOpen = () => {
    setOpen(true);
    // setEditId(id);
    // const EachExpense = expenses.find((exp) => exp._id === EditId);
  };
  const handleClose = () => setOpen(false);
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  // console.log(EditId);
  const edits = (id) => {
    handleOpen();
    const singleExp = expenses.find((signle) => signle._id === id);
    setDesc(singleExp.description);
    setPrice(singleExp.price);
    setExpense(singleExp.expense);
    setEditId(id);

    console.log(singleExp);
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    const theUpdatedExpense = { description, price, expense };
    updateExpense(EditId, theUpdatedExpense);
    setDesc('');
    setPrice('');
    setExpense('');
    hideAlert();
    setTimeout(() => {
      handleClose();
    }, 2000);
  };

  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Iconify icon="eva:more-vertical-fill" width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' },
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem sx={{ color: 'text.secondary' }} onClick={() => deleteExpense(id)}>
          <ListItemIcon>
            <Iconify icon="eva:trash-2-outline" width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Delete" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>

        {/* <Button onClick={handleOpen}>Open modal</Button> */}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              update expense form
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              {showAlert && <Alert />}
              <form onSubmit={handleUpdate}>
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
                    update expense
                  </Button>
                </Box>
              </form>
            </Typography>
          </Box>
        </Modal>

        <MenuItem component={RouterLink} to="#" sx={{ color: 'text.secondary' }} onClick={() => edits(id)}>
          <ListItemIcon onClick={handleOpen}>
            <Iconify icon="eva:edit-fill" width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Edit" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
      </Menu>
    </>
  );
}
