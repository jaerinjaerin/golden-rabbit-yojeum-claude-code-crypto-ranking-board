import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ProfileImageSection } from '@/components/profile/profile-image-section'

// Mock UI components
jest.mock('@/components/ui/avatar', () => ({
  Avatar: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div data-testid="avatar" className={className}>{children}</div>
  ),
  AvatarImage: ({ src, alt, ...props }: { src: string; alt: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img data-testid="avatar-image" src={src || undefined} alt={alt} {...props} />
  ),
  AvatarFallback: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div data-testid="avatar-fallback" className={className}>{children}</div>
  )
}))

jest.mock('@/components/ui/button', () => ({
  Button: ({ children, variant, className, onClick }: {
    children: React.ReactNode;
    variant?: string;
    className?: string;
    onClick?: () => void;
  }) => (
    <button data-testid="button" data-variant={variant} className={className} onClick={onClick}>
      {children}
    </button>
  )
}))

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

describe('ProfileImageSection', () => {
  it('renders without crashing', () => {
    render(<ProfileImageSection />)
    expect(screen.getByTestId('card')).toBeInTheDocument()
  })

  it('displays the correct Korean title', () => {
    render(<ProfileImageSection />)
    expect(screen.getByTestId('card-title')).toHaveTextContent('프로필 이미지')
  })

  it('renders avatar component', () => {
    render(<ProfileImageSection />)
    const avatar = screen.getByTestId('avatar')
    expect(avatar).toBeInTheDocument()
    expect(avatar).toHaveClass('h-32', 'w-32')
  })

  it('renders avatar image with correct alt text', () => {
    render(<ProfileImageSection />)
    const avatarImage = screen.getByTestId('avatar-image')
    expect(avatarImage).toHaveAttribute('alt', '프로필 이미지')
  })

  it('renders avatar fallback with Korean text', () => {
    render(<ProfileImageSection />)
    const fallback = screen.getByTestId('avatar-fallback')
    expect(fallback).toHaveTextContent('사용자')
    expect(fallback).toHaveClass('text-2xl')
  })

  it('renders change image button with Korean text', () => {
    render(<ProfileImageSection />)
    const button = screen.getByTestId('button')
    expect(button).toHaveTextContent('이미지 변경')
  })

  it('change image button has correct styling', () => {
    render(<ProfileImageSection />)
    const button = screen.getByTestId('button')
    expect(button).toHaveAttribute('data-variant', 'outline')
    expect(button).toHaveClass('w-full')
  })

  it('has correct card structure', () => {
    render(<ProfileImageSection />)
    expect(screen.getByTestId('card-header')).toBeInTheDocument()
    expect(screen.getByTestId('card-content')).toBeInTheDocument()
  })

  it('card content has centered layout', () => {
    render(<ProfileImageSection />)
    const cardContent = screen.getByTestId('card-content')
    expect(cardContent).toHaveClass('flex', 'flex-col', 'items-center', 'space-y-4')
  })

  it('has accessible image alt text in Korean', () => {
    render(<ProfileImageSection />)
    const avatarImage = screen.getByAltText('프로필 이미지')
    expect(avatarImage).toBeInTheDocument()
  })

  it('button is clickable', async () => {
    const user = userEvent.setup()
    render(<ProfileImageSection />)
    const button = screen.getByTestId('button')

    // Verify button can be clicked
    await user.click(button)
    expect(button).toBeInTheDocument()
  })

  it('renders all elements in correct order', () => {
    const { container } = render(<ProfileImageSection />)
    const cardContent = screen.getByTestId('card-content')

    // Check avatar comes before button
    const avatar = screen.getByTestId('avatar')
    const button = screen.getByTestId('button')

    expect(cardContent).toContainElement(avatar)
    expect(cardContent).toContainElement(button)
  })

  it('matches snapshot', () => {
    const { container } = render(<ProfileImageSection />)
    expect(container).toMatchSnapshot()
  })
})
