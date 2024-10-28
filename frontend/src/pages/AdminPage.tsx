// frontend/src/pages/AdminPage.tsx
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {fetchUsersThunk, deleteUserThunk} from '../store/slices/userSlice';
import { fetchEventsThunk, deleteEventThunk } from '../store/slices/eventSlice';

export const AdminPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.users.users);
  const events = useAppSelector((state) => state.events.events);
  const loadingUsers = useAppSelector((state) => state.users.loading);
  const loadingEvents = useAppSelector((state) => state.events.loading);

  useEffect(() => {
    dispatch(fetchUsersThunk());
    dispatch(fetchEventsThunk());
  }, [dispatch]);

  const handleDeleteUser = (userId: number) => {
    dispatch(deleteUserThunk(userId));
  };

  const handleDeleteEvent = (eventId: number) => {
    dispatch(deleteEventThunk(eventId));
  };

  return (
    <div className="admin-page">
      <h2>Administration page</h2>

      <section className="admin-section">
        <h3>Users</h3>
        {loadingUsers ? (
          <p>Loading users...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
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
                    <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      <section className="admin-section">
        <h3>Events</h3>
        {loadingEvents ? (
          <p>Loading events...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
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
                    <button onClick={() => handleDeleteEvent(event.id)}>handleDeleteUser</button>
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