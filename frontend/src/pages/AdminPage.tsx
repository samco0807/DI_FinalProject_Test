// frontend/src/pages/AdminPage.tsx

import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchUsers, deleteUser } from '../store/slices/userSlice';
import { fetchEvents, deleteEvent } from '../store/slices/eventSlice';

const AdminPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.users.data);
  const events = useAppSelector((state) => state.events.events);
  const loadingUsers = useAppSelector((state) => state.users.loading);
  const loadingEvents = useAppSelector((state) => state.events.loading);

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchEvents());
  }, [dispatch]);

  const handleDeleteUser = (userId: number) => {
    dispatch(deleteUser(userId));
  };

  const handleDeleteEvent = (eventId: number) => {
    dispatch(deleteEvent(eventId));
  };

  return (
    <div className="admin-page">
      <h2>Page d'administration</h2>

      <section className="admin-section">
        <h3>Utilisateurs</h3>
        {loadingUsers ? (
          <p>Chargement des utilisateurs...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nom</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <button onClick={() => handleDeleteUser(user.id)}>Supprimer</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      <section className="admin-section">
        <h3>Événements</h3>
        {loadingEvents ? (
          <p>Chargement des événements...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Titre</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event.id}>
                  <td>{event.id}</td>
                  <td>{event.title}</td>
                  <td>{event.date}</td>
                  <td>
                    <button onClick={() => handleDeleteEvent(event.id)}>Supprimer</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
};

export default AdminPage;
