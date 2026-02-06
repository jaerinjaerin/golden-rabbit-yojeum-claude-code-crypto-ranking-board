import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { PasswordSection } from '@/components/profile/password-section'

// Mock UI components
jest.mock('@/components/ui/card', () => ({
  Card: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="card">{children}</div>
  ),
  CardContent: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div data-testid="card-content" className={className}>{children}</div>
  ),
  CardHeader: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="card-header">{children}</div>
  ),
  CardTitle: ({ children }: { children: React.ReactNode }) => (
    <h3 data-testid="card-title">{children}</h3>
  )
}))

jest.mock('@/components/ui/label', () => ({
  Label: ({ children, htmlFor, ...props }: { children: React.ReactNode; htmlFor?: string }) => (
    <label data-testid={`label-${htmlFor}`} htmlFor={htmlFor} {...props}>{children}</label>
  )
}))

jest.mock('@/components/ui/input', () => ({
  Input: ({ id, type, placeholder }: {
    id?: string;
    type?: string;
    placeholder?: string;
  }) => (
    <input
      data-testid={`input-${id}`}
      id={id}
      type={type}
      placeholder={placeholder}
    />
  )
}))

jest.mock('@/components/ui/button', () => ({
  Button: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <button data-testid="button" className={className}>{children}</button>
  )
}))

