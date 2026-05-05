import reducer, {
  getUser,
  initialState,
  loginUser,
  logoutUser,
  registerUser,
  updateUser
} from './userSlice';
import { TUser } from '../utils/types';

const user: TUser = {
  email: 'roman@example.com',
  name: 'Roman'
};

describe('Редьюсер userSlice', () => {
  test('Стейт loginUser.pending', () => {
    const initialUserState = {
      ...initialState,
      isLoading: false,
      error: null
    };

    const state = reducer(
      initialUserState,
      loginUser.pending('', { email: 'roman@example.com', password: '123456' })
    );

    expect(state).toEqual({
      ...initialUserState,
      isLoading: true,
      error: null
    });
  });

  test('Стейт loginUser.fulfilled', () => {
    const initialUserState = {
      ...initialState,
      isLoading: true,
      error: null
    };

    const state = reducer(
      initialUserState,
      loginUser.fulfilled(user, '', {
        email: 'roman@example.com',
        password: '123456'
      })
    );

    expect(state).toEqual({
      ...initialUserState,
      user,
      isLoading: false,
      isAuthenticated: true,
      isAuthChecked: true,
      error: null
    });
  });

  test('Стейт loginUser.rejected', () => {
    const initialUserState = {
      ...initialState,
      isLoading: true,
      error: null
    };

    const action = loginUser.rejected(new Error('Ошибка входа'), '', {
      email: 'roman@example.com',
      password: '123456'
    });

    const state = reducer(initialUserState, action);

    expect(state).toEqual({
      ...initialUserState,
      isLoading: false,
      isAuthChecked: true,
      error: 'Ошибка входа'
    });
  });

  test('Стейт registerUser.pending', () => {
    const initialUserState = {
      ...initialState,
      isLoading: false,
      error: null
    };

    const state = reducer(
      initialUserState,
      registerUser.pending('', {
        email: 'roman@example.com',
        name: 'Roman',
        password: '123456'
      })
    );

    expect(state).toEqual({
      ...initialUserState,
      isLoading: true,
      error: null
    });
  });

  test('Стейт registerUser.fulfilled', () => {
    const initialUserState = {
      ...initialState,
      isLoading: true,
      error: null
    };

    const state = reducer(
      initialUserState,
      registerUser.fulfilled(
        { user, success: true, accessToken: 'token', refreshToken: 'refresh' },
        '',
        {
          email: 'roman@example.com',
          name: 'Roman',
          password: '123456'
        }
      )
    );

    expect(state).toEqual({
      ...initialUserState,
      user,
      isLoading: false,
      isAuthenticated: true,
      isAuthChecked: true,
      error: null
    });
  });

  test('Стейт registerUser.rejected', () => {
    const initialUserState = {
      ...initialState,
      isLoading: true,
      error: null
    };

    const action = registerUser.rejected(new Error('Ошибка регистрации'), '', {
      email: 'roman@example.com',
      name: 'Roman',
      password: '123456'
    });

    const state = reducer(initialUserState, action);

    expect(state).toEqual({
      ...initialUserState,
      isLoading: false,
      isAuthChecked: true,
      error: 'Ошибка регистрации'
    });
  });

  test('Стейт updateUser.pending', () => {
    const initialUserState = {
      ...initialState,
      isLoading: false,
      error: null,
      isAuthenticated: true,
      isAuthChecked: true,
      user
    };

    const state = reducer(
      initialUserState,
      updateUser.pending('', { name: 'Roman 2' })
    );

    expect(state).toEqual({
      ...initialUserState,
      isLoading: true,
      error: null
    });
  });

  test('Стейт updateUser.fulfilled', () => {
    const updatedUser: TUser = {
      email: 'roman@example.com',
      name: 'Roman 2'
    };

    const initialUserState = {
      ...initialState,
      isLoading: true,
      error: null,
      isAuthenticated: true,
      isAuthChecked: true,
      user
    };

    const state = reducer(
      initialUserState,
      updateUser.fulfilled({ user: updatedUser, success: true }, '', {
        name: 'Roman 2'
      })
    );

    expect(state).toEqual({
      ...initialUserState,
      user: updatedUser,
      isLoading: false,
      error: null
    });
  });

  test('Стейт updateUser.rejected', () => {
    const initialUserState = {
      ...initialState,
      isLoading: true,
      error: null,
      isAuthenticated: true,
      isAuthChecked: true,
      user
    };

    const action = updateUser.rejected(new Error('Ошибка обновления'), '', {
      name: 'Roman 2'
    });

    const state = reducer(initialUserState, action);

    expect(state).toEqual({
      ...initialUserState,
      isLoading: false,
      error: 'Ошибка обновления'
    });
  });

  test('Стейт getUser.pending', () => {
    const initialUserState = {
      ...initialState,
      isLoading: false,
      error: null
    };

    const state = reducer(initialUserState, getUser.pending('', undefined));

    expect(state).toEqual({
      ...initialUserState,
      isLoading: true,
      error: null
    });
  });

  test('Стейт getUser.fulfilled', () => {
    const initialUserState = {
      ...initialState,
      isLoading: true,
      error: null
    };

    const state = reducer(
      initialUserState,
      getUser.fulfilled({ user, success: true }, '', undefined)
    );

    expect(state).toEqual({
      ...initialUserState,
      user,
      isLoading: false,
      isAuthenticated: true,
      isAuthChecked: true,
      error: null
    });
  });

  test('Стейт getUser.rejected', () => {
    const initialUserState = {
      ...initialState,
      isLoading: true,
      error: null
    };

    const action = getUser.rejected(
      new Error('Ошибка получения пользователя'),
      '',
      undefined
    );

    const state = reducer(initialUserState, action);

    expect(state).toEqual({
      ...initialUserState,
      isLoading: false,
      isAuthChecked: true,
      error: 'Ошибка получения пользователя'
    });
  });

  test('Стейт logoutUser.pending', () => {
    const initialUserState = {
      ...initialState,
      isLoading: false,
      error: null,
      isAuthenticated: true,
      isAuthChecked: true,
      user
    };

    const state = reducer(initialUserState, logoutUser.pending('', undefined));

    expect(state).toEqual({
      ...initialUserState,
      isLoading: true,
      error: null
    });
  });

  test('Стейт logoutUser.fulfilled', () => {
    const initialUserState = {
      ...initialState,
      isLoading: true,
      error: null,
      isAuthenticated: true,
      isAuthChecked: true,
      user
    };

    const state = reducer(
      initialUserState,
      logoutUser.fulfilled({ success: true }, '', undefined)
    );

    expect(state).toEqual({
      ...initialUserState,
      user: null,
      isLoading: false,
      isAuthenticated: false,
      error: null
    });
  });

  test('Стейт logoutUser.rejected', () => {
    const initialUserState = {
      ...initialState,
      isLoading: true,
      error: null,
      isAuthenticated: true,
      isAuthChecked: true,
      user
    };

    const action = logoutUser.rejected(
      new Error('Ошибка выхода'),
      '',
      undefined
    );

    const state = reducer(initialUserState, action);

    expect(state).toEqual({
      ...initialUserState,
      isLoading: false,
      error: 'Ошибка выхода'
    });
  });
});
