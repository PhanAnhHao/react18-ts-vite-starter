import { sayBye } from './say';
import sayHiImport from './say';

// đầy đủ format - dễ đọc hơn
const MyFirstComponent = () => {
    sayHiImport("PhAHao");
    sayBye("See you later");
    return (
        <div>
            MyFirstComponent update export
        </div>
    )
}

// inline - ko recommend
// const MyFirstComponent = () => <div>MyFirstComponent inline</div>

// cũng ko recommend
// const MyFirstComponent = () => {
//   return <div>MyFirstComponent</div>
// }

export default MyFirstComponent;