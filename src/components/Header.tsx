import '../styles/header.scss';

export function Header() {
  // Componente simples, com importação do SCSS e IMG direto da public
  return (
    <header className="header">
      <div>
        <img src="/logo.svg" alt="to.do" />
      </div>
    </header>
  );
}
