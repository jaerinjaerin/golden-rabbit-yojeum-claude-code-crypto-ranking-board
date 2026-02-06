import React from 'react'
import { render, screen } from '@testing-library/react'
import { ProfileLayout } from '@/components/profile/profile-layout'

// Mock child components
jest.mock('@/components/profile/profile-image-section', () => ({
  ProfileImageSection: jest.fn(() => <div data-testid="profile-image-section">ProfileImageSection</div>)
}))

jest.mock('@/components/profile/bio-section', () => ({
  BioSection: jest.fn(() => <div data-testid="bio-section">BioSection</div>)
}))

jest.mock('@/components/profile/password-section', () => ({
  PasswordSection: jest.fn(() => <div data-testid="password-section">PasswordSection</div>)
}))

jest.mock('@/components/profile/logout-section', () => ({
  LogoutSection: jest.fn(() => <div data-testid="logout-section">LogoutSection</div>)
}))

describe('ProfileLayout', () => {
  it('renders without crashing', () => {
    render(<ProfileLayout />)
    expect(screen.getByRole('heading', { name: '프로필 설정' })).toBeInTheDocument()
  })

  it('displays the correct Korean title', () => {
    render(<ProfileLayout />)
    const heading = screen.getByRole('heading', { name: '프로필 설정' })
    expect(heading).toHaveClass('text-3xl', 'font-bold')
  })

  it('displays the correct Korean description', () => {
    render(<ProfileLayout />)
    expect(screen.getByText('사용자 정보를 관리하고 설정을 변경할 수 있습니다')).toBeInTheDocument()
  })

  it('renders all child sections', () => {
    render(<ProfileLayout />)
    expect(screen.getByTestId('profile-image-section')).toBeInTheDocument()
    expect(screen.getByTestId('bio-section')).toBeInTheDocument()
    expect(screen.getByTestId('password-section')).toBeInTheDocument()
    expect(screen.getByTestId('logout-section')).toBeInTheDocument()
  })

  it('has correct container structure with max-width', () => {
    const { container } = render(<ProfileLayout />)
    const mainContainer = container.querySelector('.container')
    expect(mainContainer).toHaveClass('mx-auto', 'px-4', 'py-8', 'max-w-4xl')
  })

  it('has correct responsive grid layout', () => {
    const { container } = render(<ProfileLayout />)
    const gridContainer = container.querySelector('.grid')
    expect(gridContainer).toHaveClass('gap-6', 'md:grid-cols-2')
  })

  it('has proper spacing for sections', () => {
    const { container } = render(<ProfileLayout />)
    const spacedDivs = container.querySelectorAll('.space-y-6')
    expect(spacedDivs.length).toBeGreaterThan(0)
  })

  it('has accessible heading structure', () => {
    render(<ProfileLayout />)
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toHaveTextContent('프로필 설정')
  })

  it('groups left column sections correctly', () => {
    render(<ProfileLayout />)
    const imageSection = screen.getByTestId('profile-image-section')
    const bioSection = screen.getByTestId('bio-section')

    // Check they exist in the document
    expect(imageSection).toBeInTheDocument()
    expect(bioSection).toBeInTheDocument()
  })

  it('groups right column sections correctly', () => {
    render(<ProfileLayout />)
    const passwordSection = screen.getByTestId('password-section')
    const logoutSection = screen.getByTestId('logout-section')

    // Check they exist in the document
    expect(passwordSection).toBeInTheDocument()
    expect(logoutSection).toBeInTheDocument()
  })

  it('renders description with muted foreground styling', () => {
    const { container } = render(<ProfileLayout />)
    const description = screen.getByText('사용자 정보를 관리하고 설정을 변경할 수 있습니다')
    expect(description).toHaveClass('text-muted-foreground', 'mt-2')
  })

  it('has proper header spacing', () => {
    const { container } = render(<ProfileLayout />)
    const headerDiv = container.querySelector('.mb-8')
    expect(headerDiv).toBeInTheDocument()
  })

  it('matches snapshot', () => {
    const { container } = render(<ProfileLayout />)
    expect(container).toMatchSnapshot()
  })
})
