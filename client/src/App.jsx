import Button from './components/Button/Button';
import { AiOutlinePlus } from 'react-icons/ai';
import './sass/index.scss';
const App = () => {
  return ( 
    <div className="App">
      <Button variant={'normal'} color={'danger'} icon={<AiOutlinePlus />}>Danger</Button>
    </div>
   );
}
 
export default App;