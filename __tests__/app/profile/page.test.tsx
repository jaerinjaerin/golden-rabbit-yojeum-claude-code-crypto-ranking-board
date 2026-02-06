import React from 'react'
import { render, screen } from '@testing-library/react'
import ProfilePage from '@/app/profile/page'

// Mock the ProfileLayout component
jest.mock('@/components/profile/profile-layout', () => ({
  ProfileLayout: jest.fn(() => <div data-testid="profile-layout">Mocked ProfileLayout</div>)
}))

describe('ProfilePage', () => {
  it('renders without crashing', () => {
    render(<ProfilePage />)
    expect(screen.getByTestId('profile-layout')).toBeInTheDocument()
  })

  it('renders the ProfileLayout component', () => {
    const { container } = render(<ProfilePage />)
    expect(container.querySelector('[data-testid="profile-layout"]')).toBeInTheDocument()
  })

  it('has correct structure', () => {
    const { container } = render(<ProfilePage />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it('matches snapshot', () => {
    const { container } = render(<ProfilePage />)
    expect(container).toMatchSnapshot()
  })
})
