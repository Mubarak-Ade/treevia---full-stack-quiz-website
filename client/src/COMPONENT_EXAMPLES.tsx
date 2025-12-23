/**
 * Example TypeScript Component Conversions
 * Copy these patterns to your components
 */

// ============================================
// 1. Simple Functional Component
// ============================================
import React from 'react';

interface SimpleComponentProps {
  title: string;
  count?: number;
  onClick?: () => void;
}

export const SimpleComponent: React.FC<SimpleComponentProps> = ({
  title,
  count = 0,
  onClick,
}) => {
  return (
    <div>
      <h1>{title}</h1>
      <p>Count: {count}</p>
      {onClick && <button onClick={onClick}>Click me</button>}
    </div>
  );
};

// ============================================
// 2. Component with State
// ============================================
import { useState } from 'react';

interface Counter {
  value: number;
}

export const CounterComponent: React.FC = () => {
  const [counter, setCounter] = useState<Counter>({ value: 0 });

  const increment = (): void => {
    setCounter({ value: counter.value + 1 });
  };

  return (
    <div>
      <p>{counter.value}</p>
      <button onClick={increment}>Increment</button>
    </div>
  );
};

// ============================================
// 3. Component with API Call (Replaced Redux)
// ============================================
export const UserProfile: React.FC = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = (): void => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <div>
      <p>Welcome, {user?.username}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

// ============================================
// 4. Component with API Call
// ============================================
import { useEffect, useState } from 'react';
import api from '../utils/axios';
import { Quiz } from '../types';

interface QuizListProps {
  category?: string;
}

export const QuizList: React.FC<QuizListProps> = ({ category }) => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuizzes = async (): Promise<void> => {
      try {
        setLoading(true);
        const response = await api.get<Quiz[]>('/quiz');
        setQuizzes(response.data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, [category]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {quizzes.map((quiz) => (
        <div key={quiz._id}>{quiz.title}</div>
      ))}
    </div>
  );
};

// ============================================
// 5. Form Component
// ============================================
import { FormEvent, ChangeEvent } from 'react';
import { LoginFormData } from '../types';

interface LoginFormProps {
  onSubmit: (data: LoginFormData) => Promise<void>;
  isLoading?: boolean;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, isLoading = false }) => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    await onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
      />
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Password"
      />
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Login'}
      </button>
    </form>
  );
};

// ============================================
// 6. Component with Children
// ============================================
interface CardProps {
  title: string;
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ title, children }) => {
  return (
    <div className="card">
      <h2>{title}</h2>
      <div className="card-content">{children}</div>
    </div>
  );
};

// ============================================
// 7. Component with Custom Hook
// ============================================
import useInput from '../hooks/useInput';

export const SearchBox: React.FC = () => {
  const [value, handleChange, reset] = useInput('');

  return (
    <div>
      <input
        type="text"
        value={value as string}
        onChange={handleChange}
        placeholder="Search..."
      />
      <button onClick={reset}>Clear</button>
    </div>
  );
};

// ============================================
// 8. Component with useContext
// ============================================
import { useNotification } from '../context/NotificationProvider';

export const NotificationTrigger: React.FC = () => {
  const { showNotification } = useNotification();

  const handleClick = (): void => {
    showNotification('success', 'Operation completed successfully!');
  };

  return <button onClick={handleClick}>Show Notification</button>;
};

// ============================================
// 9. Component with useCallback and useMemo
// ============================================
import { useCallback, useMemo } from 'react';

interface UserListProps {
  users: Array<{ id: string; name: string }>;
  onUserSelect: (userId: string) => void;
}

export const UserList: React.FC<UserListProps> = ({ users, onUserSelect }) => {
  const handleUserClick = useCallback(
    (userId: string): void => {
      onUserSelect(userId);
    },
    [onUserSelect]
  );

  const sortedUsers = useMemo(() => {
    return [...users].sort((a, b) => a.name.localeCompare(b.name));
  }, [users]);

  return (
    <ul>
      {sortedUsers.map((user) => (
        <li key={user.id} onClick={() => handleUserClick(user.id)}>
          {user.name}
        </li>
      ))}
    </ul>
  );
};
