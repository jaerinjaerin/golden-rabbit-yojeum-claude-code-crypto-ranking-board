import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BioSection } from '@/components/profile/bio-section'

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
  Label: ({ children, ...props }: { children: React.ReactNode; htmlFor?: string }) => (
    <label data-testid="label" {...props}>{children}</label>
  )
}))

jest.mock('@/components/ui/textarea', () => ({
  Textarea: ({ id, placeholder, defaultValue, className }: {
    id?: string;
    placeholder?: string;
    defaultValue?: string;
    className?: string;
  }) => (
    <textarea
      data-testid="textarea"
      id={id}
      placeholder={placeholder}
      defaultValue={defaultValue}
      className={className}
    />
  )
}))

jest.mock('@/components/ui/button', () => ({
  Button: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <button data-testid="button" className={className}>{children}</button>
  )
}))

describe('BioSection', () => {
  it('renders without crashing', () => {
    render(<BioSection />)
    expect(screen.getByTestId('card')).toBeInTheDocument()
  })

  it('displays the correct Korean title', () => {
    render(<BioSection />)
    expect(screen.getByTestId('card-title')).toHaveTextContent('소개')
  })

  it('renders label with Korean text', () => {
    render(<BioSection />)
    const label = screen.getByTestId('label')
    expect(label).toHaveTextContent('자기소개')
    expect(label).toHaveAttribute('for', 'bio')
  })

  it('renders textarea with correct attributes', () => {
    render(<BioSection />)
    const textarea = screen.getByTestId('textarea')
    expect(textarea).toHaveAttribute('id', 'bio')
    expect(textarea).toHaveAttribute('placeholder', '자기소개를 입력하세요')
  })

  it('textarea has default value in Korean', () => {
    render(<BioSection />)
    const textarea = screen.getByTestId('textarea') as HTMLTextAreaElement
    expect(textarea.defaultValue).toBe('안녕하세요')
  })

  it('textarea has correct styling', () => {
    render(<BioSection />)
    const textarea = screen.getByTestId('textarea')
    expect(textarea).toHaveClass('min-h-[120px]', 'resize-none')
  })

  it('renders save button with Korean text', () => {
    render(<BioSection />)
    const button = screen.getByTestId('button')
    expect(button).toHaveTextContent('저장')
    expect(button).toHaveClass('w-full')
  })

  it('has correct card structure', () => {
    render(<BioSection />)
    expect(screen.getByTestId('card-header')).toBeInTheDocument()
    expect(screen.getByTestId('card-content')).toBeInTheDocument()
  })

  it('card content has correct spacing', () => {
    render(<BioSection />)
    const cardContent = screen.getByTestId('card-content')
    expect(cardContent).toHaveClass('space-y-4')
  })

  it('form field has proper spacing', () => {
    const { container } = render(<BioSection />)
    const fieldContainer = container.querySelector('.space-y-2')
    expect(fieldContainer).toBeInTheDocument()
  })

  it('textarea is accessible via label', () => {
    render(<BioSection />)
    const label = screen.getByTestId('label')
    const textarea = screen.getByTestId('textarea')
    expect(label).toHaveAttribute('for', 'bio')
    expect(textarea).toHaveAttribute('id', 'bio')
  })

  it('textarea can receive user input', async () => {
    const user = userEvent.setup()
    render(<BioSection />)
    const textarea = screen.getByTestId('textarea') as HTMLTextAreaElement

    await user.clear(textarea)
    await user.type(textarea, '새로운 자기소개')

    expect(textarea.value).toBe('새로운 자기소개')
  })

  it('button is clickable', async () => {
    const user = userEvent.setup()
    render(<BioSection />)
    const button = screen.getByTestId('button')

    await user.click(button)
    expect(button).toBeInTheDocument()
  })

  it('has all Korean text content', () => {
    render(<BioSection />)

    // Title
    expect(screen.getByText('소개')).toBeInTheDocument()
    // Label
    expect(screen.getByText('자기소개')).toBeInTheDocument()
    // Button
    expect(screen.getByText('저장')).toBeInTheDocument()
  })

  it('textarea placeholder is in Korean', () => {
    render(<BioSection />)
    const textarea = screen.getByTestId('textarea')
    expect(textarea).toHaveAttribute('placeholder', '자기소개를 입력하세요')
  })

  it('maintains structure with empty input', async () => {
    const user = userEvent.setup()
    render(<BioSection />)
    const textarea = screen.getByTestId('textarea') as HTMLTextAreaElement

    await user.clear(textarea)

    expect(textarea.value).toBe('')
    expect(screen.getByTestId('button')).toBeInTheDocument()
  })

  it('matches snapshot', () => {
    const { container } = render(<BioSection />)
    expect(container).toMatchSnapshot()
  })
})
