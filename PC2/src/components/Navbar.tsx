import { Link, useLocation, useNavigate } from 'react-router-dom';


export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path: string) =>
    location.pathname === path
      ? 'font-bold px-3.5 py-2 rounded-lg no-underline transition-all duration-150'
      : 'font-semibold px-3.5 py-2 rounded-lg no-underline transition-all duration-150';

  return (
    <header className="border-b shadow-sm py-1.5">
      <div className="max-w-[1120px] mx-auto px-7 py-4 flex items-center justify-between gap-8">
        <Link
          to="/flights"
          className="text-2xl font-black tracking-tight no-underline"
        >
          Fly Away Travel
        </Link>

        <nav className="flex items-center gap-7 flex-wrap">
          <Link to="/flights" className={isActive('/flights')}>
            Buscar Vuelos
          </Link>

          {isAuthenticated && (
            <Link to="/bookings" className={isActive('/bookings')}>
              Mis Reservas
            </Link>
          )}

          {!isAuthenticated ? (
            <>
              <Link to="/login" className={isActive('/login')}>
                Iniciar Sesión
              </Link>
              <Link
                to="/register"
                className="text-sm font-bold px-3.5 py-1.5 rounded-lg border no-underline transition-all duration-150"
              >
                Registrarse
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-4">
              <span
                className="text-sm font-semibold px-3 py-1.5 rounded-full border"
                title={user?.email}
              >
                {user ? `${user.firstName} ${user.lastName}` : 'Cargando...'}
              </span>
              <button
                type="button"
                onClick={handleLogout}
                className="text-sm font-semibold border px-3.5 py-1.5 rounded-lg transition-all duration-150"
              >
                Cerrar Sesión
              </button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}