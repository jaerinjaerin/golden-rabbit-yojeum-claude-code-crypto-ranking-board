import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { LogoutSection } from '@/components/profile/logout-section'

// Mock UI components
jest.mock('@/components/ui/card', () => ({
  Card: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="card">{children}</div>
  ),
  CardContent: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="card-content">{children}</div>
  ),
  CardHeader: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="card-header">{children}</div>
  ),
  CardTitle: ({ children }: { children: React.ReactNode }) => (
    <h3 data-testid="card-title">{children}</h3>
  ),
  CardDescription: ({ children }: { children: React.ReactNode }) => (
    <p data-testid="card-description">{children}</p>
  )
}))

jest.mock('@/components/ui/button', () => ({
  Button: ({ children, variant, className }: {
    children: React.ReactNode;
    variant?: string;
    className?: string;
  }) => (
    <button data-testid="button" data-variant={variant} className={className}>
      {children}
    </button>
  )
}))

describe('LogoutSection', () => {
  it('renders without crashing', () => {
    render(<LogoutSection />)
    expect(screen.getByTestId('card')).toBeInTheDocument()
  })

  it('displays the correct Korean title', () => {
    render(<LogoutSection />)
    expect(screen.getByTestId('card-title')).toHaveTextContent('로그아웃')
  })

  it('displays the correct Korean description', () => {
    render(<LogoutSection />)
    expect(screen.getByTestId('card-description')).toHaveTextContent('계정에서 로그아웃합니다')
  })

  it('renders logout button with Korean text', () => {
    render(<LogoutSection />)
    const button = screen.getByTestId('button')
    expect(button).toHaveTextContent('로그아웃')
  })

  it('logout button has destructive variant', () => {
    render(<LogoutSection />)
    const button = screen.getByTestId('button')
    expect(button).toHaveAttribute('data-variant', 'destructive')
  })

  it('logout button has full width styling', () => {
    render(<LogoutSection />)
    const button = screen.getByTestId('button')
    expect(button).toHaveClass('w-full')
  })

  it('has correct card structure', () => {
    render(<LogoutSection />)
    expect(screen.getByTestId('card-header')).toBeInTheDocument()
    expect(screen.getByTestId('card-content')).toBeInTheDocument()
  })

  it('card header contains both title and description', () => {
    render(<LogoutSection />)
    const cardHeader = screen.getByTestId('card-header')
    expect(cardHeader).toContainElement(screen.getByTestId('card-title'))
    expect(cardHeader).toContainElement(screen.getByTestId('card-description'))
  })

  it('card content contains the logout button', () => {
    render(<LogoutSection />)
    const cardContent = screen.getByTestId('card-content')
    expect(cardContent).toContainElement(screen.getByTestId('button'))
  })

  it('button is clickable', async () => {
    const user = userEvent.setup()
    render(<LogoutSection />)
    const button = screen.getByTestId('button')

    await user.click(button)
    expect(button).toBeInTheDocument()
  })

  it('has all Korean text content', () => {
    render(<LogoutSection />)

    // Title and button both have "로그아웃"
    const logoutElements = screen.getAllByText('로그아웃')
    expect(logoutElements).toHaveLength(2)
    // Description
    expect(screen.getByText('계정에서 로그아웃합니다')).toBeInTheDocument()
  })

  it('maintains proper visual hierarchy with title and description', () => {
    const { container } = render(<LogoutSection />)

    const title = screen.getByTestId('card-title')
    const description = screen.getByTestId('card-description')

    expect(title.tagName).toBe('H3')
    expect(description.tagName).toBe('P')
  })

  it('renders single action button', () => {
    render(<LogoutSection />)
    const buttons = screen.getAllByTestId('button')
    expect(buttons).toHaveLength(1)
  })

  it('button text matches title theme', () => {
    render(<LogoutSection />)
    const title = screen.getByTestId('card-title')
    const button = screen.getByTestId('button')

    expect(title.textContent).toBe(button.textContent)
  })

  it('has semantic HTML structure', () => {
    const { container } = render(<LogoutSection />)

    // Check that title is a heading element
    const title = screen.getByTestId('card-title')
    expect(title.tagName).toBe('H3')

    // Check that description is a paragraph
    const description = screen.getByTestId('card-description')
    expect(description.tagName).toBe('P')

    // Check that action is a button
    const button = screen.getByTestId('button')
    expect(button.tagName).toBe('BUTTON')
  })

  it('provides clear user intent with description', () => {
    render(<LogoutSection />)
    const description = screen.getByTestId('card-description')

    // Description should inform user about action
    expect(description.textContent).toContain('계정')
    expect(description.textContent).toContain('로그아웃')
  })

  it('maintains structure after interaction', async () => {
    const user = userEvent.setup()
    render(<LogoutSection />)

    const button = screen.getByTestId('button')
    await user.click(button)

    // Structure should remain intact
    expect(screen.getByTestId('card')).toBeInTheDocument()
    expect(screen.getByTestId('card-title')).toBeInTheDocument()
    expect(screen.getByTestId('card-description')).toBeInTheDocument()
    expect(screen.getByTestId('button')).toBeInTheDocument()
  })

  it('matches snapshot', () => {
    const { container } = render(<LogoutSection />)
    expect(container).toMatchSnapshot()
  })
})
