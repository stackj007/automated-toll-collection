import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline'
import { makeStyles } from '@material-ui/core/styles'
import { Typography, Button, Box } from '@material-ui/core'
import { green } from '@material-ui/core/colors'
import { useNavigate } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    textAlign: 'center',
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(2),
  },
  icon: {
    fontSize: '4rem',
    color: green[500],
    animation: `$pop-in 0.6s ${theme.transitions.easing.easeInOut} forwards`,
  },
  '@keyframes pop-in': {
    '0%': {
      opacity: 0,
      transform: 'scale(0.5)',
    },
    '100%': {
      opacity: 1,
      transform: 'scale(1)',
    },
  },
}))

const SuccessPage = () => {
  const classes = useStyles()

  const navigate = useNavigate()
  const handleButtonClick = () => {
    navigate('/dashboard')
  }

  return (
    <div className={classes.root}>
      <CheckCircleOutlineIcon className={classes.icon} />
      <Typography variant="h4" gutterBottom>
        Payment Successful
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Your payment was successful. Thank you for your
        purchase.
      </Typography>
      <Box mt={4}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleButtonClick}
        >
          Go to Homepage
        </Button>
      </Box>
    </div>
  )
}

export default SuccessPage
