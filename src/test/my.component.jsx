import { sayBye } from './say';
import sayHiImport from './say';

const MyFirstComponent = () => {
    sayHiImport("PhAHao");
    sayBye("See you later");
    return (
        <div>
            MyFirstComponent update export
        </div>
    )
}

export default MyFirstComponent;