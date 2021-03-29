import { TaskList } from './components/TaskList';
import { Header } from './components/Header';
import './styles/global.scss';

export function App() {
  return (
    // Componente Principal, o que é inserido diretamente no nosso HTML. #root
    // Nele contém dois componentes, Header e TaskList
    <>
      <Header />
      <TaskList />
    </>
  );
}
