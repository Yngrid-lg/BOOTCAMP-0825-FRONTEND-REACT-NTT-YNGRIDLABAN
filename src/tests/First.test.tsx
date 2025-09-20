import { First } from '../First'
import { render, screen } from "@testing-library/react"

describe('First tests', () => {
    it('Shoul render component', () => {
        render(<First />)
        expect(true).toBeTruthy()

        const heading = screen.getByRole('heading')
        expect(heading).toBeInTheDocument()
    })
})