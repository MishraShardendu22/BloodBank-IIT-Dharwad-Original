import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { LogOut as LogOutIcon } from 'lucide-react';

const LogOut = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <Button
      onClick={handleLogout}
      className="h-8 gap-2 px-3 py-3 transition-colors hover:bg-red-600"
      variant="destructive"
    >
      <LogOutIcon className="w-5 h-5" />
      Log-Out
    </Button>
  );
};

export default LogOut;