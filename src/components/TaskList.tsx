import { useEffect, useState } from 'react';
import { FiTrash, FiCheckSquare } from 'react-icons/fi';

import '../styles/tasklist.scss';

// Interface com Chaves|Propriedades de cada Task
interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  // Hook de estado, para toda vez que o componente iniciar pegarmos a referência
  // do nosso localStorage com todas nossas tasks já adicionadas, ou se não existir,
  // retornar um array vazio.
  const [tasks, setTasks] = useState<Task[]>(() => {
    const data = localStorage.getItem('@RocketTaskList');

    if (data) {
      return JSON.parse(data);
    }

    return [];
  });
  // Estado para mantermos o título da task atualizado conforme o usuário digita.
  const [newTaskTitle, setNewTaskTitle] = useState('');

  // Estado para conferirmos se o campo title está vazio.
  const [isEmpty, setIsEmpty] = useState(false);

  // Se houver mudanças no Estado do Title, queremos que o componente salve no estado
  // que o campo não está vazio.
  useEffect(() => {
    setIsEmpty(false);
  }, [newTaskTitle]);

  // Tratamos a criação de uma task
  function handleCreateNewTask() {
    // se o title estiver vazio, marcamos o estado como "true" e retornamos a função.
    if (newTaskTitle === '') {
      setIsEmpty(true);
      return;
    }

    // Gera um número aleatório de 1 a 100mil
    const generateID = Math.floor(Math.random() * (100000 - 1)) + 1;

    // Cria uma cópia do estado de tasks e adicionamos nossa newTask ao final de tudo.
    const totalTasks = [
      ...tasks,
      {
        id: generateID,
        title: newTaskTitle,
        isComplete: false,
      },
    ];

    // Setamos o novo estado com o array acima
    setTasks(totalTasks);
    // Salvamos no localStorage
    localStorage.setItem('@RocketTaskList', JSON.stringify(totalTasks));
    // Resetamos o campo do título
    setNewTaskTitle('');
  }

  // Alterna entre task completada ou não.
  function handleToggleTaskCompletion(id: number) {
    // Fazemos uma verificação para ver qual task tem o mesmo ID que veio como parâmetro na função.
    // Se o ID for diferente, retornamos a tasks sem modificações;
    // Se for igual, setamos o valor como o inverso do valor atual dele
    const handledTasks = tasks.filter((task) =>
      task.id !== id
        ? task
        : {
            id: task.id,
            title: task.title,
            isComplete: (task.isComplete = !task.isComplete),
          }
    );

    // Salvamos as tasks Filtradas
    setTasks(handledTasks);
    // Salvamos as tasks Filtradas no localStorage
    localStorage.setItem('@RocketTaskList', JSON.stringify(handledTasks));
  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID
    const handledTasks = tasks.filter((task) => task.id !== id);

    // Salvamos as tasks Filtradas
    setTasks(handledTasks);
    // Salvamos as tasks Filtradas no localStorage
    localStorage.setItem('@RocketTaskList', JSON.stringify(handledTasks));
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          {isEmpty && <span>Por favor, preencha o campo!</span>}
          <input
            type="text"
            className={isEmpty ? 'error' : ''}
            placeholder="Adicionar novo todo"
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button
            type="submit"
            data-testid="add-task-button"
            onClick={handleCreateNewTask}
          >
            <FiCheckSquare size={16} color="#fff" />
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <div
                className={task.isComplete ? 'completed' : ''}
                data-testid="task"
              >
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button
                type="button"
                data-testid="remove-task-button"
                onClick={() => handleRemoveTask(task.id)}
              >
                <FiTrash size={16} />
              </button>
            </li>
          ))}
        </ul>
      </main>
    </section>
  );
}
