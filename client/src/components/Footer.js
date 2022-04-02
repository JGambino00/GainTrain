import { Container, Box, CssBaseline, Link, Typography } from '@mui/material';

function StickyFooter() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', textAlign: 'center', justifyContent: 'center', height: '100%'}}>
      <CssBaseline />
      {/* Adding the theme for the footer */}
      <Box style={{margin: 0}} component="footer" sx={{
        marginTop: 0, paddingTop: 0,
        py: 6, px: 2, mt: 'auto',
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
      }}>
        {/* Displaying the footer */}
        <Container maxWidth="sm">
          <Typography variant="body1">
            GainTrain
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {'Copyright © '}
            {/* The copyright leads to the github */}
            <Link color="inherit" href='https://github.com/JGambino00/GainTrain'>
              GainTrain
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}
export default StickyFooter;
