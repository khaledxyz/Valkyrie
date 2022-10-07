import Separator from '../Separator';
import Input from '../Input/Input';

const HomeSidebar = () => {
    return (
        <div className="HomeSidebar">
            <Input placeholder={'Search for conversations.'} />
            <Separator />
        </div>
    );
}

export default HomeSidebar;