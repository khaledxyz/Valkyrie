// * DEPENDENCIES * //
import { AnimatePresence } from 'framer-motion';

// * ROUTES * //
import AppRoutes from './routes/index'

// * STYLES * //
import './sass/index.scss';

const App = () => {
  return (
    <AnimatePresence>
      <AppRoutes />
    </AnimatePresence>
  )
}

export default App;