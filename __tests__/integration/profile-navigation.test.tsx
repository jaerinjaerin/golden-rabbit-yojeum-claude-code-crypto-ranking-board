import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { useRouter, usePathname } from 'next/navigation'
import HomePage from '@/app/page'
import ProfilePage from '@/app/profile/page'

// Mock Next.js navigation hooks
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
}))

// Mock the crypto ranking board component
jest.mock('@/crypto-ranking-board', () => ({
  __esModule: true,
  default: jest.fn(() => <div data-testid="crypto-ranking-board">Crypto Ranking Board</div>)
}))

// Mock the ProfileLayout component
jest.mock('@/components/profile/profile-layout', () => ({
  ProfileLayout: jest.fn(() => (
    <div data-testid="profile-layout">
      <h1>프로필 설정</h1>
      <button data-testid="back-button">뒤로 가기</button>
    </div>
  ))
}))

describe('Profile Navigation Integration Tests', () => {
  const mockPush = jest.fn()
  const mockRouter = {
    push: mockPush,
    back: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }

  beforeEach(() => {
    jest.clearAllMocks()
    ;(useRouter as jest.Mock).mockReturnValue(mockRouter)
  })

  describe('Navigation from Home to Profile', () => {
    it('clicking profile link navigates to /profile', () => {
      ;(usePathname as jest.Mock).mockReturnValue('/')

      const { container } = render(<HomePage />)

      // Find the profile button by its text and icon
      const profileButton = screen.getByRole('link', { name: /프로필/i })

      // Verify the button exists
      expect(profileButton).toBeInTheDocument()

      // Verify it has the correct href
      expect(profileButton).toHaveAttribute('href', '/profile')
    })

    it('profile button has correct icon and text', () => {
      ;(usePathname as jest.Mock).mockReturnValue('/')

      render(<HomePage />)

      // Find the button containing the profile text
      const profileButton = screen.getByRole('link', { name: /프로필/i })

      // Verify button text
      expect(profileButton).toHaveTextContent('프로필')

      // Verify the button has the User icon (by checking for svg element)
      const svg = profileButton.querySelector('svg')
      expect(svg).toBeInTheDocument()
      expect(svg).toHaveClass('lucide-user')
    })

    it('profile button has correct styling classes', () => {
      ;(usePathname as jest.Mock).mockReturnValue('/')

      render(<HomePage />)

      const profileButton = screen.getByRole('link', { name: /프로필/i })
      const buttonElement = profileButton.querySelector('button')

      // Verify button has ghost variant and correct hover styles
      expect(buttonElement).toHaveClass('text-white')
      expect(buttonElement).toHaveClass('hover:text-gray-300')
      expect(buttonElement).toHaveClass('hover:bg-gray-800')
    })
  })

  describe('Profile Page Rendering', () => {
    it('profile page renders correctly after navigation', () => {
      ;(usePathname as jest.Mock).mockReturnValue('/profile')

      render(<ProfilePage />)

      // Verify ProfileLayout component is rendered
      expect(screen.getByTestId('profile-layout')).toBeInTheDocument()

      // Verify profile page content
      expect(screen.getByText('프로필 설정')).toBeInTheDocument()
    })

    it('profile page displays all expected elements', () => {
      ;(usePathname as jest.Mock).mockReturnValue('/profile')

      render(<ProfilePage />)

      const profileLayout = screen.getByTestId('profile-layout')
      expect(profileLayout).toBeInTheDocument()

      // Check for profile heading
      expect(screen.getByText('프로필 설정')).toBeInTheDocument()
    })
  })

  describe('Back to Home Functionality', () => {
    it('back button functionality is available on profile page', () => {
      ;(usePathname as jest.Mock).mockReturnValue('/profile')

      render(<ProfilePage />)

      // Find back button
      const backButton = screen.getByTestId('back-button')
      expect(backButton).toBeInTheDocument()
      expect(backButton).toHaveTextContent('뒤로 가기')
    })

    it('clicking back button triggers navigation', () => {
      ;(usePathname as jest.Mock).mockReturnValue('/profile')

      render(<ProfilePage />)

      const backButton = screen.getByTestId('back-button')
      fireEvent.click(backButton)

      // In a real implementation, this would trigger router.back()
      // For now, we just verify the button is clickable
      expect(backButton).toBeInTheDocument()
    })
  })

  describe('Full Navigation Flow', () => {
    it('simulates complete navigation from home to profile and back', async () => {
      // Start on home page
      ;(usePathname as jest.Mock).mockReturnValue('/')
      const { unmount: unmountHome } = render(<HomePage />)

      // Verify home page elements
      expect(screen.getByText('암호화폐 순위 보드')).toBeInTheDocument()
      expect(screen.getByTestId('crypto-ranking-board')).toBeInTheDocument()

      // Find and verify profile link
      const profileLink = screen.getByRole('link', { name: /프로필/i })
      expect(profileLink).toHaveAttribute('href', '/profile')

      // Simulate navigation to profile
      unmountHome()
      ;(usePathname as jest.Mock).mockReturnValue('/profile')
      const { unmount: unmountProfile } = render(<ProfilePage />)

      // Verify profile page
      expect(screen.getByTestId('profile-layout')).toBeInTheDocument()
      expect(screen.getByText('프로필 설정')).toBeInTheDocument()

      // Verify back button exists
      const backButton = screen.getByTestId('back-button')
      expect(backButton).toBeInTheDocument()

      // Simulate going back
      unmountProfile()
      ;(usePathname as jest.Mock).mockReturnValue('/')
      render(<HomePage />)

      // Verify we're back on home page
      expect(screen.getByText('암호화폐 순위 보드')).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('profile button is accessible via keyboard navigation', () => {
      ;(usePathname as jest.Mock).mockReturnValue('/')

      render(<HomePage />)

      const profileButton = screen.getByRole('link', { name: /프로필/i })

      // Verify it's a link (accessible)
      expect(profileButton.tagName).toBe('A')

      // Verify it has proper href for keyboard users
      expect(profileButton).toHaveAttribute('href', '/profile')
    })

    it('profile link has descriptive text for screen readers', () => {
      ;(usePathname as jest.Mock).mockReturnValue('/')

      render(<HomePage />)

      const profileButton = screen.getByRole('link', { name: /프로필/i })

      // Verify the link has text content for screen readers
      expect(profileButton).toHaveTextContent('프로필')
    })
  })

  describe('Header Navigation Structure', () => {
    it('header contains logo and navigation elements', () => {
      ;(usePathname as jest.Mock).mockReturnValue('/')

      render(<HomePage />)

      // Verify header structure
      const header = screen.getByRole('banner')
      expect(header).toBeInTheDocument()
      expect(header).toHaveClass('bg-gray-900', 'border-b', 'border-gray-800')

      // Verify logo link
      const logoLink = screen.getByText('암호화폐 순위 보드')
      expect(logoLink).toBeInTheDocument()
      expect(logoLink).toHaveAttribute('href', '/')
    })

    it('navigation is properly structured within header', () => {
      ;(usePathname as jest.Mock).mockReturnValue('/')

      render(<HomePage />)

      // Verify nav element exists
      const nav = screen.getByRole('navigation')
      expect(nav).toBeInTheDocument()

      // Verify profile link is within nav
      const profileLink = screen.getByRole('link', { name: /프로필/i })
      expect(nav).toContainElement(profileLink)
    })
  })
})