describe('PasswordSection', () => {
  it('renders without crashing', () => {
    render(<PasswordSection />)
    expect(screen.getByTestId('card')).toBeInTheDocument()
  })

  it('displays the correct Korean title', () => {
    render(<PasswordSection />)
    expect(screen.getByTestId('card-title')).toHaveTextContent('비밀번호 변경')
  })

  it('renders all three password input fields', () => {
    render(<PasswordSection />)
    expect(screen.getByTestId('input-current-password')).toBeInTheDocument()
    expect(screen.getByTestId('input-new-password')).toBeInTheDocument()
    expect(screen.getByTestId('input-confirm-password')).toBeInTheDocument()
  })

  it('current password field has correct attributes', () => {
    render(<PasswordSection />)
    const currentPasswordInput = screen.getByTestId('input-current-password')
    expect(currentPasswordInput).toHaveAttribute('id', 'current-password')
    expect(currentPasswordInput).toHaveAttribute('type', 'password')
    expect(currentPasswordInput).toHaveAttribute('placeholder', '현재 비밀번호를 입력하세요')
  })

  it('new password field has correct attributes', () => {
    render(<PasswordSection />)
    const newPasswordInput = screen.getByTestId('input-new-password')
    expect(newPasswordInput).toHaveAttribute('id', 'new-password')
    expect(newPasswordInput).toHaveAttribute('type', 'password')
    expect(newPasswordInput).toHaveAttribute('placeholder', '새 비밀번호를 입력하세요')
  })

  it('confirm password field has correct attributes', () => {
    render(<PasswordSection />)
    const confirmPasswordInput = screen.getByTestId('input-confirm-password')
    expect(confirmPasswordInput).toHaveAttribute('id', 'confirm-password')
    expect(confirmPasswordInput).toHaveAttribute('type', 'password')
    expect(confirmPasswordInput).toHaveAttribute('placeholder', '비밀번호를 다시 입력하세요')
  })

  it('renders all labels with Korean text', () => {
    render(<PasswordSection />)
    expect(screen.getByTestId('label-current-password')).toHaveTextContent('현재 비밀번호')
    expect(screen.getByTestId('label-new-password')).toHaveTextContent('새 비밀번호')
    expect(screen.getByTestId('label-confirm-password')).toHaveTextContent('비밀번호 확인')
  })

  it('labels are properly associated with inputs', () => {
    render(<PasswordSection />)
    expect(screen.getByTestId('label-current-password')).toHaveAttribute('for', 'current-password')
    expect(screen.getByTestId('label-new-password')).toHaveAttribute('for', 'new-password')
    expect(screen.getByTestId('label-confirm-password')).toHaveAttribute('for', 'confirm-password')
  })

  it('renders submit button with Korean text', () => {
    render(<PasswordSection />)
    const button = screen.getByTestId('button')
    expect(button).toHaveTextContent('비밀번호 변경')
    expect(button).toHaveClass('w-full')
  })

  it('has correct card structure', () => {
    render(<PasswordSection />)
    expect(screen.getByTestId('card-header')).toBeInTheDocument()
    expect(screen.getByTestId('card-content')).toBeInTheDocument()
  })

  it('card content has correct spacing', () => {
    render(<PasswordSection />)
    const cardContent = screen.getByTestId('card-content')
    expect(cardContent).toHaveClass('space-y-4')
  })

  it('each form field has proper spacing', () => {
    const { container } = render(<PasswordSection />)
    const fieldContainers = container.querySelectorAll('.space-y-2')
    expect(fieldContainers).toHaveLength(3)
  })

  it('all password inputs are type password', () => {
    render(<PasswordSection />)
    const inputs = [
      screen.getByTestId('input-current-password'),
      screen.getByTestId('input-new-password'),
      screen.getByTestId('input-confirm-password')
    ]

    inputs.forEach(input => {
      expect(input).toHaveAttribute('type', 'password')
    })
  })

  it('current password input can receive user input', async () => {
    const user = userEvent.setup()
    render(<PasswordSection />)
    const input = screen.getByTestId('input-current-password') as HTMLInputElement

    await user.type(input, 'oldPassword123')
    expect(input.value).toBe('oldPassword123')
  })

  it('new password input can receive user input', async () => {
    const user = userEvent.setup()
    render(<PasswordSection />)
    const input = screen.getByTestId('input-new-password') as HTMLInputElement

    await user.type(input, 'newPassword456')
    expect(input.value).toBe('newPassword456')
  })

  it('confirm password input can receive user input', async () => {
    const user = userEvent.setup()
    render(<PasswordSection />)
    const input = screen.getByTestId('input-confirm-password') as HTMLInputElement

    await user.type(input, 'newPassword456')
    expect(input.value).toBe('newPassword456')
  })

  it('button is clickable', async () => {
    const user = userEvent.setup()
    render(<PasswordSection />)
    const button = screen.getByTestId('button')

    await user.click(button)
    expect(button).toBeInTheDocument()
  })

  it('handles empty input fields', () => {
    render(<PasswordSection />)
    const currentPassword = screen.getByTestId('input-current-password') as HTMLInputElement
    const newPassword = screen.getByTestId('input-new-password') as HTMLInputElement
    const confirmPassword = screen.getByTestId('input-confirm-password') as HTMLInputElement

    expect(currentPassword.value).toBe('')
    expect(newPassword.value).toBe('')
    expect(confirmPassword.value).toBe('')
  })

  it('displays all Korean placeholder text correctly', () => {
    render(<PasswordSection />)

    expect(screen.getByTestId('input-current-password'))
      .toHaveAttribute('placeholder', '현재 비밀번호를 입력하세요')
    expect(screen.getByTestId('input-new-password'))
      .toHaveAttribute('placeholder', '새 비밀번호를 입력하세요')
    expect(screen.getByTestId('input-confirm-password'))
      .toHaveAttribute('placeholder', '비밀번호를 다시 입력하세요')
  })

  it('maintains proper structure with all fields filled', async () => {
    const user = userEvent.setup()
    render(<PasswordSection />)

    await user.type(screen.getByTestId('input-current-password'), 'current123')
    await user.type(screen.getByTestId('input-new-password'), 'new456')
    await user.type(screen.getByTestId('input-confirm-password'), 'new456')

    expect(screen.getByTestId('card')).toBeInTheDocument()
    expect(screen.getByTestId('button')).toBeInTheDocument()
  })

  it('matches snapshot', () => {
    const { container } = render(<PasswordSection />)
    expect(container).toMatchSnapshot()
  })
})
