import { Box, Container, Stack, Typography } from '@mui/material';
import CreateForm from '../components/CreateForm';
import TableForm from '../components/TableForm';
import PostAddIcon from '@mui/icons-material/PostAdd';
const Home = ({ formConfig, onSubmit }) => {
  return (
    <Container>
      <Box p={5}></Box>
      <Stack spacing={5}>
        <div>
          <Stack alignContent='center' direction="row" spacing={1}>
            <PostAddIcon color='info' fontSize='large' />
            <Typography variant="h4" component="h1">
              <strong>Sistema de Formularios</strong>
            </Typography>
          </Stack>
          <Typography>
            Ing. Sebastián Mite
          </Typography>
        </div>
        <TableForm />
      </Stack>
    </Container>
  );
};
export default Home;